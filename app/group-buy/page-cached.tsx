'use client';
import { useState, useEffect } from 'react';
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

// Cache untuk menyimpan data sementara
let dataCache: GroupBuy[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 60000; // 1 menit

export default function GroupBuyPage() {
  const [groupBuyData, setGroupBuyData] = useState<GroupBuy[]>(dataCache || []);
  const [loading, setLoading] = useState(!dataCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🚀 GroupBuyPage component mounted!');
    
    const fetchGroupBuyData = async () => {
      try {
        // Cek apakah data cache masih valid
        const now = Date.now();
        if (dataCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
          console.log('Frontend: Using cached data');
          setGroupBuyData(dataCache);
          setLoading(false);
          return;
        }

        console.log('Frontend: Fetching fresh data...');
        setLoading(true);
        
        const response = await fetch('/api/group-buy', {
          // Aggressive caching strategy
          cache: 'force-cache',
          next: { revalidate: 60 }
        });
        
        console.log('Frontend: Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Gagal mengambil data patungan: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Frontend: Received fresh data:', data);
        
        // Simpan ke cache
        dataCache = data;
        cacheTimestamp = now;
        
        setGroupBuyData(data);
      } catch (err) {
        console.error('Frontend: Error fetching group buy data:', err);
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    // Start fetch immediately, no delay
    fetchGroupBuyData();
  }, []);

  // Preload effect - mulai fetch data sebelum component mount
  useEffect(() => {
    // Prefetch data untuk kunjungan berikutnya
    const prefetchData = async () => {
      try {
        await fetch('/api/group-buy');
        console.log('Prefetch completed');
      } catch (error) {
        console.log('Prefetch failed:', error);
      }
    };

    // Prefetch setelah component stabil
    const timer = setTimeout(prefetchData, 2000);
    return () => clearTimeout(timer);
  }, []);

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
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-4 animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button 
              onClick={() => {
                dataCache = null;
                cacheTimestamp = null;
                window.location.reload();
              }} 
              className="bg-[#2E7D32] text-white px-4 py-2 rounded-lg hover:bg-[#1B5E20]"
            >
              Coba Lagi
            </button>
          </div>
        ) : groupBuyData.length === 0 ? (
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
