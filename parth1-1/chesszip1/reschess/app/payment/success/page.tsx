'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CheckCircle, Loader, Sparkles, Users, BookOpen, MessageSquare, TrendingUp } from 'lucide-react';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Simulate student creation process
    const timer1 = setTimeout(() => setStep(2), 1500);
    const timer2 = setTimeout(() => setStep(3), 3000);
    const timer3 = setTimeout(() => setStep(4), 4500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-primary-offwhite py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="text-center">
          {step < 4 ? (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 animate-pulse">
                <Loader className="w-12 h-12 text-primary-blue animate-spin" />
              </div>

              <h1 className="text-3xl font-heading font-bold text-primary-blue mb-4">
                Setting Up Your Account...
              </h1>

              <p className="text-gray-600 mb-8">
                Payment successful! We're creating your student profile and unlocking all features.
              </p>

              <div className="bg-primary-offwhite rounded-lg p-6 mb-8">
                <div className="space-y-4">
                  <div className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                    step >= 1 ? 'bg-green-50 border border-green-200' : 'bg-white border border-gray-200'
                  }`}>
                    {step >= 1 ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                    )}
                    <div className="text-left flex-1">
                      <p className="font-semibold text-gray-900">Payment Confirmed</p>
                      <p className="text-sm text-gray-600">Transaction completed successfully</p>
                    </div>
                  </div>

                  <div className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                    step >= 2 ? 'bg-green-50 border border-green-200' : 'bg-white border border-gray-200'
                  }`}>
                    {step >= 2 ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
                    )}
                    <div className="text-left flex-1">
                      <p className="font-semibold text-gray-900">Creating Student Profile</p>
                      <p className="text-sm text-gray-600">Setting up student data in database</p>
                    </div>
                  </div>

                  <div className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                    step >= 3 ? 'bg-green-50 border border-green-200' : 'bg-white border border-gray-200'
                  }`}>
                    {step >= 3 ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                    )}
                    <div className="text-left flex-1">
                      <p className="font-semibold text-gray-900">Linking to Your Account</p>
                      <p className="text-sm text-gray-600">Connecting student to parent account</p>
                    </div>
                  </div>

                  <div className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                    step >= 4 ? 'bg-green-50 border border-green-200' : 'bg-white border border-gray-200'
                  }`}>
                    {step >= 4 ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                    )}
                    <div className="text-left flex-1">
                      <p className="font-semibold text-gray-900">Unlocking Full Access</p>
                      <p className="text-sm text-gray-600">Enabling all features and permissions</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <h1 className="text-3xl font-heading font-bold text-primary-blue mb-4">
                Welcome to Your Chess Journey! 🎉
              </h1>

              <p className="text-gray-600 mb-8">
                Your student profile is created and full access is now unlocked. 
                Time to start learning!
              </p>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
                <div className="flex items-start space-x-3 mb-4">
                  <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <h3 className="font-semibold text-green-900 mb-2">Full Access Unlocked!</h3>
                    <p className="text-sm text-green-700">
                      Your account now has access to all features including live classes, 
                      batch sessions, progress tracking, and more.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-left">
                  <Users className="w-8 h-8 text-primary-orange mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-1">Join Batches</h4>
                  <p className="text-sm text-gray-600">Access group sessions with your coach</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 text-left">
                  <BookOpen className="w-8 h-8 text-primary-blue mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-1">Study Materials</h4>
                  <p className="text-sm text-gray-600">Download resources and practice problems</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 text-left">
                  <MessageSquare className="w-8 h-8 text-green-600 mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-1">Coach Chat</h4>
                  <p className="text-sm text-gray-600">Direct messaging with your instructor</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 text-left">
                  <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-1">Progress Tracking</h4>
                  <p className="text-sm text-gray-600">Monitor rating growth and skill development</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <h4 className="font-semibold text-blue-900 mb-2">Your Next Steps</h4>
                <ol className="text-sm text-blue-800 text-left space-y-2">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">1.</span>
                    <span>Go to your parent dashboard to see your student's profile</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">2.</span>
                    <span>Check the schedule for upcoming classes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">3.</span>
                    <span>Join your first live session when it's time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">4.</span>
                    <span>Explore study materials and start practicing</span>
                  </li>
                </ol>
              </div>

              <Button 
                className="w-full sm:w-auto"
                onClick={() => router.push('/dashboard/student')}
              >
                Go to Dashboard
              </Button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Subscription Active:</strong> Your plan is now active. 
                  Check your email for the invoice and receipt.
                </p>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
