'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Toast, { ToastType } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setToast({ message: data.error || 'Login failed', type: 'error' });
        setIsLoading(false);
        return;
      }

      setToast({ message: 'Login successful!', type: 'success' });

      // Redirect based on role
      const dashboardMap: Record<string, string> = {
        ADMIN: '/dashboard/admin',
        COACH: '/dashboard/coach',
        CUSTOMER: '/dashboard/student',
      };

      const dashboard = dashboardMap[data.user.role] || '/dashboard/student';

      setTimeout(() => {
        router.push(dashboard);
      }, 500);
    } catch {
      setToast({ message: 'Network error. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
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
          <Image 
            src="/imgs.png" 
            alt="Indian Chess Academy" 
            className="mx-auto w-20 h-20 mb-4 object-contain"
          width={80} height={80} />
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your ICA account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="w-4 h-4 text-primary-orange border-gray-300 rounded focus:ring-primary-orange"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>

            <Link href="/auth/forgot-password" className="text-sm text-primary-orange hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New to ICA?{' '}
            <Link href="/booking/demo" className="text-primary-orange font-semibold hover:underline">
              Book a free demo
            </Link>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3 text-center">Test Accounts</p>
          <div className="space-y-2 text-xs">
            <div className="p-2 bg-orange-50 rounded border border-orange-200">
              <p className="font-semibold text-orange-900">Admin: admin@ica.com</p>
              <p className="text-orange-700">Password: Admin@1234</p>
            </div>
            <div className="p-2 bg-purple-50 rounded border border-purple-200">
              <p className="font-semibold text-purple-900">Coach: coach@ica.com</p>
              <p className="text-purple-700">Password: Coach@1234</p>
            </div>
            <div className="p-2 bg-blue-50 rounded border border-blue-200">
              <p className="font-semibold text-blue-900">Student: student@ica.com</p>
              <p className="text-blue-700">Password: Student@1234</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
