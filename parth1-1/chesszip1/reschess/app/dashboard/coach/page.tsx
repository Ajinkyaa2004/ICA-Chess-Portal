'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Users, Calendar, Video, BookOpen, Clock, AlertCircle, HelpCircle } from 'lucide-react';


export default function CoachDashboard() {
  const [apiDemos, setApiDemos] = useState<any[]>([]);
  const [apiBatches, setApiBatches] = useState<any[]>([]);
  const [apiLessons, setApiLessons] = useState<any[]>([]);
  const [coachName, setCoachName] = useState('Coach');

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.user?.name) setCoachName(json.user.name);
    }).catch(() => {});
    fetch('/api/coach/batches').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.data || json?.batches) setApiBatches(json.data || json.batches);
    }).catch(() => {});
    fetch('/api/coach/schedule').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.data || json?.lessons) setApiLessons(json.data || json.lessons);
    }).catch(() => {});
    fetch('/api/demos?limit=20').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.data || json?.demos) setApiDemos((json.data || json.demos).filter((d: any) => ['BOOKED', 'RESCHEDULED'].includes(d.status)));
    }).catch(() => {});
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];
  const displayDemos = apiDemos;
  const displayBatches = apiBatches.map((b: any) => ({
    id: b._id, name: b.name, studentCount: b.studentIds?.length || 0, level: b.level || '', nextClass: '',
  }));
  const displayLessons = apiLessons
    .filter((l: any) => l.date && l.date.split('T')[0] === todayStr)
    .map((l: any) => ({
      time: l.startTime || '', type: l.batchId?.type === '1-1' ? '1-1' : 'Group',
      student: l.batchId?.name || 'Batch', hasLink: !!l.meetingLink, link: l.meetingLink || '',
    }));

  const upcomingDemos = displayDemos.filter((d: any) => d.status === 'BOOKED' || d.status === 'RESCHEDULED').length;
  const totalBatches = displayBatches.length;
  const todaysClassCount = displayLessons.length;
  const pendingReviewRequests = 0;

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="coach" />
      
      <div className="flex-1">
        <DashboardHeader userName={coachName} userRole="coach" />
        
        <main className="p-3 sm:p-4 lg:p-6">
          {/* Review Session Requests Alert */}
          {pendingReviewRequests > 0 && (
            <Card className="mb-4 bg-orange-50 border-orange-300">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-orange-900 mb-1">
                    🔔 {pendingReviewRequests} Review Session Request{pendingReviewRequests > 1 ? 's' : ''} Pending
                  </h4>
                  <p className="text-sm text-orange-700">
                    Students/parents have requested review sessions. Schedule Zoom meetings to help them.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Access Notice */}
          <Card className="mb-4 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Coach Access</h4>
                <p className="text-sm text-blue-700">
                  You can only see <strong>assigned demos</strong>, <strong>your batches</strong>, and <strong>your students</strong>. 
                  Demo outcomes are managed by Admin. No payment or parent contact information is visible.
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Stats - Only Assigned Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Review Requests</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{pendingReviewRequests}</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Pending</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Upcoming Demos</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{upcomingDemos}</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Assigned to you</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Video className="w-5 h-5 sm:w-6 sm:h-6 text-primary-orange" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">My Batches</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{totalBatches}</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Active batches</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-xs sm:text-sm truncate">Today's Classes</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{todaysClassCount}</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Scheduled</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Review Session Requests */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-heading font-semibold">Review Requests</h3>
                <Badge variant="warning">{pendingReviewRequests} Pending</Badge>
              </div>

              <div className="text-center py-6">
                <HelpCircle className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No review requests</p>
              </div>
            </Card>

            {/* Assigned Demos */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-heading font-semibold">Assigned Demos</h3>
                <Link href="/dashboard/coach/demos">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>

              {displayDemos.length > 0 ? (
                <div className="space-y-3">
                  {displayDemos.slice(0, 3).map((demo: any) => (
                    <div key={demo.id} className="p-3 bg-primary-offwhite rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm truncate">{demo.studentName}</p>
                          <p className="text-xs text-gray-600">Age: {demo.studentAge}</p>
                        </div>
                        <Badge variant="warning" className="flex-shrink-0 ml-2">Demo</Badge>
                      </div>
                      <div className="flex items-center text-xs text-gray-600 mb-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(demo.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} at {demo.time}
                      </div>
                      {demo.meetingLink ? (
                        <a href={demo.meetingLink} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="w-full text-xs">
                            <Video className="w-3 h-3 mr-1" />
                            Join Demo
                          </Button>
                        </a>
                      ) : (
                        <Button size="sm" variant="outline" className="w-full text-xs" disabled>
                          <Clock className="w-3 h-3 mr-1" />
                          Link Pending
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Video className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No demos assigned</p>
                </div>
              )}
            </Card>
          </div>

          {/* Today's Schedule - Full Width */}
          <Card className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-heading font-semibold">Today's Classes</h3>
              <Link href="/dashboard/coach/schedule">
                <Button variant="ghost" size="sm">View Calendar</Button>
              </Link>
            </div>

            {displayLessons.length > 0 ? (
              <div className="space-y-3">
                {displayLessons.map((lesson: any, idx: number) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 bg-primary-offwhite rounded-lg">
                    <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 min-w-0 flex-1 w-full">
                      <div className="text-center flex-shrink-0">
                        <p className="text-xs text-gray-600">Time</p>
                        <p className="font-semibold text-sm">{lesson.time}</p>
                      </div>
                      <div className="h-12 w-px bg-gray-300 hidden sm:block" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant={lesson.type === 'Demo' ? 'warning' : lesson.type === '1-1' ? 'info' : 'success'}>
                            {lesson.type}
                          </Badge>
                        </div>
                        <p className="font-semibold text-sm truncate">{lesson.student}</p>
                        {lesson.hasLink && (
                          <div className="flex items-center mt-1">
                            <Video className="w-3 h-3 text-green-600 mr-1 flex-shrink-0" />
                            <span className="text-xs text-green-600">Meeting link ready</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full sm:w-auto">
                      {lesson.hasLink ? (
                        <a href={lesson.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto block">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full">
                            <Video className="w-4 h-4 mr-2" />
                            Join Now
                          </Button>
                        </a>
                      ) : (
                        <Button size="sm" variant="outline" className="w-full" disabled>
                          <Clock className="w-4 h-4 mr-2" />
                          Link Pending
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No classes scheduled for today</p>
              </div>
            )}
          </Card>

          {/* My Batches */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-heading font-semibold">My Batches</h3>
              <Link href="/dashboard/coach/batches">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayBatches.map((batch: any) => (
                <div key={batch.id} className="p-4 bg-primary-offwhite rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-base mb-1 truncate">{batch.name}</h4>
                      <Badge variant="info" className="text-xs">{batch.level}</Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600 flex-shrink-0 ml-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-semibold">{batch.studentCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 mb-3">
                    <Calendar className="w-3 h-3 mr-1" />
                    Next: {new Date(batch.nextClass).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/coach/batches/${batch.id}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        View Students
                      </Button>
                    </Link>
                    <Link href={`/dashboard/coach/batches/${batch.id}/chat`} className="flex-1">
                      <Button size="sm" className="w-full text-xs">
                        💬 Chat
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <Link href="/dashboard/coach/schedule">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-1">My Schedule</h4>
                  <p className="text-xs text-gray-600">View calendar & block time</p>
                </div>
              </Card>
            </Link>

            <Link href="/dashboard/coach/resources">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-1">Learning Materials</h4>
                  <p className="text-xs text-gray-600">Upload lessons & homework</p>
                </div>
              </Card>
            </Link>

            <Link href="/dashboard/coach/messages">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h4 className="font-semibold mb-1">Admin Chat</h4>
                  <p className="text-xs text-gray-600">Message admin only</p>
                </div>
              </Card>
            </Link>

            <Link href="/dashboard/coach/demos">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Video className="w-6 h-6 text-primary-orange" />
                  </div>
                  <h4 className="font-semibold mb-1">Demo Management</h4>
                  <p className="text-xs text-gray-600">View assigned demos</p>
                </div>
              </Card>
            </Link>
          </div>
        </main>
      </div>

    </div>
  );
}
