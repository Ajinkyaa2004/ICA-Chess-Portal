'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, Send, Mail, MessageSquare, Bell, CheckCircle, Filter } from 'lucide-react';

// Toast helper
function showToast(msg: string, type: 'success' | 'error' = 'success') {
  const el = document.createElement('div');
  el.className = `fixed top-4 right-4 z-[9999] px-4 py-3 rounded-lg shadow-lg text-white text-sm ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

export default function AdminBroadcastPage() {
  const [messageType, setMessageType] = useState<string[]>(['email']);
  const [recipientType, setRecipientType] = useState('all');
  const [filterBatch, setFilterBatch] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStudentType, setFilterStudentType] = useState('all');
  const [filterTimezone, setFilterTimezone] = useState('all');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [apiBroadcasts, setApiBroadcasts] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<{ totalStudents: number; totalCoaches: number } | null>(null);

  useEffect(() => {
    fetch('/api/broadcasts')
      .then(r => r.ok ? r.json() : null)
      .then(json => { if (json?.data) setApiBroadcasts(json.data); })
      .catch(() => {});
    fetch('/api/analytics')
      .then(r => r.ok ? r.json() : null)
      .then(json => { if (json?.data || json) setAnalytics(json?.data || json); })
      .catch(() => {});
  }, []);

  const toggleMessageType = (type: string) => {
    if (messageType.includes(type)) {
      setMessageType(messageType.filter(t => t !== type));
    } else {
      setMessageType([...messageType, type]);
    }
  };

  // Map UI recipientType to API targetRoles
  const getTargetRoles = (): string[] => {
    switch (recipientType) {
      case 'students': return ['CUSTOMER'];
      case 'parents': return ['CUSTOMER'];
      case 'coaches': return ['COACH'];
      case 'all':
      default: return ['ADMIN', 'COACH', 'CUSTOMER'];
    }
  };

  const handleSend = async () => {
    if (!subject || !message || messageType.length === 0) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('/api/broadcasts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: subject,
          content: message,
          targetRoles: getTargetRoles(),
        }),
      });
      const json = await res.json();
      if (res.ok) {
        showToast('Broadcast sent successfully!');
        setSubject('');
        setMessage('');
        // Refresh the broadcasts list
        if (json.data) {
          setApiBroadcasts(prev => [json.data, ...prev]);
        }
      } else {
        showToast(json.error || 'Failed to send broadcast', 'error');
      }
    } catch {
      showToast('Network error', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="admin" />
      
      <div className="flex-1">
        <DashboardHeader userName="Admin" userRole="admin" />
        
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
                      {analytics
                        ? (recipientType === 'coaches'
                            ? analytics.totalCoaches
                            : recipientType === 'students' || recipientType === 'parents'
                              ? analytics.totalStudents
                              : (analytics.totalStudents + analytics.totalCoaches + 1))
                        : '—'} recipients
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
                  <Button onClick={handleSend} className="flex-1 sm:flex-none" disabled={sending}>
                    <Send className="w-4 h-4 mr-2" />
                    {sending ? 'Sending...' : 'Send Broadcast'}
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
                    <Badge variant="info">{analytics ? analytics.totalStudents + analytics.totalCoaches + 1 : '—'}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Students</span>
                    <Badge variant="info">{analytics ? analytics.totalStudents : '—'}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Parents</span>
                    <Badge variant="info">{analytics ? analytics.totalStudents : '—'}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Coaches</span>
                    <Badge variant="info">{analytics ? analytics.totalCoaches : '—'}</Badge>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-base sm:text-lg font-heading font-semibold mb-4">Broadcast Stats</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">This Month</p>
                    <p className="text-xl sm:text-2xl font-bold text-primary-blue">
                      {apiBroadcasts.filter(b => {
                        const d = new Date(b.createdAt);
                        const now = new Date();
                        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                      }).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Sent</p>
                    <p className="text-xl sm:text-2xl font-bold text-primary-blue">{apiBroadcasts.length}</p>
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
                  {apiBroadcasts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-sm text-gray-400">No broadcasts sent yet</td>
                    </tr>
                  ) : apiBroadcasts.map((b: any) => (
                    <tr key={b._id || b.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-3">
                        <p className="font-semibold text-gray-900 text-sm">{b.title}</p>
                      </td>
                      <td className="py-3 px-3">
                        <p className="text-xs text-gray-600">{(b.targetRoles || []).join(', ')}</p>
                      </td>
                      <td className="py-3 px-3">
                        <p className="text-xs text-gray-900">{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : ''}</p>
                        <p className="text-xs text-gray-500">{b.createdAt ? new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span className="text-sm font-medium text-green-600">{b.readBy?.length || 0}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant="info" className="text-xs">Push</Badge>
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
