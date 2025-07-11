'use client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Fresh produce background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center text-white max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Hasil Panen Segar, Diantar ke Rumah Anda
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Temukan produk organik terbaik dari petani lokal, diantar segar setiap hari ke rumah Anda.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center bg-[#A5D6A7] text-[#1F2937] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#B9E4C9] transition-colors"
          >
            Belanja Sekarang
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}