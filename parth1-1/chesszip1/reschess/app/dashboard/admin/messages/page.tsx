'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, Search, Send, Paperclip, Shield, MessageSquare } from 'lucide-react';

export default function AdminMessagesPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(json => { if (json?.user?._id) setCurrentUserId(json.user._id); })
      .catch(() => {});

    fetch('/api/conversations')
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        const convs = json?.data || [];
        setConversations(convs);
        if (convs.length > 0) setSelectedConversation(convs[0]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedConversation?._id) { setMessages([]); return; }
    fetch(`/api/conversations/${selectedConversation._id}/messages`)
      .then(r => r.ok ? r.json() : null)
      .then(json => setMessages(json?.data || json?.messages || []))
      .catch(() => {});
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!messageText.trim() || !selectedConversation?._id || sending) return;
    setSending(true);
    try {
      const res = await fetch(`/api/conversations/${selectedConversation._id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: messageText }),
      });
      if (res.ok) {
        const json = await res.json();
        const newMsg = json?.data || json?.message;
        if (newMsg) setMessages(prev => [...prev, newMsg]);
        setMessageText('');
      }
    } catch { /* ignore */ }
    setSending(false);
  };

  // Normalize a conversation doc for display
  const getConvName = (conv: any) => {
    const others = (conv.participants || []).filter((p: any) => p.userId !== currentUserId);
    if (others.length > 0 && others[0].name) return others[0].name;
    return conv.title || 'Conversation';
  };
  const getConvRole = (conv: any) => {
    const others = (conv.participants || []).filter((p: any) => p.userId !== currentUserId);
    const role = others[0]?.role || '';
    if (role === 'coach') return 'Coach';
    if (role === 'customer') return 'Parent';
    return role || 'User';
  };

  const filteredConversations = conversations.filter(conv => {
    const name = getConvName(conv).toLowerCase();
    const matchesSearch = name.includes(searchQuery.toLowerCase());
    const role = getConvRole(conv);
    const matchesRole = filterRole === 'all' || role === filterRole;
    return matchesSearch && matchesRole;
  });

  const selectedName = selectedConversation ? getConvName(selectedConversation) : '';
  const selectedRole = selectedConversation ? getConvRole(selectedConversation) : '';

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
                {loading ? (
                  <p className="text-sm text-gray-400 text-center py-6">Loading...</p>
                ) : filteredConversations.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No conversations yet</p>
                    <p className="text-xs text-gray-400 mt-1">Start a new conversation below</p>
                  </div>
                ) : (
                  filteredConversations.map((conv) => {
                    const name = getConvName(conv);
                    const role = getConvRole(conv);
                    const isSelected = selectedConversation?._id === conv._id;
                    const lastMsg = conv.lastMessage?.content || '';
                    const lastTime = conv.lastMessageAt
                      ? new Date(conv.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : '';
                    return (
                      <div
                        key={conv._id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          isSelected ? 'bg-primary-blue text-white' : 'bg-primary-offwhite hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            role === 'Coach' ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-xs truncate">{name}</p>
                            <p className={`text-xs ${isSelected ? 'text-white opacity-90' : 'text-gray-600'}`}>{role}</p>
                          </div>
                        </div>
                        <p className={`text-xs truncate ${isSelected ? 'text-white opacity-75' : 'text-gray-500'}`}>{lastMsg}</p>
                        <p className={`text-xs mt-1 ${isSelected ? 'text-white opacity-75' : 'text-gray-400'}`}>{lastTime}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-3 flex flex-col h-[600px] sm:h-[650px]">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        selectedRole === 'Coach' ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {selectedName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{selectedName}</p>
                        <p className="text-sm text-gray-500">{selectedRole}</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map((msg: any) => {
                        const isMine = msg.senderId === currentUserId || msg.sender?._id === currentUserId;
                        return (
                          <div key={msg._id || msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-md ${isMine ? 'text-right' : 'text-left'}`}>
                              {!isMine && (
                                <p className="text-xs font-semibold text-gray-700 mb-1">{msg.sender?.name || selectedName}</p>
                              )}
                              <div className={`px-4 py-2 rounded-lg ${isMine ? 'bg-primary-orange text-white' : 'bg-gray-100 text-gray-900'}`}>
                                <p className="text-sm">{msg.content || msg.message}</p>
                                <p className={`text-xs mt-1 ${isMine ? 'text-white opacity-75' : 'text-gray-500'}`}>
                                  {msg.createdAt
                                    ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    : ''}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
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
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                        placeholder={`Message ${selectedName}...`}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                      />
                      <Button onClick={handleSend} disabled={sending}>
                        <Send className="w-4 h-4 mr-2" />
                        {sending ? 'Sending...' : 'Send'}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Note: Admin can message coaches and parents only
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No conversations yet</p>
                    <p className="text-sm text-gray-400 mt-1">Conversations with coaches and parents will appear here</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
