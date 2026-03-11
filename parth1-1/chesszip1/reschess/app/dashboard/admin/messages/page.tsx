'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, Search, Send, Paperclip, Shield } from 'lucide-react';

// Admin can 1-1 chat with coaches and parents
const conversations = [
  {
    id: 1,
    name: 'IM Ramesh Kumar',
    role: 'Coach',
    lastMessage: 'I will update the schedule by tomorrow',
    time: '2:30 PM',
    unread: 0,
    online: true,
  },
  {
    id: 2,
    name: 'Rajesh Sharma (Arjun\'s Father)',
    role: 'Parent',
    lastMessage: 'Thank you for the update',
    time: '11:45 AM',
    unread: 2,
    online: false,
  },
  {
    id: 3,
    name: 'FM Priya Sharma',
    role: 'Coach',
    lastMessage: 'The new batch is doing great!',
    time: 'Yesterday',
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: 'Meera Patel (Priya\'s Mother)',
    role: 'Parent',
    lastMessage: 'Can we reschedule the lesson?',
    time: 'Yesterday',
    unread: 1,
    online: false,
  },
  {
    id: 5,
    name: 'GM Viswanathan Anand',
    role: 'Coach',
    lastMessage: 'Tournament preparations are on track',
    time: 'Jan 14',
    unread: 0,
    online: false,
  },
];

const messages = [
  {
    id: 1,
    sender: 'IM Ramesh Kumar',
    message: 'Hello Admin, I wanted to discuss the upcoming tournament schedule.',
    time: '10:00 AM',
    isCurrentUser: false,
  },
  {
    id: 2,
    sender: 'You',
    message: 'Sure, what changes do you need?',
    time: '10:05 AM',
    isCurrentUser: true,
  },
  {
    id: 3,
    sender: 'IM Ramesh Kumar',
    message: 'Can we move the advanced batch sessions to evening slots?',
    time: '10:10 AM',
    isCurrentUser: false,
  },
  {
    id: 4,
    sender: 'You',
    message: 'Let me check the availability and get back to you.',
    time: '10:15 AM',
    isCurrentUser: true,
  },
  {
    id: 5,
    sender: 'IM Ramesh Kumar',
    message: 'I will update the schedule by tomorrow',
    time: '2:30 PM',
    isCurrentUser: false,
  },
];

export default function AdminMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || conv.role === filterRole;
    return matchesSearch && matchesRole;
  });

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
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-1">
                  Communication Control
                </h1>
                <p className="text-gray-600 text-sm">1-1 with coaches & parents, monitor all chats, audit logs</p>
              </div>
            </div>
          </div>

          {/* Info Notice */}
          <Card className="mb-4 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Admin Communication Rules</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Admin can 1-1 chat with <strong>coaches</strong> and <strong>parents</strong></li>
                  <li>• Admin is automatically in <strong>all batch group chats</strong></li>
                  <li>• Parents cannot directly message coaches (admin mediates)</li>
                  <li>• Monitor all conversations and maintain audit logs</li>
                </ul>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-4 gap-4">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <div className="mb-4 space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                  />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm"
                >
                  <option value="all">All Contacts</option>
                  <option value="Coach">Coaches Only</option>
                  <option value="Parent">Parents Only</option>
                </select>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedConversation.id === conversation.id
                        ? 'bg-primary-blue text-white'
                        : 'bg-primary-offwhite hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="relative">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          conversation.role === 'Coach' ? 'bg-orange-500' : 'bg-blue-500'
                        }`}>
                          {conversation.name.charAt(0)}
                        </div>
                        {conversation.online && (
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-xs truncate">{conversation.name}</p>
                          {conversation.unread > 0 && (
                            <Badge variant="error" className="text-xs ml-2">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className={`text-xs ${
                          selectedConversation.id === conversation.id ? 'text-white opacity-90' : 'text-gray-600'
                        }`}>
                          {conversation.role}
                        </p>
                      </div>
                    </div>
                    <p className={`text-xs truncate ${
                      selectedConversation.id === conversation.id ? 'text-white opacity-75' : 'text-gray-500'
                    }`}>
                      {conversation.lastMessage}
                    </p>
                    <p className={`text-xs mt-1 ${
                      selectedConversation.id === conversation.id ? 'text-white opacity-75' : 'text-gray-400'
                    }`}>
                      {conversation.time}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-3 flex flex-col h-[600px] sm:h-[650px]">
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      selectedConversation.role === 'Coach' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {selectedConversation.name.charAt(0)}
                    </div>
                    {selectedConversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{selectedConversation.name}</p>
                    <p className="text-sm text-gray-500">
                      {selectedConversation.role} • {selectedConversation.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-md ${msg.isCurrentUser ? 'text-right' : 'text-left'}`}>
                      {!msg.isCurrentUser && (
                        <p className="text-xs font-semibold text-gray-700 mb-1">{msg.sender}</p>
                      )}
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          msg.isCurrentUser
                            ? 'bg-primary-orange text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.isCurrentUser ? 'text-white opacity-75' : 'text-gray-500'
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </button>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={`Message ${selectedConversation.name}...`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Note: Admin can message coaches and parents only
                </p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
