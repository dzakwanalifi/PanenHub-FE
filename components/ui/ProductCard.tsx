'use client';
import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

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
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover"
          />
          {discount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
              -{discount}%
            </div>
          )}
          <button
            onClick={handleAddToCart}
            className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {name}
          </h3>
          
          <span className="text-sm text-[#2E7D32] font-medium mb-2 block">
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
            <span className="text-sm text-gray-600">({rating})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-[#2E7D32]">
                ${price.toFixed(2)}
              </span>
              {discount && (
                <span className="text-sm text-gray-500 line-through">
                  ${(price / (1 - discount / 100)).toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}