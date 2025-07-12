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
  const cart = useCartStore((state) => state.cart);
  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
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
    { icon: ShoppingCart, label: 'Keranjang', href: '/cart' },
    { icon: ScrollText, label: 'Transaksi', href: '/orders' },
    { icon: User, label: 'Akun', href: '/account' },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2">
        <div className="grid grid-cols-5 py-2 relative">
          {tabs.map((tab, index) => {
            const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
            const IconComponent = tab.icon;
            
            return (
              <div
                key={tab.href}
                className="flex flex-col items-center"
              >
                <Link
                  href={tab.href}
                  className="flex flex-col items-center py-2 px-1 transition-colors"
                >
                  <div className={`relative p-2 rounded-full transition-colors ${
                    isActive ? 'bg-[#A5D6A7]' : 'bg-transparent'
                  }`}>
                    <IconComponent className={`w-5 h-5 ${
                      isActive ? 'text-white' : 'text-[#1F2937]'
                    }`} />
                    {/* Cart Badge */}
                    {tab.href === '/cart' && itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {itemCount > 99 ? '99+' : itemCount}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs mt-1 ${
                    isActive ? 'text-[#A5D6A7] font-medium' : 'text-[#1F2937]'
                  }`}>{tab.label}</span>
                </Link>
              </div>
            );
          })}
        </div>
        
        {/* Floating Quick Sell Button */}
        <div className="absolute top-0 right-4 -mt-6">
          <button
            onClick={handleQuickSell}
            className="w-12 h-12 bg-[#A5D6A7] rounded-full flex items-center justify-center shadow-lg hover:bg-[#B9E4C9] transition-colors"
            aria-label="Quick sell your products"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
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