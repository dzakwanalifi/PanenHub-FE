'use client';
import { useState } from 'react';
import { Star, Heart, MessageSquare, Filter, Grid, List } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { Store } from '@/lib/store-data';

interface StorePageClientProps {
  store: Store;
}

export default function StorePageClient({ store }: StorePageClientProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'grains', label: 'Grains' },
    { value: 'dairy', label: 'Dairy' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Store Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        {/* Banner Image */}
        <div className="h-48 md:h-64 relative">
          <img
            src={store.bannerImage}
            alt={`${store.name} banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        {/* Store Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={store.logo}
                alt={store.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg -mt-10"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{store.name}</h1>
                <p className="text-gray-600 mb-2">{store.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-medium">{store.rating}</span>
                    <span className="ml-1">({store.reviewCount} reviews)</span>
                  </div>
                  <span>•</span>
                  <span>{store.productCount} products</span>
                  <span>•</span>
                  <span>{store.followerCount} followers</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  isFollowing
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-[#2E7D32] text-white hover:bg-[#1B5E20]'
                }`}
              >
                <Heart className={`w-4 h-4 mr-2 inline ${isFollowing ? 'fill-current' : ''}`} />
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                <MessageSquare className="w-4 h-4 mr-2 inline" />
                Chat
              </button>
            </div>
          </div>

          {/* Store Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2E7D32]">{store.productCount}</p>
              <p className="text-sm text-gray-600">Products</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2E7D32]">{store.followerCount}</p>
              <p className="text-sm text-gray-600">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2E7D32]">{store.rating}</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2E7D32]">{store.responseTime}</p>
              <p className="text-sm text-gray-600">Response Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid'
          ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          : 'grid-cols-1'
      }`}>
        {store.products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            rating={product.rating}
            store={store.name}
            discount={product.discount}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="bg-[#2E7D32] text-white px-8 py-3 rounded-lg hover:bg-[#1B5E20] transition-colors">
          Load More Products
        </button>
      </div>
    </div>
  );
}