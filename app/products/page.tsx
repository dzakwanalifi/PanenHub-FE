'use client';
import { useState, useEffect, useMemo } from 'react';
import { Filter, SlidersHorizontal, Search, MapPin } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import FilterPanel, { FilterOptions } from '@/components/ui/FilterPanel';
import api from '@/lib/api';
import { useLocationStore } from '@/store/locationStore';

// Categories for filtering
const categories = [
  { id: 'all', name: 'Semua' },
  { id: 'vegetables', name: 'Sayuran' },
  { id: 'fruits', name: 'Buah' },
  { id: 'herbs', name: 'Rempah' },
  { id: 'grains', name: 'Biji-bijian' },
];

interface Product {
  id: string;
  title: string;
  price: number;
  image_urls: string[] | null;
  stores: {
    store_name: string;
  };
}

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterOptions>(() => ({
    distance: 'any',
    category: 'all',
    priceRange: [0, 200],
    rating: 0,
  }));

  const currentLocation = useLocationStore((state) => state.currentLocation);

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

  // Apply filters and sorting
  const sortedProducts = useMemo(() => {
    // Extract stable filter values
    const filterDistance = filters.distance;
    const filterCategory = filters.category;
    const filterPriceMin = filters.priceRange[0];
    const filterPriceMax = filters.priceRange[1];
    const filterRating = filters.rating;

    // Filter products based on all criteria
    const filteredProducts = productsWithDistance.filter(product => {
      // Filter by distance
      const distanceMatch = filterDistance === 'any' || 
        (filterDistance === 'under1' && product.distance < 1) ||
        (filterDistance === '1to3' && product.distance >= 1 && product.distance <= 3) ||
        (filterDistance === '3to5' && product.distance >= 3 && product.distance <= 5);

      // Filter by price range
      const priceMatch = product.price >= filterPriceMin && product.price <= filterPriceMax;

      // Filter by rating
      const ratingMatch = filterRating === 0 || product.rating >= filterRating;
      
      // Filter by search term
      const searchMatch = searchTerm === '' || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.stores?.store_name || '').toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by category (for now, since backend doesn't have category, we'll skip this filter)
      const categoryMatch = selectedCategory === 'all'; // Always true for now since backend doesn't have category

      return distanceMatch && priceMatch && ratingMatch && searchMatch && categoryMatch;
    });

    // Apply sorting
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          // Since we don't have reviewCount from backend, use rating as fallback
          return b.rating - a.rating;
        case 'distance':
          return a.distance - b.distance;
        case 'newest':
          return new Date(b.id).getTime() - new Date(a.id).getTime(); // Simple mock sorting by ID
        case 'popular':
        default:
          return b.rating - a.rating; // Sort by rating for popularity
      }
    });
  }, [productsWithDistance, selectedCategory, searchTerm, filters, sortBy]);

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setIsFilterPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Location Badge */}
          {currentLocation && (
            <div className="inline-flex items-center bg-[#F0F9FF] text-[#1F2937] rounded-full px-4 py-2 mb-4">
              <MapPin className="w-4 h-4 mr-2 text-[#A5D6A7]" />
              <span className="text-sm font-medium">{currentLocation.name}</span>
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
            Produk Segar dari <span className="text-[#A5D6A7]">Petani Lokal</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Temukan produk organik berkualitas tinggi langsung dari kebun petani di sekitar Anda. 
            Segar, sehat, dan mendukung ekonomi lokal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari produk, kategori, atau nama toko..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#A5D6A7] focus:border-transparent bg-white"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#A5D6A7] text-[#1F2937]'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Filter and Sort Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <p className="text-gray-600">
              <span className="font-semibold">{sortedProducts.length}</span> produk ditemukan
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setFilters((prev) => ({
                    distance: 'any',
                    category: 'all',
                    priceRange: [0, 200],
                    rating: 0,
                  }));
                }}
                className="text-sm text-[#A5D6A7] hover:text-[#8BC34A] font-medium"
              >
                Reset Filter
              </button>
            )}
          </div>
          
          {/* Sort and Filter Controls */}
          <div className="flex items-center space-x-3">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5D6A7] focus:border-transparent bg-white"
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
              className="flex items-center px-4 py-2 bg-white border border-gray-300 text-[#1F2937] rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-2xl h-64"></div>
            ))
          ) : sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.title}
                price={product.price}
                originalPrice={product.price} // Assuming originalPrice is the same as price for now
                image={product.image_urls?.[0] || '/images/placeholder-product.svg'}
                rating={product.rating}
                store={product.stores?.store_name || ''}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-gray-400 mb-4">
                <Filter className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada produk ditemukan</h3>
              <p className="text-gray-500 text-lg mb-4">Tidak ada produk yang sesuai dengan pencarian Anda</p>
              <p className="text-gray-400 text-sm">Coba ubah kata kunci pencarian atau reset filter Anda</p>
            </div>
          )}
        </div>

        {/* Load More Button (if needed) */}
        {sortedProducts.length > 0 && !isLoading && (
          <div className="text-center">
            <button className="bg-[#A5D6A7] text-[#1F2937] px-8 py-3 rounded-full font-semibold hover:bg-[#B9E4C9] transition-colors">
              Muat Lebih Banyak
            </button>
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
    </div>
  );
} 