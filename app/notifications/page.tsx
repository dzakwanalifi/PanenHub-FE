'use client';
import { useState } from 'react';
import { Bell, Package, MessageSquare, Star, Filter } from 'lucide-react';

interface Notification {
  id: string;
  type: 'order' | 'message' | 'review' | 'general';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #PH12345 has been shipped and is on its way! Track your package to see real-time updates.',
      timestamp: '5 min ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message from Green Valley Farms',
      message: 'Green Valley Farms sent you a message about your recent order. They want to confirm your delivery preferences.',
      timestamp: '1 hour ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'review',
      title: 'Review Request',
      message: 'How was your recent purchase of Organic Carrots? Leave a review to help other customers make informed decisions.',
      timestamp: '2 hours ago',
      isRead: true,
    },
    {
      id: '4',
      type: 'general',
      title: 'Group Buy Success!',
      message: 'The Organic Rice Bundle group buy has reached its target! Your order will be processed and shipped soon.',
      timestamp: '1 day ago',
      isRead: true,
    },
    {
      id: '5',
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #PH12344 has been successfully delivered. We hope you enjoy your fresh produce!',
      timestamp: '2 days ago',
      isRead: true,
    },
    {
      id: '6',
      type: 'message',
      title: 'New Message from Sunrise Organic',
      message: 'Sunrise Organic has responded to your inquiry about their seasonal fruit selection.',
      timestamp: '3 days ago',
      isRead: true,
    },
  ];

  const tabs = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'orders', label: 'Orders', count: notifications.filter(n => n.type === 'order').length },
    { id: 'messages', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
    { id: 'reviews', label: 'Reviews', count: notifications.filter(n => n.type === 'review').length },
  ];

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab.slice(0, -1)); // Remove 's' from 'orders', 'messages'

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-6 h-6 text-[#2E7D32]" />;
      case 'message':
        return <MessageSquare className="w-6 h-6 text-blue-600" />;
      case 'review':
        return <Star className="w-6 h-6 text-yellow-600" />;
      default:
        return <Bell className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Notifikasi</h1>
        <p className="text-gray-600">Tetap update dengan pesanan, pesan, dan aktivitas Anda</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#2E7D32] text-[#2E7D32]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-100">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
                onClick={() => console.log('Navigate to:', notification.actionUrl)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{notification.timestamp}</span>
                        {!notification.isRead && (
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}