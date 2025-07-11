'use client';

interface ConversationListItemProps {
  conversation: {
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
  };
  isSelected: boolean;
  onClick: () => void;
}

export default function ConversationListItem({ conversation, isSelected, onClick }: ConversationListItemProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-[#2E7D32] bg-opacity-10 border-[#2E7D32]' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={conversation.otherUser.avatar}
            alt={conversation.otherUser.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {conversation.otherUser.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-semibold truncate ${isSelected ? 'text-[#2E7D32]' : 'text-gray-900'}`}>
              {conversation.otherUser.name}
            </h3>
            <span className="text-xs text-gray-500">{conversation.lastMessage.timestamp}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className={`text-sm truncate ${conversation.lastMessage.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
              {conversation.lastMessage.text}
            </p>
            {!conversation.lastMessage.isRead && (
              <div className="w-2 h-2 bg-[#2E7D32] rounded-full ml-2"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}