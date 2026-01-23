'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Users, Calendar, ChevronLeft, MessageSquare, BookOpen, AlertCircle, TrendingUp } from 'lucide-react';

// Mock data - Only ASSIGNED batches
const assignedBatches = [
  {
    id: 1,
    name: 'Beginners Batch A',
    level: 'Beginner',
    schedule: 'Mon, Wed, Fri - 4:00 PM',
    studentCount: 8,
    nextClass: '2026-01-18T16:00:00',
    students: [
      { id: 1, name: 'Arjun Patel', age: 12, rating: 800, attendance: 95 },
      { id: 2, name: 'Priya Singh', age: 10, rating: 750, attendance: 90 },
      { id: 3, name: 'Sneha Reddy', age: 9, rating: 820, attendance: 100 },
      { id: 4, name: 'Karthik Iyer', age: 11, rating: 780, attendance: 85 },
      { id: 5, name: 'Meera Nair', age: 10, rating: 810, attendance: 92 },
      { id: 6, name: 'Rahul Desai', age: 12, rating: 790, attendance: 88 },
      { id: 7, name: 'Divya Shah', age: 11, rating: 760, attendance: 97 },
      { id: 8, name: 'Vivek Gupta', age: 9, rating: 770, attendance: 91 },
    ],
  },
  {
    id: 2,
    name: 'Intermediate Batch B',
    level: 'Intermediate',
    schedule: 'Tue, Thu - 10:00 AM',
    studentCount: 6,
    nextClass: '2026-01-19T10:00:00',
    students: [
      { id: 9, name: 'Rohan Kumar', age: 14, rating: 1200, attendance: 98 },
      { id: 10, name: 'Aditya Sharma', age: 11, rating: 1150, attendance: 94 },
      { id: 11, name: 'Lakshmi Rao', age: 13, rating: 1180, attendance: 96 },
      { id: 12, name: 'Nikhil Joshi', age: 12, rating: 1100, attendance: 89 },
      { id: 13, name: 'Pooja Verma', age: 14, rating: 1220, attendance: 100 },
      { id: 14, name: 'Sanjay Pillai', age: 13, rating: 1160, attendance: 92 },
    ],
  },
  {
    id: 3,
    name: '1-1 Sessions',
    level: 'Mixed',
    schedule: 'Flexible - By Appointment',
    studentCount: 4,
    nextClass: '2026-01-18T14:00:00',
    students: [
      { id: 15, name: 'Amit Khanna', age: 15, rating: 1500, attendance: 100 },
      { id: 16, name: 'Riya Malhotra', age: 12, rating: 1100, attendance: 95 },
      { id: 17, name: 'Dev Kapoor', age: 10, rating: 900, attendance: 90 },
      { id: 18, name: 'Isha Patel', age: 14, rating: 1300, attendance: 100 },
    ],
  },
];

export default function CoachBatchesPage() {
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null);

  const batch = selectedBatch ? assignedBatches.find(b => b.id === selectedBatch) : null;
  const totalStudents = assignedBatches.reduce((sum, b) => sum + b.studentCount, 0);

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
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-2">My Batches</h1>
            <p className="text-gray-600 text-sm sm:text-base">View your assigned batches and students (without parent contact details)</p>
          </div>

          {/* Access Notice */}
          <Card className="mb-4 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Student Information Only</h4>
                <p className="text-sm text-blue-700">
                  You can view <strong>student names, ages, ratings, and attendance</strong>. <strong>Parent contact details and payment information are not visible</strong> to coaches.
                </p>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">My Batches</p>
                <p className="text-3xl sm:text-4xl font-bold text-primary-blue">{assignedBatches.length}</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Total Students</p>
                <p className="text-3xl sm:text-4xl font-bold text-green-600">{totalStudents}</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-xs sm:text-sm mb-1">Next Class</p>
                <p className="text-lg sm:text-xl font-bold text-orange-600">
                  {new Date(Math.min(...assignedBatches.map(b => new Date(b.nextClass).getTime()))).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </Card>
          </div>

          {/* Batch View Toggle */}
          {!batch ? (
            /* Batches Overview */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignedBatches.map((b) => (
                <Card key={b.id} className="hover:shadow-lg transition-shadow">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-heading font-bold text-lg text-primary-blue">{b.name}</h3>
                      <Badge variant="info">{b.level}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{b.schedule}</p>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-semibold text-primary-blue">{b.studentCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Next Class:</span>
                      <span className="font-semibold text-gray-800">
                        {new Date(b.nextClass).toLocaleString('en-IN', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={() => setSelectedBatch(b.id)}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      View Students
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href={`/dashboard/coach/batches/${b.id}/chat`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Chat
                        </Button>
                      </Link>
                      <Link href="/dashboard/coach/resources">
                        <Button variant="outline" size="sm" className="w-full">
                          <BookOpen className="w-3 h-3 mr-1" />
                          Materials
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            /* Student Details for Selected Batch */
            <div>
              <Card className="mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-primary-blue mb-1">{batch.name}</h2>
                    <p className="text-sm text-gray-600">{batch.schedule}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/coach/batches/${batch.id}/chat`}>
                      <Button size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Group Chat
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => setSelectedBatch(null)}>
                      ← Back
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Student List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {batch.students.map((student) => (
                  <Card key={student.id} className="hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-base text-primary-blue truncate">{student.name}</h4>
                        <p className="text-sm text-gray-600">Age: {student.age} years</p>
                      </div>
                      <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded flex-shrink-0 ml-2">
                        <TrendingUp className="w-3 h-3 text-yellow-700" />
                        <span className="text-xs font-bold text-yellow-700">{student.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-semibold">{student.rating}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Attendance:</span>
                        <span className={`font-semibold ${student.attendance >= 90 ? 'text-green-600' : student.attendance >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {student.attendance}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Attendance</span>
                        <span>{student.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${student.attendance >= 90 ? 'bg-green-500' : student.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                    </div>

                    {/* Notice: No parent details */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 italic">
                        🔒 Parent contact details not visible to coaches
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
