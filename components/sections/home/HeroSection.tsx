'use client';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fresh Harvest, <span className="text-[#FFC107]">Delivered</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Get farm-fresh produce delivered directly to your doorstep. Supporting local farmers, feeding your family.
          </p>
          <Link
            href="/products"
            className="bg-[#2E7D32] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#1B5E20] transition-colors inline-block"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}