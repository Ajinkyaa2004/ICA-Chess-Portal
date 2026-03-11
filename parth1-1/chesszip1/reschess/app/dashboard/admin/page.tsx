'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Users, Calendar, AlertTriangle, TrendingUp, Video, DollarSign, CheckCircle, Target } from 'lucide-react';

interface AnalyticsData {
  totalStudents: number;
  totalCoaches: number;
  totalBatches: number;
  totalRevenue: number;
  pendingDemos: number;
  demoConversionRate: number;
  demoPipeline: {
    pending: number;
    scheduled: number;
    attended: number;
    paymentPending: number;
    converted: number;
    notInterested: number;
    interested: number;
  };
  conversionFunnel: {
    totalDemos: number;
    attended: number;
    interested: number;
    paid: number;
    attendanceRate: number;
    conversionRate: number;
  };
  paymentPendingDemos: Array<{
    _id: string;
    studentName: string;
    parentName: string;
    parentPhone: string;
    preferredDate: string;
  }>;
  pendingOutcomes: Array<{
    _id: string;
    studentName: string;
    coachId: { name: string } | null;
    preferredDate: string;
  }>;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/analytics');
        if (res.ok) {
          const json = await res.json();
          setAnalytics(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const pipeline = analytics?.demoPipeline;
  const funnel = analytics?.conversionFunnel;
  const pendingOutcomes = analytics?.pendingOutcomes || [];
  const paymentPendingDemos = analytics?.paymentPendingDemos || [];

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="admin" />

      <div className="flex-1">
        <DashboardHeader userName="Admin" userRole="admin" />

        <main className="p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-1">Admin Dashboard</h1>
              <p className="text-gray-600 text-sm">Full system control & analytics</p>
            </div>
            <Link href="/dashboard/admin/demos">
              <Button className="mt-3 sm:mt-0">
                <Video className="w-4 h-4 mr-2" />
                Manage Demos
              </Button>
            </Link>
          </div>

          {/* Critical Alerts Section */}
          {!loading && (pendingOutcomes.length > 0 || paymentPendingDemos.length > 0) && (
            <Card className="mb-4 bg-red-50 border-red-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900 mb-1">⚠️ Action Required</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {pendingOutcomes.length > 0 && (
                      <li>• <strong>{pendingOutcomes.length} demo outcomes pending</strong> - Submit outcomes immediately</li>
                    )}
                    {paymentPendingDemos.length > 0 && (
                      <li>• <strong>{paymentPendingDemos.length} payments pending</strong> - Follow up with parents</li>
                    )}
                  </ul>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Total Students</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">
                    {loading ? '—' : analytics?.totalStudents ?? 0}
                  </p>
                  <p className="text-green-600 text-xs sm:text-sm mt-1">Active subscriptions</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Active Coaches</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">
                    {loading ? '—' : analytics?.totalCoaches ?? 0}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">All verified</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Total Revenue</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">
                    {loading ? '—' : `₹${((analytics?.totalRevenue ?? 0) / 1000).toFixed(0)}K`}
                  </p>
                  <p className="text-green-600 text-xs sm:text-sm flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    All-time revenue
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Pending Demos</p>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                    {loading ? '—' : analytics?.pendingDemos ?? 0}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Need follow-up</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Demo Pipeline Overview */}
          <Card className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-heading font-semibold">Live Demo Pipeline</h3>
              <Link href="/dashboard/admin/demos">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-4 text-gray-400">Loading pipeline...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-700">{pipeline?.pending ?? 0}</p>
                  <p className="text-xs sm:text-sm text-gray-700 mt-1">Pending</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-blue-700">{pipeline?.scheduled ?? 0}</p>
                  <p className="text-xs sm:text-sm text-gray-700 mt-1">Rescheduled</p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-purple-700">{pipeline?.attended ?? 0}</p>
                  <p className="text-xs sm:text-sm text-gray-700 mt-1">Attended</p>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-orange-700">{pipeline?.paymentPending ?? 0}</p>
                  <p className="text-xs sm:text-sm text-gray-700 mt-1">Payment Pending</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-green-700">{pipeline?.converted ?? 0}</p>
                  <p className="text-xs sm:text-sm text-gray-700 mt-1">Converted</p>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-red-700">{pipeline?.notInterested ?? 0}</p>
                  <p className="text-xs sm:text-sm text-gray-700 mt-1">Not Interested</p>
                </div>
              </div>
            )}
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Pending Outcomes - CRITICAL */}
            <Card className="border-2 border-red-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-heading font-semibold text-red-700">
                  ⚠️ Pending Demo Outcomes
                </h3>
                <Badge variant="error">{pendingOutcomes.length}</Badge>
              </div>

              {loading ? (
                <div className="text-center py-6 text-gray-400">Loading...</div>
              ) : pendingOutcomes.length > 0 ? (
                <div className="space-y-3">
                  {pendingOutcomes.map(demo => (
                    <div key={demo._id} className="p-3 bg-red-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm text-gray-900 truncate">{demo.studentName}</p>
                          {demo.coachId && <p className="text-xs text-gray-600">Coach: {demo.coachId.name}</p>}
                          <p className="text-xs text-gray-600">
                            Demo: {new Date(demo.preferredDate).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                      </div>
                      <Link href={`/dashboard/admin/demos?highlight=${demo._id}`}>
                        <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                          Submit Outcome Now
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">All outcomes submitted</p>
                </div>
              )}
            </Card>

            {/* Payment Pending Demos */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-heading font-semibold">Payment Pending Demos</h3>
                <Badge variant="warning">{paymentPendingDemos.length}</Badge>
              </div>

              {loading ? (
                <div className="text-center py-6 text-gray-400">Loading...</div>
              ) : paymentPendingDemos.length > 0 ? (
                <div className="space-y-3">
                  {paymentPendingDemos.map(payment => (
                    <div key={payment._id} className="p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm text-gray-900 truncate">{payment.studentName}</p>
                          <p className="text-xs text-gray-600">Parent: {payment.parentName}</p>
                          <p className="text-xs text-gray-600">
                            Demo: {new Date(payment.preferredDate).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/dashboard/admin/demos?id=${payment._id}`} className="flex-1">
                          <Button size="sm" className="w-full text-xs">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No pending payments</p>
                </div>
              )}
            </Card>
          </div>

          {/* Conversion Stats */}
          {funnel && (
            <Card className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-heading font-semibold mb-4">Conversion Funnel</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{funnel.totalDemos}</p>
                  <p className="text-xs text-gray-600">Booked</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">{funnel.attended}</p>
                  <p className="text-xs text-gray-600">Attended ({funnel.attendanceRate}%)</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{funnel.interested}</p>
                  <p className="text-xs text-gray-600">Interested</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="w-8 h-8 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">{funnel.paid}</p>
                  <p className="text-xs text-gray-600">Paid ({funnel.conversionRate}%)</p>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg sm:text-xl font-heading font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/dashboard/admin/demos">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Video className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-semibold">Manage Demos</p>
                  </div>
                </Card>
              </Link>

              <Link href="/dashboard/admin/students">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm font-semibold">Students</p>
                  </div>
                </Card>
              </Link>

              <Link href="/dashboard/admin/payments">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="w-6 h-6 text-yellow-600" />
                    </div>
                    <p className="text-sm font-semibold">Payments</p>
                  </div>
                </Card>
              </Link>

              <Link href="/dashboard/admin/analytics">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-sm font-semibold">Analytics</p>
                  </div>
                </Card>
              </Link>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
