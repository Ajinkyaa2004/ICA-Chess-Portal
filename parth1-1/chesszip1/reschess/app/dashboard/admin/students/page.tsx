'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, Plus, Search, Filter, Edit, UserPlus, Pause, XCircle, Play, Download } from 'lucide-react';

// Mock coaches
const coaches = [
  { id: 1, name: 'IM Ramesh Kumar' },
  { id: 2, name: 'FM Priya Sharma' },
  { id: 3, name: 'CM Aditya Verma' },
];

// Mock batches
const batches = [
  { id: 1, name: 'Beginners Batch A', level: 'Beginner' },
  { id: 2, name: 'Intermediate Batch B', level: 'Intermediate' },
  { id: 3, name: 'Advanced Batch C', level: 'Advanced' },
  { id: 4, name: '1-1 Sessions', level: 'Mixed' },
];

// Mock students - Created AFTER payment
const _initialStudents = [
  {
    id: 1,
    name: 'Arjun Patel',
    age: 12,
    parent: 'Vikram Patel',
    parentPhone: '+91 98765 43210',
    parentEmail: 'vikram@email.com',
    coach: 'IM Ramesh Kumar',
    coachId: 1,
    batch: 'Beginners Batch A',
    batchId: 1,
    type: 'group',
    level: 'Beginner',
    status: 'active',
    subscriptionStatus: 'active',
    joinedDate: '2026-01-10',
    rating: 800,
    attendance: 95,
  },
  {
    id: 2,
    name: 'Priya Singh',
    age: 10,
    parent: 'Rajesh Singh',
    parentPhone: '+91 98765 43211',
    parentEmail: 'rajesh@email.com',
    coach: 'FM Priya Sharma',
    coachId: 2,
    batch: 'Beginners Batch A',
    batchId: 1,
    type: 'group',
    level: 'Beginner',
    status: 'active',
    subscriptionStatus: 'active',
    joinedDate: '2026-01-12',
    rating: 750,
    attendance: 90,
  },
  {
    id: 3,
    name: 'Rohan Kumar',
    age: 14,
    parent: 'Sunita Kumar',
    parentPhone: '+91 98765 43212',
    parentEmail: 'sunita@email.com',
    coach: 'IM Ramesh Kumar',
    coachId: 1,
    batch: '1-1 Sessions',
    batchId: 4,
    type: '1-1',
    level: 'Intermediate',
    status: 'active',
    subscriptionStatus: 'active',
    joinedDate: '2026-01-08',
    rating: 1200,
    attendance: 98,
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    age: 9,
    parent: 'Anand Reddy',
    parentPhone: '+91 98765 43213',
    parentEmail: 'anand@email.com',
    coach: 'CM Aditya Verma',
    coachId: 3,
    batch: 'Intermediate Batch B',
    batchId: 2,
    type: 'group',
    level: 'Intermediate',
    status: 'paused',
    subscriptionStatus: 'paused',
    joinedDate: '2025-12-15',
    rating: 950,
    attendance: 88,
  },
  {
    id: 5,
    name: 'Aditya Sharma',
    age: 11,
    parent: 'Meera Sharma',
    parentPhone: '+91 98765 43214',
    parentEmail: 'meera@email.com',
    coach: 'IM Ramesh Kumar',
    coachId: 1,
    batch: 'Beginners Batch A',
    batchId: 1,
    type: 'group',
    level: 'Beginner',
    status: 'cancelled',
    subscriptionStatus: 'cancelled',
    joinedDate: '2025-11-20',
    rating: 780,
    attendance: 75,
  },
];

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const [studentForm, setStudentForm] = useState({
    name: '',
    age: '',
    parent: '',
    parentPhone: '',
    parentEmail: '',
    coachId: '',
    batchId: '',
    type: 'group' as 'group' | '1-1',
    level: 'beginner',
  });

  const normalizeStudent = (s: any) => ({
    ...s,
    id: s._id,
    parent: s.parentName || '',
    status: (s.status || 'ACTIVE').toLowerCase(),
    subscriptionStatus: (s.status || 'ACTIVE').toLowerCase(),
    type: s.studentType || 'group',
    joinedDate: s.joinDate ? s.joinDate.split('T')[0] : '',
    rating: 800,
    attendance: 95,
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ limit: '100' });
      if (searchQuery) params.set('search', searchQuery);
      if (filterStatus !== 'all') params.set('status', filterStatus.toUpperCase());
      const res = await fetch(`/api/students?${params}`);
      if (res.ok) {
        const json = await res.json();
        setStudents((json.data || json.students || []).map(normalizeStudent));
      }
    } catch (err) {
      console.error('Failed to fetch students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  const filteredStudents = students.filter(student => {
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    const matchesType = filterType === 'all' || student.type === filterType;
    const matchesSearch =
      (student.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.parent || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const handleCreateStudent = async () => {
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: studentForm.name,
          age: Number(studentForm.age),
          parentName: studentForm.parent,
          parentPhone: studentForm.parentPhone,
          parentEmail: studentForm.parentEmail,
          level: studentForm.level,
          studentType: studentForm.type,
        }),
      });
      if (res.ok) {
        setModalOpen(false);
        setStudentForm({ name: '', age: '', parent: '', parentPhone: '', parentEmail: '', coachId: '', batchId: '', type: 'group', level: 'beginner' });
        fetchStudents();
      }
    } catch (err) {
      console.error('Failed to create student:', err);
    }
  };

  const handleEditStudent = async () => {
    if (!selectedStudent) return;
    try {
      const res = await fetch(`/api/students/${selectedStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: studentForm.name,
          age: Number(studentForm.age),
          parentName: studentForm.parent,
          parentPhone: studentForm.parentPhone,
          parentEmail: studentForm.parentEmail,
          level: studentForm.level,
          studentType: studentForm.type,
        }),
      });
      if (res.ok) {
        setModalOpen(false);
        setSelectedStudent(null);
        fetchStudents();
      }
    } catch (err) {
      console.error('Failed to update student:', err);
    }
  };

  const handleStatusChange = async (studentId: string, newStatus: 'active' | 'paused' | 'cancelled') => {
    try {
      await fetch(`/api/students/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus.toUpperCase() }),
      });
      fetchStudents();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setStudentForm({ name: '', age: '', parent: '', parentPhone: '', parentEmail: '', coachId: '', batchId: '', type: 'group', level: 'beginner' });
    setModalOpen(true);
  };

  const openEditModal = (student: any) => {
    setModalMode('edit');
    setSelectedStudent(student);
    setStudentForm({
      name: student.name,
      age: student.age.toString(),
      parent: student.parent,
      parentPhone: student.parentPhone,
      parentEmail: student.parentEmail,
      coachId: student.coachId,
      batchId: student.batchId,
      type: student.type,
      level: student.level,
    });
    setModalOpen(true);
  };

  const exportStudents = () => {
    const csv = filteredStudents.map(s =>
      `${s.name},${s.age},${s.parent},${s.type},${s.level},${s.status}`
    ).join('\n');
    const blob = new Blob([`Name,Age,Parent,Type,Level,Status\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
  };

  const activeCount = students.filter(s => s.status === 'active').length;
  const pausedCount = students.filter(s => s.status === 'paused').length;
  const oneOnOneCount = students.filter(s => s.type === '1-1').length;
  const groupCount = students.filter(s => s.type === 'group').length;

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
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-1">Student Management</h1>
                <p className="text-gray-600 text-sm">Create students after payment, assign coach/batch, manage subscriptions</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={exportStudents}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button onClick={openCreateModal}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </div>
            </div>
          </div>

          {/* Info Notice */}
          <Card className="mb-4 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <UserPlus className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Student Creation After Payment</h4>
                <p className="text-sm text-blue-700">
                  Students are created <strong>AFTER payment is received</strong>. Link student to parent account, assign coach, assign batch, and set student type (1-1 or group).
                </p>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Total Students</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{students.length}</p>
              </div>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Active</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{activeCount}</p>
              </div>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">1-1 Sessions</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{oneOnOneCount}</p>
              </div>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Group Classes</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">{groupCount}</p>
              </div>
            </Card>
          </div>

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
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="1-1">1-1 Sessions</option>
                  <option value="group">Group Classes</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Students Table */}
          {filteredStudents.length > 0 ? (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Details</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Info</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map(student => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        {/* Student Details */}
                        <td className="px-4 py-4">
                          <div className="min-w-0">
                            <h4 className="font-semibold text-sm text-primary-blue truncate">{student.name}</h4>
                            <p className="text-xs text-gray-600">Age: {student.age}</p>
                            <p className="text-xs text-gray-600">{student.level}</p>
                            <p className="text-xs text-gray-500">
                              Joined: {new Date(student.joinedDate).toLocaleDateString('en-IN')}
                            </p>
                          </div>
                        </td>

                        {/* Parent Info */}
                        <td className="px-4 py-4">
                          <div className="text-xs">
                            <p className="font-medium text-gray-900 truncate">{student.parent}</p>
                            <p className="text-gray-600 truncate">{student.parentPhone}</p>
                            <p className="text-gray-500 truncate">{student.parentEmail}</p>
                          </div>
                        </td>

                        {/* Assignment */}
                        <td className="px-4 py-4">
                          <div className="text-xs">
                            <p className="font-medium text-gray-900">{student.coach}</p>
                            <p className="text-gray-600">{student.batch}</p>
                            <Badge variant={student.type === '1-1' ? 'info' : 'success'} className="text-xs mt-1">
                              {student.type === '1-1' ? '1-1' : 'Group'}
                            </Badge>
                          </div>
                        </td>

                        {/* Performance */}
                        <td className="px-4 py-4">
                          <div className="text-xs">
                            <p className="font-medium text-gray-900">Rating: {student.rating}</p>
                            <p className={`${student.attendance >= 90 ? 'text-green-600' : student.attendance >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                              Attendance: {student.attendance}%
                            </p>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <Badge 
                            variant={
                              student.status === 'active' ? 'success' :
                              student.status === 'paused' ? 'warning' : 'error'
                            }
                            className="text-xs"
                          >
                            {student.status}
                          </Badge>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex flex-col space-y-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs px-2 py-1"
                              onClick={() => openEditModal(student)}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>

                            {student.status === 'active' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-xs px-2 py-1 text-orange-600 hover:bg-orange-50"
                                onClick={() => handleStatusChange(student.id, 'paused')}
                              >
                                <Pause className="w-3 h-3 mr-1" />
                                Pause
                              </Button>
                            )}

                            {student.status === 'paused' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-xs px-2 py-1 text-green-600 hover:bg-green-50"
                                onClick={() => handleStatusChange(student.id, 'active')}
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Resume
                              </Button>
                            )}

                            {student.status !== 'cancelled' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-xs px-2 py-1 text-red-600 hover:bg-red-50"
                                onClick={() => {
                                  if (confirm(`Cancel ${student.name}'s subscription? This cannot be undone.`)) {
                                    handleStatusChange(student.id, 'cancelled');
                                  }
                                }}
                              >
                                <XCircle className="w-3 h-3 mr-1" />
                                Cancel
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
              <UserPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Students Found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || filterStatus !== 'all' || filterType !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'Create your first student after receiving payment'}
              </p>
              {!searchQuery && filterStatus === 'all' && filterType === 'all' && (
                <Button onClick={openCreateModal}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              )}
            </Card>
          )}
        </main>
      </div>

      {/* Modal - Create/Edit Student */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <Card className="max-w-2xl w-full my-8">
            <h3 className="text-xl font-heading font-bold text-primary-blue mb-4">
              {modalMode === 'create' ? 'Create Student (After Payment)' : 'Edit Student Details'}
            </h3>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Student Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
                  <input
                    type="text"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Age *</label>
                  <input
                    type="number"
                    value={studentForm.age}
                    onChange={(e) => setStudentForm({ ...studentForm, age: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
              </div>

              {/* Parent Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name *</label>
                  <input
                    type="text"
                    value={studentForm.parent}
                    onChange={(e) => setStudentForm({ ...studentForm, parent: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Phone *</label>
                  <input
                    type="tel"
                    value={studentForm.parentPhone}
                    onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent Email *</label>
                <input
                  type="email"
                  value={studentForm.parentEmail}
                  onChange={(e) => setStudentForm({ ...studentForm, parentEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              {/* Assignment */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign Coach *</label>
                  <select
                    value={studentForm.coachId}
                    onChange={(e) => setStudentForm({ ...studentForm, coachId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    {coaches.map(coach => (
                      <option key={coach.id} value={coach.id}>{coach.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign Batch *</label>
                  <select
                    value={studentForm.batchId}
                    onChange={(e) => setStudentForm({ ...studentForm, batchId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    {batches.map(batch => (
                      <option key={batch.id} value={batch.id}>{batch.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Type & Level */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Type *</label>
                  <select
                    value={studentForm.type}
                    onChange={(e) => setStudentForm({ ...studentForm, type: e.target.value as '1-1' | 'group' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    <option value="group">Group Class</option>
                    <option value="1-1">1-1 Session</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level *</label>
                  <select
                    value={studentForm.level}
                    onChange={(e) => setStudentForm({ ...studentForm, level: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedStudent(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={modalMode === 'create' ? handleCreateStudent : handleEditStudent}
                  disabled={
                    !studentForm.name || !studentForm.age || !studentForm.parent || 
                    !studentForm.parentPhone || !studentForm.parentEmail
                  }
                >
                  {modalMode === 'create' ? 'Create Student' : 'Update Student'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
