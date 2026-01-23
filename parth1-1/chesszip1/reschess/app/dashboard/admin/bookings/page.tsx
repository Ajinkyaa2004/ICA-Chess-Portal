'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Search, Calendar, Clock, Video } from 'lucide-react';

const bookings = [
  { id: 1, student: 'Arjun Patel', coach: 'IM Ramesh Kumar', date: 'Jan 16, 2026', time: '10:00 AM', duration: '60 min', status: 'confirmed', type: 'Regular Lesson' },
  { id: 2, student: 'Priya Singh', coach: 'FM Priya Sharma', date: 'Jan 16, 2026', time: '11:00 AM', duration: '60 min', status: 'confirmed', type: 'Regular Lesson' },
  { id: 3, student: 'Rohan Kumar', coach: 'IM Ramesh Kumar', date: 'Jan 16, 2026', time: '2:00 PM', duration: '90 min', status: 'pending', type: 'Trial Lesson' },
  { id: 4, student: 'Ananya Sharma', coach: 'FM Priya Sharma', date: 'Jan 16, 2026', time: '3:30 PM', duration: '60 min', status: 'confirmed', type: 'Regular Lesson' },
  { id: 5, student: 'Vikram Mehta', coach: 'IM Ramesh Kumar', date: 'Jan 17, 2026', time: '10:00 AM', duration: '60 min', status: 'cancelled', type: 'Regular Lesson' },
  { id: 6, student: 'Sneha Reddy', coach: 'FM Priya Sharma', date: 'Jan 17, 2026', time: '11:00 AM', duration: '60 min', status: 'confirmed', type: 'Regular Lesson' },
  { id: 7, student: 'Aditya Verma', coach: 'IM Ramesh Kumar', date: 'Jan 17, 2026', time: '4:00 PM', duration: '60 min', status: 'pending', type: 'Trial Lesson' },
  { id: 8, student: 'Kavya Iyer', coach: 'FM Priya Sharma', date: 'Jan 18, 2026', time: '9:00 AM', duration: '60 min', status: 'confirmed', type: 'Regular Lesson' },
];

export default function AdminBookingsPage() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="admin" />
      
      <div className="flex-1">
        <DashboardHeader userName="Admin" userRole="admin" />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold text-primary-blue">Bookings</h1>
            <p className="text-gray-600">Manage all lesson bookings</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Card>
              <p className="text-gray-600 text-sm mb-1">Total Bookings</p>
              <p className="text-3xl font-bold text-primary-blue">1,248</p>
              <p className="text-xs text-green-600 mt-1">+45 this week</p>
            </Card>
            <Card>
              <p className="text-gray-600 text-sm mb-1">Confirmed</p>
              <p className="text-3xl font-bold text-green-600">1,120</p>
              <p className="text-xs text-gray-500 mt-1">89.7% of total</p>
            </Card>
            <Card>
              <p className="text-gray-600 text-sm mb-1">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">85</p>
              <p className="text-xs text-gray-500 mt-1">6.8% of total</p>
            </Card>
            <Card>
              <p className="text-gray-600 text-sm mb-1">Cancelled</p>
              <p className="text-3xl font-bold text-red-600">43</p>
              <p className="text-xs text-gray-500 mt-1">3.5% of total</p>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search bookings by student or coach..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent">
                <option>All Status</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent">
                <option>All Types</option>
                <option>Regular Lesson</option>
                <option>Trial Lesson</option>
              </select>
            </div>
          </Card>

          {/* Bookings Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Coach</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date & Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-primary-offwhite">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-gray-900">#{booking.id}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {booking.student.charAt(0)}
                          </div>
                          <p className="font-medium text-gray-900">{booking.student}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary-orange rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {booking.coach.charAt(0)}
                          </div>
                          <p className="font-medium text-gray-900">{booking.coach}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-900 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {booking.date}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {booking.time}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-600">{booking.duration}</p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={booking.type === 'Trial Lesson' ? 'info' : 'default'}>
                          {booking.type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={
                          booking.status === 'confirmed' ? 'success' :
                          booking.status === 'pending' ? 'warning' :
                          'error'
                        }>
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
