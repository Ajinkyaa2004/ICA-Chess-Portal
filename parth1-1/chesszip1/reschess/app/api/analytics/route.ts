import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { withAuth } from '@/lib/authMiddleware';
import Student from '@/models/Student';
import Coach from '@/models/Coach';
import Batch from '@/models/Batch';
import Demo from '@/models/Demo';
import Payment from '@/models/Payment';

// GET /api/analytics — Dashboard stats (Admin only)
export const GET = withAuth(async (_req: NextRequest, _context) => {
  try {
    await dbConnect();

    // Run all counts and aggregations in parallel
    const [
      totalStudents,
      totalCoaches,
      totalBatches,
      totalDemos,
      convertedDemos,
      demoStatusCounts,
      attendedDemos,
      interestedDemos,
      paymentPendingDemoList,
      pendingOutcomeList,
      revenueResult,
      recentPayments,
      monthlyRevenue,
    ] = await Promise.all([
      // Total active students
      Student.countDocuments({ status: 'ACTIVE' }),

      // Total active coaches
      Coach.countDocuments({ isActive: true }),

      // Total active batches
      Batch.countDocuments({ status: 'ACTIVE' }),

      // Total demos for conversion rate
      Demo.countDocuments({}),

      // Converted demos
      Demo.countDocuments({ status: 'CONVERTED' }),

      // Demo counts grouped by status
      Demo.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),

      // Attended demos (for conversion funnel)
      Demo.countDocuments({ status: 'ATTENDED' }),

      // Interested demos
      Demo.countDocuments({ status: 'INTERESTED' }),

      // Payment pending demos (top 5 for dashboard)
      Demo.find({ status: 'PAYMENT_PENDING' })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('studentName parentName parentPhone preferredDate')
        .lean(),

      // Demos needing outcome (ATTENDED but no final status - show recently attended)
      Demo.find({ status: 'ATTENDED' })
        .sort({ preferredDate: -1 })
        .limit(5)
        .populate('coachId', 'name')
        .select('studentName coachId preferredDate')
        .lean(),

      // Total revenue (sum of successful payments)
      Payment.aggregate([
        { $match: { status: 'SUCCESS' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),

      // Recent 5 payments
      Payment.find({ status: 'SUCCESS' })
        .populate('studentId', 'name parentName')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),

      // Monthly revenue for last 6 months
      (() => {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        sixMonthsAgo.setDate(1);
        sixMonthsAgo.setHours(0, 0, 0, 0);

        return Payment.aggregate([
          {
            $match: {
              status: 'SUCCESS',
              createdAt: { $gte: sixMonthsAgo },
            },
          },
          {
            $group: {
              _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' },
              },
              revenue: { $sum: '$amount' },
              count: { $sum: 1 },
            },
          },
          {
            $sort: { '_id.year': 1, '_id.month': 1 },
          },
        ]);
      })(),
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
    const demoConversionRate =
      totalDemos > 0
        ? parseFloat(((convertedDemos / totalDemos) * 100).toFixed(2))
        : 0;

    // Build status count map
    const statusMap: Record<string, number> = {};
    for (const item of demoStatusCounts) {
      statusMap[item._id] = item.count;
    }
    const pendingDemos = statusMap['BOOKED'] || 0;

    return NextResponse.json({
      success: true,
      data: {
        totalStudents,
        totalCoaches,
        totalBatches,
        totalRevenue,
        pendingDemos,
        demoConversionRate,
        recentPayments,
        monthlyRevenue: monthlyRevenue.map((item) => ({
          year: item._id.year,
          month: item._id.month,
          revenue: item.revenue,
          count: item.count,
        })),
        demoPipeline: {
          pending: statusMap['BOOKED'] || 0,
          scheduled: statusMap['RESCHEDULED'] || 0,
          attended: statusMap['ATTENDED'] || 0,
          paymentPending: statusMap['PAYMENT_PENDING'] || 0,
          converted: statusMap['CONVERTED'] || 0,
          notInterested: statusMap['NOT_INTERESTED'] || 0,
          interested: statusMap['INTERESTED'] || 0,
          dropped: statusMap['DROPPED'] || 0,
        },
        conversionFunnel: {
          totalDemos,
          attended: attendedDemos,
          interested: interestedDemos,
          paid: convertedDemos,
          attendanceRate: totalDemos > 0 ? Math.round((attendedDemos / totalDemos) * 100) : 0,
          conversionRate: demoConversionRate,
        },
        paymentPendingDemos: paymentPendingDemoList,
        pendingOutcomes: pendingOutcomeList,
      },
    });
  } catch (error) {
    console.error('GET /api/analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}, ['ADMIN']);
