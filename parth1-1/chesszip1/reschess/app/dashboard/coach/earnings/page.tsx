'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { DollarSign, TrendingUp, Calendar, Download, ChevronRight, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const earningsData = [
  { month: 'Jan', earnings: 542 },
  { month: 'Feb', earnings: 627 },
  { month: 'Mar', earnings: 578 },
  { month: 'Apr', earnings: 699 },
  { month: 'May', earnings: 747 },
];

const payoutHistory = [
  { 
    id: 1, 
    month: 'January', 
    date: '2026-01-01', 
    amount: 747, 
    status: 'paid',
    breakdown: {
      regularClasses: { count: 35, rate: 18, amount: 632 },
      demos: { count: 4, rate: 24, amount: 96 },
      makeupClasses: { count: 1, rate: 18, amount: 18 }
    }
  },
  { 
    id: 2, 
    month: 'December', 
    date: '2025-12-01', 
    amount: 699, 
    status: 'paid',
    breakdown: {
      regularClasses: { count: 32, rate: 18, amount: 578 },
      demos: { count: 5, rate: 24, amount: 120 },
      makeupClasses: { count: 0, rate: 18, amount: 0 }
    }
  },
  { 
    id: 3, 
    month: 'November', 
    date: '2025-11-01', 
    amount: 614, 
    status: 'paid',
    breakdown: {
      regularClasses: { count: 30, rate: 18, amount: 542 },
      demos: { count: 3, rate: 24, amount: 72 },
      makeupClasses: { count: 0, rate: 18, amount: 0 }
    }
  },
];

export default function CoachEarningsPage() {
  const [selectedPayout, setSelectedPayout] = useState<typeof payoutHistory[0] | null>(null);
  const [showChart, setShowChart] = useState(false);
  const [apiEarnings, setApiEarnings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/coach/earnings').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.earnings) setApiEarnings(json.earnings);
    }).catch(() => {});
  }, []);

  const displayPayouts = apiEarnings?.payouts?.length > 0 ? apiEarnings.payouts : payoutHistory;
  const displayChartData = apiEarnings?.monthlyData?.length > 0 ? apiEarnings.monthlyData : earningsData;
  const currentMonthEarnings = apiEarnings?.currentMonth ?? 747;
  const _totalEarnings = apiEarnings?.total ?? 3193;

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="coach" />
      
      <div className="flex-1">
        <DashboardHeader userName="Coach" userRole="coach" />
        
        <main className="p-6">
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-6">
            Earnings & Payments
          </h1>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">This Month</p>
                  <p className="text-3xl font-bold text-primary-blue">₹{currentMonthEarnings}</p>
                  <p className="text-green-600 text-sm flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Lessons</p>
                  <p className="text-3xl font-bold text-primary-blue">48</p>
                  <p className="text-gray-500 text-sm mt-1">This month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Avg Per Lesson</p>
                  <p className="text-3xl font-bold text-primary-blue">$18</p>
                  <p className="text-gray-500 text-sm mt-1">Standard rate</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Next Payout</p>
                  <p className="text-3xl font-bold text-primary-blue">₹{currentMonthEarnings}</p>
                  <p className="text-gray-500 text-sm mt-1">Feb 1, 2026</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Payout History */}
            <Card className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-heading font-semibold">Payout History</h3>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              <div className="space-y-3">
                {displayPayouts.map((payout: any) => (
                  <div key={payout.id} className="flex items-center justify-between p-4 bg-primary-offwhite rounded-lg hover:bg-gray-50 transition-all">
                    <div className="flex-1">
                      <p className="font-semibold text-base">{payout.month}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(payout.date).toLocaleDateString('en-IN', { 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary-blue">${payout.amount.toLocaleString()}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedPayout(payout)}
                      >
                        View
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Badge variant="success">{payout.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Earnings Chart */}
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-heading font-semibold">Monthly Earnings</h3>
              <Button 
                size="sm" 
                onClick={() => setShowChart(!showChart)}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                {showChart ? 'Hide Chart' : 'View Chart'}
              </Button>
            </div>
            
            {showChart && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={displayChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="earnings" fill="#FC8A24" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
            
            {!showChart && (
              <div className="text-center py-12 text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Click "View Chart" to see your earnings visualization</p>
              </div>
            )}
          </Card>

          {/* Payout Details Modal */}
          {selectedPayout && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-heading font-bold text-primary-blue">{selectedPayout.month} Payout Details</h3>
                  <button
                    onClick={() => setSelectedPayout(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Regular Classes */}
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-800">Regular Classes</p>
                      <Badge variant="info">{selectedPayout.breakdown.regularClasses.count}</Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="text-gray-600">{selectedPayout.breakdown.regularClasses.count} classes × ${selectedPayout.breakdown.regularClasses.rate}</p>
                      <p className="font-semibold text-primary-blue">${selectedPayout.breakdown.regularClasses.amount.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Successful Demos */}
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-800">Successful Demos</p>
                      <Badge variant="success">{selectedPayout.breakdown.demos.count}</Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="text-gray-600">{selectedPayout.breakdown.demos.count} demos × ${selectedPayout.breakdown.demos.rate}</p>
                      <p className="font-semibold text-primary-blue">${selectedPayout.breakdown.demos.amount.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Makeup Classes */}
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-800">Makeup Classes</p>
                      <Badge variant="warning">{selectedPayout.breakdown.makeupClasses.count}</Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="text-gray-600">{selectedPayout.breakdown.makeupClasses.count} classes × ${selectedPayout.breakdown.makeupClasses.rate}</p>
                      <p className="font-semibold text-primary-blue">${selectedPayout.breakdown.makeupClasses.amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-800">Total</p>
                    <p className="text-2xl font-bold text-primary-blue">${selectedPayout.amount.toLocaleString()}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Status: <span className="font-semibold text-green-600 capitalize">{selectedPayout.status}</span></p>
                </div>

                <Button className="w-full mt-6" onClick={() => setSelectedPayout(null)}>
                  Close
                </Button>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
