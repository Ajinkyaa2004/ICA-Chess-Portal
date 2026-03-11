'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { use } from 'react';
import { ChevronLeft, Send, Paperclip, Image as ImageIcon, FileText, Download, AlertCircle } from 'lucide-react';

// Mock batch data
const batchInfo = {
  id: 1,
  name: 'Beginners Batch A',
  level: 'Beginner',
  studentCount: 8,
  schedule: 'Mon, Wed, Fri - 4:00 PM',
};

// Mock messages
const initialMessages = [
  {
    id: 1,
    sender: 'Admin',
    senderRole: 'admin',
    content: 'Welcome everyone to the batch group chat! Feel free to ask questions and share progress.',
    timestamp: '2026-01-15T10:00:00',
    type: 'text',
  },
  {
    id: 2,
    sender: 'IM Ramesh Kumar',
    senderRole: 'coach',
    content: 'Hello everyone! Looking forward to our sessions. Please review the fundamentals PDF I shared.',
    timestamp: '2026-01-15T10:15:00',
    type: 'text',
  },
  {
    id: 3,
    sender: 'Arjun (Parent)',
    senderRole: 'parent',
    content: 'Thanks Coach! Arjun is very excited to learn.',
    timestamp: '2026-01-15T11:30:00',
    type: 'text',
  },
  {
    id: 4,
    sender: 'IM Ramesh Kumar',
    senderRole: 'coach',
    content: '',
    timestamp: '2026-01-15T14:00:00',
    type: 'file',
    file: { name: 'Chess_Fundamentals_Week1.pdf', size: '2.4 MB', url: '#' },
  },
  {
    id: 5,
    sender: 'Priya (Parent)',
    senderRole: 'parent',
    content: 'What time is the next class?',
    timestamp: '2026-01-16T09:00:00',
    type: 'text',
  },
  {
    id: 6,
    sender: 'Admin',
    senderRole: 'admin',
    content: 'The next class is on Monday, Jan 18 at 4:00 PM. Meeting link will be shared 10 minutes before.',
    timestamp: '2026-01-16T09:30:00',
    type: 'text',
  },
  {
    id: 7,
    sender: 'IM Ramesh Kumar',
    senderRole: 'coach',
    content: '',
    timestamp: '2026-01-17T16:00:00',
    type: 'image',
    file: { name: 'Opening_Strategy_Diagram.png', size: '850 KB', url: '#', preview: '/placeholder-chess-diagram.png' },
  },
];

export default function BatchChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: _id } = use(params);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim() && !selectedFile) return;

    const message: any = {
      id: messages.length + 1,
      sender: 'IM Ramesh Kumar',
      senderRole: 'coach',
      timestamp: new Date().toISOString(),
      type: selectedFile ? (selectedFile.type.startsWith('image/') ? 'image' : 'file') : 'text',
    };

    if (selectedFile) {
      message.file = {
        name: selectedFile.name,
        size: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
        url: '#',
        preview: selectedFile.type.startsWith('image/') ? URL.createObjectURL(selectedFile) : undefined,
      };
      message.content = newMessage.trim() || '';
    } else {
      message.content = newMessage.trim();
    }

    setMessages([...messages, message]);
    setNewMessage('');
    setSelectedFile(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex min-h-screen bg-primary-offwhite">
      <Sidebar role="coach" />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader userName="IM Ramesh Kumar" userRole="coach" />
        
        <main className="flex-1 flex flex-col p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="mb-4">
            <Link href="/dashboard/coach/batches">
              <Button variant="ghost" size="sm" className="mb-3">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Batches
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-1">{batchInfo.name} - Group Chat</h1>
                <p className="text-gray-600 text-sm">
                  {batchInfo.studentCount} students • {batchInfo.level} • {batchInfo.schedule}
                </p>
              </div>
              <Badge variant="info">Group Chat</Badge>
            </div>
          </div>

          {/* Chat Notice */}
          <Card className="mb-4 bg-purple-50 border-purple-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-purple-900 mb-1">Batch Group Chat</h4>
                <p className="text-sm text-purple-700">
                  This chat includes <strong>students, parents, coach, and admin</strong>. You can share files and images. 
                  <strong className="block mt-1">No 1-1 chat with parents allowed.</strong> For individual communication, use Admin chat.
                </p>
              </div>
            </div>
          </Card>

          {/* Messages Container */}
          <Card className="flex-1 flex flex-col overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 400px)' }}>
              {messages.map((msg) => {
                const isCoach = msg.senderRole === 'coach';
                const isAdmin = msg.senderRole === 'admin';
                const isParent = msg.senderRole === 'parent';

                return (
                  <div key={msg.id} className={`flex ${isCoach ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] sm:max-w-[60%] ${isCoach ? 'items-end' : 'items-start'}`}>
                      {/* Sender Info */}
                      <div className={`flex items-center space-x-2 mb-1 ${isCoach ? 'justify-end' : 'justify-start'}`}>
                        <Badge 
                          variant={isAdmin ? 'error' : isCoach ? 'info' : 'warning'}
                          className="text-xs"
                        >
                          {isAdmin ? 'Admin' : isCoach ? 'Coach' : 'Parent'}
                        </Badge>
                        <span className="text-xs text-gray-600">{msg.sender}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(msg.timestamp).toLocaleTimeString('en-IN', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>

                      {/* Message Content */}
                      <div 
                        className={`p-3 rounded-lg ${
                          isCoach 
                            ? 'bg-blue-600 text-white' 
                            : isAdmin 
                            ? 'bg-red-100 text-gray-900' 
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        {msg.type === 'text' && (
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        )}

                        {msg.type === 'file' && msg.file && (
                          <div>
                            {msg.content && <p className="text-sm mb-2">{msg.content}</p>}
                            <div className={`flex items-center space-x-3 p-2 rounded ${isCoach ? 'bg-blue-700' : 'bg-white'}`}>
                              <FileText className={`w-8 h-8 ${isCoach ? 'text-blue-200' : 'text-gray-600'}`} />
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${isCoach ? 'text-white' : 'text-gray-900'}`}>
                                  {msg.file.name}
                                </p>
                                <p className={`text-xs ${isCoach ? 'text-blue-200' : 'text-gray-600'}`}>
                                  {msg.file.size}
                                </p>
                              </div>
                              <a href={msg.file.url} download>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className={isCoach ? 'text-white hover:bg-blue-800' : ''}
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </a>
                            </div>
                          </div>
                        )}

                        {msg.type === 'image' && msg.file && (
                          <div>
                            {msg.content && <p className="text-sm mb-2">{msg.content}</p>}
                            <div className="rounded overflow-hidden">
                              <img 
                                src={msg.file.preview || '/placeholder.png'} 
                                alt={msg.file.name}
                                className="w-full max-w-xs rounded"
                              />
                              <div className={`flex items-center justify-between p-2 mt-1 rounded ${isCoach ? 'bg-blue-700' : 'bg-white'}`}>
                                <span className={`text-xs ${isCoach ? 'text-blue-200' : 'text-gray-600'}`}>
                                  {msg.file.name} • {msg.file.size}
                                </span>
                                <a href={msg.file.url} download>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className={isCoach ? 'text-white hover:bg-blue-800' : ''}
                                  >
                                    <Download className="w-3 h-3" />
                                  </Button>
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
              {selectedFile && (
                <div className="mb-2 p-2 bg-blue-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    {selectedFile.type.startsWith('image/') ? (
                      <ImageIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-700 truncate">{selectedFile.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedFile(null)}
                    className="text-red-600 hover:bg-red-100 flex-shrink-0"
                  >
                    ✕
                  </Button>
                </div>
              )}

              <div className="flex items-end space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                />
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                  className="hidden"
                  accept="image/*"
                />
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-shrink-0"
                >
                  <Paperclip className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">File</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => imageInputRef.current?.click()}
                  className="flex-shrink-0"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Image</span>
                </Button>

                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message... (Press Enter to send)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue resize-none text-sm"
                  rows={2}
                />

                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() && !selectedFile}
                  className="flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">Send</span>
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
