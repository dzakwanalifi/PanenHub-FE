import { Users, Clock, Package, TrendingUp } from 'lucide-react';
import GroupBuyCard from '@/components/group-buy/GroupBuyCard';

interface GroupBuy {
  id: string;
  title: string;
  description: string;
  image: string;
  pricePerUnit: number;
  originalPrice: number;
  currentParticipants: number;
  targetParticipants: number;
  timeLeft: string;
  store: string;
  category: string;
  details: string;
  minimumOrder: number;
  maximumOrder: number;
}

// Server-side function - berjalan di server sebelum halaman dikirim
async function getGroupBuyData(): Promise<GroupBuy[]> {
  try {
    // Gunakan absolute URL untuk server-side fetch
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/group-buy`, {
      // Revalidate setiap 60 detik
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Server-side fetch error:', error);
    return []; // Return empty array sebagai fallback
  }
}

// Server Component - tidak perlu 'use client'
export default async function GroupBuyPage() {
  // Data sudah tersedia saat halaman pertama kali dimuat
  const groupBuyData = await getGroupBuyData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Patungan</h1>
        <p className="text-gray-600">Bergabung dalam pembelian kelompok untuk harga lebih baik</p>
      </div>

      {/* How it works section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Cara Kerja Patungan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-[#2E7D32]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Gabung Grup</h3>
            <p className="text-sm text-gray-600">Temukan produk yang Anda inginkan dan bergabung dengan pembeli lain</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-[#2E7D32]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Capai Target</h3>
            <p className="text-sm text-gray-600">Tunggu hingga cukup orang bergabung dalam grup</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-[#2E7D32]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Dapatkan Produk</h3>
            <p className="text-sm text-gray-600">Nikmati harga grosir dan pengiriman segar</p>
          </div>
        </div>
      </div>

      {/* Active Group Buys */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Patungan Aktif</h2>
        
        {groupBuyData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Belum ada patungan yang tersedia saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupBuyData.map((groupBuy) => (
              <GroupBuyCard
                key={groupBuy.id}
                id={groupBuy.id}
                title={groupBuy.title}
                description={groupBuy.description}
                image={groupBuy.image}
                pricePerUnit={groupBuy.pricePerUnit}
                originalPrice={groupBuy.originalPrice}
                currentParticipants={groupBuy.currentParticipants}
                targetParticipants={groupBuy.targetParticipants}
                timeLeft={groupBuy.timeLeft}
                store={groupBuy.store}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
