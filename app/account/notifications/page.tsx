'use client';
import { ArrowLeft } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import NotificationToggle from '@/components/ui/NotificationToggle';
import Link from 'next/link';

export default function NotificationsPage() {
  const handleNotificationChange = (type: string, enabled: boolean) => {
    console.log(`${type} notifications:`, enabled);
    // In a real app, this would save to backend
  };

  const notificationSettings = [
    {
      label: 'Deals & Promotions',
      description: 'Get notified about special offers and discounts',
      defaultEnabled: true,
    },
    {
      label: 'Messages from Sellers',
      description: 'Receive notifications when sellers message you',
      defaultEnabled: true,
    },
    {
      label: 'Order Status Updates',
      description: 'Track your orders with real-time updates',
      defaultEnabled: true,
    },
    {
      label: 'Group Buy Updates',
      description: 'Get notified about group buy progress and success',
      defaultEnabled: true,
    },
    {
      label: 'New Items from Followed Stores',
      description: 'Be the first to know when your favorite stores add new products',
      defaultEnabled: false,
    },
    {
      label: 'Price Drop Alerts',
      description: 'Get notified when items in your wishlist go on sale',
      defaultEnabled: false,
    },
    {
      label: 'Weekly Newsletter',
      description: 'Receive our weekly digest of fresh products and tips',
      defaultEnabled: false,
    },
  ];

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/account" className="p-2 hover:bg-gray-100 rounded-lg mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notification Settings</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 mb-8">
            Choose what notifications you want to receive. You can change these settings anytime.
          </p>

          <div className="space-y-4">
            {notificationSettings.map((setting, index) => (
              <NotificationToggle
                key={index}
                label={setting.label}
                description={setting.description}
                defaultEnabled={setting.defaultEnabled}
                onChange={(enabled) => handleNotificationChange(setting.label, enabled)}
              />
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-2xl">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Email Preferences</h3>
            <p className="text-sm text-blue-800">
              You can also manage your email notification preferences in your email client by 
              clicking the unsubscribe link in any of our emails.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}