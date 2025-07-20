'use client';
import { useMemo } from 'react';
import { Heart, MapPin, Star, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { calculateMockDistance } from '@/lib/utils';
import { formatCurrency } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  store: string;
}

export default function ProductCard({ id, name, price, originalPrice, image, rating, store }: ProductCardProps) {
  // Fix: Use the new addToCart function instead of addItem
  const addToCart = useCartStore((state) => state.addToCart);
  const isFavorite = useFavoriteStore((state) => state.isFavorite(id));
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  const hasDiscount = originalPrice && originalPrice > price;
  
  // Create static distance that never changes for this component instance
  const distance = useMemo(() => {
    // Generate a consistent distance based on the product ID
    const hash = id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return ((Math.abs(hash) % 45) / 10 + 0.5).toFixed(1);
  }, [id]);

  const handleAddToCart = async () => {
    try {
      console.log('Adding product to cart:', id);
      await addToCart(id, 1); // Add 1 item to cart (now async)
      alert('Produk berhasil ditambahkan ke keranjang!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Show more specific error message
      const errorMessage = error instanceof Error ? error.message : 'Gagal menambahkan produk ke keranjang';
      alert(errorMessage);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(id);
  };

  // Calculate discount percentage if original price exists
  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-40 bg-gray-100">
        <Link href={`/products/${id}`} className="relative block w-full h-full">
          <Image
            src={image}
            alt={name}
            fill
            priority
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>
        
        {/* Heart Icon */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart 
            className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            -{discountPercentage}%
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Product Name */}
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-[#2E7D32] transition-colors">
            {name}
          </h3>
        </Link>

        {/* Store Name */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="font-medium">{store}</span>
        </div>

        {/* Distance and Rating Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{distance} km</span>
          </div>
          <div className="flex items-center">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-gray-700">{rating}</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center">
            <span className="text-lg font-bold text-[#2E7D32]">
              {formatCurrency(price)}
            </span>
            {hasDiscount && originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button - Full Width */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#2E7D32] text-white py-2 px-4 rounded-lg hover:bg-[#1B5E20] transition-colors flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Tambah ke Keranjang</span>
          </button>
        </div>
      </div>
    </div>
  );
}
