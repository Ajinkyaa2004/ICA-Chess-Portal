'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, Search, DollarSign, Download, Pause, Play, XCircle, Eye, FileText } from 'lucide-react';

// Mock subscriptions with control
const initialSubscriptions = [
  { 
    id: 1, 
    student: 'Arjun Patel', 
    parent: 'Vikram Patel',
    amount: 149, 
    plan: 'Premium Chess Coaching', 
    status: 'active', 
    nextBilling: '2026-02-15',
    startDate: '2026-01-15',
    paymentMethod: 'Credit Card (**** 4532)',
    sessionsUsed: 12,
    sessionsTotal: 16,
  },
  { 
    id: 2, 
    student: 'Priya Singh', 
    parent: 'Rajesh Singh',
    amount: 149, 
    plan: 'Premium Chess Coaching', 
    status: 'active', 
    nextBilling: '2026-02-12',
    startDate: '2026-01-12',
    paymentMethod: 'PayPal',
    sessionsUsed: 6,
    sessionsTotal: 8,
  },
  { 
    id: 3, 
    student: 'Rohan Kumar', 
    parent: 'Sunita Kumar',
    amount: 149, 
    plan: 'Premium Chess Coaching', 
    status: 'paused', 
    nextBilling: 'Paused',
    startDate: '2026-01-08',
    paymentMethod: 'Credit Card (**** 1234)',
    sessionsUsed: 4,
    sessionsTotal: 8,
  },
  { 
    id: 4, 
    student: 'Sneha Reddy', 
    parent: 'Anand Reddy',
    amount: 149, 
    plan: 'Premium Chess Coaching', 
    status: 'paused', 
    nextBilling: 'Paused',
    startDate: '2025-12-15',
    paymentMethod: 'Credit Card (**** 5678)',
    sessionsUsed: 10,
    sessionsTotal: 16,
  },
  { 
    id: 5, 
    student: 'Aditya Sharma', 
    parent: 'Meera Sharma',
    amount: 149, 
    plan: 'Premium Chess Coaching', 
    status: 'cancelled', 
    nextBilling: 'Cancelled',
    startDate: '2025-11-20',
    paymentMethod: 'Credit Card (**** 9012)',
    sessionsUsed: 12,
    sessionsTotal: 16,
  },
];

// Mock payment transactions - Updated to match student billing data
const initialTransactions = [
  { id: 1, student: 'Arjun Patel', amount: 149, date: '2026-01-15', method: 'Credit Card (**** 4532)', status: 'completed', type: 'Subscription', invoice: 'INV-2026-001' },
  { id: 2, student: 'Arjun Patel', amount: 149, date: '2025-12-15', method: 'Credit Card (**** 4532)', status: 'completed', type: 'Subscription', invoice: 'INV-2025-012' },
  { id: 3, student: 'Arjun Patel', amount: 149, date: '2025-11-15', method: 'Credit Card (**** 4532)', status: 'completed', type: 'Subscription', invoice: 'INV-2025-011' },
  { id: 4, student: 'Arjun Patel', amount: 149, date: '2025-10-15', method: 'PayPal', status: 'completed', type: 'Subscription', invoice: 'INV-2025-010' },
  { id: 5, student: 'Priya Singh', amount: 149, date: '2026-01-12', method: 'PayPal', status: 'completed', type: 'Subscription', invoice: 'INV-2026-002' },
  { id: 6, student: 'Rohan Kumar', amount: 149, date: '2026-01-08', method: 'Credit Card (**** 1234)', status: 'completed', type: 'Subscription', invoice: 'INV-2026-003' },
  { id: 7, student: 'Sneha Reddy', amount: 149, date: '2025-12-15', method: 'Credit Card (**** 5678)', status: 'completed', type: 'Subscription', invoice: 'INV-2025-013' },
  { id: 8, student: 'Aditya Sharma', amount: 149, date: '2025-11-20', method: 'Credit Card (**** 9012)', status: 'completed', type: 'Subscription', invoice: 'INV-2025-014' },
];

// Mock upcoming payments for all students
const upcomingPayments = [
  { id: 1, student: 'Arjun Patel', amount: 149, date: '2026-02-15', description: 'Premium Chess Coaching - February 2026', status: 'scheduled' },
  { id: 2, student: 'Priya Singh', amount: 149, date: '2026-02-12', description: 'Premium Chess Coaching - February 2026', status: 'scheduled' },
  { id: 3, student: 'Arjun Patel', amount: 149, date: '2026-03-15', description: 'Premium Chess Coaching - March 2026', status: 'scheduled' },
  { id: 4, student: 'Priya Singh', amount: 149, date: '2026-03-12', description: 'Premium Chess Coaching - March 2026', status: 'scheduled' },
];

// Mock coach payments data
const initialCoachPayments = [
  { 
    id: 1, 
    coach: 'Rajesh Gupta', 
    email: 'rajesh@reschess.com',
    monthlyRate: 301, 
    sessionsCompleted: 45,
    ratePerSession: 7,
    totalEarned: 325,
    status: 'paid', 
    paidFor: 'January 2026',
    paidDate: '2026-01-31',
    paymentMethod: 'Bank Transfer',
    joiningDate: '2025-06-15',
    specialization: 'Beginner & Intermediate'
  },
  { 
    id: 2, 
    coach: 'Priya Sharma', 
    email: 'priya@reschess.com',
    monthlyRate: 361, 
    sessionsCompleted: 52,
    ratePerSession: 8,
    totalEarned: 407,
    status: 'pending', 
    paidFor: 'January 2026',
    paidDate: null,
    paymentMethod: 'UPI',
    joiningDate: '2025-03-10',
    specialization: 'Advanced & Tournament Prep'
  },
  { 
    id: 3, 
    coach: 'Amit Kumar', 
    email: 'amit@reschess.com',
    monthlyRate: 265, 
    sessionsCompleted: 38,
    ratePerSession: 7,
    totalEarned: 265,
    status: 'pending', 
    paidFor: 'January 2026',
    paidDate: null,
    paymentMethod: 'Bank Transfer',
    joiningDate: '2025-08-20',
    specialization: 'Kids & Beginners'
  },
  { 
    id: 4, 
    coach: 'Neha Patel', 
    email: 'neha@reschess.com',
    monthlyRate: 337, 
    sessionsCompleted: 41,
    ratePerSession: 7,
    totalEarned: 306,
    status: 'paid', 
    paidFor: 'December 2025',
    paidDate: '2025-12-31',
    paymentMethod: 'UPI',
    joiningDate: '2025-04-05',
    specialization: 'Intermediate & Advanced'
  },
];



export default function AdminPaymentsPage() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [transactions] = useState(initialTransactions);
  const [coachPayments, setCoachPayments] = useState(initialCoachPayments);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [coachDetailsModalOpen, setCoachDetailsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'coaches' | 'billing'>('subscriptions');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<any>(null);
  const [paymentMonth, setPaymentMonth] = useState('');
  const [coachFilterStatus, setCoachFilterStatus] = useState<string>('all');
  const [coachSearchQuery, setCoachSearchQuery] = useState('');

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesStatus = filterStatus === 'all' || sub.status === filterStatus;
    const matchesSearch = 
      sub.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.parent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredCoachPayments = coachPayments.filter(coach => {
    const matchesStatus = coachFilterStatus === 'all' || coach.status === coachFilterStatus;
    const matchesSearch = 
      coach.coach.toLowerCase().includes(coachSearchQuery.toLowerCase()) ||
      coach.email.toLowerCase().includes(coachSearchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handlePauseSubscription = (id: number) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === id ? { ...sub, status: 'paused', nextBilling: 'Paused' } : sub
    ));
  };

  const handleResumeSubscription = (id: number) => {
    const sub = subscriptions.find(s => s.id === id);
    if (sub) {
      const nextBilling = new Date();
      nextBilling.setMonth(nextBilling.getMonth() + 1);
      setSubscriptions(subscriptions.map(s => 
        s.id === id ? { ...s, status: 'active', nextBilling: nextBilling.toISOString().split('T')[0] } : s
      ));
    }
  };

  const handleCancelSubscription = (id: number) => {
    if (confirm('Cancel this subscription? This cannot be undone.')) {
      setSubscriptions(subscriptions.map(sub => 
        sub.id === id ? { ...sub, status: 'cancelled', nextBilling: 'Cancelled' } : sub
      ));
    }
  };

  const handlePayCoach = () => {
    if (!selectedCoach || !paymentMonth) return;
    
    setCoachPayments(coachPayments.map(coach => 
      coach.id === selectedCoach.id ? { 
        ...coach, 
        status: 'paid', 
        paidFor: paymentMonth,
        paidDate: new Date().toISOString().split('T')[0]
      } : coach
    ));
    
    setPaymentModalOpen(false);
    setSelectedCoach(null);
    setPaymentMonth('');
  };

  const handleOpenCoachDetails = (coach: any) => {
    setSelectedCoach(coach);
    setCoachDetailsModalOpen(true);
  };

  const generateMonthOptions = () => {
    const months = [];
    const currentDate = new Date();
    
    // Generate last 3 months and next 3 months
    for (let i = -3; i <= 3; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      months.push(monthYear);
    }
    
    return months;
  };

  const totalRevenue = transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
  const pausedSubscriptions = subscriptions.filter(s => s.status === 'paused').length;
  const pendingCoachPayments = coachPayments.filter(c => c.status === 'pending').length;

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
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-1">Payment & Subscriptions</h1>
                <p className="text-gray-600 text-sm">Control subscriptions, track payments, manage billing</p>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Total Revenue</p>
                <p className="text-xl sm:text-2xl font-bold text-primary-blue">${totalRevenue.toLocaleString()}</p>
              </div>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Active</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{activeSubscriptions}</p>
              </div>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Paused</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">{pausedSubscriptions}</p>
              </div>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">This Month</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">$596</p>
              </div>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-4 sm:mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'subscriptions'
                  ? 'bg-white text-primary-blue shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Student Subscriptions
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'billing'
                  ? 'bg-white text-primary-blue shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Billing Records
            </button>
            <button
              onClick={() => setActiveTab('coaches')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'coaches'
                  ? 'bg-white text-primary-blue shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Coach Payments {pendingCoachPayments > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {pendingCoachPayments}
                </span>
              )}
            </button>
          </div>

          {/* Subscription Management Section */}
          {activeTab === 'subscriptions' && (
            <Card className="mb-4 sm:mb-6">
              <h3 className="text-lg font-semibold text-primary-blue mb-4">Subscription Management</h3>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by student or parent..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Subscriptions Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Student/Parent</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Plan</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Amount</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Status</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Next Billing</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Sessions</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 min-w-[120px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscriptions.map(sub => (
                      <tr key={sub.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-3">
                          <div>
                            <p className="font-semibold text-primary-blue text-sm">{sub.student}</p>
                            <p className="text-xs text-gray-600">Parent: {sub.parent}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <p className="text-sm">{sub.plan}</p>
                          <p className="text-xs text-gray-600">{sub.paymentMethod}</p>
                        </td>
                        <td className="p-3">
                          <p className="text-sm font-medium">${sub.amount}/month</p>
                        </td>
                        <td className="p-3">
                          <Badge 
                            variant={
                              sub.status === 'active' ? 'success' :
                              sub.status === 'paused' ? 'warning' : 'error'
                            }
                          >
                            {sub.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <p className="text-sm">{sub.nextBilling}</p>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[60px]">
                              <div 
                                className="bg-primary-blue rounded-full h-2" 
                                style={{ width: `${(sub.sessionsUsed / sub.sessionsTotal) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 whitespace-nowrap">
                              {sub.sessionsUsed}/{sub.sessionsTotal}
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-col gap-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs px-2 py-1"
                              onClick={() => {
                                setSelectedSubscription(sub);
                                setDetailsModalOpen(true);
                              }}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Details
                            </Button>

                            {sub.status === 'active' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-xs px-2 py-1 text-orange-600 hover:bg-orange-50"
                                onClick={() => handlePauseSubscription(sub.id)}
                              >
                                <Pause className="w-3 h-3 mr-1" />
                                Pause
                              </Button>
                            )}

                            {sub.status === 'paused' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-xs px-2 py-1 text-green-600 hover:bg-green-50"
                                onClick={() => handleResumeSubscription(sub.id)}
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Resume
                              </Button>
                            )}

                            {sub.status !== 'cancelled' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-xs px-2 py-1 text-red-600 hover:bg-red-50"
                                onClick={() => handleCancelSubscription(sub.id)}
                              >
                                <XCircle className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Billing Records Section */}
          {activeTab === 'billing' && (
            <>
              {/* Upcoming Payments */}
              <Card className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-heading font-semibold">Upcoming Payments</h3>
                  <Badge variant="info">{upcomingPayments.length} scheduled</Badge>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 font-semibold text-gray-700">Student</th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-700">Description</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-700">Amount</th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingPayments.map((payment) => (
                        <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-2">
                            <p className="font-medium text-primary-blue">{payment.student}</p>
                          </td>
                          <td className="py-3 px-2">
                            {new Date(payment.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </td>
                          <td className="py-3 px-2">
                            <p className="font-medium">{payment.description}</p>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <span className="font-semibold text-lg">${payment.amount}</span>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <Badge variant="info">Scheduled</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Payment History */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-heading font-semibold">Payment History</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="success">{initialTransactions.length} payments</Badge>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Export All
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 font-semibold text-gray-700">Invoice</th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-700">Student</th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-700">Payment Method</th>
                        <th className="text-right py-3 px-2 font-semibold text-gray-700">Amount</th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-700">Status</th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {initialTransactions.map((payment) => (
                        <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-2">
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="font-mono text-sm">{payment.invoice}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <p className="font-medium text-primary-blue">{payment.student}</p>
                          </td>
                          <td className="py-3 px-2">
                            {new Date(payment.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </td>
                          <td className="py-3 px-2">
                            <span className="text-sm text-gray-600">{payment.method}</span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <span className="font-semibold text-lg">${payment.amount}</span>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <Badge variant="success">Paid</Badge>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center justify-center space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => alert(`Viewing invoice ${payment.invoice}`)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => alert(`Downloading invoice ${payment.invoice}`)}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Revenue (All Time)</span>
                    <span className="font-semibold text-lg">
                      ${initialTransactions.reduce((sum, payment) => sum + payment.amount, 0)}
                    </span>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Coach Payments Section */}
          {activeTab === 'coaches' && (
            <Card className="mb-4 sm:mb-6">
              <h3 className="text-lg font-semibold text-primary-blue mb-4">Coach Payment Management</h3>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by coach name or email..."
                    value={coachSearchQuery}
                    onChange={(e) => setCoachSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                  />
                </div>
                <select
                  value={coachFilterStatus}
                  onChange={(e) => setCoachFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Coach Payments Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Coach Details</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Monthly Rate</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Sessions</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Total Earned</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Payment For</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Status</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700 min-w-[120px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCoachPayments.map(coach => (
                      <tr key={coach.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-3">
                          <div>
                            <p className="font-semibold text-primary-blue text-sm">{coach.coach}</p>
                            <p className="text-xs text-gray-600">{coach.email}</p>
                            <p className="text-xs text-gray-500">{coach.specialization}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <p className="text-sm font-medium">${coach.monthlyRate.toLocaleString()}</p>
                          <p className="text-xs text-gray-600">${coach.ratePerSession}/session</p>
                        </td>
                        <td className="p-3">
                          <p className="text-sm font-medium">{coach.sessionsCompleted}</p>
                          <p className="text-xs text-gray-600">completed</p>
                        </td>
                        <td className="p-3">
                          <p className="text-sm font-medium text-green-600">${coach.totalEarned.toLocaleString()}</p>
                        </td>
                        <td className="p-3">
                          <p className="text-sm">{coach.paidFor}</p>
                          <p className="text-xs text-gray-600">{coach.paymentMethod}</p>
                          {coach.paidDate && (
                            <p className="text-xs text-green-600">Paid: {coach.paidDate}</p>
                          )}
                        </td>
                        <td className="p-3">
                          <Badge 
                            variant={coach.status === 'paid' ? 'success' : 'warning'}
                          >
                            {coach.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-col gap-1">
                            {coach.status === 'pending' && (
                              <Button 
                                size="sm" 
                                className="text-xs px-2 py-1 bg-green-600 hover:bg-green-700"
                                onClick={() => {
                                  setSelectedCoach(coach);
                                  setPaymentMonth(coach.paidFor);
                                  setPaymentModalOpen(true);
                                }}
                              >
                                <DollarSign className="w-3 h-3 mr-1" />
                                Pay Now
                              </Button>
                            )}
                            
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs px-2 py-1"
                              onClick={() => handleOpenCoachDetails(coach)}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Details
                            </Button>

                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs px-2 py-1"                              onClick={() => handleOpenCoachDetails(coach)}                            >
                              <Download className="w-3 h-3 mr-1" />
                              Invoice
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </main>
      </div>

      {/* Details Modal */}
      {detailsModalOpen && selectedSubscription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-lg w-full">
            <h3 className="text-xl font-heading font-bold text-primary-blue mb-4">Subscription Details</h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-600">Student</p>
                  <p className="font-medium">{selectedSubscription.student}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Parent</p>
                  <p className="font-medium">{selectedSubscription.parent}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Plan</p>
                  <p className="font-medium">{selectedSubscription.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-medium">${selectedSubscription.amount}/month</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge 
                    variant={
                      selectedSubscription.status === 'active' ? 'success' :
                      selectedSubscription.status === 'paused' ? 'warning' : 'error'
                    }
                  >
                    {selectedSubscription.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium">{selectedSubscription.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-medium">{selectedSubscription.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Next Billing</p>
                  <p className="font-medium">{selectedSubscription.nextBilling}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Session Usage</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-primary-blue rounded-full h-3" 
                      style={{ width: `${(selectedSubscription.sessionsUsed / selectedSubscription.sessionsTotal) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {selectedSubscription.sessionsUsed}/{selectedSubscription.sessionsTotal}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDetailsModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Coach Details Modal */}
      {coachDetailsModalOpen && selectedCoach && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full">
            <h3 className="text-xl font-heading font-bold text-primary-blue mb-6">Coach Payment Details</h3>
            
            <div className="space-y-6">
              {/* Coach Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Coach Name</p>
                  <p className="font-semibold text-lg text-primary-blue">{selectedCoach.coach}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-medium">{selectedCoach.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Specialization</p>
                  <p className="font-medium">{selectedCoach.specialization}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Joining Date</p>
                  <p className="font-medium">{selectedCoach.joiningDate}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly Rate</p>
                  <p className="font-semibold text-lg">${selectedCoach.monthlyRate.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Rate per Session</p>
                  <p className="font-medium">${selectedCoach.ratePerSession}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Sessions Completed</p>
                  <p className="font-medium">{selectedCoach.sessionsCompleted}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Earned</p>
                  <p className="font-semibold text-lg text-green-600">${selectedCoach.totalEarned.toLocaleString()}</p>
                </div>
              </div>

              {/* Current Payment Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment For</p>
                  <p className="font-medium">{selectedCoach.paidFor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="font-medium">{selectedCoach.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <Badge variant={selectedCoach.status === 'paid' ? 'success' : 'warning'}>
                    {selectedCoach.status === 'paid' ? 'Paid' : 'Pending'}
                  </Badge>
                </div>
                {selectedCoach.paidDate && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Paid Date</p>
                    <p className="font-medium text-green-600">{selectedCoach.paidDate}</p>
                  </div>
                )}
              </div>

              {/* Status Box */}
              {selectedCoach.status === 'paid' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <span className="font-medium">Payment Status:</span> Payment completed on {selectedCoach.paidDate}
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <span className="font-medium">Payment Status:</span> Payment pending for {selectedCoach.paidFor}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setCoachDetailsModalOpen(false);
                  setSelectedCoach(null);
                }}
              >
                Close
              </Button>
              {selectedCoach.status === 'pending' && (
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setCoachDetailsModalOpen(false);
                    setSelectedCoach(selectedCoach);
                    setPaymentMonth(selectedCoach.paidFor);
                    setPaymentModalOpen(true);
                  }}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Pay Now
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Coach Payment Modal */}
      {paymentModalOpen && selectedCoach && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <h3 className="text-xl font-heading font-bold text-primary-blue mb-4">Process Coach Payment</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Coach</p>
                <p className="font-medium text-lg">{selectedCoach.coach}</p>
                <p className="text-sm text-gray-500">{selectedCoach.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-600">Sessions Completed</p>
                  <p className="font-medium">{selectedCoach.sessionsCompleted}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rate per Session</p>
                  <p className="font-medium">${selectedCoach.ratePerSession}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Rate</p>
                  <p className="font-medium">${selectedCoach.monthlyRate.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-medium text-lg text-green-600">${selectedCoach.totalEarned.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Month *
                </label>
                <select
                  value={paymentMonth}
                  onChange={(e) => setPaymentMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                  required
                >
                  <option value="">Select Month</option>
                  {generateMonthOptions().map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Payment Method:</span> {selectedCoach.paymentMethod}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Payment will be processed immediately and coach will be notified.
                </p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setPaymentModalOpen(false);
                  setSelectedCoach(null);
                  setPaymentMonth('');
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={handlePayCoach}
                disabled={!paymentMonth}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Process Payment
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
