'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Calendar, Clock, Video, CreditCard, LogOut, User, Mail, Phone, Globe, Award } from 'lucide-react';

export default function CustomerDashboard() {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  // Mock data - This comes from the demo booking
  const demoDetails = {
    studentName: 'Arjun Patel',
    parentName: 'Rajesh Kumar',
    parentEmail: 'rajesh.kumar@example.com',
    parentPhone: '+91 98765 43210',
    demoDate: '2026-01-20',
    demoTime: '10:00 AM',
    timezone: 'Asia/Kolkata (IST)',
    coach: 'IM Ramesh Kumar',
    coachRating: 2500,
    status: 'scheduled', // 'scheduled' | 'completed'
  };

  const isDemoCompleted = demoDetails.status === 'completed';

  return (
    <div className="min-h-screen bg-primary-offwhite overflow-x-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <img 
                src="/imgs.png" 
                alt="Indian Chess Academy" 
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
              <div>
                <h1 className="text-base sm:text-xl font-heading font-bold text-primary-blue">Indian Chess Academy</h1>
                <p className="text-xs sm:text-sm text-gray-600 truncate max-w-[120px] sm:max-w-none">Welcome, {demoDetails.parentName}</p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowLogout(!showLogout)}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </button>
              {showLogout && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <button
                    onClick={() => router.push('/auth/login')}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Welcome Banner */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-primary-blue mb-2">
                Welcome to Indian Chess Academy! 👋
              </h2>
              <p className="text-sm sm:text-base text-gray-700">
                Your demo session is scheduled. Complete it to unlock full access.
              </p>
            </div>
            <Badge variant="warning" className="flex-shrink-0">
              Demo Account
            </Badge>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Demo Session Details */}
          <Card className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-primary-blue">Your Demo Session</h3>
              <Badge variant={isDemoCompleted ? 'success' : 'info'}>
                {isDemoCompleted ? 'Completed' : 'Scheduled'}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-primary-offwhite rounded-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-orange rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-600">Date & Time</p>
                  <p className="font-semibold text-base sm:text-lg break-words" suppressHydrationWarning>
                    {new Date(demoDetails.demoDate).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 flex items-center mt-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    {demoDetails.demoTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-primary-offwhite rounded-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-600">Timezone</p>
                  <p className="font-semibold text-base sm:text-lg break-words">{demoDetails.timezone}</p>
                </div>
              </div>

              {!isDemoCompleted && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mt-4">
                  <p className="text-xs sm:text-sm text-yellow-800 mb-3">
                    <strong>Meeting Link:</strong> Will be sent to your email 15 minutes before the session.
                  </p>
                  <Button className="w-full text-sm sm:text-base" disabled>
                    <Video className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Join Demo (Available on scheduled time)
                  </Button>
                </div>
              )}

              {isDemoCompleted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mt-4">
                  <p className="text-xs sm:text-sm text-green-800 mb-3">
                    <strong>Demo Completed!</strong> Ready to start your chess journey?
                  </p>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base"
                    onClick={() => router.push('/pricing')}
                  >
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Choose a Plan & Subscribe
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Student & Contact Info */}
          <div className="space-y-6">
            <Card>
              <h3 className="text-base sm:text-lg font-heading font-semibold text-primary-blue mb-4">Need Help?</h3>
              <div className="space-y-3 sm:space-y-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/919167209891"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors active:bg-green-200"
                >
                  <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600">WhatsApp</p>
                    <p className="font-semibold text-sm sm:text-base text-green-700 break-all">91672 09891</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:viraj@indianchessacademy.in"
                  className="flex items-center gap-2 sm:gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors active:bg-blue-200"
                >
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-sm sm:text-base text-blue-700 break-all">viraj@indianchessacademy.in</p>
                  </div>
                </a>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <h3 className="text-base sm:text-lg font-heading font-semibold text-primary-orange mb-2">What's Next?</h3>
              <ol className="space-y-2 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="font-bold mr-2 flex-shrink-0">1.</span>
                  <span>Attend your scheduled demo session</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 flex-shrink-0">2.</span>
                  <span>Experience our teaching methodology</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 flex-shrink-0">3.</span>
                  <span>Choose a subscription plan</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 flex-shrink-0">4.</span>
                  <span>Get full access to batches, classes & resources</span>
                </li>
              </ol>
            </Card>
          </div>
        </div>

        {/* Limited Access Notice */}
        <Card className="mt-6 bg-gray-50 border-gray-300">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-gray-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Limited Access Account</h4>
              <p className="text-sm text-gray-700">
                You currently have demo-only access. After completing your demo and subscribing to a plan, 
                you'll unlock access to: live classes, batch sessions, study materials, progress tracking, 
                coach communication, and payment management.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
