'use client';

import { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import {
  CreditCard,
  Download,
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  Eye,
  Loader2,
  AlertCircle,
  IndianRupee,
} from 'lucide-react';

// Razorpay type declaration
declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      close: () => void;
    };
  }
}

// Mock data fallbacks
const fallbackPlan = {
  name: 'Premium Chess Coaching',
  price: 149,
  billingCycle: 'monthly',
  nextPayment: '2026-02-15',
  status: 'active'
};

const fallbackHistory = [
  {
    id: 'INV-2026-001',
    date: '2026-01-15',
    amount: 149,
    description: 'Premium Chess Coaching - January 2026',
    status: 'paid',
    method: 'Credit Card (**** 4532)',
  },
  {
    id: 'INV-2025-012',
    date: '2025-12-15',
    amount: 149,
    description: 'Premium Chess Coaching - December 2025',
    status: 'paid',
    method: 'Credit Card (**** 4532)',
  },
  {
    id: 'INV-2025-011',
    date: '2025-11-15',
    amount: 149,
    description: 'Premium Chess Coaching - November 2025',
    status: 'paid',
    method: 'Credit Card (**** 4532)',
  },
  {
    id: 'INV-2025-010',
    date: '2025-10-15',
    amount: 149,
    description: 'Premium Chess Coaching - October 2025',
    status: 'paid',
    method: 'PayPal',
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
  const [billing, setBilling] = useState<any>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch user info for Razorpay prefill
  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (json?.user) setUser({ name: json.user.name, email: json.user.email });
      })
      .catch(() => {});
  }, []);

  // Fetch billing data
  const fetchBilling = useCallback(() => {
    fetch('/api/customer/billing', { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (json?.billing) setBilling(json.billing);
      })
      .catch(() => {});
  }, []);

  useEffect(() => { fetchBilling(); }, [fetchBilling]);

  const displayPlan = billing?.subscription ?? fallbackPlan;
  const displayHistory = billing?.payments?.length > 0
    ? billing.payments.map((p: any) => ({
        id: p._id, date: p.paidAt?.split('T')[0] || p.createdAt?.split('T')[0] || '',
        amount: p.amount, description: p.description || 'Chess Coaching',
        status: p.status === 'SUCCESS' ? 'paid' : p.status?.toLowerCase() || 'paid',
        method: 'Razorpay',
      }))
    : fallbackHistory;

  // ─── Razorpay Payment Handler ───────────────────────────────────
  const handleRazorpayPayment = async (amount: number, desc: string, subscriptionId?: string) => {
    setPaymentLoading(true);
    setPaymentMessage(null);

    try {
      // Step 1: Create order on backend
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          amount,
          description: desc,
          plan: 'monthly',
          ...(subscriptionId ? { subscriptionId } : {}),
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // Step 2: Load Razorpay checkout script if not already loaded
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Razorpay checkout'));
          document.body.appendChild(script);
        });
      }

      // Step 3: Open Razorpay checkout modal
      const options = {
        key: orderData.data.key,
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: 'Indian Chess Academy',
        description: desc,
        image: '/logo.png',
        order_id: orderData.data.orderId,
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#FC8A24', // ICA brand orange
        },
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          // Step 4: Verify payment on backend
          try {
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify(response),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              setPaymentMessage({ type: 'success', text: 'Payment successful! Your subscription is now active.' });
              fetchBilling(); // Refresh billing data
            } else {
              setPaymentMessage({ type: 'error', text: verifyData.error || 'Payment verification failed' });
            }
          } catch {
            setPaymentMessage({ type: 'error', text: 'Payment verification failed. Please contact support.' });
          }
          setPaymentLoading(false);
        },
        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
            setPaymentMessage({ type: 'error', text: 'Payment cancelled.' });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setPaymentMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Payment failed. Please try again.',
      });
      setPaymentLoading(false);
    }
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log(`Downloading invoice: ${invoiceId}`);
    alert(`Invoice ${invoiceId} downloaded successfully!`);
  };

  const handleViewInvoice = (invoiceId: string) => {
    setSelectedInvoice(invoiceId);
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
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="error">Failed</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="customer" />

      <div className="flex-1">
        <DashboardHeader userName="Student" userRole="customer" />

        <main className="p-3 sm:p-4 lg:p-6">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-4 sm:mb-6">
            Billing & Payments
          </h1>

          {/* Payment Message Toast */}
          {paymentMessage && (
            <div className={`mb-4 p-4 rounded-lg flex items-center gap-3 ${
              paymentMessage.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {paymentMessage.type === 'success'
                ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                : <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              }
              <p className="text-sm font-medium">{paymentMessage.text}</p>
              <button
                onClick={() => setPaymentMessage(null)}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          )}

          {/* Current Plan Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <Card className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-heading font-semibold mb-2">Current Plan</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{displayPlan.name}</p>
                  <p className="text-gray-600 mt-1">
                    ₹{displayPlan.price}/{displayPlan.billingCycle}
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
                    <p className="font-semibold">{formatDate(displayPlan.nextPayment)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="font-semibold text-lg">₹{displayPlan.price}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-heading font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleRazorpayPayment(
                    displayPlan.price,
                    `${displayPlan.name} - Monthly Subscription`
                  )}
                  disabled={paymentLoading}
                >
                  {paymentLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <IndianRupee className="w-4 h-4 mr-2" />
                      Make Payment
                    </>
                  )}
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
                        <span className="font-semibold text-lg">₹{payment.amount}</span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          disabled={paymentLoading}
                          onClick={() => handleRazorpayPayment(
                            payment.amount,
                            payment.description
                          )}
                        >
                          {paymentLoading ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <>
                              <DollarSign className="w-3 h-3 mr-1" />
                              Pay Now
                            </>
                          )}
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
                <Badge variant="success">{displayHistory.length} payments</Badge>
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
                  {displayHistory.map((payment: any) => (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="font-mono text-sm">{typeof payment.id === 'string' && payment.id.length > 10 ? payment.id.slice(-8) : payment.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        {payment.date ? formatDate(payment.date) : '—'}
                      </td>
                      <td className="py-3 px-2">
                        <p className="font-medium">{payment.description}</p>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-sm text-gray-600">{payment.method}</span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <span className="font-semibold text-lg">₹{payment.amount}</span>
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
                  ₹{displayHistory.reduce((sum: number, payment: any) => sum + (payment.amount || 0), 0)}
                </span>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
