'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push('/booking/demo');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-blue to-primary-olive py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <Image 
            src="/imgs.png" 
            alt="Indian Chess Academy" 
            className="mx-auto w-20 h-20 mb-4 object-contain"
          width={80} height={80} />
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-4">
            Welcome to ICA! 👋
          </h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-4">
              Accounts are created automatically when you <strong className="text-primary-blue">book your free demo session</strong>.
            </p>
            <div className="space-y-2 text-sm text-gray-600 text-left">
              <p className="flex items-start">
                <span className="text-primary-orange font-bold mr-2">1.</span>
                Book a free demo session
              </p>
              <p className="flex items-start">
                <span className="text-primary-orange font-bold mr-2">2.</span>
                Your account is created instantly
              </p>
              <p className="flex items-start">
                <span className="text-primary-orange font-bold mr-2">3.</span>
                Choose login method (Magic Link or Password)
              </p>
              <p className="flex items-start">
                <span className="text-primary-orange font-bold mr-2">4.</span>
                Access your demo dashboard
              </p>
            </div>
          </div>

          <Button 
            onClick={() => router.push('/booking/demo')}
            className="w-full mb-4"
          >
            Book Free Demo & Create Account
          </Button>

          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => router.push('/auth/login')}
              className="text-primary-orange font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Redirecting to demo booking in <span className="font-semibold text-primary-orange">3 seconds</span>...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
