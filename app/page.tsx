'use client';
import HeroSection from '@/components/sections/home/HeroSection';
import CategoriesSection from '@/components/sections/home/CategoriesSection';
import FeaturedProductsSection from '@/components/sections/home/FeaturedProductsSection';

export default function Home() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
    </div>
  );
}