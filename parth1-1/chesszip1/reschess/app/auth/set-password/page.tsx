'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Toast, { ToastType } from '@/components/ui/Toast';
import { CheckCircle, AlertCircle } from 'lucide-react';

function SetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  // Extract token and email from URL
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    // Validate token on mount
    if (!token || !email) {
      setTokenValid(false);
      return;
    }

    // Simulate token validation
    setTimeout(() => {
      setTokenValid(true);
    }, 500);
  }, [token, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setToast({ message: 'Password must be at least 8 characters', type: 'error' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setToast({ message: 'Passwords do not match', type: 'error' });
      return;
    }

    setIsLoading(true);

    // Simulate API call to set password
    setTimeout(() => {
      setIsLoading(false);
      setToast({ message: 'Password set successfully! Redirecting to login...', type: 'success' });
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    }, 1500);
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 2, label: 'Fair', color: 'bg-yellow-500' };
    if (password.length < 12) return { strength: 3, label: 'Good', color: 'bg-blue-500' };
    return { strength: 4, label: 'Strong', color: 'bg-green-600' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (tokenValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-blue to-primary-olive">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4">Validating link...</p>
        </div>
      </div>
    );
  }

  if (tokenValid === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-blue to-primary-olive py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
              Invalid or Expired Link
            </h1>
            <p className="text-gray-600 mb-6">
              This password setup link is invalid or has expired. Please request a new one.
            </p>
            <Button onClick={() => router.push('/booking/demo')} className="w-full">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
          <img 
            src="/imgs.png" 
            alt="Indian Chess Academy" 
            className="mx-auto w-20 h-20 mb-4 object-contain"
          />
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-2">
            Set Your Password
          </h1>
          <p className="text-gray-600">
            Create a secure password for <strong className="text-primary-blue">{email}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Create Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Password strength:</span>
                <span className={`text-sm font-semibold ${
                  passwordStrength.strength <= 2 ? 'text-red-600' : 
                  passwordStrength.strength === 3 ? 'text-blue-600' : 
                  'text-green-600'
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />

          {formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              Passwords do not match
            </p>
          )}

          {formData.confirmPassword && formData.password === formData.confirmPassword && (
            <p className="text-sm text-green-600 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Passwords match
            </p>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 mb-2">Password Requirements:</p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li className="flex items-center">
                <span className={`mr-2 ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                  {formData.password.length >= 8 ? '✓' : '○'}
                </span>
                At least 8 characters
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                  {/[A-Z]/.test(formData.password) ? '✓' : '○'}
                </span>
                One uppercase letter (recommended)
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>
                  {/[0-9]/.test(formData.password) ? '✓' : '○'}
                </span>
                One number (recommended)
              </li>
            </ul>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            isLoading={isLoading}
            disabled={formData.password.length < 8 || formData.password !== formData.confirmPassword}
          >
            Set Password & Continue
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have a password?{' '}
            <button 
              onClick={() => router.push('/auth/login')}
              className="text-primary-orange font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SetPasswordContent />
    </Suspense>
  );
}
