'use client';
import { useEffect, useState } from 'react';
import { Leaf, ShoppingCart, Search, Menu, X, Bell, MessageSquare, User, LogOut } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import SearchBar from '../ui/SearchBar';
import NotificationPanel from '../notifications/NotificationPanel';
import ClientOnly from '../ClientOnly';
import Link from 'next/link';
import Avatar from '../ui/Avatar';

export default function Header() {
  const [hasMounted, setHasMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const { isLoggedIn, user, logout } = useAuthStore();
  const { activeOverlay, setActiveOverlay, closeAllOverlays } = useUIStore();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    closeAllOverlays();
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#A5D6A7] rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1F2937]">PanenHub</span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8"></div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && (
              <Link href="/messages" aria-label="View messages" className="p-2 text-[#1F2937] hover:text-[#A5D6A7] transition-colors">
                <MessageSquare className="w-6 h-6" />
              </Link>
            )}
            <div className="relative">
              <button
                onClick={() => setActiveOverlay(activeOverlay === 'notifications' ? 'none' : 'notifications')}
                aria-label="View notifications"
                className="relative p-2 text-[#1F2937] hover:text-[#A5D6A7] transition-colors"
              >
                <Bell className="w-6 h-6" />
                <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ${isLoggedIn ? '' : 'hidden'}`}>
                  3
                </span>
              </button>
              {activeOverlay === 'notifications' && (
                <NotificationPanel onClose={closeAllOverlays} />
              )}
            </div>
            <Link href="/cart" aria-label="View shopping cart" className="relative p-2 text-[#1F2937] hover:text-[#A5D6A7] transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className={`absolute -top-1 -right-1 bg-[#A5D6A7] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ${itemCount > 0 ? '' : 'hidden'}`}>
                {itemCount}
              </span>
            </Link>
            
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setActiveOverlay(activeOverlay === 'userMenu' ? 'none' : 'userMenu')}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Avatar src={user?.avatar} alt={user?.name} size="sm" fallback={user?.name} />
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                </button>
                
                {activeOverlay === 'userMenu' && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl border border-gray-200 py-2">
                    <Link
                      href="/account"
                      onClick={closeAllOverlays}
                      className="flex items-center px-4 py-2 text-sm text-[#1F2937] hover:bg-[#F3F4F6]"
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Account
                    </Link>
                    {user?.isSeller && (
                      <Link
                        href="/dashboard/mystore"
                        onClick={closeAllOverlays}
                        className="flex items-center px-4 py-2 text-sm text-[#1F2937] hover:bg-[#F3F4F6]"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        My Store
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-[#1F2937] hover:bg-[#F3F4F6]"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn-primary">
                Login / Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {isLoggedIn && (
              <Link href="/messages" aria-label="View messages" className="p-2 text-[#1F2937]">
                <MessageSquare className="w-6 h-6" />
              </Link>
            )}
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              aria-label="View notifications"
              className="relative p-2 text-[#1F2937]"
            >
              <Bell className="w-6 h-6" />
              <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ${isLoggedIn && useUIStore.getState().notificationCount > 0 ? '' : 'hidden'}`}>
                {useUIStore.getState().notificationCount}
              </span>
            </button>
            <Link href="/cart" aria-label="View shopping cart" className="relative p-2 text-[#1F2937]">
              <ShoppingCart className="w-6 h-6" />
              <span className={`absolute -top-1 -right-1 bg-[#A5D6A7] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ${itemCount > 0 ? '' : 'hidden'}`}>
                {itemCount}
              </span>
            </Link>
            <button
              onClick={() => setActiveOverlay(activeOverlay === 'mobileMenu' ? 'none' : 'mobileMenu')}
              aria-label={activeOverlay === 'mobileMenu' ? "Close menu" : "Open menu"}
              className="p-2 text-[#1F2937]"
            >
              {activeOverlay === 'mobileMenu' ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Menu */}
      {activeOverlay === 'mobileMenu' && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4">
          <div className="space-y-2">
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar src={user?.avatar} alt={user?.name} size="sm" fallback={user?.name} />
                  <div>
                    <p className="font-medium text-[#1F2937]">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <Link
                  href="/account"
                  onClick={closeAllOverlays}
                  className="block w-full text-left px-4 py-2 text-[#1F2937] hover:bg-[#F3F4F6] rounded-lg"
                >
                  My Account
                </Link>
                {user?.isSeller && (
                  <Link
                    href="/dashboard/mystore"
                    onClick={closeAllOverlays}
                    className="block w-full text-left px-4 py-2 text-[#1F2937] hover:bg-[#F3F4F6] rounded-lg"
                  >
                    My Store
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-[#1F2937] hover:bg-[#F3F4F6] rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="block w-full bg-[#A5D6A7] text-[#1F2937] px-4 py-2 rounded-full text-center font-semibold">
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Mobile Notification Panel */}
      {activeOverlay === 'notifications' && (
        <div className="md:hidden">
          <NotificationPanel onClose={closeAllOverlays} />
        </div>
      )}
    </header>
  );
}