'use client';
import { useState, useEffect } from 'react';
import { Leaf, ShoppingCart, Search, Menu, X, Bell, MessageSquare } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import SearchBar from '../ui/SearchBar';
import NotificationPanel from '../notifications/NotificationPanel';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#2E7D32] rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PanenHub</span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/messages" className="p-2 text-gray-600 hover:text-[#2E7D32] transition-colors">
              <MessageSquare className="w-6 h-6" />
            </Link>
            <Link href="/messages" className="p-2 text-gray-600 hover:text-[#2E7D32] transition-colors">
              <MessageSquare className="w-6 h-6" />
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-gray-600 hover:text-[#2E7D32] transition-colors"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              {isNotificationOpen && (
                <NotificationPanel onClose={() => setIsNotificationOpen(false)} />
              )}
            </div>
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-[#2E7D32] transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {hasMounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2E7D32] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link href="/login" className="bg-[#2E7D32] text-white px-4 py-2 rounded-lg hover:bg-[#1B5E20] transition-colors">
              Login / Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/messages" className="p-2 text-gray-600">
              <MessageSquare className="w-6 h-6" />
            </Link>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 text-gray-600"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            <Link href="/cart" className="relative p-2 text-gray-600">
              <ShoppingCart className="w-6 h-6" />
              {hasMounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2E7D32] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4">
          <div className="space-y-2">
            <Link href="/login" className="block w-full bg-[#2E7D32] text-white px-4 py-2 rounded-lg text-center">
              Login / Sign Up
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Notification Panel */}
      {isNotificationOpen && (
        <div className="md:hidden">
          <NotificationPanel onClose={() => setIsNotificationOpen(false)} />
        </div>
      )}
    </header>
  );
}