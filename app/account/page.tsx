'use client';
import { User, BookMarked, CreditCard, History, Bell, Shield, LogOut, Store, LayoutDashboard, RefreshCw } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MenuItem from '@/components/ui/MenuItem';
import Avatar from '@/components/ui/Avatar';

export default function AccountPage() {
  const { user, logout, refreshUserData } = useAuthStore();
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleRefreshUserData = async () => {
    setIsRefreshing(true);
    try {
      await refreshUserData();
      console.log('User data refreshed successfully');
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto-refresh user data when component mounts
  useEffect(() => {
    const autoRefresh = async () => {
      try {
        await refreshUserData();
        console.log('Auto-refresh user data completed');
      } catch (error) {
        console.error('Auto-refresh failed:', error);
      }
    };

    // Only auto-refresh if user is logged in
    if (user) {
      autoRefresh();
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Akun Saya</h1>
          <button
            onClick={handleRefreshUserData}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-[#2E7D32] text-white rounded-lg hover:bg-[#1B5E20] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">
              {isRefreshing ? 'Memperbarui...' : 'Perbarui Data'}
            </span>
          </button>
        </div>
        
        {/* User Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <Avatar 
              src={user?.avatar} 
              alt={user?.name} 
              size="lg" 
              fallback={user?.name}
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Selamat datang, {user?.name}</h2>
              <p className="text-gray-600">Bergabung sejak {user?.joinDate}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* My Account Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Akun Saya</h3>
            <div className="space-y-4">
              <MenuItem
                icon={User}
                title="Pengaturan Profil"
                description="Perbarui nama, foto, dan informasi pribadi Anda"
                href="/account/profile"
              />
              <MenuItem
                icon={BookMarked}
                title="Buku Alamat"
                description="Kelola alamat pengiriman dan pickup Anda"
                href="/account/addresses"
              />
              <MenuItem
                icon={CreditCard}
                title="Metode Pembayaran"
                description="Kelola opsi pembayaran tersimpan Anda"
                href="/account/payment"
              />
            </div>
          </div>

          {/* My Orders Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pesanan Saya</h3>
            <div className="space-y-4">
              <MenuItem
                icon={History}
                title="Riwayat Pesanan"
                description="Lacak pembelian saat ini dan masa lalu"
                href="/orders"
              />
            </div>
          </div>

          {/* Seller Tools Section */}
          {user?.isSeller && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Alat Penjual</h3>
              
              {/* Seller Stats Card */}
              <div className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold">Toko Anda</h4>
                    <p className="text-green-100 text-sm">Status: Aktif</p>
                  </div>
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Store className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-xs text-green-100">Produk</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">45</div>
                    <div className="text-xs text-green-100">Pesanan</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">4.8</div>
                    <div className="text-xs text-green-100">Rating</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <MenuItem
                  icon={LayoutDashboard}
                  title="Dashboard Toko Saya"
                  description="Kelola toko dan produk Anda"
                  href="/dashboard/mystore"
                />
                <MenuItem
                  icon={Store}
                  title="Pengaturan Toko"
                  description="Konfigurasi profil dan pengaturan toko Anda"
                  href="/dashboard/settings"
                />
              </div>
            </div>
          )}

          {/* Become a Seller Section */}
          {!user?.isSeller && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Menjadi Penjual</h3>
              <div className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Buka Toko Gratis</h3>
                <p className="text-green-100 mb-6">Mulai jual produk Anda dan jangkau ribuan pelanggan</p>
                <button
                  onClick={() => router.push('/seller-registration')}
                  className="bg-white text-[#2E7D32] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Mulai Sekarang
                </button>
              </div>
            </div>
          )}

          {/* App Settings Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pengaturan Aplikasi</h3>
            <div className="space-y-4">
              <MenuItem
                icon={Bell}
                title="Pengaturan Notifikasi"
                description="Pilih pembaruan yang ingin Anda terima"
                href="/account/notifications"
              />
              <MenuItem
                icon={Shield}
                title="Keamanan"
                description="Ubah password dan kelola keamanan akun"
                href="/account/security"
              />
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Keluar</h3>
                  <p className="text-sm text-gray-600">Keluar dari akun Anda</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
