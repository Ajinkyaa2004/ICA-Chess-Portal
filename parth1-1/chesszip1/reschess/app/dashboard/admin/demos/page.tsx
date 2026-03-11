'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, Plus, Search, Filter, Edit, Calendar, CheckCircle, Clock, Video, User, Download, AlertCircle } from 'lucide-react';

// Mock coaches with availability
const coaches = [
  { 
    id: 1, 
    name: 'IM Ramesh Kumar',
    availability: {
      monday: ['09:00-12:00', '14:00-17:00'],
      tuesday: ['10:00-13:00', '15:00-18:00'],
      wednesday: ['09:00-12:00', '14:00-17:00'],
      thursday: ['10:00-13:00', '15:00-18:00'],
      friday: ['09:00-12:00', '14:00-16:00'],
      saturday: ['10:00-15:00'],
      sunday: []
    }
  },
  { 
    id: 2, 
    name: 'FM Priya Sharma',
    availability: {
      monday: ['11:00-14:00', '16:00-19:00'],
      tuesday: ['09:00-12:00', '14:00-17:00'],
      wednesday: ['11:00-14:00', '16:00-19:00'],
      thursday: ['09:00-12:00', '14:00-17:00'],
      friday: ['10:00-13:00', '15:00-18:00'],
      saturday: ['09:00-14:00'],
      sunday: []
    }
  },
  { 
    id: 3, 
    name: 'CM Aditya Verma',
    availability: {
      monday: ['10:00-13:00', '15:00-17:00'],
      tuesday: ['09:00-12:00', '14:00-16:00'],
      wednesday: ['10:00-13:00', '15:00-17:00'],
      thursday: ['09:00-12:00', '14:00-16:00'],
      friday: ['10:00-12:00'],
      saturday: ['09:00-13:00'],
      sunday: []
    }
  },
];

// Mock admin owners
const adminOwners = [
  { id: 1, name: 'Admin A' },
  { id: 2, name: 'Admin B' },
  { id: 3, name: 'Admin C' },
];

// Mock demos - Complete lifecycle
const initialDemos = [
  // NEW: Pending Coach Assignment
  {
    id: 101,
    student: 'Ishaan Gupta',
    parent: 'Neha Gupta',
    parentPhone: '+91 98765 55555',
    parentEmail: 'neha.gupta@email.com',
    studentAge: 8,
    date: '2026-01-24',
    time: '11:00 AM',
    coach: null,
    coachId: null,
    adminOwner: 'Admin A',
    adminOwnerId: '',
    status: 'pending_assignment',
    attendance: null,
    outcome: null,
    outcomeNotes: '',
    paymentStatus: 'pending',
    meetingLink: null,
    notes: 'Newly booked - needs coach assignment',
  },
  {
    id: 102,
    student: 'Ananya Desai',
    parent: 'Kiran Desai',
    parentPhone: '+91 98765 66666',
    parentEmail: 'kiran.desai@email.com',
    studentAge: 10,
    date: '2026-01-25',
    time: '03:00 PM',
    coach: null,
    coachId: null,
    adminOwner: 'Admin B',
    adminOwnerId: 2,
    status: 'pending_assignment',
    attendance: null,
    outcome: null,
    outcomeNotes: '',
    paymentStatus: 'pending',
    meetingLink: null,
    notes: 'Parent requested female coach if possible',
  },
  {
    id: 103,
    student: 'Kabir Mehta',
    parent: 'Ravi Mehta',
    parentPhone: '+91 98765 77777',
    parentEmail: 'ravi.mehta@email.com',
    studentAge: 12,
    date: '2026-01-26',
    time: '05:00 PM',
    coach: null,
    coachId: null,
    adminOwner: 'Admin C',
    adminOwnerId: 3,
    status: 'pending_assignment',
    attendance: null,
    outcome: null,
    outcomeNotes: '',
    paymentStatus: 'pending',
    meetingLink: null,
    notes: 'Student has tournament experience',
  },
  // EXISTING DEMOS
  {
    id: 1,
    student: 'Arjun Patel',
    parent: 'Vikram Patel',
    parentPhone: '+91 98765 43210',
    parentEmail: 'vikram@email.com',
    studentAge: 12,
    date: '2026-01-18',
    time: '10:00 AM',
    coach: 'IM Ramesh Kumar',
    coachId: 1,
    adminOwner: 'Admin A',
    adminOwnerId: '',
    status: 'scheduled',
    attendance: null,
    outcome: null,
    outcomeNotes: '',
    paymentStatus: 'pending',
    meetingLink: 'https://zoom.us/j/123456789',
    notes: 'Interested in competitive chess',
  },
  {
    id: 2,
    student: 'Priya Singh',
    parent: 'Rajesh Singh',
    parentPhone: '+91 98765 43211',
    parentEmail: 'rajesh@email.com',
    studentAge: 10,
    date: '2026-01-20',
    time: '03:00 PM',
    coach: 'FM Priya Sharma',
    coachId: 2,
    adminOwner: 'Admin B',
    adminOwnerId: 2,
    status: 'scheduled',
    attendance: null,
    outcome: null,
    outcomeNotes: '',
    paymentStatus: 'pending',
    meetingLink: null,
    notes: 'Complete beginner',
  },
  {
    id: 3,
    student: 'Rohan Kumar',
    parent: 'Sunita Kumar',
    parentPhone: '+91 98765 43212',
    parentEmail: 'sunita@email.com',
    studentAge: 14,
    date: '2026-01-15',
    time: '11:00 AM',
    coach: 'IM Ramesh Kumar',
    coachId: 1,
    adminOwner: 'Admin A',
    adminOwnerId: '',
    status: 'completed',
    attendance: 'attended',
    outcome: 'interested',
    outcomeNotes: 'Very interested, wants 1-1 sessions, budget ₹15k/month',
    paymentStatus: 'pending',
    meetingLink: 'https://zoom.us/j/987654321',
    notes: 'Has basic knowledge',
  },
  {
    id: 4,
    student: 'Sneha Reddy',
    parent: 'Anand Reddy',
    parentPhone: '+91 98765 43213',
    parentEmail: 'anand@email.com',
    studentAge: 9,
    date: '2026-01-16',
    time: '02:00 PM',
    coach: 'CM Aditya Verma',
    coachId: 3,
    adminOwner: 'Admin B',
    adminOwnerId: 2,
    status: 'completed',
    attendance: 'attended',
    outcome: 'converted',
    outcomeNotes: 'Enrolled in Beginners Batch A, paid ₹12,000',
    paymentStatus: 'paid',
    meetingLink: 'https://zoom.us/j/456789123',
    notes: 'Parents want structured learning',
  },
  {
    id: 5,
    student: 'Aditya Sharma',
    parent: 'Meera Sharma',
    parentPhone: '+91 98765 43214',
    parentEmail: 'meera@email.com',
    studentAge: 11,
    date: '2026-01-17',
    time: '04:30 PM',
    coach: 'IM Ramesh Kumar',
    coachId: 1,
    adminOwner: 'Admin C',
    adminOwnerId: 3,
    status: 'completed',
    attendance: 'attended',
    outcome: null,
    outcomeNotes: '',
    paymentStatus: 'pending',
    meetingLink: 'https://zoom.us/j/321654987',
    notes: 'School chess club member',
  },
  {
    id: 6,
    student: 'Kavya Nair',
    parent: 'Suresh Nair',
    parentPhone: '+91 98765 43215',
    parentEmail: 'suresh@email.com',
    studentAge: 13,
    date: '2026-01-14',
    time: '10:00 AM',
    coach: 'FM Priya Sharma',
    coachId: 2,
    adminOwner: 'Admin A',
    adminOwnerId: '',
    status: 'completed',
    attendance: 'no_show',
    outcome: 'not_interested',
    outcomeNotes: 'Parent not responding to follow-up calls',
    paymentStatus: 'na',
    meetingLink: 'https://zoom.us/j/147258369',
    notes: 'Rescheduled twice',
  },
];

// Helper function to check coach availability
const checkCoachAvailability = (coachId: number, demoDate: string, demoTime: string) => {
  const coach = coaches.find(c => c.id === coachId);
  if (!coach) return { available: false, reason: 'Coach not found' };

  const date = new Date(demoDate);
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = dayNames[date.getDay()] as keyof typeof coach.availability;
  
  const dayAvailability = coach.availability[dayName];
  
  if (!dayAvailability || dayAvailability.length === 0) {
    return { available: false, reason: 'Not available on this day' };
  }

  // Convert demo time to 24-hour format for comparison
  const timeMatch = demoTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!timeMatch) return { available: false, reason: 'Invalid time format' };
  
  let hours = parseInt(timeMatch[1]);
  const minutes = timeMatch[2];
  const period = timeMatch[3].toUpperCase();
  
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  const demoTimeStr = `${hours.toString().padStart(2, '0')}:${minutes}`;
  
  // Check if demo time falls within any availability slot
  for (const slot of dayAvailability) {
    const [start, end] = slot.split('-');
    if (demoTimeStr >= start && demoTimeStr < end) {
      return { available: true, reason: `Available ${slot}` };
    }
  }
  
  return { available: false, reason: `Busy - Available: ${dayAvailability.join(', ')}` };
};

export default function AdminDemosPage() {
  const [demos, setDemos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiCoaches, setApiCoaches] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDemo, setSelectedDemo] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'outcome' | 'assign'>('create');
  const [assignCoachId, setAssignCoachId] = useState<string | number>('');
  const [meetingLink, setMeetingLink] = useState<string | number>('');

  const [demoForm, setDemoForm] = useState({
    student: '',
    parent: '',
    parentPhone: '',
    parentEmail: '',
    studentAge: '',
    date: '',
    time: '',
    coachId: '',
    adminOwnerId: '',
    notes: '',
    meetingLink: '',
  });

  const [outcomeForm, setOutcomeForm] = useState({
    attendance: 'attended',
    outcome: 'interested',
    outcomeNotes: '',
    paymentStatus: 'pending',
  });

  // Normalize API demo shape to match the UI's expected field names
  const normalizeDemo = (d: any) => ({
    ...d,
    id: d._id,
    student: d.studentName || '',
    parent: d.parentName || '',
    studentAge: d.age || 0,
    date: d.preferredDate ? d.preferredDate.split('T')[0] : '',
    time: d.preferredTime || '',
    coach: d.coachId?.name || '',
    coachId: d.coachId?._id || d.coachId || null,
    // Map API statuses to UI statuses
    status: (() => {
      const s = d.status;
      if (s === 'BOOKED' && !d.coachId) return 'pending_assignment';
      if (s === 'BOOKED') return 'scheduled';
      if (s === 'ATTENDED') return 'completed';
      if (s === 'CONVERTED') return 'converted';
      if (s === 'NOT_INTERESTED') return 'not_interested';
      if (s === 'INTERESTED') return 'interested';
      if (s === 'PAYMENT_PENDING') return 'payment_pending';
      if (s === 'NO_SHOW') return 'no_show';
      if (s === 'CANCELLED') return 'cancelled';
      if (s === 'RESCHEDULED') return 'rescheduled';
      return s?.toLowerCase() || 'scheduled';
    })(),
    attendance: d.status === 'ATTENDED' ? 'attended' : d.status === 'NO_SHOW' ? 'no_show' : null,
    outcome: d.status === 'CONVERTED' ? 'converted' : d.status === 'NOT_INTERESTED' ? 'not_interested' : d.status === 'INTERESTED' ? 'interested' : null,
    outcomeNotes: d.notes || '',
    paymentStatus: d.status === 'PAYMENT_PENDING' ? 'pending' : d.status === 'CONVERTED' ? 'paid' : 'pending',
    adminOwner: '',
    adminOwnerId: '',
    meetingLink: null,
  });

  const fetchDemos = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/demos?limit=100');
      if (res.ok) {
        const json = await res.json();
        setDemos((json.data || json.demos || []).map(normalizeDemo));
      }
    } catch (err) {
      console.error('Failed to fetch demos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemos();
    // Fetch coaches for assignment dropdowns
    fetch('/api/coaches').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.data || json?.coaches) setApiCoaches(json.data || json.coaches);
    }).catch(() => {});
  }, []);

  const pendingAssignments = demos.filter(d => d.status === 'BOOKED' && !d.coachId);

  const filteredDemos = demos.filter(demo => {
    const matchesStatus = filterStatus === 'all' || demo.status === filterStatus ||
      (filterStatus === 'pending_assignment' && demo.status === 'BOOKED' && !demo.coachId) ||
      (filterStatus === 'scheduled' && demo.status === 'BOOKED' && demo.coachId);
    const matchesSearch =
      (demo.studentName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (demo.parentName || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreateDemo = async () => {
    try {
      const res = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: demoForm.student,
          parentName: demoForm.parent,
          parentPhone: demoForm.parentPhone,
          parentEmail: demoForm.parentEmail,
          age: Number(demoForm.studentAge),
          preferredDate: demoForm.date,
          preferredTime: demoForm.time,
          coachId: demoForm.coachId || undefined,
          notes: demoForm.notes,
        }),
      });
      if (res.ok) {
        setModalOpen(false);
        setDemoForm({ student: '', parent: '', parentPhone: '', parentEmail: '', studentAge: '', date: '', time: '', coachId: '', adminOwnerId: '', notes: '', meetingLink: '' });
        fetchDemos();
      }
    } catch (err) {
      console.error('Failed to create demo:', err);
    }
  };

  const handleEditDemo = async () => {
    if (!selectedDemo) return;
    try {
      const res = await fetch(`/api/demos/${selectedDemo.id || selectedDemo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: demoForm.student,
          parentName: demoForm.parent,
          parentPhone: demoForm.parentPhone,
          parentEmail: demoForm.parentEmail,
          age: Number(demoForm.studentAge),
          preferredDate: demoForm.date,
          preferredTime: demoForm.time,
          coachId: demoForm.coachId || undefined,
          notes: demoForm.notes,
        }),
      });
      if (res.ok) {
        setModalOpen(false);
        setSelectedDemo(null);
        fetchDemos();
      }
    } catch (err) {
      console.error('Failed to update demo:', err);
    }
  };

  const handleSubmitOutcome = async () => {
    if (!selectedDemo) return;
    // Map UI outcome values to API status values
    const statusMap: Record<string, string> = {
      attended: 'ATTENDED',
      no_show: 'NO_SHOW',
      interested: 'INTERESTED',
      not_interested: 'NOT_INTERESTED',
      payment_pending: 'PAYMENT_PENDING',
      converted: 'CONVERTED',
    };
    const newStatus = statusMap[outcomeForm.outcome] || 'ATTENDED';
    try {
      const res = await fetch(`/api/demos/${selectedDemo.id || selectedDemo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes: outcomeForm.outcomeNotes }),
      });
      if (res.ok) {
        setModalOpen(false);
        setSelectedDemo(null);
        fetchDemos();
      }
    } catch (err) {
      console.error('Failed to submit outcome:', err);
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setDemoForm({ student: '', parent: '', parentPhone: '', parentEmail: '', studentAge: '', date: '', time: '', coachId: '', adminOwnerId: '', notes: '', meetingLink: '' });
    setModalOpen(true);
  };

  const openEditModal = (demo: any) => {
    setModalMode('edit');
    setSelectedDemo(demo);
    setDemoForm({
      student: demo.studentName || demo.student || '',
      parent: demo.parentName || demo.parent || '',
      parentPhone: demo.parentPhone || '',
      parentEmail: demo.parentEmail || '',
      studentAge: (demo.age || demo.studentAge || '').toString(),
      date: demo.preferredDate ? demo.preferredDate.split('T')[0] : (demo.date || ''),
      time: demo.preferredTime || demo.time || '',
      coachId: demo.coachId?._id || demo.coachId || '',
      adminOwnerId: '',
      notes: demo.notes || '',
      meetingLink: '',
    });
    setModalOpen(true);
  };

  const openOutcomeModal = (demo: any) => {
    setModalMode('outcome');
    setSelectedDemo(demo);
    setOutcomeForm({
      attendance: demo.attendance || 'attended',
      outcome: demo.outcome || 'interested',
      outcomeNotes: demo.outcomeNotes || '',
      paymentStatus: demo.paymentStatus || 'pending',
    });
    setModalOpen(true);
  };

  const openAssignCoachModal = (demo: any) => {
    setModalMode('assign');
    setSelectedDemo(demo);
    setAssignCoachId('');
    setMeetingLink('');
    setModalOpen(true);
  };

  const handleAssignCoach = async () => {
    if (!selectedDemo) return;
    try {
      const res = await fetch(`/api/demos/${selectedDemo.id || selectedDemo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coachId: assignCoachId }),
      });
      if (res.ok) {
        setModalOpen(false);
        setSelectedDemo(null);
        setMeetingLink('');
        fetchDemos();
      }
    } catch (err) {
      console.error('Failed to assign coach:', err);
    }
  };

  const exportDemos = () => {
    const csv = filteredDemos.map(d =>
      `${d.studentName || ''},${d.parentName || ''},${d.preferredDate || ''},${d.preferredTime || ''},${d.coachId?.name || ''},${d.status},`
    ).join('\n');
    const blob = new Blob([`Student,Parent,Date,Time,Coach,Status\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'demos.csv';
    a.click();
  };

  const pendingOutcomesCount = demos.filter(d => d.status === 'ATTENDED').length;

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
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-1">Demo Pipeline Management</h1>
                <p className="text-gray-600 text-sm">Full demo lifecycle control - Admin owns demos end-to-end</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={exportDemos}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button onClick={openCreateModal}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Demo
                </Button>
              </div>
            </div>
          </div>

          {/* Pending Outcomes Alert */}
          {pendingOutcomesCount > 0 && (
            <Card className="mb-4 bg-red-50 border-red-200">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">⚠️ {pendingOutcomesCount} Demo Outcomes Pending</h4>
                  <p className="text-sm text-red-700">
                    <strong>Demo outcomes are MANDATORY.</strong> Submit outcomes for all completed demos immediately.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* NEW: Pending Coach Assignments */}
          {pendingAssignments.length > 0 && (
            <Card className="mb-4 bg-orange-50 border-orange-300">
              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-semibold text-orange-900">
                    🎯 {pendingAssignments.length} Newly Booked Demo{pendingAssignments.length > 1 ? 's' : ''} - Assign Coach
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-orange-700 mb-3">
                  These demos need coach assignment before they can be scheduled.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {pendingAssignments.map(demo => (
                  <div key={demo.id} className="bg-white border border-orange-200 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-primary-blue text-sm sm:text-base truncate">{demo.student}</h4>
                            <p className="text-xs sm:text-sm text-gray-600">
                              Age: {demo.studentAge} | Parent: {demo.parent}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{demo.parentPhone}</p>
                          </div>
                          <Badge variant="warning" className="ml-2 flex-shrink-0 text-xs">Unassigned</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <div>
                            <span className="font-medium">Date:</span> {new Date(demo.date).toLocaleDateString('en-IN')}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span> {demo.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Button 
                          size="sm" 
                          className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-xs sm:text-sm"
                          onClick={() => openAssignCoachModal(demo)}
                        >
                          <User className="w-3 h-3 mr-1" />
                          Assign Coach
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Filters & Search */}
          <Card className="mb-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by student or parent name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                >
                  <option value="all">All Demos ({demos.filter(d => d.status !== 'pending_assignment').length})</option>
                  <option value="scheduled">Scheduled ({demos.filter(d => d.status === 'scheduled').length})</option>
                  <option value="completed">Completed ({demos.filter(d => d.status === 'completed').length})</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
            <Card className="bg-yellow-50 border-yellow-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-700">{demos.filter(d => d.status === 'scheduled').length}</p>
                <p className="text-xs text-gray-700 mt-1">Scheduled</p>
              </div>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-700">{demos.filter(d => d.status === 'completed').length}</p>
                <p className="text-xs text-gray-700 mt-1">Completed</p>
              </div>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">{demos.filter(d => d.attendance === 'attended').length}</p>
                <p className="text-xs text-gray-700 mt-1">Attended</p>
              </div>
            </Card>
            <Card className="bg-red-50 border-red-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-700">{demos.filter(d => d.attendance === 'no_show').length}</p>
                <p className="text-xs text-gray-700 mt-1">No-Show</p>
              </div>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-700">{demos.filter(d => d.outcome === 'interested').length}</p>
                <p className="text-xs text-gray-700 mt-1">Interested</p>
              </div>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-700">{demos.filter(d => d.paymentStatus === 'pending' && d.outcome === 'interested').length}</p>
                <p className="text-xs text-gray-700 mt-1">Payment Pending</p>
              </div>
            </Card>
          </div>

          {/* Demos Table */}
          {filteredDemos.length > 0 ? (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Details</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDemos.map(demo => (
                      <tr key={demo.id} className="hover:bg-gray-50">
                        {/* Student Details */}
                        <td className="px-4 py-4">
                          <div className="min-w-0">
                            <h4 className="font-semibold text-sm text-primary-blue truncate">{demo.student}</h4>
                            <p className="text-xs text-gray-600">Age: {demo.studentAge}</p>
                            <p className="text-xs text-gray-600 truncate">Parent: {demo.parent}</p>
                            <p className="text-xs text-gray-500 truncate">{demo.parentPhone}</p>
                            {demo.notes && (
                              <p className="text-xs text-gray-600 italic bg-gray-50 p-1 rounded mt-1 line-clamp-2" title={demo.notes}>
                                {demo.notes}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Schedule */}
                        <td className="px-4 py-4">
                          <div className="text-xs">
                            <p className="font-medium text-gray-900">
                              {new Date(demo.date).toLocaleDateString('en-IN')}
                            </p>
                            <p className="text-gray-600">{demo.time}</p>
                            {demo.meetingLink && (
                              <a href={demo.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center mt-1">
                                <Video className="w-3 h-3 mr-1" />
                                Join Meeting
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Assignment */}
                        <td className="px-4 py-4">
                          <div className="text-xs">
                            <p className="font-medium text-gray-900">{demo.coach}</p>
                            <p className="text-gray-600">Admin: {demo.adminOwner}</p>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <Badge 
                              variant={demo.status === 'scheduled' ? 'warning' : 'success'}
                              className="text-xs"
                            >
                              {demo.status}
                            </Badge>
                            {demo.status === 'completed' && (
                              <div>
                                <Badge variant={demo.attendance === 'attended' ? 'success' : 'error'} className="text-xs">
                                  {demo.attendance === 'attended' ? 'Attended' : 'No-Show'}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Outcome */}
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            {demo.status === 'completed' && demo.outcome && (
                              <>
                                <Badge 
                                  variant={
                                    demo.outcome === 'converted' ? 'success' :
                                    demo.outcome === 'interested' ? 'info' :
                                    demo.outcome === 'not_interested' ? 'error' : 'warning'
                                  }
                                  className="text-xs"
                                >
                                  {demo.outcome === 'converted' ? 'Converted' :
                                   demo.outcome === 'interested' ? 'Interested' :
                                   demo.outcome === 'not_interested' ? 'Not Interested' : 'Pending'}
                                </Badge>
                                {demo.outcome === 'interested' && (
                                  <div>
                                    <Badge variant={demo.paymentStatus === 'paid' ? 'success' : 'warning'} className="text-xs">
                                      {demo.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
                                    </Badge>
                                  </div>
                                )}
                                {demo.outcomeNotes && (
                                  <p className="text-xs text-gray-600 bg-gray-50 p-1 rounded line-clamp-2" title={demo.outcomeNotes}>
                                    {demo.outcomeNotes}
                                  </p>
                                )}
                              </>
                            )}
                            {demo.status === 'completed' && !demo.outcome && (
                              <Badge variant="error" className="text-xs">Outcome Pending</Badge>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex flex-col space-y-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs px-2 py-1"
                              onClick={() => openEditModal(demo)}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>

                            {demo.status === 'completed' && !demo.outcome && (
                              <Button 
                                size="sm" 
                                className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700"
                                onClick={() => openOutcomeModal(demo)}
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Submit Outcome
                              </Button>
                            )}

                            {demo.status === 'completed' && demo.outcome && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-xs px-2 py-1"
                                onClick={() => openOutcomeModal(demo)}
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Edit Outcome
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <Card className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Demos Found</h3>
              <p className="text-gray-600 mb-4">Create your first demo to get started</p>
              <Button onClick={openCreateModal}>
                <Plus className="w-4 h-4 mr-2" />
                Create Demo
              </Button>
            </Card>
          )}
        </main>
      </div>

      {/* Modal - Create/Edit Demo, Submit Outcome, or Assign Coach */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
          <Card className="max-w-2xl w-full my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-heading font-bold text-primary-blue mb-3 sm:mb-4 sticky top-0 bg-white pb-2 border-b">
              {modalMode === 'create' ? 'Create New Demo' : 
               modalMode === 'edit' ? 'Edit Demo' : 
               modalMode === 'assign' ? '🎯 Assign Coach to Demo' :
               'Submit Demo Outcome (MANDATORY)'}
            </h3>

            {modalMode === 'assign' ? (
              /* Assign Coach Form */
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Demo Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-gray-600">Student:</span>
                      <p className="font-medium truncate">{selectedDemo?.student}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Age:</span>
                      <p className="font-medium">{selectedDemo?.studentAge}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-gray-600">Parent:</span>
                      <p className="font-medium truncate">{selectedDemo?.parent}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-gray-600">Date & Time:</span>
                      <p className="font-medium">
                        {selectedDemo?.date ? new Date(selectedDemo.date).toLocaleDateString('en-IN') : ''} at {selectedDemo?.time}
                      </p>
                    </div>
                  </div>
                  {selectedDemo?.notes && (
                    <div className="mt-2 sm:mt-3">
                      <span className="text-gray-600 text-xs sm:text-sm">Notes:</span>
                      <p className="text-xs sm:text-sm bg-white p-2 rounded mt-1 italic">{selectedDemo.notes}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Select Coach * <span className="text-xs text-gray-500">(Choose the best coach for this student)</span>
                  </label>
                  <div className="space-y-2">
                    {coaches.map(coach => {
                      const availabilityInfo = selectedDemo ? checkCoachAvailability(coach.id, selectedDemo.date, selectedDemo.time) : { available: true, reason: '' };
                      
                      return (
                        <div
                          key={coach.id}
                          onClick={() => setAssignCoachId(coach.id)}
                          className={`p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            assignCoachId === coach.id
                              ? 'border-primary-blue bg-blue-50'
                              : availabilityInfo.available 
                                ? 'border-gray-200 hover:border-gray-300'
                                : 'border-red-200 bg-red-50'
                          }`}
                        >
                          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 ${
                              assignCoachId === coach.id ? 'border-primary-blue' : 'border-gray-300'
                            }`}>
                              {assignCoachId === coach.id && (
                                <div className="w-2 h-2 rounded-full bg-primary-blue"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 text-sm sm:text-base">{coach.name}</p>
                              <p className="text-xs text-gray-500 line-clamp-2 sm:line-clamp-1">
                                {coach.id === 1 ? 'International Master - Best for advanced students' :
                                 coach.id === 2 ? 'FIDE Master - Great with beginners & girls' :
                                 'Candidate Master - Tournament preparation specialist'}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              {availabilityInfo.available ? (
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  <div className="text-right hidden sm:block">
                                    <p className="text-xs font-semibold text-green-700 whitespace-nowrap">Available</p>
                                    <p className="text-xs text-gray-500 whitespace-nowrap">{availabilityInfo.reason}</p>
                                  </div>
                                  <div className="text-right sm:hidden">
                                    <p className="text-xs font-semibold text-green-700">✓</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                                  <div className="text-right hidden sm:block">
                                    <p className="text-xs font-semibold text-red-700 whitespace-nowrap">Busy</p>
                                    <p className="text-xs text-gray-500 max-w-[120px] truncate" title={availabilityInfo.reason}>
                                      {availabilityInfo.reason}
                                    </p>
                                  </div>
                                  <div className="text-right sm:hidden">
                                    <p className="text-xs font-semibold text-red-700">✗</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Zoom Meeting Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    placeholder="https://zoom.us/j/123456789 or leave blank to add later"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Parent and student will see "Join Meeting" button once link is added
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sticky bottom-0 bg-white border-t mt-4 pt-3">
                  <Button
                    variant="outline"
                    className="flex-1 text-sm"
                    onClick={() => {
                      setModalOpen(false);
                      setSelectedDemo(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-sm"
                    onClick={handleAssignCoach}
                  >
                    <User className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Assign Coach & Schedule Demo</span>
                    <span className="sm:hidden">Assign & Schedule</span>
                  </Button>
                </div>
              </div>
            ) : modalMode !== 'outcome' ? (
              /* Create/Edit Form */
              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
                    <input
                      type="text"
                      value={demoForm.student}
                      onChange={(e) => setDemoForm({ ...demoForm, student: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Age *</label>
                    <input
                      type="number"
                      value={demoForm.studentAge}
                      onChange={(e) => setDemoForm({ ...demoForm, studentAge: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name *</label>
                    <input
                      type="text"
                      value={demoForm.parent}
                      onChange={(e) => setDemoForm({ ...demoForm, parent: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parent Phone *</label>
                    <input
                      type="tel"
                      value={demoForm.parentPhone}
                      onChange={(e) => setDemoForm({ ...demoForm, parentPhone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Email *</label>
                  <input
                    type="email"
                    value={demoForm.parentEmail}
                    onChange={(e) => setDemoForm({ ...demoForm, parentEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="date"
                      value={demoForm.date}
                      onChange={(e) => setDemoForm({ ...demoForm, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                    <input
                      type="time"
                      value={demoForm.time}
                      onChange={(e) => setDemoForm({ ...demoForm, time: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign Coach *</label>
                    <select
                      value={demoForm.coachId}
                      onChange={(e) => setDemoForm({ ...demoForm, coachId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      {coaches.map(coach => (
                        <option key={coach.id} value={coach.id}>{coach.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign Admin Owner *</label>
                    <select
                      value={demoForm.adminOwnerId}
                      onChange={(e) => setDemoForm({ ...demoForm, adminOwnerId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      {adminOwners.map(admin => (
                        <option key={admin.id} value={admin.id}>{admin.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={demoForm.notes}
                    onChange={(e) => setDemoForm({ ...demoForm, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    placeholder="Student interests, parent requirements, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zoom Meeting Link {modalMode === 'edit' && '(Add if missing)'}
                  </label>
                  <input
                    type="url"
                    value={demoForm.meetingLink}
                    onChange={(e) => setDemoForm({ ...demoForm, meetingLink: e.target.value })}
                    placeholder="https://zoom.us/j/123456789"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Parent and student will see "Join Meeting" button once link is added
                  </p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setModalOpen(false);
                      setSelectedDemo(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={modalMode === 'create' ? handleCreateDemo : handleEditDemo}
                    disabled={
                      !demoForm.student || !demoForm.parent || !demoForm.parentPhone || 
                      !demoForm.parentEmail || !demoForm.date || !demoForm.time || !demoForm.studentAge
                    }
                  >
                    {modalMode === 'create' ? 'Create Demo' : 'Update Demo'}
                  </Button>
                </div>
              </div>
            ) : (
              /* Outcome Form */
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attendance *</label>
                  <select
                    value={outcomeForm.attendance}
                    onChange={(e) => setOutcomeForm({ ...outcomeForm, attendance: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    <option value="attended">Attended</option>
                    <option value="no_show">No-Show</option>
                  </select>
                </div>

                {outcomeForm.attendance === 'attended' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Demo Outcome * (MANDATORY)</label>
                      <select
                        value={outcomeForm.outcome}
                        onChange={(e) => setOutcomeForm({ ...outcomeForm, outcome: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      >
                        <option value="interested">Interested</option>
                        <option value="converted">Converted (Paid)</option>
                        <option value="not_interested">Not Interested</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Outcome Notes * (MANDATORY)</label>
                      <textarea
                        value={outcomeForm.outcomeNotes}
                        onChange={(e) => setOutcomeForm({ ...outcomeForm, outcomeNotes: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="Student interest level, parent feedback, pricing discussion, next steps, etc."
                      />
                    </div>

                    {outcomeForm.outcome === 'interested' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                        <select
                          value={outcomeForm.paymentStatus}
                          onChange={(e) => setOutcomeForm({ ...outcomeForm, paymentStatus: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        >
                          <option value="pending">Pending</option>
                          <option value="following_up">Following Up</option>
                        </select>
                      </div>
                    )}

                    {outcomeForm.outcome === 'converted' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                        <select
                          value={outcomeForm.paymentStatus}
                          onChange={(e) => setOutcomeForm({ ...outcomeForm, paymentStatus: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        >
                          <option value="paid">Paid</option>
                        </select>
                      </div>
                    )}
                  </>
                )}

                {outcomeForm.attendance === 'no_show' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No-Show Reason</label>
                    <textarea
                      value={outcomeForm.outcomeNotes}
                      onChange={(e) => setOutcomeForm({ ...outcomeForm, outcomeNotes: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      placeholder="Parent not responding, rescheduled, etc."
                    />
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setModalOpen(false);
                      setSelectedDemo(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={handleSubmitOutcome}
                    disabled={
                      outcomeForm.attendance === 'attended' && !outcomeForm.outcomeNotes.trim()
                    }
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Outcome
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
