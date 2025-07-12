'use client';
import { useMemo } from 'react';
import { Heart, MapPin, Star, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { calculateMockDistance } from '@/lib/utils';
import { formatPrice } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

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
      await addToCart(id, 1); // Add 1 item to cart
      toast.success('Produk ditambahkan ke keranjang');
    } catch (error) {
      toast.error('Gagal menambahkan produk ke keranjang');
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
        <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt={name}
            fill
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

        {/* Store and Distance */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="w-3 h-3 mr-1" />
          <span className="mr-2">{store}</span>
          <span className="text-[#2E7D32] font-medium">• {distance} km</span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="text-sm font-medium text-gray-700">{rating}</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#2E7D32]">
              {formatPrice(price)}
            </span>
            {hasDiscount && originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-[#2E7D32] text-white p-2 rounded-lg hover:bg-[#1B5E20] transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}