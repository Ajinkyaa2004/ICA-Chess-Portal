'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  DollarSign, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';

// Mock data for billing information
const currentPlan = {
  name: 'Premium Chess Coaching',
  price: 149,
  billingCycle: 'monthly',
  nextPayment: '2026-02-15',
  status: 'active'
};

const paymentHistory = [
  {
    id: 'INV-2026-001',
    date: '2026-01-15',
    amount: 149,
    description: 'Premium Chess Coaching - January 2026',
    status: 'paid',
    method: 'Credit Card (**** 4532)',
    downloadUrl: '#'
  },
  {
    id: 'INV-2025-012',
    date: '2025-12-15',
    amount: 149,
    description: 'Premium Chess Coaching - December 2025',
    status: 'paid',
    method: 'Credit Card (**** 4532)',
    downloadUrl: '#'
  },
  {
    id: 'INV-2025-011',
    date: '2025-11-15',
    amount: 149,
    description: 'Premium Chess Coaching - November 2025',
    status: 'paid',
    method: 'Credit Card (**** 4532)',
    downloadUrl: '#'
  },
  {
    id: 'INV-2025-010',
    date: '2025-10-15',
    amount: 149,
    description: 'Premium Chess Coaching - October 2025',
    status: 'paid',
    method: 'PayPal',
    downloadUrl: '#'
  }
];

const upcomingPayments = [
  {
    id: 'UP-2026-002',
    date: '2026-02-15',
    amount: 149,
    description: 'Premium Chess Coaching - February 2026',
    status: 'scheduled'
  },
  {
    id: 'UP-2026-003',
    date: '2026-03-15',
    amount: 149,
    description: 'Premium Chess Coaching - March 2026',
    status: 'scheduled'
  }
];

export default function StudentBillingPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  const handleDownloadInvoice = (invoiceId: string) => {
    // Mock download functionality
    console.log(`Downloading invoice: ${invoiceId}`);
    alert(`Invoice ${invoiceId} downloaded successfully!`);
  };

  const handleViewInvoice = (invoiceId: string) => {
    setSelectedInvoice(invoiceId);
    // In a real app, this would open a modal or navigate to invoice details
    alert(`Viewing invoice details for ${invoiceId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Paid</Badge>;
      case 'scheduled':
        return <Badge variant="info">Scheduled</Badge>;
      case 'overdue':
        return <Badge variant="error">Overdue</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="student" />
      
      <div className="flex-1">
        <DashboardHeader userName="Arjun Patel" userRole="Student" />
        
        <main className="p-3 sm:p-4 lg:p-6">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-4 sm:mb-6">
            Billing & Payments
          </h1>

          {/* Current Plan Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <Card className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-heading font-semibold mb-2">Current Plan</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{currentPlan.name}</p>
                  <p className="text-gray-600 mt-1">
                    ${currentPlan.price}/{currentPlan.billingCycle}
                  </p>
                </div>
                <Badge variant="success" className="flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
              
              <div className="bg-primary-offwhite rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Next Payment</p>
                    <p className="font-semibold">{formatDate(currentPlan.nextPayment)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="font-semibold text-lg">${currentPlan.price}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-heading font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Make Payment
                </Button>
                <Button variant="outline" className="w-full">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Update Payment Method
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Download All Invoices
                </Button>
              </div>
            </Card>
          </div>

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
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Description</th>
                    <th className="text-right py-3 px-2 font-semibold text-gray-700">Amount</th>
                    <th className="text-center py-3 px-2 font-semibold text-gray-700">Status</th>
                    <th className="text-center py-3 px-2 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          {formatDate(payment.date)}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-sm text-gray-600">ID: {payment.id}</p>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <span className="font-semibold text-lg">${payment.amount}</span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => alert(`Processing payment of $${payment.amount} for ${payment.description}`)}
                        >
                          <DollarSign className="w-3 h-3 mr-1" />
                          Pay Now
                        </Button>
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
                <Badge variant="success">{paymentHistory.length} payments</Badge>
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
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Description</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Payment Method</th>
                    <th className="text-right py-3 px-2 font-semibold text-gray-700">Amount</th>
                    <th className="text-center py-3 px-2 font-semibold text-gray-700">Status</th>
                    <th className="text-center py-3 px-2 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="font-mono text-sm">{payment.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        {formatDate(payment.date)}
                      </td>
                      <td className="py-3 px-2">
                        <p className="font-medium">{payment.description}</p>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-sm text-gray-600">{payment.method}</span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <span className="font-semibold text-lg">${payment.amount}</span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewInvoice(payment.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownloadInvoice(payment.id)}
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
                <span className="text-gray-600">Total Paid (Last 4 months)</span>
                <span className="font-semibold text-lg">
                  ${paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)}
                </span>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}