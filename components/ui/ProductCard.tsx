'use client';
import { Star, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  store: string;
  discount?: number;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  rating,
  store,
  discount,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      price,
      image,
      store,
    });
  };

  return (
    <Link href={`/products/${id}`}>
      <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-2 line-clamp-2">
            {name}
          </h3>
          
          <span className="text-sm text-gray-500 font-medium mb-2 block">
            {store}
          </span>

          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'text-[#FFC107] fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({rating})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-[#1F2937]">
                ${price.toFixed(2)}
              </span>
              {discount && (
                <span className="text-sm text-gray-500 line-through">
                  ${(price / (1 - discount / 100)).toFixed(2)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              aria-label={`Add ${name} to cart`}
              className="bg-[#2E7D32] text-white p-2 rounded-lg hover:bg-[#1B5E20] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}