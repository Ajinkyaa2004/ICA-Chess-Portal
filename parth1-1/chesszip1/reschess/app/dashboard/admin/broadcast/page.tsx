'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, Send, Users, Mail, MessageSquare, Bell, CheckCircle, Filter } from 'lucide-react';

const previousBroadcasts = [
  { id: 1, title: 'Tournament Registration Open', recipients: 'All Students', filters: 'Batch: All', date: '2026-01-14', time: '10:00 AM', status: 'sent', delivered: 45, type: 'Email & Push' },
  { id: 2, title: 'New Coach Introduction', recipients: 'Level: Intermediate', filters: 'Level: Intermediate', date: '2026-01-12', time: '3:00 PM', status: 'sent', delivered: 18, type: 'Push' },
  { id: 3, title: 'Holiday Schedule Update', recipients: 'Type: Group Classes', filters: 'Type: Group', date: '2026-01-10', time: '9:00 AM', status: 'sent', delivered: 32, type: 'Email' },
  { id: 4, title: 'Payment Reminder', recipients: 'Status: Payment Pending', filters: 'Payment: Pending', date: '2026-01-08', time: '11:00 AM', status: 'sent', delivered: 5, type: 'Email & SMS' },
  { id: 5, title: 'Demo Followup', recipients: 'Timezone: IST Morning', filters: 'Timezone: IST AM', date: '2026-01-05', time: '2:00 PM', status: 'sent', delivered: 12, type: 'Email' },
];

export default function AdminBroadcastPage() {
  const [messageType, setMessageType] = useState<string[]>(['email']);
  const [recipientType, setRecipientType] = useState('all');
  const [filterBatch, setFilterBatch] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStudentType, setFilterStudentType] = useState('all');
  const [filterTimezone, setFilterTimezone] = useState('all');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const toggleMessageType = (type: string) => {
    if (messageType.includes(type)) {
      setMessageType(messageType.filter(t => t !== type));
    } else {
      setMessageType([...messageType, type]);
    }
  };

  const handleSend = () => {
    if (!subject || !message || messageType.length === 0) {
      alert('Please fill all required fields');
      return;
    }
    alert('Broadcast sent successfully!');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="admin" />
      
      <div className="flex-1">
        <DashboardHeader userName="Admin" userRole="System Owner" />
        
        <main className="p-3 sm:p-4 lg:p-6">
          <div className="mb-4 sm:mb-6">
            <Link href="/dashboard/admin">
              <Button variant="ghost" size="sm" className="mb-3">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-1">Broadcast Messages</h1>
              <p className="text-gray-600 text-sm">Send announcements by batch, level, timezone, or student type</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Compose Message */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-lg sm:text-xl font-heading font-semibold text-primary-blue mb-4">
                  Compose New Broadcast
                </h2>

                {/* Message Type */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Channels * (Select multiple)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleMessageType('email')}
                      className={`flex items-center px-3 sm:px-4 py-2 rounded-lg border-2 transition-all text-sm ${
                        messageType.includes('email')
                          ? 'border-primary-blue bg-primary-blue text-white'
                          : 'border-gray-300 text-gray-700 hover:border-primary-blue'
                      }`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </button>
                    <button
                      onClick={() => toggleMessageType('push')}
                      className={`flex items-center px-3 sm:px-4 py-2 rounded-lg border-2 transition-all text-sm ${
                        messageType.includes('push')
                          ? 'border-primary-blue bg-primary-blue text-white'
                          : 'border-gray-300 text-gray-700 hover:border-primary-blue'
                      }`}
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Push
                    </button>
                    <button
                      onClick={() => toggleMessageType('sms')}
                      className={`flex items-center px-3 sm:px-4 py-2 rounded-lg border-2 transition-all text-sm ${
                        messageType.includes('sms')
                          ? 'border-primary-blue bg-primary-blue text-white'
                          : 'border-gray-300 text-gray-700 hover:border-primary-blue'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      SMS
                    </button>
                  </div>
                </div>

                {/* Recipient Type */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Recipient Type *
                  </label>
                  <select
                    value={recipientType}
                    onChange={(e) => setRecipientType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                  >
                    <option value="all">All Users</option>
                    <option value="students">All Students</option>
                    <option value="parents">All Parents</option>
                    <option value="coaches">All Coaches</option>
                  </select>
                </div>

                {/* Filters */}
                <div className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters (Optional - refine your audience)
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">By Batch</label>
                      <select
                        value={filterBatch}
                        onChange={(e) => setFilterBatch(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-xs"
                      >
                        <option value="all">All Batches</option>
                        <option value="batch-a">Beginners Batch A</option>
                        <option value="batch-b">Intermediate Batch B</option>
                        <option value="batch-c">Advanced Batch C</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">By Level</label>
                      <select
                        value={filterLevel}
                        onChange={(e) => setFilterLevel(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-xs"
                      >
                        <option value="all">All Levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">By Student Type</label>
                      <select
                        value={filterStudentType}
                        onChange={(e) => setFilterStudentType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-xs"
                      >
                        <option value="all">All Types</option>
                        <option value="1-1">1-1 Sessions</option>
                        <option value="group">Group Classes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">By Timezone</label>
                      <select
                        value={filterTimezone}
                        onChange={(e) => setFilterTimezone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-xs"
                      >
                        <option value="all">All Timezones</option>
                        <option value="ist-morning">IST Morning (6 AM - 12 PM)</option>
                        <option value="ist-evening">IST Evening (6 PM - 10 PM)</option>
                        <option value="est">EST Timezone</option>
                        <option value="pst">PST Timezone</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mt-3">
                    Estimated reach: <strong className="text-primary-blue">
                      {recipientType === 'all' ? '120' : recipientType === 'students' ? '45' : recipientType === 'parents' ? '45' : '12'} recipients
                    </strong>
                  </p>
                </div>

                {/* Subject */}
                {messageType.includes('email') && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Subject *
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter email subject..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                    />
                  </div>
                )}

                {/* Message */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message..."
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue resize-none text-sm"
                  />
                  {messageType.includes('sms') && (
                    <p className="text-xs text-gray-500 mt-1">
                      SMS: {message.length}/160 characters
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <Button onClick={handleSend} className="flex-1 sm:flex-none">
                    <Send className="w-4 h-4 mr-2" />
                    Send Broadcast
                  </Button>
                  <Button variant="outline" className="flex-1 sm:flex-none">
                    Schedule
                  </Button>
                </div>
              </Card>
            </div>

            {/* Stats & Quick Info */}
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <h3 className="text-base sm:text-lg font-heading font-semibold mb-4">Recipient Count</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">All Users</span>
                    <Badge variant="info">120</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Students</span>
                    <Badge variant="info">45</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Parents</span>
                    <Badge variant="info">45</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Coaches</span>
                    <Badge variant="info">12</Badge>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-base sm:text-lg font-heading font-semibold mb-4">Broadcast Stats</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">This Month</p>
                    <p className="text-xl sm:text-2xl font-bold text-primary-blue">15</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Sent</p>
                    <p className="text-xl sm:text-2xl font-bold text-primary-blue">89</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Avg. Delivered</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">96%</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Previous Broadcasts */}
          <Card className="mt-4 sm:mt-6">
            <h2 className="text-lg sm:text-xl font-heading font-semibold text-primary-blue mb-4">
              Recent Broadcasts
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 text-xs sm:text-sm font-semibold text-gray-700">Title</th>
                    <th className="text-left py-2 px-3 text-xs sm:text-sm font-semibold text-gray-700">Filters</th>
                    <th className="text-left py-2 px-3 text-xs sm:text-sm font-semibold text-gray-700">Date</th>
                    <th className="text-left py-2 px-3 text-xs sm:text-sm font-semibold text-gray-700">Delivered</th>
                    <th className="text-left py-2 px-3 text-xs sm:text-sm font-semibold text-gray-700">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {previousBroadcasts.map((broadcast) => (
                    <tr key={broadcast.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-3">
                        <p className="font-semibold text-gray-900 text-sm">{broadcast.title}</p>
                      </td>
                      <td className="py-3 px-3">
                        <p className="text-xs text-gray-600">{broadcast.filters}</p>
                      </td>
                      <td className="py-3 px-3">
                        <p className="text-xs text-gray-900">{broadcast.date}</p>
                        <p className="text-xs text-gray-500">{broadcast.time}</p>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span className="text-sm font-medium text-green-600">{broadcast.delivered}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant="info" className="text-xs">{broadcast.type}</Badge>
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
