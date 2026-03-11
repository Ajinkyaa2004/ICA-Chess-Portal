'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, Search, Users, Video, Eye, Edit, Plus, CheckCircle, AlertCircle, ChevronRight, X } from 'lucide-react';

// Toast helper
function showToast(msg: string, type: 'success' | 'error' = 'success') {
  const el = document.createElement('div');
  el.className = `fixed top-4 right-4 z-[9999] px-4 py-3 rounded-lg shadow-lg text-white text-sm ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// Mock coach data with availability and upcoming classes
const coachesData = [
  {
    id: 1,
    name: 'Rajesh Gupta',
    email: 'rajesh@reschess.com',
    specialization: 'Beginner & Intermediate',
    rating: 2200,
    availability: {
      monday: ['09:00-12:00', '14:00-17:00'],
      tuesday: ['10:00-13:00', '15:00-18:00'],
      wednesday: ['09:00-12:00', '14:00-17:00'],
      thursday: ['10:00-13:00', '15:00-18:00'],
      friday: ['09:00-12:00', '14:00-16:00'],
      saturday: ['10:00-15:00'],
      sunday: ['Unavailable']
    },
    upcomingClasses: [
      { id: 1, date: '2026-01-21', time: '10:00 AM', duration: '60 min', student: 'Arjun Patel', type: 'Individual', status: 'confirmed' },
      { id: 2, date: '2026-01-21', time: '02:00 PM', duration: '90 min', student: 'Batch A (5 students)', type: 'Group', status: 'confirmed' },
      { id: 3, date: '2026-01-22', time: '10:30 AM', duration: '30 min', student: 'Priya Singh', type: 'Demo', status: 'pending' },
      { id: 4, date: '2026-01-23', time: '03:00 PM', duration: '60 min', student: 'Rohan Kumar', type: 'Individual', status: 'confirmed' },
      { id: 5, date: '2026-01-24', time: '11:00 AM', duration: '90 min', student: 'Batch A (5 students)', type: 'Group', status: 'confirmed' },
      { id: 6, date: '2026-01-25', time: '09:00 AM', duration: '30 min', student: 'New Student Demo', type: 'Demo', status: 'pending' }
    ],
    totalHoursThisWeek: 12.5,
    status: 'active'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@reschess.com',
    specialization: 'Advanced & Tournament Prep',
    rating: 2400,
    availability: {
      monday: ['11:00-14:00', '16:00-19:00'],
      tuesday: ['09:00-12:00', '14:00-17:00'],
      wednesday: ['11:00-14:00', '16:00-19:00'],
      thursday: ['09:00-12:00', '14:00-17:00'],
      friday: ['10:00-13:00', '15:00-18:00'],
      saturday: ['09:00-14:00'],
      sunday: ['Unavailable']
    },
    upcomingClasses: [
      { id: 5, date: '2026-01-21', time: '11:00 AM', duration: '90 min', student: 'Batch B (4 students)', type: 'Group', status: 'confirmed' },
      { id: 6, date: '2026-01-21', time: '04:00 PM', duration: '60 min', student: 'Sneha Reddy', type: 'Individual', status: 'confirmed' },
      { id: 7, date: '2026-01-22', time: '02:00 PM', duration: '30 min', student: 'Aditya Sharma', type: 'Demo', status: 'confirmed' },
      { id: 8, date: '2026-01-24', time: '10:00 AM', duration: '120 min', student: 'Tournament Prep Batch', type: 'Group', status: 'confirmed' },
      { id: 9, date: '2026-01-25', time: '03:00 PM', duration: '60 min', student: 'Advanced Student', type: 'Individual', status: 'confirmed' },
      { id: 10, date: '2026-01-26', time: '11:00 AM', duration: '30 min', student: 'Weekend Demo', type: 'Demo', status: 'pending' }
    ],
    totalHoursThisWeek: 15.0,
    status: 'active'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    email: 'amit@reschess.com',
    specialization: 'Kids & Beginners',
    rating: 2100,
    availability: {
      monday: ['10:00-13:00', '15:00-17:00'],
      tuesday: ['09:00-12:00', '14:00-16:00'],
      wednesday: ['10:00-13:00', '15:00-17:00'],
      thursday: ['09:00-12:00', '14:00-16:00'],
      friday: ['10:00-12:00'],
      saturday: ['09:00-13:00'],
      sunday: ['Unavailable']
    },
    upcomingClasses: [
      { id: 9, date: '2026-01-21', time: '10:00 AM', duration: '45 min', student: 'Kids Batch C (6 students)', type: 'Group', status: 'confirmed' },
      { id: 10, date: '2026-01-21', time: '03:00 PM', duration: '30 min', student: 'Rahul Verma', type: 'Demo', status: 'pending' },
      { id: 11, date: '2026-01-22', time: '11:00 AM', duration: '45 min', student: 'Kids Batch D (5 students)', type: 'Group', status: 'confirmed' },
      { id: 12, date: '2026-01-23', time: '10:00 AM', duration: '45 min', student: 'Kids Batch C (6 students)', type: 'Group', status: 'confirmed' },
      { id: 13, date: '2026-01-25', time: '09:00 AM', duration: '30 min', student: 'Weekend Kids Demo', type: 'Demo', status: 'pending' }
    ],
    totalHoursThisWeek: 8.0,
    status: 'active'
  },
  {
    id: 4,
    name: 'Neha Patel',
    email: 'neha@reschess.com',
    specialization: 'Intermediate & Advanced',
    rating: 2300,
    availability: {
      monday: ['Unavailable'],
      tuesday: ['14:00-18:00'],
      wednesday: ['10:00-14:00'],
      thursday: ['14:00-18:00'],
      friday: ['10:00-14:00'],
      saturday: ['09:00-16:00'],
      sunday: ['10:00-13:00']
    },
    upcomingClasses: [
      { id: 12, date: '2026-01-22', time: '02:30 PM', duration: '60 min', student: 'Kavya Nair', type: 'Individual', status: 'confirmed' },
      { id: 13, date: '2026-01-25', time: '10:00 AM', duration: '90 min', student: 'Intermediate Batch E', type: 'Group', status: 'confirmed' },
      { id: 14, date: '2026-01-26', time: '02:00 PM', duration: '60 min', student: 'Weekend Individual', type: 'Individual', status: 'confirmed' }
    ],
    totalHoursThisWeek: 6.5,
    status: 'on_leave'
  }
];

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AdminSchedulePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoach, setSelectedCoach] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'availability' | 'classes'>('overview');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [apiCoaches, setApiCoaches] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [apiBatches, setApiBatches] = useState<any[]>([]);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newLesson, setNewLesson] = useState({
    batchId: '',
    coachId: '',
    date: '',
    startTime: '',
    endTime: '',
    topic: '',
  });

  const fetchLessons = () => {
    fetch('/api/lessons?limit=100').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.data || json?.lessons) setLessons(json.data || json.lessons);
    }).catch(() => {});
  };

  useEffect(() => {
    fetch('/api/coaches?limit=50').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.data || json?.coaches) setApiCoaches(json.data || json.coaches);
    }).catch(() => {});
    fetch('/api/batches?limit=100').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.data || json?.batches) setApiBatches(json.data || json.batches);
    }).catch(() => {});
    fetchLessons();
  }, []);

  const handleCreateLesson = async () => {
    if (!newLesson.batchId || !newLesson.coachId || !newLesson.date || !newLesson.startTime || !newLesson.endTime) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    setCreating(true);
    try {
      const res = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLesson),
      });
      const json = await res.json();
      if (res.ok) {
        showToast('Lesson scheduled successfully!');
        setScheduleModalOpen(false);
        setNewLesson({ batchId: '', coachId: '', date: '', startTime: '', endTime: '', topic: '' });
        fetchLessons();
      } else {
        showToast(json.error || 'Failed to schedule lesson', 'error');
      }
    } catch {
      showToast('Network error', 'error');
    } finally {
      setCreating(false);
    }
  };

  // Navigation functions
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

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Get week dates for current view
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
  const currentDateStr = currentDate.toISOString().split('T')[0];

  const normalizeCoach = (c: any) => ({
    ...c,
    id: c._id || c.id,
    name: c.name || '',
    email: c.email || '',
    specialization: Array.isArray(c.specialization) ? c.specialization.join(', ') : (c.specialization || ''),
    rating: c.rating || 0,
    status: c.isActive === false ? 'inactive' : 'active',
    availability: c.availability || {},
    upcomingClasses: [],
    totalHoursThisWeek: 0,
  });

  const displayCoaches = apiCoaches.length > 0
    ? apiCoaches.map(normalizeCoach)
    : coachesData;

  const filteredCoaches = displayCoaches.filter(coach =>
    coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof coach.specialization === 'string' && coach.specialization.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Build classes from real lessons data; fall back to mock if no API data
  const allUpcomingClasses = (lessons.length > 0
    ? lessons.map((lesson: any) => ({
        id: lesson._id,
        date: lesson.date ? lesson.date.split('T')[0] : '',
        time: lesson.startTime || '',
        duration: lesson.startTime && lesson.endTime ? `${lesson.startTime}-${lesson.endTime}` : '',
        student: lesson.batchId?.name || 'Batch',
        type: lesson.batchId?.type === '1-1' ? 'Individual' : 'Group',
        status: lesson.status === 'SCHEDULED' ? 'confirmed' : lesson.status?.toLowerCase() || 'confirmed',
        coachName: lesson.coachId?.name || '',
        coachId: lesson.coachId?._id || lesson.coachId,
      }))
    : coachesData.flatMap(coach =>
        coach.upcomingClasses.map(cls => ({
          ...cls,
          coachName: coach.name,
          coachId: coach.id,
        }))
      )
  ).filter((cls: any) => {
    const classDate = new Date(cls.date);
    const startOfWeek = weekDates[0];
    const endOfWeek = weekDates[6];
    return classDate >= startOfWeek && classDate <= endOfWeek;
  }).sort((a: any, b: any) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime());

  const totalActiveCoaches = displayCoaches.filter(c => c.status === 'active').length;
  const totalClassesToday = allUpcomingClasses.filter((cls: any) => cls.date === currentDateStr).length;
  const totalHoursThisWeek = lessons.length > 0
    ? Math.round(lessons.reduce((sum: number, l: any) => {
        if (l.startTime && l.endTime) {
          const [sh, sm] = l.startTime.split(':').map(Number);
          const [eh, em] = l.endTime.split(':').map(Number);
          return sum + (eh * 60 + em - (sh * 60 + sm)) / 60;
        }
        return sum;
      }, 0) * 10) / 10
    : coachesData.reduce((sum, coach) => sum + coach.totalHoursThisWeek, 0);

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="admin" />
      
      <div className="flex-1">
        <DashboardHeader userName="Admin" userRole="admin" />
        
        <main className="p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <Link href="/dashboard/admin">
              <Button variant="ghost" size="sm" className="mb-3">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-1">Coach Schedule Management</h1>
                <p className="text-gray-600 text-sm">Monitor coach availability and upcoming classes</p>
              </div>
              <Button onClick={() => setScheduleModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Schedule Class
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Active Coaches</p>
                <p className="text-xl sm:text-2xl font-bold text-primary-blue">{totalActiveCoaches}</p>
              </div>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Classes Today</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{totalClassesToday}</p>
              </div>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Total Hours/Week</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{totalHoursThisWeek}</p>
              </div>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Pending Demos</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">
                  {allUpcomingClasses.filter((cls: any) => cls.type === 'Demo' && cls.status === 'pending').length}
                </p>
              </div>
            </Card>
          </div>

          {/* Date Navigation */}
          <Card className="mb-4 sm:mb-6">
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
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev Month</span>
                </Button>
                <span className="text-sm font-medium text-gray-700">
                  {currentDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </span>
                <Button variant="outline" size="sm" onClick={handleNextMonth}>
                  <span className="hidden sm:inline">Next Month</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-4 sm:mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-white text-primary-blue shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('availability')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'availability'
                  ? 'bg-white text-primary-blue shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Coach Availability
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'classes'
                  ? 'bg-white text-primary-blue shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming Classes
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search coaches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
              />
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {filteredCoaches.map(coach => (
                <Card key={coach.id}>
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-primary-blue">{coach.name}</h3>
                          <p className="text-sm text-gray-600">{coach.email}</p>
                          <p className="text-xs text-gray-500">{coach.specialization} • Rating: {coach.rating}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={coach.status === 'active' ? 'success' : 'warning'}>
                            {coach.status === 'active' ? 'Active' : 'On Leave'}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedCoach(coach);
                              setDetailsModalOpen(true);
                            }}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">This Week</p>
                          <p className="text-lg font-semibold text-primary-blue">{coach.totalHoursThisWeek}h</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Upcoming Classes</p>
                          <p className="text-lg font-semibold text-green-600">{coach.upcomingClasses.length}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Pending Demos</p>
                          <p className="text-lg font-semibold text-orange-600">
                            {coach.upcomingClasses.filter((cls: any) => cls.type === 'Demo' && cls.status === 'pending').length}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Next 3 Classes</h4>
                        <div className="space-y-2">
                          {coach.upcomingClasses.slice(0, 3).map((cls: any) => (
                            <div key={cls.id} className="flex items-center justify-between bg-white border rounded-lg p-2">
                              <div className="flex items-center space-x-3">
                                <div className="text-xs">
                                  <p className="font-medium">{cls.date}</p>
                                  <p className="text-gray-600">{cls.time}</p>
                                </div>
                                <div className="text-xs">
                                  <p className="font-medium">{cls.student}</p>
                                  <p className="text-gray-600">{cls.type} • {cls.duration}</p>
                                </div>
                              </div>
                              <Badge variant={cls.status === 'confirmed' ? 'success' : 'warning'} className="text-xs">
                                {cls.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Availability Tab */}
          {activeTab === 'availability' && (
            <Card>
              <h3 className="text-lg font-semibold text-primary-blue mb-4">Coach Availability Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Coach</th>
                      {dayLabels.map(day => (
                        <th key={day} className="text-center p-3 text-sm font-medium text-gray-700">{day}</th>
                      ))}
                      <th className="text-center p-3 text-sm font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCoaches.map(coach => (
                      <tr key={coach.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <p className="font-semibold text-primary-blue text-sm">{coach.name}</p>
                            <p className="text-xs text-gray-600">{coach.specialization}</p>
                          </div>
                        </td>
                        {daysOfWeek.map(day => (
                          <td key={day} className="p-2 text-center">
                            <div className="space-y-1">
                              {coach.availability[day as keyof typeof coach.availability].map((slot: any, index: number) => (
                                <div
                                  key={index}
                                  className={`text-xs px-2 py-1 rounded ${
                                    slot === 'Unavailable'
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-green-100 text-green-700'
                                  }`}
                                >
                                  {slot}
                                </div>
                              ))}
                            </div>
                          </td>
                        ))}
                        <td className="p-3 text-center">
                          <Badge variant={coach.status === 'active' ? 'success' : 'warning'}>
                            {coach.status === 'active' ? 'Active' : 'On Leave'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Upcoming Classes Tab */}
          {activeTab === 'classes' && (
            <Card>
              <h3 className="text-lg font-semibold text-primary-blue mb-4">All Upcoming Classes</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Date & Time</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Coach</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Student/Batch</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Type</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Duration</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Status</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUpcomingClasses.map(cls => (
                      <tr key={`${cls.coachId}-${cls.id}`} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <p className="text-sm font-medium">{cls.date}</p>
                            <p className="text-xs text-gray-600">{cls.time}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <p className="text-sm font-medium text-primary-blue">{cls.coachName}</p>
                        </td>
                        <td className="p-3">
                          <p className="text-sm">{cls.student}</p>
                        </td>
                        <td className="p-3">
                          <Badge variant={
                            cls.type === 'Demo' ? 'info' :
                            cls.type === 'Group' ? 'success' : 'default'
                          }>
                            {cls.type}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <p className="text-sm">{cls.duration}</p>
                        </td>
                        <td className="p-3">
                          <Badge variant={cls.status === 'confirmed' ? 'success' : 'warning'}>
                            {cls.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="text-xs px-2 py-1" onClick={() => {
                              const coach = displayCoaches.find((c: any) => String(c.id) === String(cls.coachId));
                              if (coach) { setSelectedCoach(coach); setDetailsModalOpen(true); }
                            }}>
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs px-2 py-1" onClick={() => {
                              setNewLesson({
                                batchId: '',
                                coachId: String(cls.coachId || ''),
                                date: cls.date || '',
                                startTime: cls.time || '',
                                endTime: '',
                                topic: '',
                              });
                              setScheduleModalOpen(true);
                            }}>
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </main>
      </div>

      {/* Coach Details Modal */}
      {detailsModalOpen && selectedCoach && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-heading font-bold text-primary-blue mb-4">Coach Details - {selectedCoach.name}</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{selectedCoach.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Specialization</p>
                  <p className="font-medium">{selectedCoach.specialization}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="font-medium">{selectedCoach.rating}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge variant={selectedCoach.status === 'active' ? 'success' : 'warning'}>
                    {selectedCoach.status === 'active' ? 'Active' : 'On Leave'}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-primary-blue mb-2">Weekly Availability</h4>
                <div className="grid grid-cols-1 gap-2">
                  {daysOfWeek.map((day, index) => (
                    <div key={day} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-medium capitalize">{dayLabels[index]}:</span>
                      <div className="flex gap-2">
                        {selectedCoach.availability[day as keyof typeof selectedCoach.availability].map((slot: string, slotIndex: number) => (
                          <span
                            key={slotIndex}
                            className={`text-xs px-2 py-1 rounded ${
                              slot === 'Unavailable'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-primary-blue mb-2">All Upcoming Classes</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedCoach.upcomingClasses.map((cls: any) => (
                    <div key={cls.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{cls.date} at {cls.time}</p>
                        <p className="text-sm text-gray-600">{cls.student} • {cls.type} • {cls.duration}</p>
                      </div>
                      <Badge variant={cls.status === 'confirmed' ? 'success' : 'warning'}>
                        {cls.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDetailsModalOpen(false)}
              >
                Close
              </Button>
              <Button className="flex-1" onClick={() => { setDetailsModalOpen(false); setScheduleModalOpen(true); }}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Schedule
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Schedule Class Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-heading font-bold text-primary-blue">Schedule New Class</h3>
              <button onClick={() => setScheduleModalOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Batch */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Batch *</label>
                <select
                  value={newLesson.batchId}
                  onChange={(e) => setNewLesson({ ...newLesson, batchId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                >
                  <option value="">Select batch...</option>
                  {apiBatches.map((b: any) => (
                    <option key={b._id || b.id} value={b._id || b.id}>
                      {b.name} ({b.type || 'group'} - {b.level || 'all levels'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Coach */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Coach *</label>
                <select
                  value={newLesson.coachId}
                  onChange={(e) => setNewLesson({ ...newLesson, coachId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                >
                  <option value="">Select coach...</option>
                  {(apiCoaches.length > 0 ? apiCoaches : coachesData).map((c: any) => (
                    <option key={c._id || c.id} value={c._id || c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  value={newLesson.date}
                  onChange={(e) => setNewLesson({ ...newLesson, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                />
              </div>

              {/* Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Start Time *</label>
                  <input
                    type="time"
                    value={newLesson.startTime}
                    onChange={(e) => setNewLesson({ ...newLesson, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">End Time *</label>
                  <input
                    type="time"
                    value={newLesson.endTime}
                    onChange={(e) => setNewLesson({ ...newLesson, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                  />
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Topic (optional)</label>
                <input
                  type="text"
                  value={newLesson.topic}
                  onChange={(e) => setNewLesson({ ...newLesson, topic: e.target.value })}
                  placeholder="e.g., Opening strategies, Endgame tactics..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setScheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleCreateLesson} disabled={creating}>
                {creating ? 'Scheduling...' : 'Schedule Class'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}