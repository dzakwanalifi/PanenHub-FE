'use client';
import { Heart, Plus } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { formatPrice } from '@/lib/constants';
import Link from 'next/link';
import StarRating from './StarRating';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  originalPrice?: number;
  image: string;
  store: string;

export default function ProductCard({ id, name, price, originalPrice, image, rating, store }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const hasDiscount = originalPrice && originalPrice > price;
  originalPrice,

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image,
      store,
  // Calculate discount percentage if original price exists
  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden relative group">
      {hasDiscount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold z-10">
          -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
        </div>
      )}
      
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors z-10"
      >
        <Heart
          className={`w-4 h-4 ${
            isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
          }`}
        />
      </button>

      <Link href={`/products/${id}`}>
        <div className="relative h-48">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {discountPercentage > 0 && (
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-1 line-clamp-2">
            {name}
          </h3>
          
          <p className="text-sm text-gray-500 mb-2">{store}</p>
          
          <div className="flex items-center space-x-2 mb-2">
            <StarRating rating={rating} size="sm" />
            <span className="text-xs text-gray-500">({rating})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-[#1F2937]">
              ${price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
              -{discountPercentage}%
              </span>
                <span className="text-lg font-bold text-[#1F2937]">{formatPrice(price)}</span>
            <button
                  <span className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</span>
              className="bg-[#2E7D32] text-white p-2 rounded-lg hover:bg-[#1B5E20] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}