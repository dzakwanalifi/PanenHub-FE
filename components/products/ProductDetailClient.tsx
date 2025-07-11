'use client';
import { useState } from 'react';
import { Star, Heart, Share2 } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import QuantityStepper from '@/components/ui/QuantityStepper';
import Link from 'next/link';
import { Product } from '@/lib/product-data';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        store: product.store,
      });
    }
    console.log('Added to cart:', product.name, 'Quantity:', quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Centered Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-8 text-center">Product Details</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square rounded-2xl overflow-hidden relative">
            <Image
              src={product.images[selectedImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index
                      ? 'border-[#2E7D32]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-[#1F2937] mb-2">{product.name}</h2>
            <Link
              href={`/stores/${product.store}`}
              className="text-gray-500 hover:underline font-medium"
            >
              {product.store}
            </Link>
            <div className="flex items-center space-x-3 mt-2">
              <Link
                href={`/store/${product.store.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-gray-500 hover:text-[#A5D6A7] transition-colors"
              >
                Visit Store
              </Link>
              <button
                onClick={() => console.log('Chat with seller')}
                className="text-sm bg-[#A5D6A7] text-[#1F2937] px-3 py-1 rounded-full hover:bg-[#B9E4C9] transition-colors"
              >
                Chat with Seller
              </button>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-[#FFC107] fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-[#1F2937]">
            ${product.price.toFixed(2)}
            <span className="text-lg text-gray-500 ml-2">/kg</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-[#1F2937] mb-2">Description</h3>
            <p className="text-gray-500">{product.description}</p>
          </div>

          {/* Product Details */}
          <div>
            <h3 className="text-lg font-semibold text-[#1F2937] mb-2">Product Details</h3>
            <p className="text-gray-500">{product.details}</p>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-lg font-semibold text-[#1F2937] mb-3">Quantity</h3>
            <QuantityStepper
              quantity={quantity}
              onQuantityChange={setQuantity}
              min={1}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className={`p-3 rounded-lg border transition-colors ${
                isFavorite
                  ? 'border-red-500 text-red-500 bg-red-50'
                  : 'border-gray-300 text-[#1F2937] hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            
            <button aria-label="Share product" className="p-3 rounded-lg border border-gray-300 text-[#1F2937] hover:bg-gray-50">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart Button (Mobile) */}
      <div className="lg:hidden fixed bottom-20 left-4 right-4 z-40">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#A5D6A7] text-[#1F2937] py-4 rounded-full text-lg font-semibold hover:bg-[#B9E4C9] transition-colors"
        >
          Add to Cart - ${(product.price * quantity).toFixed(2)}
        </button>
      </div>

      {/* Desktop Add to Cart Button */}
      <div className="hidden lg:block mt-8">
        <button
          onClick={handleAddToCart}
          className="bg-[#A5D6A7] text-[#1F2937] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#B9E4C9] transition-colors"
        >
          Add to Cart - ${(product.price * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
}