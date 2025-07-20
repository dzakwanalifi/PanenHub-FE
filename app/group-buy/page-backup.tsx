'use client';
import { Users, Clock, Package, TrendingUp } from 'lucide-react';

export default function GroupBuyPage() {
  console.log('🚀 GroupBuyPage - SYNTAX ERROR FIXED!');

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

      {/* Active Group Buys Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Patungan Aktif</h2>
        
        <div className="text-center py-8">
          <div className="p-6 bg-green-100 border border-green-300 rounded-xl mb-4">
            <h3 className="text-green-800 text-xl font-bold mb-2">🎉 SYNTAX ERROR TERATASI!</h3>
            <p className="text-green-700 mb-2">File page.tsx berhasil diperbaiki dan server sudah bisa compile</p>
            <p className="text-green-600 text-sm">Tidak ada lagi error &quot;Unterminated string constant&quot;</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-700 font-semibold mb-2">✅ Status:</p>
            <ul className="text-blue-600 text-sm space-y-1">
              <li>✅ Basic structure berhasil dimuat</li>
              <li>✅ Tidak ada infinite loading</li>
              <li>✅ Server compilation berhasil</li>
              <li>✅ Ready untuk Step 2: Tambah mock data</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
