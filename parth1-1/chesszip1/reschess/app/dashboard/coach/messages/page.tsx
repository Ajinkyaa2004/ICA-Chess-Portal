'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, Send, Shield, AlertCircle, CheckCircle } from 'lucide-react';

// Mock messages with Admin
const initialMessages = [
  {
    id: 1,
    sender: 'Admin',
    senderRole: 'admin',
    content: 'Welcome to ChessED! Your coach account has been activated. You have been assigned to 3 batches and 2 upcoming demos.',
    timestamp: '2026-01-10T09:00:00',
    status: 'read',
  },
  {
    id: 2,
    sender: 'IM Ramesh Kumar',
    senderRole: 'coach',
    content: 'Thank you! I have reviewed the batch assignments. Is there a specific curriculum I should follow for the Beginners Batch A?',
    timestamp: '2026-01-10T10:30:00',
    status: 'read',
  },
  {
    id: 3,
    sender: 'Admin',
    senderRole: 'admin',
    content: 'Please follow our standard beginner curriculum: fundamentals, tactics, basic openings. Materials are available in the Resources section. Let me know if you need anything specific.',
    timestamp: '2026-01-10T11:00:00',
    status: 'read',
  },
  {
    id: 4,
    sender: 'IM Ramesh Kumar',
    senderRole: 'coach',
    content: 'Perfect! One quick question - the demo scheduled for Jan 18 with Arjun Patel, should I focus on any specific areas during the session?',
    timestamp: '2026-01-15T14:00:00',
    status: 'read',
  },
  {
    id: 5,
    sender: 'Admin',
    senderRole: 'admin',
    content: 'The parent mentioned Arjun is interested in competitive chess. Do a standard demo but highlight our tournament preparation approach. After the demo, I will handle the follow-up and conversion.',
    timestamp: '2026-01-15T15:30:00',
    status: 'read',
  },
  {
    id: 6,
    sender: 'IM Ramesh Kumar',
    senderRole: 'coach',
    content: 'Got it. Will do. Also, I noticed the meeting link for the Jan 20 demo with Priya Singh is not available yet. Can you share it when ready?',
    timestamp: '2026-01-17T10:00:00',
    status: 'read',
  },
  {
    id: 7,
    sender: 'Admin',
    senderRole: 'admin',
    content: 'Link will be shared 24 hours before the demo. You will get a notification. Is there anything else you need?',
    timestamp: '2026-01-17T11:00:00',
    status: 'delivered',
  },
];

export default function CoachMessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: 'IM Ramesh Kumar',
      senderRole: 'coach' as const,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      status: 'sent' as const,
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate admin response after 3 seconds
    setTimeout(() => {
      const autoReply = {
        id: messages.length + 2,
        sender: 'Admin',
        senderRole: 'admin' as const,
        content: 'Thank you for your message. I will get back to you shortly.',
        timestamp: new Date().toISOString(),
        status: 'read' as const,
      };
      setMessages(prev => [...prev, autoReply]);
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="coach" />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader userName="IM Ramesh Kumar" userRole="Coach" />
        
        <main className="flex-1 flex flex-col p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="mb-4">
            <Link href="/dashboard/coach">
              <Button variant="ghost" size="sm" className="mb-3">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-1">Messages</h1>
                <p className="text-gray-600 text-sm">Chat with Admin - Response time: Usually within 2 hours</p>
              </div>
              <Badge variant="error" className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>Admin Only</span>
              </Badge>
            </div>
          </div>

          {/* Restriction Notice */}
          <Card className="mb-4 bg-red-50 border-red-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900 mb-1">Admin-Only Communication</h4>
                <p className="text-sm text-red-700">
                  Coaches can <strong>only message Admin directly</strong>. No 1-1 messaging with parents allowed. 
                  <strong className="block mt-1">For batch communication, use the batch group chat (includes students, parents, coach, and admin).</strong>
                </p>
              </div>
            </div>
          </Card>

          {/* Messages Container */}
          <Card className="flex-1 flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="border-b border-gray-200 p-4 bg-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Admin</h3>
                  <p className="text-xs text-green-600 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
                    Active now
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 450px)' }}>
              {messages.map((msg) => {
                const isCoach = msg.senderRole === 'coach';

                return (
                  <div key={msg.id} className={`flex ${isCoach ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] sm:max-w-[60%]`}>
                      {/* Sender Info */}
                      <div className={`flex items-center space-x-2 mb-1 ${isCoach ? 'justify-end' : 'justify-start'}`}>
                        {!isCoach && (
                          <Badge variant="error" className="text-xs">Admin</Badge>
                        )}
                        <span className="text-xs text-gray-400">
                          {new Date(msg.timestamp).toLocaleString('en-IN', { 
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>

                      {/* Message Bubble */}
                      <div 
                        className={`p-3 rounded-lg ${
                          isCoach 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>

                      {/* Message Status (for coach messages only) */}
                      {isCoach && (
                        <div className={`flex items-center justify-end space-x-1 mt-1`}>
                          <CheckCircle className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500 capitalize">{msg.status}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
              <div className="flex items-end space-x-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message to Admin... (Press Enter to send)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue resize-none text-sm"
                  rows={2}
                />

                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">Send</span>
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: For batch-related communication with parents, use the batch group chat
              </p>
            </div>
          </Card>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Card className="bg-blue-50 border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Direct Admin Support
              </h4>
              <p className="text-sm text-blue-700">
                Use this chat for: account issues, demo questions, batch assignments, technical support, payment queries, schedule changes.
              </p>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                💬 Batch Group Chat
              </h4>
              <p className="text-sm text-green-700">
                For batch communication (students + parents + coach + admin), use the group chat available in each batch page.
              </p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
