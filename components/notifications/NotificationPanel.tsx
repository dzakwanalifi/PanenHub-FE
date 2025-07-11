'use client';
import { Bell, Package, MessageSquare, Star, X } from 'lucide-react';
import Link from 'next/link';

interface NotificationPanelProps {
  onClose: () => void;
}

interface Notification {
  id: string;
  type: 'order' | 'message' | 'review' | 'general';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export default function NotificationPanel({ onClose }: NotificationPanelProps) {
  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #PH12345 has been shipped and is on its way!',
      timestamp: '5 min ago',
      isRead: false,
      actionUrl: '/orders/PH12345',
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'Green Valley Farms sent you a message about your order.',
      timestamp: '1 hour ago',
      isRead: false,
      actionUrl: '/messages/1',
    },
    {
      id: '3',
      type: 'review',
      title: 'Review Request',
      message: 'How was your recent purchase? Leave a review to help others.',
      timestamp: '2 hours ago',
      isRead: true,
      actionUrl: '/account/review/PH12344',
    },
    {
      id: '4',
      type: 'general',
      title: 'Group Buy Success',
      message: 'The Organic Rice Bundle group buy has reached its target!',
      timestamp: '1 day ago',
      isRead: true,
      actionUrl: '/group-buy/1',
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-5 h-5 text-[#2E7D32]" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'review':
        return <Star className="w-5 h-5 text-yellow-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
              !notification.isRead ? 'bg-blue-50' : ''
            }`}
          >
            <Link
              href={notification.actionUrl || '#'}
              onClick={onClose}
              className="flex items-start space-x-3"
            >
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notification.title}
                  </h4>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/notifications"
          onClick={onClose}
          className="block text-center text-sm text-[#2E7D32] hover:underline font-medium"
        >
          View All Notifications
        </Link>
      </div>
    </div>
  );
}