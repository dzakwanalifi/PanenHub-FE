'use client';

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    timestamp: string;
    isFromCurrentUser: boolean;
    avatar?: string;
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex ${message.isFromCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.isFromCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {!message.isFromCurrentUser && message.avatar && (
          <img
            src={message.avatar}
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <div className={`px-4 py-2 rounded-2xl ${
          message.isFromCurrentUser
            ? 'bg-[#2E7D32] text-white rounded-br-md'
            : 'bg-white text-gray-900 rounded-bl-md shadow-sm'
        }`}>
          <p className="text-sm">{message.text}</p>
          <p className={`text-xs mt-1 ${
            message.isFromCurrentUser ? 'text-green-100' : 'text-gray-500'
          }`}>
            {message.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}