'use client';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { mockProducts } from '@/lib/mock-data';

interface FeaturedProductsSectionProps {
  selectedCategory: string;
  searchTerm: string;
}

export default function FeaturedProductsSection({ selectedCategory, searchTerm }: FeaturedProductsSectionProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Filter products based on category and search term
  const filteredProducts = mockProducts.filter(product => {
    // Filter by category
    const categoryMatch = selectedCategory === 'all' || 
      product.category.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === 'fresh' && product.category === 'Vegetables') ||
      (selectedCategory === 'fresh' && product.category === 'Fruits');
    
    // Filter by search term
    const searchMatch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  return (
    <section className="px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#1F2937]">Popular items</h2>
        <button className="text-[#A5D6A7] font-semibold hover:underline">
          View All
        </button>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading ? (
            // Show skeleton loading state
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : (
            // Show actual products
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.images[0]}
                rating={product.rating}
                store={mockStores.find(s => s.id === product.storeId)?.name || 'Unknown Store'}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
}