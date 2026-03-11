'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Video, Calendar, Clock, AlertCircle, CheckCircle, XCircle, ChevronLeft, Search, Filter } from 'lucide-react';

// Mock data - Only ASSIGNED demos
const assignedDemos = [
  {
    id: 1,
    studentName: 'Arjun Patel',
    studentAge: 12,
    date: '2026-01-18',
    time: '10:00 AM',
    status: 'scheduled',
    meetingLink: 'https://zoom.us/j/123456789',
    notes: 'Interested in competitive chess',
    outcome: null, // Admin controls
  },
  {
    id: 2,
    studentName: 'Priya Singh',
    studentAge: 10,
    date: '2026-01-20',
    time: '03:00 PM',
    status: 'scheduled',
    meetingLink: null,
    notes: 'Complete beginner, very enthusiastic',
    outcome: null,
  },
  {
    id: 3,
    studentName: 'Rohan Kumar',
    studentAge: 14,
    date: '2026-01-15',
    time: '11:00 AM',
    status: 'completed',
    meetingLink: 'https://zoom.us/j/987654321',
    notes: 'Has basic knowledge, wants to improve tactics',
    outcome: 'converted', // Admin set
  },
  {
    id: 4,
    studentName: 'Sneha Reddy',
    studentAge: 9,
    date: '2026-01-16',
    time: '02:00 PM',
    status: 'completed',
    meetingLink: 'https://zoom.us/j/456789123',
    notes: 'Parents want structured learning',
    outcome: 'pending', // Admin hasn't decided
  },
  {
    id: 5,
    studentName: 'Aditya Sharma',
    studentAge: 11,
    date: '2026-01-17',
    time: '04:30 PM',
    status: 'completed',
    meetingLink: 'https://zoom.us/j/321654987',
    notes: 'School chess club member',
    outcome: 'not_interested', // Admin set
  },
];

export default function CoachDemosPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'scheduled' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [apiDemos, setApiDemos] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/demos?limit=50').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.data || json?.demos) setApiDemos(json.data || json.demos);
    }).catch(() => {});
  }, []);

  const displayDemos = apiDemos.length > 0
    ? apiDemos.map((d: any) => ({
        id: d._id,
        studentName: d.studentName || '',
        studentAge: d.age || 0,
        date: d.preferredDate ? d.preferredDate.split('T')[0] : '',
        time: d.preferredTime || '',
        status: ['BOOKED', 'RESCHEDULED'].includes(d.status) ? 'scheduled' : 'completed',
        meetingLink: d.meetingLink || null,
        notes: d.notes || '',
        outcome: d.status === 'CONVERTED' ? 'converted' : d.status === 'NOT_INTERESTED' ? 'not_interested' : null,
      }))
    : assignedDemos;

  const filteredDemos = displayDemos.filter((demo: any) => {
    const matchesStatus = filterStatus === 'all' || demo.status === filterStatus;
    const matchesSearch = demo.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const scheduledCount = displayDemos.filter((d: any) => d.status === 'scheduled').length;
  const completedCount = displayDemos.filter((d: any) => d.status === 'completed').length;

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="coach" />
      
      <div className="flex-1">
        <DashboardHeader userName="Coach" userRole="coach" />
        
        <main className="p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <Link href="/dashboard/coach">
              <Button variant="ghost" size="sm" className="mb-3">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-2">Demo Management</h1>
            <p className="text-gray-600 text-sm sm:text-base">View your assigned demo sessions. Demo outcomes are managed by Admin.</p>
          </div>

          {/* Access Notice */}
          <Card className="mb-4 bg-amber-50 border-amber-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-900 mb-1">Read-Only Access</h4>
                <p className="text-sm text-amber-700">
                  You can <strong>view and attend</strong> assigned demos, but <strong>demo outcomes</strong> (converted/not interested/pending) are controlled by <strong>Admin only</strong>.
                </p>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Total Assigned</p>
                <p className="text-3xl sm:text-4xl font-bold text-primary-blue">{displayDemos.length}</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Scheduled</p>
                <p className="text-3xl sm:text-4xl font-bold text-orange-600">{scheduledCount}</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Completed</p>
                <p className="text-3xl sm:text-4xl font-bold text-green-600">{completedCount}</p>
              </div>
            </Card>
          </div>

          {/* Filters & Search */}
          <Card className="mb-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by student name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                >
                  <option value="all">All Demos</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Demos List */}
          {filteredDemos.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredDemos.map((demo) => (
                <Card key={demo.id} className="hover:shadow-lg transition-shadow">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-base sm:text-lg text-primary-blue truncate">
                        {demo.studentName}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">Age: {demo.studentAge} years</p>
                    </div>
                    <Badge variant={demo.status === 'scheduled' ? 'warning' : 'success'} className="flex-shrink-0 ml-2">
                      {demo.status === 'scheduled' ? 'Scheduled' : 'Completed'}
                    </Badge>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center text-sm text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium">
                      {new Date(demo.date).toLocaleDateString('en-IN', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <Clock className="w-4 h-4 ml-4 mr-2 text-gray-500" />
                    <span className="font-medium">{demo.time}</span>
                  </div>

                  {/* Notes */}
                  {demo.notes && (
                    <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-700">
                        <strong className="text-blue-900">Notes:</strong> {demo.notes}
                      </p>
                    </div>
                  )}

                  {/* Outcome (Admin-controlled, read-only) */}
                  {demo.status === 'completed' && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-600 mb-1">Demo Outcome (Admin Only):</p>
                      {demo.outcome === 'converted' && (
                        <div className="flex items-center space-x-2 text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Converted to Student</span>
                        </div>
                      )}
                      {demo.outcome === 'not_interested' && (
                        <div className="flex items-center space-x-2 text-red-700 bg-red-50 px-3 py-2 rounded-lg">
                          <XCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Not Interested</span>
                        </div>
                      )}
                      {demo.outcome === 'pending' && (
                        <div className="flex items-center space-x-2 text-amber-700 bg-amber-50 px-3 py-2 rounded-lg">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Pending Decision</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-3 border-t border-gray-200">
                    {demo.status === 'scheduled' ? (
                      demo.meetingLink ? (
                        <a href={demo.meetingLink} target="_blank" rel="noopener noreferrer" className="block">
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            <Video className="w-4 h-4 mr-2" />
                            Join Demo Session
                          </Button>
                        </a>
                      ) : (
                        <Button variant="outline" className="w-full" disabled>
                          <Clock className="w-4 h-4 mr-2" />
                          Meeting Link Pending
                        </Button>
                      )
                    ) : (
                      <div className="flex items-center justify-center text-gray-500 py-2">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span className="text-sm">Demo Completed</span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Demos Found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try adjusting your search query' : 'No demos have been assigned to you yet'}
              </p>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
