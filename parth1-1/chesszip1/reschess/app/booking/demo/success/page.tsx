'use client';

import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CheckCircle, Calendar, Mail, Phone, User, LogIn } from 'lucide-react';

export default function DemoSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-primary-offwhite py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-4">
            Account Created & Demo Booked! 🎉
          </h1>

          <p className="text-gray-600 mb-8">
            Your account has been created and your free demo lesson is scheduled. 
            Check your email for login instructions.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <User className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-semibold text-green-900 mb-2">Your Account is Ready</h3>
                <p className="text-sm text-green-700">
                  We've created your account with <strong>CUSTOMER</strong> role. 
                  You can now log in to access your demo dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary-offwhite rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-lg mb-4">Demo Session Details</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-primary-orange mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-gray-600">January 20, 2026 at 10:00 AM IST</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-primary-orange mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Login Link Sent</p>
                  <p className="text-gray-600">Check your email for magic link or password setup instructions</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-primary-orange mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Reminder</p>
                  <p className="text-gray-600">You'll receive a demo link 15 minutes before the session</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h4 className="font-semibold text-blue-900 mb-2">What Happens Next?</h4>
            <ol className="text-sm text-blue-800 text-left space-y-2">
              <li className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <span>Log in to your account using the email link or password</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <span>Access your customer dashboard (demo-only access)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <span>Attend your scheduled demo session</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">4.</span>
                <span>Subscribe to a plan to unlock full access (student account + all features)</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline"
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
            <Button onClick={() => router.push('/auth/login')}>
              <LogIn className="w-5 h-5 mr-2" />
              Log In Now
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> Your account has limited access until you complete payment. 
              After subscribing, a student record will be created and full features will be unlocked.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
