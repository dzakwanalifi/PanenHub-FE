'use client';
import { useEffect, useState } from 'react';
import { Home, Users, ShoppingCart, ScrollText, User, MessageSquare } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import ClientOnly from '../ClientOnly';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileTabBar() {
  const [hasMounted, setHasMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const tabs = [
    { icon: Home, label: 'Home', href: '/', iconFilled: Home },
    { icon: Users, label: 'Patungan', href: '/group-buy', iconFilled: Users },
    { icon: ShoppingCart, label: 'Cart', href: '/cart', badge: itemCount, iconFilled: ShoppingCart },
    { icon: ScrollText, label: 'Orders', href: '/orders', iconFilled: ScrollText },
    { icon: User, label: 'Account', href: '/account', iconFilled: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-4">
      <div className="grid grid-cols-5 py-3">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const IconComponent = isActive ? tab.iconFilled : tab.icon;
          return (
            <div
              key={tab.href}
              className="flex flex-col items-center"
            >
              <Link
                href={tab.href}
                className="flex flex-col items-center py-2 px-3 transition-colors"
              >
                <div className={`relative p-2 rounded-full transition-colors ${
                  isActive ? 'bg-[#A5D6A7]' : ''
                }`}>
                  <IconComponent className={`w-6 h-6 ${
                    isActive ? 'text-white' : 'text-gray-500'
                  }`} />
                </div>
                {tab.badge !== undefined && (
                  <span className={`absolute -top-1 -right-1 bg-[#A5D6A7] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ${tab.badge > 0 ? '' : 'hidden'}`}>
                    {tab.badge}
                  </span>
                )}
                <span className={`text-xs mt-1 ${
                  isActive ? 'text-[#A5D6A7] font-medium' : 'text-gray-500'
                }`}>{tab.label}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}