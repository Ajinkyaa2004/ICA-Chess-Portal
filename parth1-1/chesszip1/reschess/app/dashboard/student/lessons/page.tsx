'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Calendar, Clock, Video } from 'lucide-react';

const upcomingLessons = [
  { 
    id: 1, 
    date: '2026-01-16', 
    time: '10:00 AM', 
    coach: 'IM Ramesh Kumar', 
    status: 'confirmed',
    hasZoomLink: true
  },
  { 
    id: 2, 
    date: '2026-01-18', 
    time: '03:00 PM', 
    coach: 'FM Priya Sharma', 
    status: 'confirmed',
    hasZoomLink: true
  },
  { 
    id: 3, 
    date: '2026-01-20', 
    time: '11:00 AM', 
    coach: 'IM Ramesh Kumar', 
    status: 'pending',
    hasZoomLink: false
  },
];

const pastLessons = [
  { 
    id: 4, 
    date: '2026-01-14', 
    time: '10:00 AM', 
    coach: 'IM Ramesh Kumar', 
    status: 'completed'
  },
  { 
    id: 5, 
    date: '2026-01-12', 
    time: '03:00 PM', 
    coach: 'FM Priya Sharma', 
    status: 'completed'
  },
];

export default function StudentLessonsPage() {
  const [apiLessons, setApiLessons] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/customer/lessons').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.data || json?.lessons) setApiLessons(json.data || json.lessons);
    }).catch(() => {});
  }, []);

  const today = new Date();
  const displayUpcoming = apiLessons.length > 0
    ? apiLessons.filter((l: any) => new Date(l.date) >= today).map((l: any) => ({
        id: l._id, date: l.date?.split('T')[0] || '', time: l.startTime || '',
        coach: l.coachId?.name || '', status: 'confirmed', hasZoomLink: !!l.meetingLink,
      }))
    : upcomingLessons;
  const displayPast = apiLessons.length > 0
    ? apiLessons.filter((l: any) => new Date(l.date) < today).map((l: any) => ({
        id: l._id, date: l.date?.split('T')[0] || '', time: l.startTime || '',
        coach: l.coachId?.name || '', status: l.status === 'COMPLETED' ? 'completed' : 'missed',
      }))
    : pastLessons;

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="customer" />
      
      <div className="flex-1">
        <DashboardHeader userName="Student" userRole="customer" />
        
        <main className="p-6">
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-6">
            My Lessons
          </h1>

          {/* Upcoming Lessons */}
          <Card className="mb-6">
            <h3 className="text-xl font-heading font-semibold mb-4">Upcoming Lessons</h3>
            <div className="space-y-3">
              {displayUpcoming.map((lesson: any) => (
                <div key={lesson.id} className="flex items-center justify-between p-4 bg-primary-offwhite rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">{lesson.coach}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <p className="text-sm text-gray-600">
                          {new Date(lesson.date).toLocaleDateString('en-IN', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })} at {lesson.time}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={lesson.status === 'confirmed' ? 'success' : 'warning'}>
                      {lesson.status}
                    </Badge>
                    {lesson.hasZoomLink && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Video className="w-4 h-4 mr-2" />
                        Join Lesson
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Past Lessons */}
          <Card>
            <h3 className="text-xl font-heading font-semibold mb-4">Past Lessons</h3>
            <div className="space-y-3">
              {displayPast.map((lesson: any) => (
                <div key={lesson.id} className="flex items-center justify-between p-4 bg-primary-offwhite rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{lesson.coach}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(lesson.date).toLocaleDateString('en-IN')} at {lesson.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant="success">{lesson.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
