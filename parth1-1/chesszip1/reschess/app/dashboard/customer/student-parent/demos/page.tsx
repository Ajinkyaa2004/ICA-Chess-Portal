'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { CheckCircle, AlertCircle, Heart, Clock, Zap, Users, BookOpen, Lock, ChevronRight, Award, Loader2, Calendar } from 'lucide-react';

// Mock demo data - would come from API in real app
const demoOutcome = {
  id: 5,
  student: 'Aditya Sharma',
  parent: 'Meera Sharma',
  age: 11,
  date: '2026-01-17',
  time: '04:30 PM',
  coach: 'IM Ramesh Kumar',
  status: 'completed',
  attendance: 'attended',
  outcome: 'interested', // 'interested' | 'converted' | 'not_interested'
  outcomeNotes: 'Very interested in chess! Asked many questions about tournament preparation. Good analytical skills. Parent budget: ₹15k/month',
  paymentStatus: 'pending',
  adminComment: 'Strong candidate for Intermediate Batch B. Recommend 1-on-1 sessions first.',
};

const batchOptions = [
  {
    id: 1,
    name: 'Beginners Batch A',
    level: 'Beginner',
    price: 8000,
    duration: '1 month',
    frequency: '2 classes/week',
    timing: 'Mon, Wed - 4:00 PM',
    students: 6,
    maxStudents: 8,
    coach: 'FM Priya Sharma',
    includes: ['30-min classes', 'Weekly puzzles', 'Progress tracking', 'Batch chat'],
  },
  {
    id: 2,
    name: 'Intermediate Batch B',
    level: 'Intermediate',
    price: 12000,
    duration: '1 month',
    frequency: '3 classes/week',
    timing: 'Mon, Wed, Sat - 3:00 PM',
    students: 5,
    maxStudents: 8,
    coach: 'IM Ramesh Kumar',
    includes: ['45-min classes', 'Daily puzzles', 'Monthly assessment', 'Batch chat', 'Game analysis'],
  },
  {
    id: 3,
    name: '1-on-1 Intensive',
    level: 'All Levels',
    price: 15000,
    duration: '1 month',
    frequency: '2 sessions/week',
    timing: 'Flexible',
    students: 1,
    maxStudents: 1,
    coach: 'Your choice',
    includes: ['60-min sessions', 'Personalized plan', 'Weekly game review', 'Direct support', 'Tournament prep'],
  },
];

export default function CustomerDemosPage() {
  const router = useRouter();
  const [selectedBatch, setSelectedBatch] = useState(1);

  const showInterestFlow = ['interested', 'converted'].includes(demoOutcome.outcome);
  const showConvertedFlow = demoOutcome.outcome === 'converted';
  const showNotInterestedFlow = demoOutcome.outcome === 'not_interested';

  const handleCompletePayment = () => {
    // Mock payment redirect - in real app would redirect to payment gateway
    alert('Redirecting to payment processor...');
    // After successful payment, redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard/student');
    }, 1500);
  };

  const handleEnrollmentSuccess = () => {
    // Redirect to full dashboard after enrollment
    router.push('/dashboard/student');
  };

  const handleBookAnotherDemo = () => {
    router.push('/booking/demo');
  };

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="student" />

      <div className="flex-1">
        <DashboardHeader userName={demoOutcome.parent} userRole="Student" />

        <main className="p-3 sm:p-4 lg:p-6 max-w-6xl mx-auto">
          {/* Demo Summary Header */}
          <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-blue mb-1">Demo Session Complete! 🎉</h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Thanks for attending the demo with <span className="font-semibold">{demoOutcome.coach}</span>
                </p>
              </div>
              <div className="text-sm sm:text-base text-gray-600 space-y-1">
                <p><span className="font-semibold">Student:</span> {demoOutcome.student}, Age {demoOutcome.age}</p>
                <p><span className="font-semibold">Session:</span> {new Date(demoOutcome.date).toLocaleDateString('en-IN')} at {demoOutcome.time}</p>
              </div>
            </div>
          </Card>

          {/* INTERESTED - Show Batch Selection */}
          {showInterestFlow && (
            <>
              <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300">
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg sm:text-xl font-bold text-yellow-900">Your Child Showed Great Interest! 💯</h3>
                  </div>
                  <p className="text-sm sm:text-base text-yellow-800">
                    <span className="font-semibold">Coach's Notes:</span> {demoOutcome.outcomeNotes}
                  </p>
                  {demoOutcome.adminComment && (
                    <p className="text-sm sm:text-base text-yellow-800 mt-3">
                      <span className="font-semibold">✨ Recommendation:</span> {demoOutcome.adminComment}
                    </p>
                  )}
                </div>
              </Card>

              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-primary-blue mb-3 sm:mb-4">Select a Batch to Enroll</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {batchOptions.map(batch => (
                    <div
                      key={batch.id}
                      onClick={() => setSelectedBatch(batch.id)}
                      className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedBatch === batch.id
                          ? 'border-primary-blue bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-primary-blue">{batch.name}</h4>
                          <p className="text-xs text-gray-600">{batch.level}</p>
                        </div>
                        <Badge variant="info" className="text-xs flex-shrink-0">
                          {batch.students}/{batch.maxStudents} Students
                        </Badge>
                      </div>

                      <div className="space-y-1 mb-3 text-xs sm:text-sm text-gray-600">
                        <p>
                          <span className="font-semibold">₹{batch.price.toLocaleString()}</span> / {batch.duration}
                        </p>
                        <p>{batch.frequency}</p>
                        <p className="text-gray-500">{batch.timing}</p>
                        <p>Coach: <span className="font-semibold">{batch.coach}</span></p>
                      </div>

                      <div className="space-y-1 text-xs">
                        {batch.includes.map((item, i) => (
                          <p key={i} className="text-gray-600 flex items-start">
                            <CheckCircle className="w-3 h-3 mr-2 flex-shrink-0 mt-0.5 text-green-600" />
                            {item}
                          </p>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        className={`w-full mt-3 text-xs sm:text-sm ${
                          selectedBatch === batch.id
                            ? 'bg-primary-blue text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {selectedBatch === batch.id ? 'Selected ✓' : 'Select'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="mb-4 sm:mb-6 bg-green-50 border-green-300">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">What Happens Next?</h4>
                    <ul className="space-y-1 text-sm text-green-800">
                      <li>✓ Complete payment to secure your child's spot</li>
                      <li>✓ Receive batch schedule and coach contact details</li>
                      <li>✓ First class starts within 2-3 days</li>
                      <li>✓ Weekly progress reports and feedback</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
                <Button
                  onClick={handleCompletePayment}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-sm sm:text-base"
                >
                  💳 Complete Payment → Full Dashboard Access
                </Button>
                <Button
                  variant="outline"
                  onClick={handleBookAnotherDemo}
                  className="flex-1 text-sm sm:text-base"
                >
                  📅 Book Another Demo First
                </Button>
              </div>
            </>
          )}

          {/* CONVERTED - Show Enrollment Confirmation */}
          {showConvertedFlow && (
            <>
              <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
                <div className="text-center mb-4">
                  <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-3" />
                  <h3 className="text-xl sm:text-2xl font-bold text-green-900 mb-2">Welcome to RES Chess! 🎓</h3>
                  <p className="text-sm sm:text-base text-green-700">
                    Enrollment confirmed! Your child's chess journey begins now.
                  </p>
                </div>

                <div className="bg-white p-3 sm:p-4 rounded-lg border border-green-200 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Batch</p>
                    <p className="font-bold text-sm sm:text-base text-primary-blue">Intermediate Batch B</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Coach</p>
                    <p className="font-bold text-sm sm:text-base text-primary-blue">IM Ramesh Kumar</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Classes/Week</p>
                    <p className="font-bold text-sm sm:text-base text-primary-blue">3 sessions (Mon, Wed, Sat)</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Enrollment Date</p>
                    <p className="font-bold text-sm sm:text-base text-primary-blue">Today</p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <Card className="bg-blue-50 border-blue-200">
                  <h4 className="font-bold text-base text-primary-blue mb-3">📋 Next Steps</h4>
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="font-bold text-primary-blue flex-shrink-0">1.</span>
                      <span>Download study materials from your dashboard</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-bold text-primary-blue flex-shrink-0">2.</span>
                      <span>Join the batch WhatsApp group</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-bold text-primary-blue flex-shrink-0">3.</span>
                      <span>Attend first class on Jan 24</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-bold text-primary-blue flex-shrink-0">4.</span>
                      <span>Receive weekly progress updates</span>
                    </li>
                  </ol>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                  <h4 className="font-bold text-base text-primary-blue mb-3">✨ You Get Access To</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start space-x-2">
                      <BookOpen className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Study materials & PDFs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Daily puzzle challenges</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Award className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Monthly progress reports</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Users className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Private batch community</span>
                    </li>
                  </ul>
                </Card>
              </div>

              <Button
                onClick={handleEnrollmentSuccess}
                className="w-full bg-primary-blue hover:bg-blue-700 text-base sm:text-lg py-3"
              >
                Go to Your Dashboard
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </>
          )}

          {/* NOT INTERESTED - Show Thank You & Options */}
          {showNotInterestedFlow && (
            <>
              <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-300">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-orange-900 mb-2">Thank You for Trying Us Out! 👋</h3>
                  <p className="text-sm sm:text-base text-orange-700">We appreciate your time and interest in RES Chess</p>
                </div>

                <div className="bg-white p-3 sm:p-4 rounded-lg border border-orange-200 mb-4">
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    <span className="font-semibold">💭 Your feedback matters:</span> Please help us improve by sharing your thoughts about the demo
                  </p>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Share Feedback
                  </Button>
                </div>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <Card className="border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <h3 className="font-bold text-base sm:text-lg text-primary-blue mb-2">Try Another Demo</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4">
                      Want to try with a different coach or time?
                    </p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Another Demo
                    </Button>
                  </div>
                </Card>

                <Card className="border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <h3 className="font-bold text-base sm:text-lg text-primary-blue mb-2">Get in Touch</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4">
                      Our team would love to help and answer any questions
                    </p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Users className="w-4 h-4 mr-2" />
                      Contact Us
                    </Button>
                  </div>
                </Card>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <h3 className="font-bold text-base text-primary-blue mb-3">Why RES Chess?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700"><span className="font-semibold">Expert Coaches:</span> International Masters & FIDE Masters</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700"><span className="font-semibold">Personalized:</span> Tailored lessons for each student</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700"><span className="font-semibold">Complete Resources:</span> Study materials, puzzles & analysis</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700"><span className="font-semibold">Community:</span> Learn with other chess enthusiasts</span>
                  </li>
                </ul>
              </Card>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
