'use client';
import ClientOnly from '@/components/ClientOnly';
import HeroSection from '@/components/sections/home/HeroSection';
import CategoriesSection from '@/components/sections/home/CategoriesSection';
import FeaturedProductsSection from '@/components/sections/home/FeaturedProductsSection';

export default function Home() {
  return (
    <ClientOnly>
      <div className="space-y-8">
        <HeroSection />
        <CategoriesSection />
        <FeaturedProductsSection />
      </div>
    </ClientOnly>
  );
}