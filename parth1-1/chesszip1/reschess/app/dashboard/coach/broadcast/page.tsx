'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Users, Mail, Bell, MessageSquare, Calendar } from 'lucide-react';

const broadcasts = [
  { 
    id: 1, 
    title: 'New Study Material Available', 
    message: 'We have uploaded new study materials for all levels. Please check the resources section.',
    sender: 'Admin',
    recipients: 'All Students', 
    date: 'Jan 15, 2026', 
    time: '2:00 PM', 
    type: 'Email',
    priority: 'normal'
  },
  { 
    id: 2, 
    title: 'Tournament Registration Open', 
    message: 'Inter-academy tournament registration is now open. Register by Jan 25th.',
    sender: 'Admin',
    recipients: 'Advanced Students', 
    date: 'Jan 10, 2026', 
    time: '4:00 PM', 
    type: 'Notification',
    priority: 'high'
  },
  { 
    id: 3, 
    title: 'Schedule Update', 
    message: 'Please note there will be no classes on Jan 26th due to Republic Day.',
    sender: 'Admin',
    recipients: 'All Students', 
    date: 'Jan 5, 2026', 
    time: '11:00 AM', 
    type: 'SMS',
    priority: 'high'
  },
  { 
    id: 4, 
    title: 'Monthly Progress Reports', 
    message: 'Monthly progress reports have been sent to all parents. Please review and provide feedback.',
    sender: 'Admin',
    recipients: 'All Parents', 
    date: 'Jan 1, 2026', 
    time: '3:00 PM', 
    type: 'Email',
    priority: 'normal'
  },
];

export default function CoachBroadcastPage() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="coach" />
      
      <div className="flex-1">
        <DashboardHeader userName="Coach" userRole="coach" />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold text-primary-blue">Broadcast Messages</h1>
            <p className="text-gray-600">View announcements from admin</p>
          </div>

          {/* Info Notice */}
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Information</h3>
                <p className="text-sm text-blue-800">
                  Broadcast messages can only be created by admin. You can view all announcements sent to you and your students here.
                </p>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Messages</p>
                  <p className="text-2xl font-bold text-primary-blue">{broadcasts.length}</p>
                </div>
                <Mail className="w-10 h-10 text-blue-600 opacity-20" />
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">This Month</p>
                  <p className="text-2xl font-bold text-green-600">
                    {broadcasts.filter(b => new Date(b.date).getMonth() === 0).length}
                  </p>
                </div>
                <Calendar className="w-10 h-10 text-green-600 opacity-20" />
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Unread</p>
                  <p className="text-2xl font-bold text-orange-600">0</p>
                </div>
                <Bell className="w-10 h-10 text-orange-600 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Broadcasts List */}
          <Card>
            <h2 className="text-xl font-heading font-semibold text-primary-blue mb-4">
              All Announcements
            </h2>
            <div className="space-y-4">
              {broadcasts.map((broadcast) => (
                <div 
                  key={broadcast.id} 
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-orange hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg text-primary-blue">{broadcast.title}</h3>
                        {broadcast.priority === 'high' && (
                          <Badge variant="error">High Priority</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {broadcast.recipients}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {broadcast.date} at {broadcast.time}
                        </span>
                        <Badge variant="info">{broadcast.type}</Badge>
                      </div>
                      <p className="text-gray-700 mb-3">{broadcast.message}</p>
                      <p className="text-xs text-gray-500">Sent by: {broadcast.sender}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {broadcasts.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No broadcasts yet</h3>
                <p className="text-gray-600">You&apos;ll see announcements from admin here</p>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}
