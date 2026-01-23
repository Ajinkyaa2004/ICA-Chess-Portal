'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Plus, Edit, Trash2, Search, Mail, Phone, Star, Calendar, Award, Users } from 'lucide-react';

// Mock coaches data
const initialCoaches = [
  {
    id: 1,
    name: 'Rajesh Gupta',
    email: 'rajesh@reschess.com',
    phone: '+91 98765 43210',
    specialization: 'Beginner & Intermediate',
    rating: 4.8,
    experience: '8 years',
    joiningDate: '2025-06-15',
    status: 'active',
    totalStudents: 45,
    monthlyRate: 25000,
    ratePerSession: 600,
    availability: {
      monday: ['10:00-12:00', '16:00-18:00'],
      tuesday: ['10:00-12:00', '16:00-18:00'],
      wednesday: ['10:00-12:00', '16:00-18:00'],
      thursday: ['10:00-12:00', '16:00-18:00'],
      friday: ['10:00-12:00', '16:00-18:00'],
      saturday: ['09:00-13:00'],
      sunday: []
    },
    bio: 'Expert in teaching beginners and intermediate players with a focus on tactical understanding.'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@reschess.com',
    phone: '+91 98765 43211',
    specialization: 'Advanced & Tournament Prep',
    rating: 4.9,
    experience: '12 years',
    joiningDate: '2025-03-10',
    status: 'active',
    totalStudents: 52,
    monthlyRate: 30000,
    ratePerSession: 650,
    availability: {
      monday: ['14:00-17:00'],
      tuesday: ['14:00-17:00'],
      wednesday: ['14:00-17:00'],
      thursday: ['14:00-17:00'],
      friday: ['14:00-17:00'],
      saturday: ['10:00-14:00'],
      sunday: []
    },
    bio: 'Specialized in tournament preparation and advanced strategy for competitive players.'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    email: 'amit@reschess.com',
    phone: '+91 98765 43212',
    specialization: 'Kids & Beginners',
    rating: 4.7,
    experience: '5 years',
    joiningDate: '2025-08-20',
    status: 'active',
    totalStudents: 38,
    monthlyRate: 22000,
    ratePerSession: 580,
    availability: {
      monday: ['15:00-18:00'],
      tuesday: ['15:00-18:00'],
      wednesday: ['15:00-18:00'],
      thursday: ['15:00-18:00'],
      friday: ['15:00-18:00'],
      saturday: ['09:00-12:00'],
      sunday: ['09:00-12:00']
    },
    bio: 'Patient and friendly coach perfect for young learners starting their chess journey.'
  },
  {
    id: 4,
    name: 'Neha Patel',
    email: 'neha@reschess.com',
    phone: '+91 98765 43213',
    specialization: 'Intermediate & Advanced',
    rating: 4.8,
    experience: '10 years',
    joiningDate: '2025-04-05',
    status: 'active',
    totalStudents: 41,
    monthlyRate: 28000,
    ratePerSession: 620,
    availability: {
      monday: ['11:00-14:00', '17:00-19:00'],
      tuesday: ['11:00-14:00', '17:00-19:00'],
      wednesday: ['11:00-14:00', '17:00-19:00'],
      thursday: ['11:00-14:00', '17:00-19:00'],
      friday: ['11:00-14:00', '17:00-19:00'],
      saturday: ['10:00-13:00'],
      sunday: []
    },
    bio: 'Expert in building strong positional understanding and endgame techniques.'
  }
];

export default function AdminCoachesPage() {
  const [coaches, setCoaches] = useState(initialCoaches);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    monthlyRate: '',
    ratePerSession: '',
    bio: '',
    status: 'active'
  });

  const filteredCoaches = coaches.filter(coach => {
    const matchesSearch = 
      coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || coach.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      experience: '',
      monthlyRate: '',
      ratePerSession: '',
      bio: '',
      status: 'active'
    });
  };

  const handleCreateCoach = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCoach = {
      id: coaches.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      specialization: formData.specialization,
      rating: 4.5,
      experience: formData.experience,
      joiningDate: new Date().toISOString().split('T')[0],
      status: formData.status as 'active' | 'inactive',
      totalStudents: 0,
      monthlyRate: parseInt(formData.monthlyRate),
      ratePerSession: parseInt(formData.ratePerSession),
      availability: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      },
      bio: formData.bio
    };

    setCoaches([...coaches, newCoach]);
    setShowCreateModal(false);
    resetForm();
    setToast({ message: 'Coach added successfully!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEditCoach = (e: React.FormEvent) => {
    e.preventDefault();
    
    setCoaches(coaches.map(coach => 
      coach.id === selectedCoach.id 
        ? { 
            ...coach, 
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            specialization: formData.specialization,
            experience: formData.experience,
            monthlyRate: parseInt(formData.monthlyRate),
            ratePerSession: parseInt(formData.ratePerSession),
            bio: formData.bio,
            status: formData.status as 'active' | 'inactive'
          } 
        : coach
    ));
    
    setShowEditModal(false);
    setSelectedCoach(null);
    resetForm();
    setToast({ message: 'Coach updated successfully!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteCoach = (id: number) => {
    if (confirm('Are you sure you want to delete this coach? This action cannot be undone.')) {
      setCoaches(coaches.filter(coach => coach.id !== id));
      setToast({ message: 'Coach deleted successfully!', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const openEditModal = (coach: any) => {
    setSelectedCoach(coach);
    setFormData({
      name: coach.name,
      email: coach.email,
      phone: coach.phone,
      specialization: coach.specialization,
      experience: coach.experience,
      monthlyRate: coach.monthlyRate.toString(),
      ratePerSession: coach.ratePerSession.toString(),
      bio: coach.bio,
      status: coach.status
    });
    setShowEditModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" />
      
      <div className="flex-1">
        <DashboardHeader userName="Admin User" userRole="Admin" />
        
        <main className="p-4 sm:p-6 lg:p-8 mt-16">
          {/* Toast Notification */}
          {toast && (
            <div className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}>
              {toast.message}
            </div>
          )}

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue">
                Coach Management
              </h1>
              <p className="text-gray-600 mt-1">Manage your coaching team</p>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Coach
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search coaches by name, email, or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Coaches</p>
                  <p className="text-2xl font-bold text-primary-blue">{coaches.length}</p>
                </div>
                <Users className="w-10 h-10 text-primary-blue opacity-20" />
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Coaches</p>
                  <p className="text-2xl font-bold text-green-600">
                    {coaches.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <Award className="w-10 h-10 text-green-600 opacity-20" />
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Students</p>
                  <p className="text-2xl font-bold text-primary-orange">
                    {coaches.reduce((sum, c) => sum + c.totalStudents, 0)}
                  </p>
                </div>
                <Users className="w-10 h-10 text-primary-orange opacity-20" />
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Avg Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {(coaches.reduce((sum, c) => sum + c.rating, 0) / coaches.length).toFixed(1)}
                  </p>
                </div>
                <Star className="w-10 h-10 text-yellow-600 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Coaches Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCoaches.map(coach => (
              <Card key={coach.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {coach.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary-blue">{coach.name}</h3>
                      <p className="text-sm text-gray-600">{coach.specialization}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{coach.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={coach.status === 'active' ? 'success' : 'error'}>
                    {coach.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{coach.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{coach.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Experience: {coach.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{coach.totalStudents} Students</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-600">Monthly Rate</p>
                    <p className="font-semibold text-primary-blue">₹{coach.monthlyRate.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Per Session</p>
                    <p className="font-semibold text-primary-blue">₹{coach.ratePerSession}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{coach.bio}</p>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => openEditModal(coach)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeleteCoach(coach.id)}
                    className="flex-1 text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredCoaches.length === 0 && (
            <Card className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No coaches found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </Card>
          )}
        </main>
      </div>

      {/* Create/Edit Coach Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-primary-blue">
                {showCreateModal ? 'Add New Coach' : 'Edit Coach'}
              </h2>
            </div>

            <form onSubmit={showCreateModal ? handleCreateCoach : handleEditCoach} className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <select
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    required
                  >
                    <option value="">Select specialization</option>
                    <option value="Beginner & Intermediate">Beginner & Intermediate</option>
                    <option value="Advanced & Tournament Prep">Advanced & Tournament Prep</option>
                    <option value="Kids & Beginners">Kids & Beginners</option>
                    <option value="Intermediate & Advanced">Intermediate & Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience *
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g., 5 years"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Rate (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyRate}
                    onChange={(e) => setFormData({ ...formData, monthlyRate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rate per Session (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.ratePerSession}
                    onChange={(e) => setFormData({ ...formData, ratePerSession: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio *
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    placeholder="Brief description of the coach's expertise and teaching style"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    showCreateModal ? setShowCreateModal(false) : setShowEditModal(false);
                    resetForm();
                    setSelectedCoach(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {showCreateModal ? 'Add Coach' : 'Update Coach'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
