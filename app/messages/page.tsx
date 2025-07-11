'use client';
import { useState } from 'react';
import { MessageSquare, Search, Phone, Video, MoreVertical } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { getConversationsByUserId, getUserById, getStoreById } from '@/lib/mock-data';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ConversationListItem from '@/components/messages/ConversationListItem';
import ChatWindow from '@/components/messages/ChatWindow';

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const { user } = useAuthStore();

  // Get conversations for current user
  const rawConversations = user ? getConversationsByUserId(user.id) : [];
  
  // Transform conversations to include other participant info
  const conversations = rawConversations.map(conv => {
    const otherParticipantId = conv.participants.find(p => p !== user?.id);
    const otherUser = getUserById(otherParticipantId || '');
    const otherStore = getStoreById(otherParticipantId || '');
    
    const otherParticipant = otherUser || {
      id: otherParticipantId || '',
      name: otherStore?.name || 'Unknown',
      avatar: otherStore?.logo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      isOnline: Math.random() > 0.5 // Random online status for demo
    };
    
    return {
      id: conv.id,
      otherUser: otherParticipant,
      lastMessage: {
        text: conv.lastMessage.text,
        timestamp: conv.lastMessage.timestamp,
        isRead: conv.lastMessage.senderId !== user?.id // Mark as read if current user didn't send it
      },
      messages: conv.messages
    };
  });

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="flex h-full">
            {/* Conversation List */}
            <div className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col ${selectedConversation ? 'hidden md:flex' : ''}`}>
              <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="p-8 text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No conversations yet</h3>
                    <p className="text-gray-600">Start shopping and chatting with sellers to see your conversations here.</p>
                  </div>
                ) : (
                  conversations.map((conversation) => (
                    <ConversationListItem
                      key={conversation.id}
                      conversation={conversation}
                      isSelected={selectedConversation === conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Chat Window */}
            <div className={`w-full md:w-2/3 flex flex-col ${!selectedConversation ? 'hidden md:flex' : ''}`}>
              {selectedConv ? (
                <ChatWindow 
                  conversation={selectedConv} 
                  onBack={() => setSelectedConversation(null)}
                />
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a conversation from the list to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}