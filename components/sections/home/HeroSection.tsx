'use client';
import { ArrowRight, MapPin, Truck, Users } from 'lucide-react';
import Link from 'next/link';
import { useLocationStore } from '@/store/locationStore';

export default function HeroSection() {
  const currentLocation = useLocationStore((state) => state.currentLocation);

  return (
    <section className="relative h-[500px] sm:h-[550px] md:h-[600px] overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Petani dengan hasil panen segar"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-green-900/80 via-green-800/60 to-green-900/40 sm:to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center h-full px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-white w-full max-w-3xl">
          {/* Location Badge */}
          {currentLocation && (
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 mb-4 sm:mb-6">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-[#A5D6A7]" />
              <span className="text-xs sm:text-sm font-medium">{currentLocation.name}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Hasil Panen <span className="text-[#A5D6A7]">Segar</span><br />
            dari <span className="text-[#A5D6A7]">Petani Terdekat</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-200 leading-relaxed max-w-2xl">
            Nikmati produk organik berkualitas tinggi langsung dari kebun petani di sekitar Anda. 
            Segar, sehat, dan mendukung ekonomi lokal.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
              <Truck className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-[#A5D6A7]" />
              <span className="text-xs sm:text-sm font-medium">Antar Hari Ini</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-[#A5D6A7]" />
              <span className="text-xs sm:text-sm font-medium">Langsung dari Petani</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-[#A5D6A7]" />
              <span className="text-xs sm:text-sm font-medium">Radius 5km</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[#A5D6A7] text-[#1F2937] px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#B9E4C9] transition-all duration-300 hover:shadow-lg active:scale-95 sm:hover:scale-105"
            >
              Jelajahi Produk Segar
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
            <Link
              href="/group-buy"
              className="inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-[#1F2937] transition-all duration-300 active:scale-95"
            >
              Gabung Group Buy
            </Link>
          </div>
        </div>

        {/* Stats Cards - Desktop Only */}
        <div className="hidden xl:flex flex-col gap-3 ml-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center min-w-[160px] lg:min-w-[180px]">
            <div className="text-2xl lg:text-3xl font-bold text-[#A5D6A7] mb-1 lg:mb-2">500+</div>
            <div className="text-xs lg:text-sm text-gray-200">Petani Mitra</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center min-w-[160px] lg:min-w-[180px]">
            <div className="text-2xl lg:text-3xl font-bold text-[#A5D6A7] mb-1 lg:mb-2">24 Jam</div>
            <div className="text-xs lg:text-sm text-gray-200">Pengiriman</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center min-w-[160px] lg:min-w-[180px]">
            <div className="text-2xl lg:text-3xl font-bold text-[#A5D6A7] mb-1 lg:mb-2">100%</div>
            <div className="text-xs lg:text-sm text-gray-200">Organik</div>
          </div>
        </div>
      </div>

      {/* Floating Elements - Hidden on Mobile */}
      <div className="hidden sm:block absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-0.5 h-2 sm:w-1 sm:h-3 bg-white/70 rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}