'use client';
import { User, BookMarked, CreditCard, History, Bell, Shield, LogOut, Store, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MenuItem from '@/components/ui/MenuItem';
import Avatar from '@/components/ui/Avatar';

export default function AccountPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Akun Saya</h1>
        
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
                  onClick={() => console.log('Navigate to seller registration')}
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
            <MenuItem
              icon={LogOut}
              title="Keluar"
              description="Keluar dari akun Anda"
              href="#"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}