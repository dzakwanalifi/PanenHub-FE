'use client';
import { User, Package, Settings, LogOut, Edit3, LayoutDashboard, Wallet, Store } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    joinDate: 'March 2024',
    isSeller: true, // This would come from authentication context
  };

  const menuItems = [
    { icon: Package, label: 'My Orders', href: '/orders', description: 'View your order history' },
    { icon: Settings, label: 'Profile Settings', href: '/profile', description: 'Update your personal information' },
    { icon: User, label: 'Address Book', href: '/addresses', description: 'Manage delivery addresses' },
    { icon: LogOut, label: 'Logout', href: '/logout', description: 'Sign out of your account' },
  ];

  const sellerMenuItems = [
    { icon: LayoutDashboard, label: 'My Store Dashboard', href: '/dashboard/mystore', description: 'Manage your store and products' },
    { icon: Wallet, label: 'My Earnings', href: '/dashboard/earnings', description: 'View earnings and request payouts' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Welcome, {user.name}</h2>
              <p className="text-gray-600">Member since {user.joinDate}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold">{user.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-semibold">{user.address}</p>
              </div>
            </div>
            
            <button className="w-full mt-6 bg-[#2E7D32] text-white py-2 px-4 rounded-lg hover:bg-[#1B5E20] transition-colors flex items-center justify-center">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="lg:col-span-2 space-y-8">
          {/* Seller Tools Section */}
          {user.isSeller ? (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Seller Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sellerMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white rounded-2xl p-6 hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{item.label}</h3>
                        <p className="text-sm text-green-100">{item.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Become a Seller</h3>
              <div className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Open Your Store for Free</h3>
                <p className="text-green-100 mb-6">Start selling your products and reach thousands of customers</p>
                <button
                  onClick={() => console.log('Navigate to seller registration')}
                  className="bg-white text-[#2E7D32] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}

          {/* Regular Menu Items */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Account Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => console.log('Navigate to:', item.href)}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-[#2E7D32]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.label}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}