'use client';

import { useState } from 'react';

interface RazorpayCheckoutProps {
  subscriptionId: string;
  amount: number;
  planName: string;
  userName: string;
  userEmail: string;
  onSuccess: (paymentId: string) => void;
  onFailure: (error: string) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      close: () => void;
    };
  }
}

export default function RazorpayCheckout({
  subscriptionId,
  amount,
  planName,
  userName,
  userEmail,
  onSuccess,
  onFailure,
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Create order
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          subscriptionId,
          amount,
          description: `${planName} subscription`,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Load Razorpay script if not loaded
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Razorpay'));
          document.body.appendChild(script);
        });
      }

      // Open Razorpay checkout
      const options = {
        key: orderData.data.key,
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: 'Indian Chess Academy',
        description: `${planName} Subscription`,
        order_id: orderData.data.orderId,
        prefill: {
          name: userName,
          email: userEmail,
        },
        theme: {
          color: '#FC8A24',
        },
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          // Verify payment
          const verifyRes = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok) {
            onSuccess(verifyData.data.paymentId);
          } else {
            onFailure(verifyData.error || 'Payment verification failed');
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      onFailure(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="btn-primary w-full"
    >
      {loading ? 'Processing...' : `Pay ₹${amount.toLocaleString('en-IN')}`}
    </button>
  );
}
