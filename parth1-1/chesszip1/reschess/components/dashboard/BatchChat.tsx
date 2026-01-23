'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Send, Users, Paperclip } from 'lucide-react';

interface BatchChatProps {
  userRole: 'coach' | 'admin' | 'student' | 'parent';
  userName: string;
}

// Student batch assignment - each student belongs to one specific batch
const studentBatchAssignment: { [key: string]: number } = {
  'Arjun Patel': 2, // Intermediate Batch B
  'Priya Singh': 2, // Intermediate Batch B  
  'Rohan Kumar': 1, // Beginner Batch A
  'Ananya Sharma': 3, // Advanced Batch C
};

// All available batches
const allBatches = [
  { 
    id: 1, 
    name: 'Beginner Batch A', 
    students: 8,
    lastMessage: 'Great session today everyone!',
    time: '2:30 PM',
    unread: 2,
    color: 'bg-blue-500',
    coach: 'FM Priya Sharma',
    level: 'Beginner (800-1200)',
    schedule: 'Mon, Wed, Fri - 4:00 PM'
  },
  { 
    id: 2, 
    name: 'Intermediate Batch B', 
    students: 12,
    lastMessage: 'Don\'t forget tomorrow\'s tactical puzzle homework!',
    time: '11:45 AM',
    unread: 3,
    color: 'bg-green-500',
    coach: 'IM Ramesh Kumar',
    level: 'Intermediate (1200-1600)',
    schedule: 'Tue, Thu, Sat - 10:00 AM'
  },
  { 
    id: 3, 
    name: 'Advanced Batch C', 
    students: 6,
    lastMessage: 'Tournament prep starts next week',
    time: 'Yesterday',
    unread: 1,
    color: 'bg-purple-500',
    coach: 'GM Vishnu Prasad',
    level: 'Advanced (1600+)',
    schedule: 'Daily - 6:00 PM'
  },
  { 
    id: 4, 
    name: 'Weekend Warriors', 
    students: 10,
    lastMessage: 'See you all on Saturday!',
    time: 'Jan 14',
    unread: 0,
    color: 'bg-orange-500',
    coach: 'FM Ankit Sharma',
    level: 'Mixed Levels',
    schedule: 'Sat, Sun - 2:00 PM'
  },
];

// Sample messages for Intermediate Batch B (Arjun's batch)
const batchMessages = [
  {
    id: 1,
    sender: 'IM Ramesh Kumar',
    role: 'Coach',
    message: 'Good morning everyone! Today we\'ll work on the Sicilian Defense - Najdorf Variation.',
    time: '9:45 AM',
    isCurrentUser: false
  },
  {
    id: 2,
    sender: 'Priya Singh',
    role: 'Student',
    message: 'Coach, I have a question about the pawn structure in the Najdorf.',
    time: '9:50 AM',
    isCurrentUser: false
  },
  {
    id: 3,
    sender: 'IM Ramesh Kumar',
    role: 'Coach',
    message: 'Great question Priya! The pawn structure is key. We\'ll cover that in detail today.',
    time: '9:52 AM',
    isCurrentUser: false
  },
  {
    id: 4,
    sender: 'Rohan Mehta',
    role: 'Student',
    message: 'I completed all the tactical puzzles from last class!',
    time: '10:15 AM',
    isCurrentUser: false
  },
  {
    id: 5,
    sender: 'Arjun Patel',
    role: 'Student',
    message: 'Same here! The knight fork puzzles were challenging but fun.',
    time: '10:18 AM',
    isCurrentUser: true
  },
  {
    id: 6,
    sender: 'IM Ramesh Kumar',
    role: 'Coach',
    message: 'Excellent work both of you! For homework, please analyze the game I\'m sharing now.',
    time: '10:20 AM',
    isCurrentUser: false
  },
  {
    id: 7,
    sender: 'Admin',
    role: 'Admin',
    message: '📢 Reminder: Inter-batch tournament registration closes this Friday! Don\'t miss out!',
    time: '11:45 AM',
    isCurrentUser: false
  },
];

// Students in Intermediate Batch B (Arjun's batch)
const batchStudents = [
  { id: 1, name: 'Arjun Patel', rating: 1350, status: 'online', isCurrentUser: true },
  { id: 2, name: 'Priya Singh', rating: 1280, status: 'online', isCurrentUser: false },
  { id: 3, name: 'Rohan Mehta', rating: 1420, status: 'online', isCurrentUser: false },
  { id: 4, name: 'Ananya Reddy', rating: 1190, status: 'offline', isCurrentUser: false },
  { id: 5, name: 'Vikram Kumar', rating: 1310, status: 'online', isCurrentUser: false },
  { id: 6, name: 'Sneha Sharma', rating: 1250, status: 'offline', isCurrentUser: false },
  { id: 7, name: 'Aditya Verma', rating: 1380, status: 'online', isCurrentUser: false },
  { id: 8, name: 'Kavya Iyer', rating: 1290, status: 'online', isCurrentUser: false },
  { id: 9, name: 'Rahul Gupta', rating: 1340, status: 'offline', isCurrentUser: false },
  { id: 10, name: 'Nisha Patel', rating: 1220, status: 'online', isCurrentUser: false },
  { id: 11, name: 'Karan Singh', rating: 1360, status: 'online', isCurrentUser: false },
  { id: 12, name: 'Divya Nair', rating: 1270, status: 'offline', isCurrentUser: false },
];

export default function BatchChat({ userRole, userName }: BatchChatProps) {
  // Get student's assigned batch based on their name
  const studentBatchId = userRole === 'student' ? studentBatchAssignment[userName] : null;
  
  // Students and parents only see their assigned batch, coaches/admins see all batches
  const visibleBatches = (userRole === 'student' || userRole === 'parent') && studentBatchId 
    ? allBatches.filter(batch => batch.id === studentBatchId)
    : allBatches;
  
  const [selectedBatch, setSelectedBatch] = useState(visibleBatches[0]);
  const [messageText, setMessageText] = useState('');
  const [showStudentList, setShowStudentList] = useState(false);

  // Handle sending messages
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      // In a real app, this would send the message to the server
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Batch List */}
      <Card className="lg:col-span-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold">
            {(userRole === 'student' || userRole === 'parent') ? 'My Batch' : 'Batches'}
          </h3>
          <Badge variant="info">{visibleBatches.length}</Badge>
        </div>

        <div className="space-y-2">
          {visibleBatches.map((batch) => (
            <div
              key={batch.id}
              onClick={() => setSelectedBatch(batch)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                selectedBatch.id === batch.id
                  ? 'bg-primary-orange text-white'
                  : 'bg-primary-offwhite hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-10 h-10 ${batch.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                  {batch.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{batch.name}</p>
                  <p className={`text-xs flex items-center ${
                    selectedBatch.id === batch.id ? 'text-white opacity-90' : 'text-gray-600'
                  }`}>
                    <Users className="w-3 h-3 mr-1" />
                    {batch.students} students
                  </p>
                </div>
              </div>
              <p className={`text-xs truncate ${
                selectedBatch.id === batch.id ? 'text-white opacity-75' : 'text-gray-500'
              }`}>
                {batch.lastMessage}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs ${
                  selectedBatch.id === batch.id ? 'text-white opacity-75' : 'text-gray-500'
                }`}>
                  {batch.time}
                </span>
                {batch.unread > 0 && (
                  <Badge variant="error" className="text-xs">
                    {batch.unread}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Chat Area */}
      <Card className={`${showStudentList ? 'lg:col-span-2' : 'lg:col-span-3'} flex flex-col h-[700px]`}>
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${selectedBatch.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
              {selectedBatch.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-lg">{selectedBatch.name}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {selectedBatch.students} students
                </span>
                <span>Coach: {selectedBatch.coach}</span>
                <span>{selectedBatch.level}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{selectedBatch.schedule}</p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setShowStudentList(!showStudentList)}
          >
            <Users className="w-4 h-4 mr-2" />
            {showStudentList ? 'Hide' : 'Show'} Students
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {batchMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-md ${msg.isCurrentUser ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center space-x-2 mb-1">
                  {!msg.isCurrentUser && (
                    <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {msg.sender.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold text-gray-700">
                      {msg.sender}
                      <Badge variant="info" className="ml-2 text-xs">
                        {msg.role}
                      </Badge>
                    </p>
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.isCurrentUser
                      ? 'bg-primary-orange text-white'
                      : msg.role === 'Admin'
                      ? 'bg-red-50 text-red-900 border border-red-200'
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
        <form onSubmit={handleSendMessage} className="pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button 
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={`Message ${selectedBatch.name}...`}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
            />
            <Button type="submit" disabled={!messageText.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </form>
      </Card>

      {/* Student List (Collapsible) */}
      {showStudentList && (
        <Card className="lg:col-span-1">
          <h3 className="text-lg font-heading font-semibold mb-4">
            Batch Students ({batchStudents.length})
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {batchStudents.map((student) => (
              <div key={student.id} className={`flex items-center justify-between p-2 rounded-lg ${
                student.isCurrentUser ? 'bg-primary-orange bg-opacity-10 border border-primary-orange' : 'bg-primary-offwhite'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      student.isCurrentUser ? 'bg-primary-orange' : 'bg-primary-blue'
                    }`}>
                      {student.name.charAt(0)}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      student.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${student.isCurrentUser ? 'text-primary-orange' : ''}`}>
                      {student.name} {student.isCurrentUser ? '(You)' : ''}
                    </p>
                    <p className="text-xs text-gray-500">Rating: {student.rating}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {student.status}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
