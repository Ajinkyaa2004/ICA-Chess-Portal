'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { TrendingUp, TrendingDown, Minus, Search } from 'lucide-react';

const students = [
  { 
    id: 1, 
    name: 'Arjun Patel', 
    rating: 1350, 
    trend: 'up', 
    change: 30,
    lessonsCompleted: 12,
    attendance: 92,
    lastLesson: '2026-01-14'
  },
  { 
    id: 2, 
    name: 'Priya Singh', 
    rating: 1280, 
    trend: 'stable', 
    change: 0,
    lessonsCompleted: 10,
    attendance: 100,
    lastLesson: '2026-01-13'
  },
  { 
    id: 3, 
    name: 'Rohan Kumar', 
    rating: 1420, 
    trend: 'up', 
    change: 45,
    lessonsCompleted: 15,
    attendance: 87,
    lastLesson: '2026-01-15'
  },
  { 
    id: 4, 
    name: 'Ananya Sharma', 
    rating: 1190, 
    trend: 'down', 
    change: -15,
    lessonsCompleted: 8,
    attendance: 75,
    lastLesson: '2026-01-12'
  },
  { 
    id: 5, 
    name: 'Vikram Mehta', 
    rating: 1310, 
    trend: 'up', 
    change: 20,
    lessonsCompleted: 11,
    attendance: 91,
    lastLesson: '2026-01-14'
  },
];

export default function CoachStudentsPage() {
  const [apiStudents, setApiStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/coach/students').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.data || json?.students) setApiStudents(json.data || json.students);
    }).catch(() => {});
  }, []);

  const displayStudents = apiStudents.length > 0
    ? apiStudents.map((s: any) => ({
        id: s._id,
        name: s.name || '',
        rating: s.rating || 0,
        trend: 'stable',
        change: 0,
        lessonsCompleted: s.lessonsCompleted || 0,
        attendance: s.attendance || 0,
        lastLesson: s.lastLesson || '',
      }))
    : students;

  const filtered = displayStudents.filter((s: any) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="coach" />
      
      <div className="flex-1">
        <DashboardHeader userName="Coach" userRole="coach" />
        
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-heading font-bold text-primary-blue">
              My Students
            </h1>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Card>
              <p className="text-gray-600 text-sm">Total Students</p>
              <p className="text-3xl font-bold text-primary-blue">{displayStudents.length || 24}</p>
            </Card>
            <Card>
              <p className="text-gray-600 text-sm">Avg Rating</p>
              <p className="text-3xl font-bold text-primary-blue">
                {displayStudents.length > 0 && displayStudents[0].rating > 0
                  ? Math.round(displayStudents.reduce((s: number, st: any) => s + (st.rating || 0), 0) / displayStudents.length)
                  : 1310}
              </p>
            </Card>
            <Card>
              <p className="text-gray-600 text-sm">Avg Attendance</p>
              <p className="text-3xl font-bold text-primary-blue">
                {displayStudents.length > 0 && displayStudents[0].attendance > 0
                  ? Math.round(displayStudents.reduce((s: number, st: any) => s + (st.attendance || 0), 0) / displayStudents.length) + '%'
                  : '89%'}
              </p>
            </Card>
            <Card>
              <p className="text-gray-600 text-sm">Active This Month</p>
              <p className="text-3xl font-bold text-primary-blue">{displayStudents.length || 22}</p>
            </Card>
          </div>

          {/* Student List */}
          <Card>
            <h3 className="text-xl font-heading font-semibold mb-4">Student Roster</h3>
            <div className="space-y-3">
              {filtered.map((student: any) => (
                <div key={student.id} className="p-4 bg-primary-offwhite rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{student.name}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Rating: {student.rating}</span>
                          <span>•</span>
                          <span>{student.lessonsCompleted} lessons</span>
                          <span>•</span>
                          <span>{student.attendance}% attendance</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Last lesson: {new Date(student.lastLesson).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        {student.trend === 'up' && (
                          <div className="flex items-center text-green-600">
                            <TrendingUp className="w-5 h-5 mr-1" />
                            <span className="font-semibold">+{student.change}</span>
                          </div>
                        )}
                        {student.trend === 'down' && (
                          <div className="flex items-center text-red-600">
                            <TrendingDown className="w-5 h-5 mr-1" />
                            <span className="font-semibold">{student.change}</span>
                          </div>
                        )}
                        {student.trend === 'stable' && (
                          <div className="flex items-center text-yellow-600">
                            <Minus className="w-5 h-5 mr-1" />
                            <span className="font-semibold">Stable</span>
                          </div>
                        )}
                        <Badge 
                          variant={
                            student.trend === 'up' ? 'success' : 
                            student.trend === 'down' ? 'error' : 
                            'warning'
                          }
                          className="mt-1"
                        >
                          {student.trend === 'up' ? 'Improving' : 
                           student.trend === 'down' ? 'Declining' : 
                           'Stalled'}
                        </Badge>
                      </div>
                      
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
