'use client';
import { useState } from 'react';
import { MessageSquare, Search, Phone, Video, MoreVertical } from 'lucide-react';
import ConversationListItem from '@/components/messages/ConversationListItem';
import ChatWindow from '@/components/messages/ChatWindow';

interface Conversation {
  id: string;
  otherUser: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: {
    text: string;
    timestamp: string;
    isRead: boolean;
  };
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: '1',
      otherUser: {
        id: 'seller1',
        name: 'Green Valley Farms',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        isOnline: true,
      },
      lastMessage: {
        text: 'Your order has been prepared and will be shipped tomorrow!',
        timestamp: '2 min ago',
        isRead: false,
      },
    },
    {
      id: '2',
      otherUser: {
        id: 'seller2',
        name: 'Sunrise Organic',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        isOnline: false,
      },
      lastMessage: {
        text: 'Thank you for your order! We appreciate your business.',
        timestamp: '1 hour ago',
        isRead: true,
      },
    },
    {
      id: '3',
      otherUser: {
        id: 'seller3',
        name: 'Fresh Fields',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        isOnline: true,
      },
      lastMessage: {
        text: 'Is there anything specific you\'d like to know about our products?',
        timestamp: '3 hours ago',
        isRead: true,
      },
    },
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
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
              {conversations.map((conversation) => (
                <ConversationListItem
                  key={conversation.id}
                  conversation={conversation}
                  isSelected={selectedConversation === conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                />
              ))}
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
  );
}