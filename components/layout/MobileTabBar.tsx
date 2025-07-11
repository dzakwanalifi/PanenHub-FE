'use client';
import { useEffect, useState } from 'react';
import { Home, Users, ShoppingCart, ScrollText, User, MessageSquare, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import ClientOnly from '../ClientOnly';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import QuickSellModal from '../modals/QuickSellModal';

export default function MobileTabBar() {
  const [hasMounted, setHasMounted] = useState(false);
  const [showQuickSellModal, setShowQuickSellModal] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const { isLoggedIn, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleQuickSell = () => {
    if (!isLoggedIn) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }

    if (user?.isSeller) {
      // Navigate directly to add product page for existing sellers
      router.push('/dashboard/products/manage/new');
    } else {
      // Show modal for non-sellers
      setShowQuickSellModal(true);
    }
  };

  const tabs = [
    { icon: Home, label: 'Beranda', href: '/' },
    { icon: Users, label: 'Patungan', href: '/group-buy' },
    null, // Placeholder for central sell button
    { icon: ScrollText, label: 'Transaksi', href: '/orders' },
    { icon: User, label: 'Akun', href: '/account' },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-4">
        <div className="grid grid-cols-5 py-3 relative">
          {tabs.map((tab, index) => {
            if (tab === null) {
              // Central Quick Sell Button
              return (
                <div key="quick-sell" className="flex flex-col items-center relative">
                  <button
                    onClick={handleQuickSell}
                    className="w-14 h-14 bg-[#A5D6A7] rounded-full flex items-center justify-center shadow-lg hover:bg-[#B9E4C9] transition-colors -mt-2"
                    aria-label="Quick sell your products"
                  >
                    <Plus className="w-7 h-7 text-white" />
                  </button>
                  <span className="text-xs mt-1 text-[#A5D6A7] font-medium">Jual</span>
                </div>
              );
            }

            // Handle cart separately to show badge
            if (index === 2) {
              const isActive = pathname.startsWith('/cart');
              return (
                <div key="cart" className="flex flex-col items-center">
                  <Link
                    href="/cart"
                    className="flex flex-col items-center py-2 px-3 transition-colors"
                  >
                    <div className={`relative p-2 rounded-full transition-colors ${
                      isActive ? 'bg-[#A5D6A7]' : 'bg-transparent'
                    }`}>
                      <ShoppingCart className={`w-5 h-5 ${
                        isActive ? 'text-white' : 'text-[#1F2937]'
                      }`} />
                      {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {itemCount}
                        </span>
                      )}
                    </div>
                    <span className={`text-xs mt-1 ${
                      isActive ? 'text-[#A5D6A7] font-medium' : 'text-[#1F2937]'
                    }`}>Keranjang</span>
                  </Link>
                </div>
              );
            }

          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
          const IconComponent = tab.icon;
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
                  isActive ? 'bg-[#A5D6A7]' : 'bg-transparent'
                }`}>
                  <IconComponent className={`w-5 h-5 ${
                    isActive ? 'text-white' : 'text-[#1F2937]'
                  }`} />
                </div>
                <span className={`text-xs mt-1 ${
                  isActive ? 'text-[#A5D6A7] font-medium' : 'text-[#1F2937]'
                }`}>{tab.label}</span>
              </Link>
            </div>
          );
          })}
        </div>
      </nav>

      {/* Quick Sell Modal */}
      <QuickSellModal 
        isOpen={showQuickSellModal}
        onClose={() => setShowQuickSellModal(false)}
      />
    </>
  );
}