'use client';
import { Plus, Star } from 'lucide-react';
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

export default function ProductCard({ id, name, price, image, rating, store, discount }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, price, image, store });
    console.log('Added to cart:', name);
  };

  return (
    <Link href={`/products/${id}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover"
          />
          {discount && (
            <div className="absolute top-2 left-2 bg-[#FFC107] text-black px-2 py-1 rounded-lg text-sm font-medium">
              {discount}% OFF
            </div>
          )
          }
          <Link 
            href={`/store/${store.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-sm text-[#2E7D32] font-medium mb-3 hover:underline block"
            onClick={(e) => e.stopPropagation()}
          >
            {store}
          </Link>
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 bg-[#2E7D32] text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#1B5E20] transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
          <p className="text-sm text-gray-500 mb-2">{store}</p>
          
          <div className="flex items-center mb-2">
            <Star className="w-4 h-4 text-[#FFC107] fill-current" />
            <span className="text-sm text-gray-600 ml-1">{rating}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-[#2E7D32]">
              ${price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">/kg</span>
          </div>
        </div>
      </div>
    </Link>
  );
}