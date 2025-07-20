'use client';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCartStore, type CartItem as CartItemType } from '@/store/cartStore';
import { formatPrice } from '@/lib/constants';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateItemQuantity, removeFromCart, isMutating } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateItemQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 transition-all duration-200 hover:shadow-xl">
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="flex items-start space-x-3 mb-4">
          <Image
            src={item.product.image_urls?.[0] || '/images/placeholder-product.svg'}
            alt={item.product.title}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">{item.product.title}</h3>
            <p className="text-xs text-gray-600 mb-2">{item.product.store.store_name}</p>
            <p className="text-base font-bold text-[#2E7D32]">{formatPrice(item.product.price)}</p>
          </div>

          {/* Remove Button - Top Right */}
          <button
            onClick={() => removeFromCart(item.id)}
            disabled={isMutating}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Quantity Controls and Total - Bottom Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isMutating}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              aria-label="Decrease quantity"
            >
              <Minus className="w-5 h-5 text-gray-600" />
            </button>
            
            <span className="w-12 text-center font-medium text-gray-900 text-lg">
              {item.quantity}
            </span>
            
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isMutating}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              aria-label="Increase quantity"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Total Price */}
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Total</div>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center space-x-4">
        <Image
          src={item.product.image_urls?.[0] || '/images/placeholder-product.svg'}
          alt={item.product.title}
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
        />
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{item.product.title}</h3>
          <p className="text-sm text-gray-600">{item.product.store.store_name}</p>
          <p className="text-lg font-bold text-[#2E7D32] mt-1">{formatPrice(item.product.price)}</p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isMutating}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            
            <span className="w-8 text-center font-medium text-gray-900">
              {item.quantity}
            </span>
            
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isMutating}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Total Price */}
          <div className="text-right min-w-[80px]">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item.id)}
            disabled={isMutating}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
