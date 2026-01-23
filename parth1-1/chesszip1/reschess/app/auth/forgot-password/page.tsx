'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Toast, { ToastType } from '@/components/ui/Toast';
import { Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      setToast({ message: 'Password reset link sent to your email', type: 'success' });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-blue to-primary-olive py-12 px-4 sm:px-6 lg:px-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-orange bg-opacity-10 rounded-full mb-4">
            <Mail className="w-8 h-8 text-primary-orange" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            {emailSent
              ? 'Check your email for reset instructions'
              : 'Enter your email to receive a password reset link'}
          </p>
        </div>

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>
            <Button onClick={() => setEmailSent(false)} variant="outline" className="w-full">
              Try Another Email
            </Button>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/auth/login" className="text-sm text-primary-orange hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
