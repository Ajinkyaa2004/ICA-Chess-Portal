'use client';

import Link from 'next/link';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Users, Calendar, AlertTriangle, TrendingUp, Video, DollarSign, Clock, CheckCircle, XCircle, Target, Bell } from 'lucide-react';

// Mock data - Demo Pipeline
const demoPipeline = {
  pending: 8,
  scheduled: 12,
  completed: 45,
  paymentPending: 6,
  converted: 32,
  notInterested: 7,
};

// Pending outcomes (CRITICAL - Admin must submit)
const pendingOutcomes = [
  { id: 1, student: 'Arjun Patel', coach: 'IM Ramesh Kumar', date: '2026-01-15', daysOverdue: 2 },
  { id: 2, student: 'Sneha Reddy', coach: 'FM Priya Sharma', date: '2026-01-16', daysOverdue: 1 },
  { id: 3, student: 'Aditya Sharma', coach: 'IM Ramesh Kumar', date: '2026-01-17', daysOverdue: 0 },
];

// Payment pending demos
const paymentPendingDemos = [
  { id: 1, student: 'Rohan Kumar', parent: 'Vikram Kumar', amount: '$145', dueDate: '2026-01-20', status: 'interested' },
  { id: 2, student: 'Priya Singh', parent: 'Rajesh Singh', amount: '$96', dueDate: '2026-01-19', status: 'following_up' },
  { id: 3, student: 'Lakshmi Rao', parent: 'Sunita Rao', amount: '$181', dueDate: '2026-01-22', status: 'interested' },
];

// Today's alerts & follow-ups
const alerts = [
  { id: 1, type: 'demo', message: 'Demo in 1 hour: Arjun Patel with IM Ramesh Kumar', time: '10:00 AM', priority: 'high' },
  { id: 2, type: 'followup', message: 'Follow-up payment call: Priya Singh (2 days overdue)', time: 'ASAP', priority: 'urgent' },
  { id: 3, type: 'outcome', message: '3 demo outcomes pending submission', time: 'Today', priority: 'urgent' },
  { id: 4, type: 'subscription', message: 'Subscription renewal: 5 students this week', time: 'This Week', priority: 'medium' },
];

// Conversion stats
const conversionStats = {
  totalDemos: 45,
  attended: 38,
  interested: 28,
  paid: 22,
  attendanceRate: 84,
  conversionRate: 49,
  avgFollowupTime: '4.2 hours',
};

// Admin owners performance
const adminOwners = [
  { id: 1, name: 'Admin A', demosOwned: 25, converted: 15, conversionRate: 60, avgFollowup: '3.5 hrs' },
  { id: 2, name: 'Admin B', demosOwned: 20, converted: 10, conversionRate: 50, avgFollowup: '5.2 hrs' },
];

// Quick stats for top cards
const totalStudents = 156;
const activeCoaches = 8;
const monthlyRevenue = 5420;
const pendingPayments = 6;

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="admin" />
      
      <div className="flex-1">
        <DashboardHeader userName="Admin" userRole="System Owner" />
        
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
          {(pendingOutcomes.length > 0 || paymentPendingDemos.length > 0) && (
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
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{totalStudents}</p>
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
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{activeCoaches}</p>
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
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Monthly Revenue</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">${(monthlyRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-green-600 text-xs sm:text-sm flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% vs last month
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
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Pending Payments</p>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-600">{pendingPayments}</p>
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

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                <p className="text-2xl sm:text-3xl font-bold text-yellow-700">{demoPipeline.pending}</p>
                <p className="text-xs sm:text-sm text-gray-700 mt-1">Pending</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                <p className="text-2xl sm:text-3xl font-bold text-blue-700">{demoPipeline.scheduled}</p>
                <p className="text-xs sm:text-sm text-gray-700 mt-1">Scheduled</p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
                <p className="text-2xl sm:text-3xl font-bold text-purple-700">{demoPipeline.completed}</p>
                <p className="text-xs sm:text-sm text-gray-700 mt-1">Completed</p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                <p className="text-2xl sm:text-3xl font-bold text-orange-700">{demoPipeline.paymentPending}</p>
                <p className="text-xs sm:text-sm text-gray-700 mt-1">Payment Pending</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-2xl sm:text-3xl font-bold text-green-700">{demoPipeline.converted}</p>
                <p className="text-xs sm:text-sm text-gray-700 mt-1">Converted</p>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                <p className="text-2xl sm:text-3xl font-bold text-red-700">{demoPipeline.notInterested}</p>
                <p className="text-xs sm:text-sm text-gray-700 mt-1">Not Interested</p>
              </div>
            </div>
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

              {pendingOutcomes.length > 0 ? (
                <div className="space-y-3">
                  {pendingOutcomes.map(demo => (
                    <div key={demo.id} className="p-3 bg-red-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm text-gray-900 truncate">{demo.student}</p>
                          <p className="text-xs text-gray-600">Coach: {demo.coach}</p>
                          <p className="text-xs text-gray-600">Demo: {new Date(demo.date).toLocaleDateString('en-IN')}</p>
                        </div>
                        {demo.daysOverdue > 0 && (
                          <Badge variant="error" className="flex-shrink-0 ml-2">
                            {demo.daysOverdue}d overdue
                          </Badge>
                        )}
                      </div>
                      <Link href={`/dashboard/admin/demos?highlight=${demo.id}`}>
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

              {paymentPendingDemos.length > 0 ? (
                <div className="space-y-3">
                  {paymentPendingDemos.map(payment => (
                    <div key={payment.id} className="p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm text-gray-900 truncate">{payment.student}</p>
                          <p className="text-xs text-gray-600">Parent: {payment.parent}</p>
                          <p className="text-xs text-gray-600">Due: {new Date(payment.dueDate).toLocaleDateString('en-IN')}</p>
                        </div>
                        <p className="font-bold text-orange-700 flex-shrink-0 ml-2">{payment.amount}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/dashboard/admin/messages?parent=${payment.parent}`} className="flex-1">
                          <Button size="sm" variant="outline" className="w-full text-xs">
                            💬 Follow-up
                          </Button>
                        </Link>
                        <Link href={`/dashboard/admin/payments?id=${payment.id}`} className="flex-1">
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
          <Card className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-heading font-semibold mb-4">Conversion Funnel</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">{conversionStats.totalDemos}</p>
                <p className="text-xs text-gray-600">Booked</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">{conversionStats.attended}</p>
                <p className="text-xs text-gray-600">Attended ({conversionStats.attendanceRate}%)</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-purple-600">{conversionStats.interested}</p>
                <p className="text-xs text-gray-600">Interested</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-8 h-8 text-yellow-600" />
                </div>
                <p className="text-2xl font-bold text-yellow-600">{conversionStats.paid}</p>
                <p className="text-xs text-gray-600">Paid ({conversionStats.conversionRate}%)</p>
              </div>
            </div>
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Avg Follow-up Time: <strong className="text-primary-blue">{conversionStats.avgFollowupTime}</strong>
              </p>
            </div>
          </Card>

          {/* Today's Alerts & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Alerts */}
            <Card>
              <h3 className="text-lg sm:text-xl font-heading font-semibold mb-4">Today's Alerts</h3>
              <div className="space-y-2">
                {alerts.map(alert => (
                  <div 
                    key={alert.id} 
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.priority === 'urgent' 
                        ? 'bg-red-50 border-red-500' 
                        : alert.priority === 'high'
                        ? 'bg-orange-50 border-orange-500'
                        : 'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                      </div>
                      <Badge 
                        variant={alert.priority === 'urgent' ? 'error' : alert.priority === 'high' ? 'warning' : 'info'}
                        className="flex-shrink-0 ml-2 text-xs"
                      >
                        {alert.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-lg sm:text-xl font-heading font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
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
          </div>
        </main>
      </div>
    </div>
  );
}
