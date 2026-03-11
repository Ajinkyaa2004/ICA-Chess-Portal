'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Mail, MessageSquare, Bell } from 'lucide-react';

const broadcasts = [
  { id: 1, title: 'Tournament Registration Open', sender: 'Admin', date: 'Jan 14, 2026', time: '10:00 AM', type: 'Email', message: 'Dear students, registration for the upcoming Inter-Academy Chess Tournament is now open. Please register by January 20th to secure your spot. This is a great opportunity to test your skills against players from other academies!' },
  { id: 2, title: 'New Coach Introduction', sender: 'Admin', date: 'Jan 12, 2026', time: '3:00 PM', type: 'Notification', message: 'We are excited to welcome FM Priya Sharma to our coaching team! She specializes in endgame strategies and will be available for advanced students.' },
  { id: 3, title: 'Holiday Schedule Update', sender: 'Admin', date: 'Jan 10, 2026', time: '9:00 AM', type: 'Email', message: 'Please note that the academy will be closed on January 26th for Republic Day. All lessons scheduled for that day will be rescheduled. Your coaches will contact you individually.' },
  { id: 4, title: 'New Study Material Available', sender: 'IM Ramesh Kumar', date: 'Jan 5, 2026', time: '2:00 PM', type: 'Notification', message: 'I have uploaded new study materials on the Sicilian Defense to your study material section. Please review them before our next lesson.' },
  { id: 5, title: 'Practice Session Reminder', sender: 'Admin', date: 'Jan 3, 2026', time: '11:00 AM', type: 'SMS', message: 'Reminder: Weekly practice sessions are every Saturday at 4 PM. Join your batch for group practice and analysis.' },
];

export default function StudentBroadcastPage() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="customer" />
      
      <div className="flex-1">
        <DashboardHeader userName="Student" userRole="customer" />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold text-primary-blue">Announcements</h1>
            <p className="text-gray-600">View important announcements from coaches and admin</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Announcements</p>
                  <p className="text-3xl font-bold text-primary-blue">24</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">This Month</p>
                  <p className="text-3xl font-bold text-primary-blue">5</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Unread</p>
                  <p className="text-3xl font-bold text-primary-orange">2</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary-orange" />
                </div>
              </div>
            </Card>
          </div>

          {/* Announcements List */}
          <div className="space-y-4">
            {broadcasts.map((broadcast) => (
              <Card key={broadcast.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold">
                      {broadcast.sender.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{broadcast.title}</h3>
                      <p className="text-sm text-gray-600">From: {broadcast.sender}</p>
                    </div>
                  </div>
                  <Badge variant="info">{broadcast.type}</Badge>
                </div>
                
                <p className="text-gray-700 mb-3">{broadcast.message}</p>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{broadcast.date}</span>
                    <span>{broadcast.time}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
