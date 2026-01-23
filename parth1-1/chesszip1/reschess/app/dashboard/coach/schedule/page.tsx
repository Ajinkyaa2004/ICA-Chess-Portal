'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Video, Users, XCircle, Plus } from 'lucide-react';

// Mock classes - Only assigned ones
const assignedClasses = [
  {
    id: 1,
    type: 'Demo',
    student: 'Arjun Patel',
    batchName: null,
    date: '2026-01-18',
    time: '10:00 AM',
    duration: '30 min',
    status: 'scheduled',
    meetingLink: 'https://zoom.us/j/123456789',
  },
  {
    id: 2,
    type: '1-1',
    student: 'Rohan Kumar',
    batchName: '1-1 Sessions',
    date: '2026-01-18',
    time: '02:00 PM',
    duration: '60 min',
    status: 'scheduled',
    meetingLink: 'https://zoom.us/j/987654321',
  },
  {
    id: 3,
    type: 'Group',
    student: 'Beginners Batch A',
    batchName: 'Beginners Batch A',
    date: '2026-01-18',
    time: '04:00 PM',
    duration: '90 min',
    status: 'scheduled',
    meetingLink: null,
  },
  {
    id: 4,
    type: 'Group',
    student: 'Intermediate Batch B',
    batchName: 'Intermediate Batch B',
    date: '2026-01-19',
    time: '10:00 AM',
    duration: '90 min',
    status: 'scheduled',
    meetingLink: 'https://zoom.us/j/456123789',
  },
  {
    id: 5,
    type: 'Group',
    student: 'Beginners Batch A',
    batchName: 'Beginners Batch A',
    date: '2026-01-20',
    time: '04:00 PM',
    duration: '90 min',
    status: 'scheduled',
    meetingLink: null,
  },
  {
    id: 6,
    type: 'Demo',
    student: 'Priya Singh',
    batchName: null,
    date: '2026-01-20',
    time: '03:00 PM',
    duration: '30 min',
    status: 'scheduled',
    meetingLink: null,
  },
];

// Mock blocked slots
const initialBlockedSlots = [
  { id: 1, date: '2026-01-19', time: '02:00 PM', duration: '2 hours', reason: 'Personal appointment' },
  { id: 2, date: '2026-01-21', time: '10:00 AM', duration: '4 hours', reason: 'Family event' },
];

export default function CoachSchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date('2026-01-18'));
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [blockedSlots, setBlockedSlots] = useState(initialBlockedSlots);
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [blockForm, setBlockForm] = useState({
    date: '',
    time: '',
    duration: '1 hour',
    reason: '',
  });

  // Get week dates
  const getWeekDates = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay()); // Start from Sunday
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate);

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleBlockSlot = () => {
    if (!blockForm.date || !blockForm.time) return;

    const newBlock = {
      id: blockedSlots.length + 1,
      ...blockForm,
    };

    setBlockedSlots([...blockedSlots, newBlock]);
    setBlockModalOpen(false);
    setBlockForm({ date: '', time: '', duration: '1 hour', reason: '' });
  };

  const handleUnblock = (id: number) => {
    if (confirm('Remove this blocked time slot?')) {
      setBlockedSlots(blockedSlots.filter(b => b.id !== id));
    }
  };

  const getClassesForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return assignedClasses.filter(c => c.date === dateStr);
  };

  const getBlockedSlotsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return blockedSlots.filter(b => b.date === dateStr);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="coach" />
      
      <div className="flex-1">
        <DashboardHeader userName="IM Ramesh Kumar" userRole="Coach" />
        
        <main className="p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <Link href="/dashboard/coach">
              <Button variant="ghost" size="sm" className="mb-3">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-2">My Schedule</h1>
                <p className="text-gray-600 text-sm sm:text-base">View assigned classes and block unavailable time</p>
              </div>
              <Button onClick={() => setBlockModalOpen(true)}>
                <XCircle className="w-4 h-4 mr-2" />
                Block Time
              </Button>
            </div>
          </div>

          {/* Calendar Navigation */}
          <Card className="mb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handlePrevWeek}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h3 className="text-lg font-semibold text-primary-blue">
                  {weekDates[0].toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} - {weekDates[6].toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </h3>
                <Button variant="outline" size="sm" onClick={handleNextWeek}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
            </div>
          </Card>

          {/* Week View */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-3">
            {weekDates.map((date, idx) => {
              const classes = getClassesForDate(date);
              const blocked = getBlockedSlotsForDate(date);
              const today = isToday(date);

              return (
                <Card key={idx} className={`${today ? 'ring-2 ring-primary-blue' : ''}`}>
                  {/* Day Header */}
                  <div className={`text-center pb-3 border-b ${today ? 'bg-blue-50' : ''}`}>
                    <p className="text-xs text-gray-600">
                      {date.toLocaleDateString('en-IN', { weekday: 'short' })}
                    </p>
                    <p className={`text-2xl font-bold ${today ? 'text-primary-blue' : 'text-gray-900'}`}>
                      {date.getDate()}
                    </p>
                    {today && <Badge variant="info" className="text-xs mt-1">Today</Badge>}
                  </div>

                  {/* Classes */}
                  <div className="mt-3 space-y-2">
                    {classes.length > 0 ? (
                      classes.map(cls => (
                        <div 
                          key={cls.id} 
                          className={`p-2 rounded-lg text-xs ${
                            cls.type === 'Demo' 
                              ? 'bg-orange-100 border border-orange-200' 
                              : cls.type === '1-1'
                              ? 'bg-blue-100 border border-blue-200'
                              : 'bg-green-100 border border-green-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <Badge variant={cls.type === 'Demo' ? 'warning' : cls.type === '1-1' ? 'info' : 'success'} className="text-xs">
                              {cls.type}
                            </Badge>
                            <span className="text-xs font-semibold">{cls.time}</span>
                          </div>
                          <p className="font-medium text-gray-900 truncate">{cls.student}</p>
                          <p className="text-gray-600">{cls.duration}</p>
                          {cls.meetingLink && (
                            <div className="flex items-center mt-1 text-green-600">
                              <Video className="w-3 h-3 mr-1" />
                              <span className="text-xs">Link ready</span>
                            </div>
                          )}
                        </div>
                      ))
                    ) : null}

                    {/* Blocked Slots */}
                    {blocked.map(block => (
                      <div key={block.id} className="p-2 rounded-lg bg-red-100 border border-red-200 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="error" className="text-xs">Blocked</Badge>
                          <button 
                            onClick={() => handleUnblock(block.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="font-medium text-gray-900">{block.time}</p>
                        <p className="text-gray-600">{block.duration}</p>
                        {block.reason && <p className="text-gray-700 italic mt-1">{block.reason}</p>}
                      </div>
                    ))}

                    {classes.length === 0 && blocked.length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-4">No events</p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Upcoming Classes List */}
          <Card className="mt-6">
            <h3 className="text-lg font-heading font-semibold text-primary-blue mb-4">Upcoming Classes</h3>
            <div className="space-y-3">
              {assignedClasses.slice(0, 5).map(cls => (
                <div key={cls.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-primary-offwhite rounded-lg">
                  <div className="flex items-start sm:items-center space-x-3 min-w-0 flex-1">
                    <div className="text-center flex-shrink-0">
                      <p className="text-xs text-gray-600">
                        {new Date(cls.date).toLocaleDateString('en-IN', { month: 'short' })}
                      </p>
                      <p className="text-lg font-bold text-primary-blue">
                        {new Date(cls.date).getDate()}
                      </p>
                    </div>
                    <div className="h-12 w-px bg-gray-300 hidden sm:block" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant={cls.type === 'Demo' ? 'warning' : cls.type === '1-1' ? 'info' : 'success'}>
                          {cls.type}
                        </Badge>
                        <span className="text-sm font-semibold">{cls.time}</span>
                        <span className="text-xs text-gray-600">({cls.duration})</span>
                      </div>
                      <p className="font-semibold text-sm truncate">{cls.student}</p>
                      {cls.batchName && (
                        <p className="text-xs text-gray-600 truncate">{cls.batchName}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full sm:w-auto flex-shrink-0">
                    {cls.meetingLink ? (
                      <a href={cls.meetingLink} target="_blank" rel="noopener noreferrer" className="block">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full">
                          <Video className="w-4 h-4 mr-2" />
                          Join
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
          </Card>
        </main>
      </div>

      {/* Block Time Modal */}
      {blockModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <h3 className="text-xl font-heading font-bold text-primary-blue mb-4">Block Unavailable Time</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  value={blockForm.date}
                  onChange={(e) => setBlockForm({ ...blockForm, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                <input
                  type="time"
                  value={blockForm.time}
                  onChange={(e) => setBlockForm({ ...blockForm, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                <select
                  value={blockForm.duration}
                  onChange={(e) => setBlockForm({ ...blockForm, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  <option value="30 min">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                  <option value="3 hours">3 hours</option>
                  <option value="4 hours">4 hours</option>
                  <option value="All day">All day</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason (Optional)</label>
                <input
                  type="text"
                  value={blockForm.reason}
                  onChange={(e) => setBlockForm({ ...blockForm, reason: e.target.value })}
                  placeholder="e.g., Personal appointment"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setBlockModalOpen(false);
                    setBlockForm({ date: '', time: '', duration: '1 hour', reason: '' });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={handleBlockSlot}
                  disabled={!blockForm.date || !blockForm.time}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Block Time
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
