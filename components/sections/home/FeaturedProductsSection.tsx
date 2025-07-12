'use client';
import { useState, useEffect, useMemo } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import FilterPanel, { FilterOptions } from '@/components/ui/FilterPanel';
import api from '@/lib/api';

interface FeaturedProductsSectionProps {
  selectedCategory: string;
  searchTerm: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  image_urls: string[] | null;
  stores: {
    store_name: string;
  };
  category?: string;
  reviewCount?: number;
}

export default function FeaturedProductsSection({ selectedCategory, searchTerm }: FeaturedProductsSectionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterOptions>(() => ({
    distance: 'any',
    category: 'all',
    priceRange: [0, 200],
    rating: 0,
  }));

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/products');
        setProducts(response.data.data || response.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add static distance to products (consistent based on product ID)
  const productsWithDistance = useMemo(() => 
    products.map(product => {
      // Generate a consistent distance based on the product ID
      const hash = product.id.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      const distance = parseFloat(((Math.abs(hash) % 45) / 10 + 0.5).toFixed(1));
      return {
        ...product,
        distance,
        // Add mock rating for now since backend doesn't have it yet
        rating: 4.0 + (Math.abs(hash) % 10) / 10,
      };
    }), [products]
  );

  // Extract stable filter values
  const filterDistance = filters.distance;
  const filterCategory = filters.category;
  const filterPriceMin = filters.priceRange[0];
  const filterPriceMax = filters.priceRange[1];
  const filterRating = filters.rating;

  // Memoize filtering and sorting to prevent infinite re-renders
  const sortedProducts = useMemo(() => {
    // Filter products based on all criteria
    const filteredProducts = productsWithDistance.filter(product => {
      // Filter by category (use both selectedCategory and filter category)
      const selectedCat = selectedCategory === 'all' ? filterCategory : selectedCategory;
      const categoryMatch = selectedCat === 'all' || 
        product.category?.toLowerCase() === selectedCat.toLowerCase();
      
      // Filter by search term
      const searchMatch = searchTerm === '' || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by distance
      const distanceMatch = filterDistance === 'any' || 
        (filterDistance === 'under1' && product.distance < 1) ||
        (filterDistance === '1to3' && product.distance >= 1 && product.distance <= 3) ||
        (filterDistance === '3to5' && product.distance >= 3 && product.distance <= 5);

      // Filter by price range
      const priceMatch = product.price >= filterPriceMin && product.price <= filterPriceMax;

      // Filter by rating
      const ratingMatch = filterRating === 0 || product.rating >= filterRating;
      
      return categoryMatch && searchMatch && distanceMatch && priceMatch && ratingMatch;
    });

    // Sort filtered products
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case 'distance':
          return a.distance - b.distance;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.id).getTime() - new Date(a.id).getTime(); // Simple mock sorting by ID
        case 'popular':
        default:
          return (b.reviewCount || 0) - (a.reviewCount || 0);
      }
    });
  }, [productsWithDistance, selectedCategory, searchTerm, filterDistance, filterCategory, filterPriceMin, filterPriceMax, filterRating, sortBy]);

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setIsFilterPanelOpen(false);
  };

  return (
    <section className="px-4 py-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#1F2937]">Produk Unggulan</h2>
        
        {/* Filter and Sort Controls */}
        <div className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5D6A7] focus:border-transparent"
          >
            <option value="popular">Terpopuler</option>
            <option value="distance">Jarak Terdekat</option>
            <option value="price-low">Harga Terendah</option>
            <option value="price-high">Harga Tertinggi</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="newest">Terbaru</option>
          </select>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterPanelOpen(true)}
            className="flex items-center px-4 py-2 bg-[#F3F4F6] text-[#1F2937] rounded-lg hover:bg-[#E5E7EB] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse rounded-2xl h-64"></div>
          ))
        ) : sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.price}
              originalPrice={undefined}
              image={product.image_urls?.[0] || '/images/placeholder-product.svg'}
              rating={product.rating}
              store={product.stores?.store_name || 'Unknown Store'}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-500 text-lg">Tidak ada produk yang sesuai dengan filter Anda</p>
            <p className="text-gray-400 text-sm mt-2">Coba ubah kriteria pencarian atau filter Anda</p>
          </div>
        )}
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={filters}
      />
    </section>
  );
}