'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { TrendingUp, Calendar, Video, CheckCircle, HelpCircle, CreditCard, MessageSquare, DollarSign } from 'lucide-react';


export default function StudentDashboard() {
  const router = useRouter();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRequest, setReviewRequest] = useState({ topic: '', description: '', urgency: 'normal', preferredTime: '' });
  const [profile, setProfile] = useState<any>(null);
  const [apiLessons, setApiLessons] = useState<any[]>([]);
  const [apiProgress, setApiProgress] = useState<any>(null);
  const [apiProfile, setApiProfile] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.user) setProfile(json.user);
    }).catch(() => {});
    fetch('/api/customer/lessons').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.data || json?.lessons) setApiLessons(json.data || json.lessons);
    }).catch(() => {});
    fetch('/api/customer/progress').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.progress) setApiProgress(json.progress);
    }).catch(() => {});
    fetch('/api/customer/profile').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.data || json?.student) setApiProfile(json.data || json.student);
    }).catch(() => {});
  }, []);

  const displayLessons = apiLessons
    .filter((l: any) => new Date(l.date) >= new Date())
    .slice(0, 2)
    .map((l: any) => ({
      id: l._id, date: l.date?.split('T')[0] || '', time: l.startTime || '',
      coach: l.coachId?.name || '', topic: l.topic || '',
    }));

  const batchName = apiProfile?.batchId?.name || apiProfile?.batch?.name || '—';
  const coachName = apiProfile?.coachId?.name || apiProfile?.coach?.name || '—';
  const attendance = apiProgress?.attendancePercentage ?? apiProfile?.attendance ?? 0;
  const overallProgress = apiProgress?.overallProgress ?? 0;
  const totalLessons = apiProgress?.totalLessons ?? 0;
  const attendedLessons = apiProgress?.attendedLessons ?? 0;
  const rating = apiProfile?.rating ?? 0;

  const handleRequestReview = () => {
    // Mock API call - in real app, this would send to backend
    console.log('Review session requested:', reviewRequest);
    alert('Review session request sent to your coach! They will schedule a meeting soon.');
    setShowReviewModal(false);
    setReviewRequest({ topic: '', description: '', urgency: 'normal', preferredTime: '' });
  };
  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="customer" />
      
      <div className="flex-1">
        <DashboardHeader userName={profile?.name || 'Student'} userRole="customer" />
        
        <main className="p-3 sm:p-4 lg:p-6">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-4 sm:mb-6">
            My Dashboard
          </h1>

          {/* Live Class Tracker */}
          <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center animate-pulse flex-shrink-0">
                  <Video className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-green-600 rounded-full animate-pulse flex-shrink-0"></span>
                    <p className="text-xs sm:text-sm font-semibold text-green-900">LIVE CLASS IN PROGRESS</p>
                  </div>
                  <p className="text-xs sm:text-base text-green-700 truncate">
                    {coachName !== '—' ? `with ${coachName}` : ''}{batchName !== '—' ? ` • ${batchName}` : ''}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button size="md" className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-initial">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Join Now
                </Button>
                <Button size="md" variant="outline" className="flex-1 sm:flex-initial" onClick={() => router.push('/dashboard/student/batches')}>
                  💬 Batch Chat
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">My Batch</p>
                  <p className="text-lg sm:text-xl font-bold text-primary-blue truncate">{batchName}</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">{coachName}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  {batchName !== '—' ? batchName.charAt(0) : '?'}
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Attendance</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{attendance}%</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">{attendedLessons} of {totalLessons} lessons</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Overall Progress</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{overallProgress}%</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Combined score</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-orange bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary-orange" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Current Rating</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{rating || '—'}</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Chess rating</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Upcoming Lessons */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-heading font-semibold">Upcoming Lessons</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>

              {displayLessons.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No upcoming lessons scheduled</p>
              )}
              <div className="space-y-3">
                {displayLessons.map((lesson: any) => (
                  <div key={lesson.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 bg-primary-offwhite rounded-lg">
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm sm:text-base truncate">{lesson.topic}</p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{lesson.coach}</p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {new Date(lesson.date).toLocaleDateString('en-IN', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })} at {lesson.time}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full sm:w-auto">Join</Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <h3 className="text-lg sm:text-xl font-heading font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowReviewModal(true)}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Request Review Session
                </Button>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => alert('Redirecting to payment gateway...')}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Make Payment
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/dashboard/student/lessons')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  View My Lessons
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/dashboard/student/batches')}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Join Batch Chat
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/dashboard/student/billing')}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  View Billing
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/dashboard/student/messages')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Admin
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Review Session Request Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <h3 className="text-xl font-heading font-bold text-primary-blue mb-4">
              Request Review Session
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic/Subject *
                </label>
                <input
                  type="text"
                  value={reviewRequest.topic}
                  onChange={(e) => setReviewRequest({ ...reviewRequest, topic: e.target.value })}
                  placeholder="e.g., Opening strategies, Endgame techniques"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={reviewRequest.description}
                  onChange={(e) => setReviewRequest({ ...reviewRequest, description: e.target.value })}
                  placeholder="Describe what you need help with or want to review..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Urgency Level
                </label>
                <select
                  value={reviewRequest.urgency}
                  onChange={(e) => setReviewRequest({ ...reviewRequest, urgency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  <option value="low">Low - Can wait a few days</option>
                  <option value="normal">Normal - Within 2-3 days</option>
                  <option value="high">High - Need help soon</option>
                  <option value="urgent">Urgent - ASAP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time (Optional)
                </label>
                <input
                  type="text"
                  value={reviewRequest.preferredTime}
                  onChange={(e) => setReviewRequest({ ...reviewRequest, preferredTime: e.target.value })}
                  placeholder="e.g., Weekday evenings, Saturday morning"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Your coach will receive this request and schedule a Zoom meeting with you. 
                  You'll be notified once the session is scheduled.
                </p>
              </div>

              <div className="flex space-x-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowReviewModal(false);
                    setReviewRequest({ topic: '', description: '', urgency: 'normal', preferredTime: '' });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleRequestReview}
                  disabled={!reviewRequest.topic.trim() || !reviewRequest.description.trim()}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Send Request
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
