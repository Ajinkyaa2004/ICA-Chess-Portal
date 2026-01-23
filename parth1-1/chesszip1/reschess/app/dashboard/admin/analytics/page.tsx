'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, TrendingUp, Users, DollarSign, Target, Download, Calendar, BarChart3, PieChart } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month');
  const [metricView, setMetricView] = useState('overview');

  // Mock analytics data
  const coachMetrics = [
    { id: 1, name: 'IM Ramesh Kumar', demos: 12, conversions: 8, conversionRate: 67, totalStudents: 24, oneOnOne: 8, group: 16, avgRating: 4.8, revenue: 2313 },
    { id: 2, name: 'FM Priya Sharma', demos: 10, conversions: 6, conversionRate: 60, totalStudents: 18, oneOnOne: 6, group: 12, avgRating: 4.6, revenue: 1735 },
    { id: 3, name: 'CM Aditya Verma', demos: 8, conversions: 5, conversionRate: 63, totalStudents: 15, oneOnOne: 5, group: 10, avgRating: 4.7, revenue: 1446 },
  ];

  const funnelMetrics = {
    totalDemos: 45,
    attended: 38,
    converted: 26,
    oneOnOneConverted: 12,
    groupConverted: 14,
    notInterested: 8,
    interested: 4,
    avgDemoToPayment: 3.2,
  };

  const revenueMetrics = {
    totalRevenue: 5494,
    oneOnOneRevenue: 2313,
    groupRevenue: 3181,
    avgOneOnOneValue: 96,
    avgGroupValue: 60,
    monthlyRecurring: 2819,
  };

  const adminMetrics = {
    totalStudents: 57,
    activeSubscriptions: 52,
    pausedSubscriptions: 3,
    totalCoaches: 12,
    activeCoaches: 10,
    totalBatches: 8,
    avgStudentsPerBatch: 7,
    totalDemosThisMonth: 18,
    pendingOutcomes: 3,
  };

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="admin" />
      
      <div className="flex-1">
        <DashboardHeader userName="Admin" userRole="System Owner" />
        
        <main className="p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <Link href="/dashboard/admin">
              <Button variant="ghost" size="sm" className="mb-3">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-1">Analytics & Reports</h1>
                <p className="text-gray-600 text-sm">Coach metrics, admin metrics, funnel analysis (1-1/group split)</p>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                >
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                </select>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Metric View Tabs */}
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            <button
              onClick={() => setMetricView('overview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                metricView === 'overview'
                  ? 'bg-primary-blue text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setMetricView('funnel')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                metricView === 'funnel'
                  ? 'bg-primary-blue text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Target className="w-4 h-4 inline mr-2" />
              Conversion Funnel
            </button>
            <button
              onClick={() => setMetricView('coaches')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                metricView === 'coaches'
                  ? 'bg-primary-blue text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Coach Performance
            </button>
            <button
              onClick={() => setMetricView('revenue')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                metricView === 'revenue'
                  ? 'bg-primary-blue text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <DollarSign className="w-4 h-4 inline mr-2" />
              Revenue Analysis
            </button>
          </div>

          {/* Overview Metrics */}
          {metricView === 'overview' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Key Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <Card>
                  <div className="text-center">
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">Total Students</p>
                    <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{adminMetrics.totalStudents}</p>
                    <p className="text-xs text-green-600 mt-1">+12 this month</p>
                  </div>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <div className="text-center">
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">Active Subs</p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-600">{adminMetrics.activeSubscriptions}</p>
                    <p className="text-xs text-gray-600 mt-1">91% retention</p>
                  </div>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <div className="text-center">
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">Total Revenue</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">${(revenueMetrics.totalRevenue / 1000).toFixed(1)}K</p>
                    <p className="text-xs text-gray-600 mt-1">MRR: ${(revenueMetrics.monthlyRecurring / 1000).toFixed(1)}K</p>
                  </div>
                </Card>
                <Card className="bg-orange-50 border-orange-200">
                  <div className="text-center">
                    <p className="text-gray-600 text-xs sm:text-sm mb-1">Conv. Rate</p>
                    <p className="text-2xl sm:text-3xl font-bold text-orange-600">{Math.round((funnelMetrics.converted / funnelMetrics.totalDemos) * 100)}%</p>
                    <p className="text-xs text-gray-600 mt-1">{funnelMetrics.converted}/{funnelMetrics.totalDemos} demos</p>
                  </div>
                </Card>
              </div>

              {/* Admin System Metrics */}
              <Card>
                <h3 className="text-lg font-semibold text-primary-blue mb-4">System Overview</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Active Coaches</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{adminMetrics.activeCoaches}/{adminMetrics.totalCoaches}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Batches</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{adminMetrics.totalBatches}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Avg/Batch</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{adminMetrics.avgStudentsPerBatch}</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Pending Outcomes</p>
                    <p className="text-xl sm:text-2xl font-bold text-red-600">{adminMetrics.pendingOutcomes}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Conversion Funnel */}
          {metricView === 'funnel' && (
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-primary-blue mb-4">Demo → Payment Conversion Funnel</h3>
                
                {/* Funnel Visualization */}
                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <div className="h-16 bg-blue-100 rounded-lg flex items-center px-4">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Total Demos Scheduled</p>
                        <p className="text-sm text-gray-600">{funnelMetrics.totalDemos} demos</p>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{funnelMetrics.totalDemos}</p>
                    </div>
                  </div>

                  <div className="relative ml-4 sm:ml-8">
                    <div className="h-14 bg-blue-200 rounded-lg flex items-center px-4" style={{ width: `${(funnelMetrics.attended / funnelMetrics.totalDemos) * 100}%` }}>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Attended Demos</p>
                        <p className="text-sm text-gray-600">{Math.round((funnelMetrics.attended / funnelMetrics.totalDemos) * 100)}% attendance</p>
                      </div>
                      <p className="text-xl font-bold text-blue-700">{funnelMetrics.attended}</p>
                    </div>
                  </div>

                  <div className="relative ml-8 sm:ml-16">
                    <div className="h-12 bg-green-200 rounded-lg flex items-center px-4" style={{ width: `${(funnelMetrics.converted / funnelMetrics.totalDemos) * 100}%` }}>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Converted to Payment</p>
                        <p className="text-sm text-gray-600">{Math.round((funnelMetrics.converted / funnelMetrics.totalDemos) * 100)}% conversion</p>
                      </div>
                      <p className="text-xl font-bold text-green-700">{funnelMetrics.converted}</p>
                    </div>
                  </div>
                </div>

                {/* 1-1 vs Group Split */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border-2 border-purple-200 bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-3">1-1 Sessions</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700">Converted:</span>
                        <span className="font-bold text-purple-600">{funnelMetrics.oneOnOneConverted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700">Avg. Value:</span>
                        <span className="font-bold text-purple-600">${revenueMetrics.avgOneOnOneValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700">Total Revenue:</span>
                        <span className="font-bold text-purple-600">${(revenueMetrics.oneOnOneRevenue / 1000).toFixed(1)}K</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-3">Group Classes</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700">Converted:</span>
                        <span className="font-bold text-blue-600">{funnelMetrics.groupConverted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700">Avg. Value:</span>
                        <span className="font-bold text-blue-600">${revenueMetrics.avgGroupValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700">Total Revenue:</span>
                        <span className="font-bold text-blue-600">${(revenueMetrics.groupRevenue / 1000).toFixed(1)}K</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Avg. Demo to Payment:</strong> {funnelMetrics.avgDemoToPayment} days • 
                    <strong className="ml-2">Not Interested:</strong> {funnelMetrics.notInterested} • 
                    <strong className="ml-2">Still Interested:</strong> {funnelMetrics.interested}
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Coach Performance */}
          {metricView === 'coaches' && (
            <div className="space-y-4">
              <Card>
                <h3 className="text-lg font-semibold text-primary-blue mb-4">Coach Performance Metrics</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Coach</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Demos</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Conv. Rate</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Students</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">1-1 / Group</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Rating</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coachMetrics.map(coach => (
                        <tr key={coach.id} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="px-3 py-3 text-sm font-medium text-gray-900">{coach.name}</td>
                          <td className="px-3 py-3 text-sm text-gray-700">
                            {coach.demos} <span className="text-green-600">({coach.conversions} ✓)</span>
                          </td>
                          <td className="px-3 py-3">
                            <Badge variant={coach.conversionRate >= 65 ? 'success' : coach.conversionRate >= 60 ? 'warning' : 'error'}>
                              {coach.conversionRate}%
                            </Badge>
                          </td>
                          <td className="px-3 py-3 text-sm font-semibold text-primary-blue">{coach.totalStudents}</td>
                          <td className="px-3 py-3 text-sm text-gray-700">{coach.oneOnOne} / {coach.group}</td>
                          <td className="px-3 py-3 text-sm">
                            <span className="text-yellow-600">★ {coach.avgRating}</span>
                          </td>
                          <td className="px-3 py-3 text-sm font-semibold text-green-600">${(coach.revenue / 1000).toFixed(1)}K</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* Revenue Analysis */}
          {metricView === 'revenue' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <Card>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-primary-blue">${(revenueMetrics.totalRevenue / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-green-600 mt-1">+18% vs last month</p>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <p className="text-sm text-gray-600 mb-1">1-1 Revenue</p>
                  <p className="text-2xl font-bold text-purple-600">${(revenueMetrics.oneOnOneRevenue / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-gray-600 mt-1">{Math.round((revenueMetrics.oneOnOneRevenue / revenueMetrics.totalRevenue) * 100)}% of total</p>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Group Revenue</p>
                  <p className="text-2xl font-bold text-blue-600">${(revenueMetrics.groupRevenue / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-gray-600 mt-1">{Math.round((revenueMetrics.groupRevenue / revenueMetrics.totalRevenue) * 100)}% of total</p>
                </Card>
              </div>

              <Card>
                <h3 className="text-lg font-semibold text-primary-blue mb-4">Revenue Breakdown (1-1 vs Group)</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">By Student Type</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">1-1 Sessions</span>
                          <span className="text-sm font-semibold">${(revenueMetrics.oneOnOneRevenue / 1000).toFixed(1)}K</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full">
                          <div 
                            className="h-3 bg-purple-500 rounded-full"
                            style={{ width: `${(revenueMetrics.oneOnOneRevenue / revenueMetrics.totalRevenue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Group Classes</span>
                          <span className="text-sm font-semibold">${(revenueMetrics.groupRevenue / 1000).toFixed(1)}K</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full">
                          <div 
                            className="h-3 bg-blue-500 rounded-full"
                            style={{ width: `${(revenueMetrics.groupRevenue / revenueMetrics.totalRevenue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Average Values</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                        <span className="text-sm text-gray-700">Avg 1-1 Value</span>
                        <span className="font-bold text-purple-600">${revenueMetrics.avgOneOnOneValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm text-gray-700">Avg Group Value</span>
                        <span className="font-bold text-blue-600">${revenueMetrics.avgGroupValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm text-gray-700">Monthly Recurring</span>
                        <span className="font-bold text-green-600">${(revenueMetrics.monthlyRecurring / 1000).toFixed(1)}K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
