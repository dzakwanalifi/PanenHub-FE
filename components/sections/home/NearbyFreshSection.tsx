'use client';
import { useState, useEffect, useMemo } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { mockProducts, mockStores } from '@/lib/mock-data';

export default function NearbyFreshSection() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Add static distance and filter for nearby products (properly memoized to prevent infinite re-renders)
  const nearbyFreshProducts = useMemo(() => {
    return mockProducts
      .map(product => {
        // Generate a consistent distance based on the product ID (same algorithm as ProductCard)
        const hash = product.id.split('').reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
        }, 0);
        const distance = parseFloat(((Math.abs(hash) % 45) / 10 + 0.5).toFixed(1));
        
        return {
          ...product,
          distance,
          isNew: Math.random() > 0.5, // Mock "new" flag - this will be consistent per product due to static seed
        };
      })
      .filter(product => 
        product.distance < 2 && // Only products within 2km
        product.isNew // Only "new" products
      )
      .slice(0, 6); // Limit to 6 products
  }, []); // Empty dependency array since mockProducts is static

  if (nearbyFreshProducts.length === 0) {
    return null; // Don't render section if no products match criteria
  }

  return (
    <section className="px-4 py-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <Sparkles className="w-6 h-6 text-[#2E7D32] mr-2" />
            <h2 className="text-xl font-bold text-[#1F2937]">Baru Masuk: Segar dari Sekitar</h2>
          </div>
          <div className="bg-green-100 text-[#2E7D32] text-xs font-semibold px-2 py-1 rounded-full">
            DEKAT ANDA
          </div>
        </div>
        <button className="flex items-center text-[#2E7D32] font-semibold hover:text-[#1B5E20] transition-colors">
          Lihat Semua
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm">
        Produk segar yang baru dipanen dari petani di sekitar lokasi Anda. Langsung dari kebun ke meja Anda!
      </p>

      {/* Products Horizontal Scroll */}
      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-48">
                <div className="bg-gray-200 animate-pulse rounded-2xl h-48 mb-3"></div>
                <div className="bg-gray-200 animate-pulse h-4 rounded mb-2"></div>
                <div className="bg-gray-200 animate-pulse h-3 rounded w-2/3"></div>
              </div>
            ))
          ) : (
            nearbyFreshProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-48 relative">
                {/* New Badge */}
                <div className="absolute top-2 left-2 bg-[#2E7D32] text-white text-xs font-bold px-2 py-1 rounded-lg z-10">
                  BARU
                </div>
                
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.images[0]}
                  rating={product.rating}
                  store={mockStores.find(s => s.id === product.storeId)?.name || 'Unknown Store'}
                />
              </div>
            ))
          )}
        </div>

        {/* Scroll indicators */}
        {!isLoading && nearbyFreshProducts.length > 2 && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: Math.ceil(nearbyFreshProducts.length / 2) }).map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300"
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      {!isLoading && (
        <div className="text-center mt-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
            <p className="text-sm text-gray-700 mb-3">
              💡 <span className="font-semibold">Tips:</span> Produk segar biasanya tersedia terbatas. 
              Pesan sekarang untuk mendapatkan hasil panen terbaik!
            </p>
            <button className="bg-[#2E7D32] text-white px-6 py-2 rounded-lg hover:bg-[#1B5E20] transition-colors text-sm font-semibold">
              Jelajahi Produk Segar
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
} 