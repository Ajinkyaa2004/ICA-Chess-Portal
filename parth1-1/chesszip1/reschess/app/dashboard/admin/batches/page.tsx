'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import Toast, { ToastType } from '@/components/ui/Toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Calendar, 
  Clock, 
  Search,
  Filter,
  MoreVertical,
  UserPlus,
  UserMinus,
  CheckCircle
} from 'lucide-react';

// Sample batch data
const initialBatches = [
  {
    id: 1,
    name: 'Beginner Batch A',
    level: 'Beginner',
    type: 'Group Session',
    coach: 'FM Priya Sharma',
    coachId: 'coach_1',
    students: 8,
    maxStudents: 12,
    schedule: 'Mon, Wed, Fri - 4:00 PM',
    timezone: 'Asia/Kolkata',
    startDate: '2026-01-15',
    endDate: '2026-04-15',
    status: 'Active',
    description: 'Perfect for chess beginners aged 6-10. Focus on basic rules, piece movements, and simple tactics.',
    ratingRange: '800-1200',
    ageRange: '6-10',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Intermediate Batch B',
    level: 'Intermediate',
    type: 'Group Session',
    coach: 'IM Ramesh Kumar',
    coachId: 'coach_2',
    students: 12,
    maxStudents: 15,
    schedule: 'Tue, Thu, Sat - 10:00 AM',
    timezone: 'Asia/Kolkata',
    startDate: '2026-01-10',
    endDate: '2026-06-10',
    status: 'Active',
    description: 'For players with basic knowledge. Advanced tactics, opening principles, and endgame basics.',
    ratingRange: '1200-1600',
    ageRange: '10-16',
    color: 'bg-green-500'
  },
  {
    id: 3,
    name: 'Advanced Batch C',
    level: 'Advanced',
    type: 'Group Session',
    coach: 'GM Vishnu Prasad',
    coachId: 'coach_3',
    students: 6,
    maxStudents: 10,
    schedule: 'Daily - 6:00 PM',
    timezone: 'Asia/Kolkata',
    startDate: '2026-02-01',
    endDate: '2026-08-01',
    status: 'Starting Soon',
    description: 'Advanced players preparing for tournaments. Complex strategies, deep analysis, and competition prep.',
    ratingRange: '1600+',
    ageRange: '12+',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    name: 'Weekend Warriors',
    level: 'Mixed',
    type: '1-on-1 Session',
    coach: 'FM Ankit Sharma',
    coachId: 'coach_4',
    students: 10,
    maxStudents: 12,
    schedule: 'Sat, Sun - 2:00 PM',
    timezone: 'Asia/Kolkata',
    startDate: '2026-01-20',
    endDate: '2026-05-20',
    status: 'Active',
    description: 'Weekend classes for busy students. Mixed levels with personalized attention.',
    ratingRange: 'All Levels',
    ageRange: '8+',
    color: 'bg-orange-500'
  }
];

const coaches = [
  { id: 'coach_1', name: 'FM Priya Sharma', rating: 2400 },
  { id: 'coach_2', name: 'IM Ramesh Kumar', rating: 2500 },
  { id: 'coach_3', name: 'GM Vishnu Prasad', rating: 2650 },
  { id: 'coach_4', name: 'FM Ankit Sharma', rating: 2350 },
];

const availableStudents = [
  { id: 'std_1', name: 'Arjun Patel', age: 12, rating: 1350, parent: 'Vikram Patel', phone: '+91 98765 43210', currentBatch: null },
  { id: 'std_2', name: 'Priya Singh', age: 10, rating: 1200, parent: 'Rajesh Singh', phone: '+91 98765 43211', currentBatch: 1 },
  { id: 'std_3', name: 'Rohan Kumar', age: 14, rating: 1500, parent: 'Sunita Kumar', phone: '+91 98765 43212', currentBatch: null },
  { id: 'std_4', name: 'Sneha Reddy', age: 9, rating: 950, parent: 'Anand Reddy', phone: '+91 98765 43213', currentBatch: null },
  { id: 'std_5', name: 'Aditya Sharma', age: 11, rating: 1280, parent: 'Meera Sharma', phone: '+91 98765 43214', currentBatch: 2 },
  { id: 'std_6', name: 'Kavya Nair', age: 13, rating: 1420, parent: 'Suresh Nair', phone: '+91 98765 43215', currentBatch: null },
  { id: 'std_7', name: 'Ishaan Gupta', age: 8, rating: 850, parent: 'Neha Gupta', phone: '+91 98765 43216', currentBatch: null },
  { id: 'std_8', name: 'Ananya Desai', age: 10, rating: 1100, parent: 'Kiran Desai', phone: '+91 98765 43217', currentBatch: null },
  { id: 'std_9', name: 'Kabir Mehta', age: 12, rating: 1380, parent: 'Ravi Mehta', phone: '+91 98765 43218', currentBatch: null },
  { id: 'std_10', name: 'Diya Patel', age: 11, rating: 1250, parent: 'Amit Patel', phone: '+91 98765 43219', currentBatch: null },
];

export default function BatchManagementPage() {
  const [batches, setBatches] = useState(initialBatches);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showRemoveStudentModal, setShowRemoveStudentModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [students, setStudents] = useState(availableStudents);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 'Beginner',
    type: 'Group Session',
    coachId: '',
    maxStudents: 12,
    schedule: '',
    timezone: 'Asia/Kolkata',
    startDate: '',
    endDate: '',
    description: '',
    ratingRange: '',
    ageRange: '',
    color: 'bg-blue-500'
  });

  // Filter batches based on search and status
  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         batch.coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         batch.level.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || batch.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateBatch = () => {
    if (!formData.name || !formData.coachId || !formData.schedule) {
      setToast({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }

    const coach = coaches.find(c => c.id === formData.coachId);
    const newBatch = {
      id: Date.now(),
      name: formData.name,
      level: formData.level,
      type: formData.type,
      coach: coach?.name || '',
      coachId: formData.coachId,
      students: 0,
      maxStudents: formData.maxStudents,
      schedule: formData.schedule,
      timezone: formData.timezone,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: 'Starting Soon',
      description: formData.description,
      ratingRange: formData.ratingRange,
      ageRange: formData.ageRange,
      color: formData.color
    };

    setBatches([...batches, newBatch]);
    setShowCreateModal(false);
    resetForm();
    setToast({ message: 'Batch created successfully!', type: 'success' });
  };

  const handleEditBatch = () => {
    if (!formData.name || !formData.coachId || !formData.schedule) {
      setToast({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }

    const coach = coaches.find(c => c.id === formData.coachId);
    const updatedBatches = batches.map(batch => 
      batch.id === selectedBatch.id 
        ? {
            ...batch,
            name: formData.name,
            level: formData.level,
            type: formData.type,
            coach: coach?.name || '',
            coachId: formData.coachId,
            maxStudents: formData.maxStudents,
            schedule: formData.schedule,
            timezone: formData.timezone,
            startDate: formData.startDate,
            endDate: formData.endDate,
            description: formData.description,
            ratingRange: formData.ratingRange,
            ageRange: formData.ageRange,
            color: formData.color
          }
        : batch
    );

    setBatches(updatedBatches);
    setShowEditModal(false);
    setSelectedBatch(null);
    resetForm();
    setToast({ message: 'Batch updated successfully!', type: 'success' });
  };

  const handleDeleteBatch = (batchId: number) => {
    if (confirm('Are you sure you want to delete this batch? This action cannot be undone.')) {
      setBatches(batches.filter(batch => batch.id !== batchId));
      setToast({ message: 'Batch deleted successfully!', type: 'success' });
    }
  };

  const openAddStudentModal = (batch: any) => {
    setSelectedBatch(batch);
    setStudentSearchQuery('');
    setShowAddStudentModal(true);
  };

  const openRemoveStudentModal = (batch: any) => {
    setSelectedBatch(batch);
    setStudentSearchQuery('');
    setShowRemoveStudentModal(true);
  };

  const handleRemoveStudentFromBatch = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    if (confirm(`Remove ${student.name} from ${selectedBatch.name}?`)) {
      // Update student's current batch to null
      setStudents(students.map(s => 
        s.id === studentId ? { ...s, currentBatch: null } : s
      ));

      // Decrement batch student count
      setBatches(batches.map(b => 
        b.id === selectedBatch.id ? { ...b, students: Math.max(0, b.students - 1) } : b
      ));

      setToast({ message: `${student.name} removed from ${selectedBatch.name}!`, type: 'success' });
    }
  };

  const handleAddStudentToBatch = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    // Check if student is already in another batch
    if (student.currentBatch && student.currentBatch !== selectedBatch.id) {
      if (!confirm(`${student.name} is already enrolled in another batch. Do you want to transfer them to this batch?`)) {
        return;
      }
      // Decrement student count from old batch
      setBatches(batches.map(b => 
        b.id === student.currentBatch ? { ...b, students: b.students - 1 } : b
      ));
    }

    // Check if batch is full
    if (selectedBatch.students >= selectedBatch.maxStudents) {
      setToast({ message: 'Batch is full! Cannot add more students.', type: 'error' });
      return;
    }

    // Update student's current batch
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, currentBatch: selectedBatch.id } : s
    ));

    // Increment batch student count
    setBatches(batches.map(b => 
      b.id === selectedBatch.id ? { ...b, students: b.students + 1 } : b
    ));

    setToast({ message: `${student.name} added to ${selectedBatch.name}!`, type: 'success' });
  };

  const openEditModal = (batch: any) => {
    setSelectedBatch(batch);
    setFormData({
      name: batch.name,
      level: batch.level,
      type: batch.type || 'Group Session',
      coachId: batch.coachId,
      maxStudents: batch.maxStudents,
      schedule: batch.schedule,
      timezone: batch.timezone,
      startDate: batch.startDate,
      endDate: batch.endDate,
      description: batch.description,
      ratingRange: batch.ratingRange,
      ageRange: batch.ageRange,
      color: batch.color
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      level: 'Beginner',
      type: 'Group Session',
      coachId: '',
      maxStudents: 12,
      schedule: '',
      timezone: 'Asia/Kolkata',
      startDate: '',
      endDate: '',
      description: '',
      ratingRange: '',
      ageRange: '',
      color: 'bg-blue-500'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Starting Soon': return 'warning';
      case 'Completed': return 'info';
      case 'Cancelled': return 'error';
      default: return 'info';
    }
  };

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="admin" />
      
      <div className="flex-1">
        <DashboardHeader userName="Admin User" userRole="Admin" />
        
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        
        <main className="p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue">
                Batch Management
              </h1>
              <p className="text-gray-600 mt-1">Create, manage, and monitor chess batches</p>
            </div>
            <Button onClick={() => setShowCreateModal(true)} className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create New Batch
            </Button>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search batches, coaches, or levels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Starting Soon">Starting Soon</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Batch Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredBatches.map((batch) => (
              <Card key={batch.id} className="hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${batch.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                      {batch.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-primary-blue">{batch.name}</h3>
                      <p className="text-sm text-gray-600">{batch.level} Level</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusColor(batch.status) as any}>
                      {batch.status}
                    </Badge>
                    <div className="relative">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Coach:</span>
                    <span className="font-medium">{batch.coach}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">{batch.students}/{batch.maxStudents}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Schedule:</span>
                    <span className="font-medium text-right">{batch.schedule}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Rating Range:</span>
                    <span className="font-medium">{batch.ratingRange}</span>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-primary-orange h-2 rounded-full"
                    style={{ width: `${(batch.students / batch.maxStudents) * 100}%` }}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEditModal(batch)}>
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => openAddStudentModal(batch)}>
                    <UserPlus className="w-3 h-3 mr-1" />
                    Add Student
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openRemoveStudentModal(batch)}
                    className="text-orange-600 hover:text-orange-700 hover:border-orange-300"
                  >
                    <UserMinus className="w-3 h-3 mr-1" />
                    Remove Student
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeleteBatch(batch.id)}
                    className="text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredBatches.length === 0 && (
            <Card className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No batches found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || filterStatus !== 'All' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create your first batch to get started'
                }
              </p>
              {!searchQuery && filterStatus === 'All' && (
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Batch
                </Button>
              )}
            </Card>
          )}
        </main>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-heading font-bold text-primary-blue mb-6">
                {showCreateModal ? 'Create New Batch' : 'Edit Batch'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Input
                  label="Batch Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Beginner Batch A"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level *</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="input-field"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="input-field"
                  >
                    <option value="Group Session">Group Session</option>
                    <option value="1-on-1 Session">1-on-1 Session</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coach *</label>
                  <select
                    value={formData.coachId}
                    onChange={(e) => setFormData({ ...formData, coachId: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select a coach</option>
                    {coaches.map((coach) => (
                      <option key={coach.id} value={coach.id}>
                        {coach.name} (Rating: {coach.rating})
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Max Students"
                  type="number"
                  value={formData.maxStudents.toString()}
                  onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) || 12 })}
                  placeholder="12"
                />

                <Input
                  label="Schedule *"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  placeholder="e.g., Mon, Wed, Fri - 4:00 PM"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    className="input-field"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                  </select>
                </div>

                <Input
                  label="Start Date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />

                <Input
                  label="End Date"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />

                <Input
                  label="Rating Range"
                  value={formData.ratingRange}
                  onChange={(e) => setFormData({ ...formData, ratingRange: e.target.value })}
                  placeholder="e.g., 800-1200"
                />

                <Input
                  label="Age Range"
                  value={formData.ageRange}
                  onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                  placeholder="e.g., 6-10"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the batch objectives and target audience..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Batch Color</label>
                <div className="flex space-x-2">
                  {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500', 'bg-pink-500'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-8 h-8 ${color} rounded-full border-2 ${
                        formData.color === color ? 'border-gray-800' : 'border-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    setSelectedBatch(null);
                    resetForm();
                  }}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  onClick={showCreateModal ? handleCreateBatch : handleEditBatch}
                  className="w-full sm:w-auto"
                >
                  {showCreateModal ? 'Create Batch' : 'Update Batch'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddStudentModal && selectedBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <h2 className="text-xl font-heading font-bold text-primary-blue mb-2">
                Add Student to {selectedBatch.name}
              </h2>
              <p className="text-sm text-gray-600">
                Current Enrollment: {selectedBatch.students}/{selectedBatch.maxStudents} students
              </p>
            </div>

            <div className="p-6 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students by name, parent, or rating..."
                  value={studentSearchQuery}
                  onChange={(e) => setStudentSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {students
                  .filter(student => 
                    student.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
                    student.parent.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
                    student.rating.toString().includes(studentSearchQuery)
                  )
                  .map((student) => {
                    const isInThisBatch = student.currentBatch === selectedBatch.id;
                    const isInAnotherBatch = student.currentBatch && student.currentBatch !== selectedBatch.id;
                    const otherBatchName = isInAnotherBatch 
                      ? batches.find(b => b.id === student.currentBatch)?.name 
                      : '';

                    return (
                      <div 
                        key={student.id}
                        className={`p-4 border rounded-lg transition-all ${
                          isInThisBatch 
                            ? 'bg-green-50 border-green-300' 
                            : isInAnotherBatch
                            ? 'bg-gray-50 border-gray-300'
                            : 'bg-white border-gray-200 hover:border-primary-orange'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold">
                                {student.name.charAt(0)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-primary-blue">{student.name}</h3>
                                <p className="text-xs text-gray-600">Age {student.age} • Rating: {student.rating}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 ml-13">
                              <div>
                                <span className="font-medium">Parent:</span> {student.parent}
                              </div>
                              <div>
                                <span className="font-medium">Phone:</span> {student.phone}
                              </div>
                            </div>
                            {isInThisBatch && (
                              <div className="mt-2 ml-13">
                                <Badge variant="success" className="text-xs">
                                  Already in this batch
                                </Badge>
                              </div>
                            )}
                            {isInAnotherBatch && (
                              <div className="mt-2 ml-13">
                                <Badge variant="warning" className="text-xs">
                                  Enrolled in: {otherBatchName}
                                </Badge>
                              </div>
                            )}
                          </div>
                          <div className="flex-shrink-0">
                            {isInThisBatch ? (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                disabled
                                className="cursor-not-allowed"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Enrolled
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                onClick={() => handleAddStudentToBatch(student.id)}
                                className={isInAnotherBatch ? 'bg-orange-600 hover:bg-orange-700' : ''}
                              >
                                <UserPlus className="w-3 h-3 mr-1" />
                                {isInAnotherBatch ? 'Transfer' : 'Add'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {students.filter(student => 
                  student.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
                  student.parent.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
                  student.rating.toString().includes(studentSearchQuery)
                ).length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No students found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddStudentModal(false);
                  setSelectedBatch(null);
                  setStudentSearchQuery('');
                }}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Student Modal */}
      {showRemoveStudentModal && selectedBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[70vh] flex flex-col">
            <div className="p-6 border-b sticky top-0 bg-white">
              <div className="flex items-center gap-2">
                <UserMinus className="w-5 h-5 text-orange-600" />
                <h2 className="text-xl font-bold text-primary-blue">Remove Student from {selectedBatch.name}</h2>
              </div>
              <p className="text-sm text-gray-600 mt-1">Select a student to remove from this batch</p>
            </div>

            <div className="p-6 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search enrolled students..."
                  value={studentSearchQuery}
                  onChange={(e) => setStudentSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {students
                  .filter(student => student.currentBatch === selectedBatch.id)
                  .filter(student => 
                    student.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
                    student.parent.toLowerCase().includes(studentSearchQuery.toLowerCase())
                  )
                  .map((student) => (
                    <div 
                      key={student.id}
                      className="p-4 border border-gray-200 rounded-lg bg-white hover:border-orange-300 hover:bg-orange-50 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-primary-blue">{student.name}</h3>
                              <p className="text-xs text-gray-600">Age {student.age} • Rating: {student.rating}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 ml-13">
                            <div>
                              <span className="font-medium">Parent:</span> {student.parent}
                            </div>
                            <div>
                              <span className="font-medium">Phone:</span> {student.phone}
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRemoveStudentFromBatch(student.id)}
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                {students.filter(student => student.currentBatch === selectedBatch.id).length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No students in this batch</h3>
                    <p className="text-gray-600">Add students first to remove them</p>
                  </div>
                )}

                {students.filter(student => student.currentBatch === selectedBatch.id).length > 0 &&
                  students
                    .filter(student => student.currentBatch === selectedBatch.id)
                    .filter(student => 
                      student.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
                      student.parent.toLowerCase().includes(studentSearchQuery.toLowerCase())
                    ).length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No students found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRemoveStudentModal(false);
                  setSelectedBatch(null);
                  setStudentSearchQuery('');
                }}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}