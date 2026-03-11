'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Send, Paperclip } from 'lucide-react';
import { useState } from 'react';

const messages = [
  { 
    id: 1, 
    sender: 'ICA Admin Support', 
    text: 'Hi Arjun! We have some exciting news about upcoming tournaments.',
    time: '2:15 PM',
    isMe: false
  },
  { 
    id: 2, 
    sender: 'Me', 
    text: 'Hi! What tournaments are coming up?',
    time: '2:20 PM',
    isMe: true
  },
  { 
    id: 3, 
    sender: 'ICA Admin Support', 
    text: 'There\'s a junior tournament next month. We think you\'re ready to participate!',
    time: '2:30 PM',
    isMe: false
  },
  { 
    id: 4, 
    sender: 'Me', 
    text: 'That sounds great! How do I register?',
    time: '2:35 PM',
    isMe: true
  },
  { 
    id: 5, 
    sender: 'ICA Admin Support', 
    text: 'I\'ll send you the registration details shortly. Please check your email as well.',
    time: '2:40 PM',
    isMe: false
  },
];

export default function StudentMessagesPage() {
  const [messageText, setMessageText] = useState('');

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="customer" />
      
      <div className="flex-1">
        <DashboardHeader userName="Student" userRole="customer" />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold text-primary-blue mb-2">
              Personal Messages
            </h1>
            <p className="text-gray-600">Private communication with ICA Administration</p>
          </div>

          <div className="w-full">
            {/* Chat Area - Full Width */}
            <Card className="flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-semibold">ICA Admin Support</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                      Admin Support Available
                    </p>
                  </div>
                </div>
                <Badge variant="info" className="text-xs">
                  Official Support
                </Badge>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isMe
                          ? 'bg-primary-orange text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isMe ? 'text-white opacity-75' : 'text-gray-500'
                        }`}
                      >
                        {message.time}
                      </p>
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
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
