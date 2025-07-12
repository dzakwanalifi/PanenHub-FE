'use client';
import { useState } from 'react';
import { ArrowLeft, Phone, Video, MoreVertical, Send } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import ChatMessage from './ChatMessage';

interface ChatWindowProps {
  conversation: {
    id: string;
    otherUser: {
      id: string;
      name: string;
      avatar: string;
      isOnline: boolean;
    };
    messages?: Array<{
      id: string;
      text: string;
      timestamp: string;
      senderId: string;
    }>;
  };
  onBack: () => void;
}

export default function ChatWindow({ conversation, onBack }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [localMessages, setLocalMessages] = useState<Array<{
    id: string;
    text: string;
    timestamp: string;
    senderId: string;
  }>>([]);
  const { user } = useAuthStore();

  // Combine original messages with local messages
  const allMessages = [
    ...(conversation.messages || []),
    ...localMessages
  ].map(msg => ({
    ...msg,
    isFromCurrentUser: msg.senderId === user?.id,
    avatar: msg.senderId !== user?.id ? conversation.otherUser.avatar : undefined
  }));

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add message to local state
      const newMessage = {
        id: `local-${Date.now()}`,
        text: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderId: user?.id || ''
      };
      
      setLocalMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative">
              <img
                src={conversation.otherUser.avatar}
                alt={conversation.otherUser.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {conversation.otherUser.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{conversation.otherUser.name}</h3>
              <p className="text-sm text-gray-600">
                {conversation.otherUser.isOnline ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {allMessages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-[#2E7D32] text-white p-2 rounded-lg hover:bg-[#1B5E20] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}