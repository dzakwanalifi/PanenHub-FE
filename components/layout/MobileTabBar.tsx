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
    { icon: Home, label: 'Home', href: '/' },
    { icon: Users, label: 'Patungan', href: '/group-buy' },
    { icon: ShoppingCart, label: 'Cart', href: '/cart', badge: itemCount },
    { icon: ScrollText, label: 'Orders', href: '/orders' },
    { icon: User, label: 'Account', href: '/account' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 py-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center py-2 px-1 transition-colors ${
                isActive ? 'text-[#2E7D32]' : 'text-gray-500'
              }`}
            >
              <div className="relative">
                <tab.icon className="w-6 h-6" />
                <ClientOnly>
                  {tab.badge && tab.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#2E7D32] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </ClientOnly>
              </div>
              <span className="text-xs mt-1">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}