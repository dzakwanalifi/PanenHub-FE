'use client';
import { useState } from 'react';
import { Star, Heart, Share2 } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import QuantityStepper from '@/components/ui/QuantityStepper';
import StarRating from '@/components/ui/StarRating';
import Link from 'next/link';
import { formatPrice } from '@/lib/constants';
import { Product } from '@/lib/product-data';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  
  // Fix: Use separate selectors to avoid object creation causing infinite loops
  const isFavorite = useFavoriteStore((state) => state.isFavorite(product.id));
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
      console.log('Added to cart:', product.name, 'Quantity:', quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Lihat ${product.name} dari ${product.store} di PanenHub!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('Successfully shared');
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to copying to clipboard
        handleFallbackShare();
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      handleFallbackShare();
    }
  };

  const handleFallbackShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link berhasil disalin ke clipboard!');
    }).catch(() => {
      // Final fallback - just alert the URL
      alert(`Bagikan produk ini: ${url}`);
    });
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Centered Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-8 text-center">Detail Produk</h1>
      
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
                Kunjungi Toko
              </Link>
              <button
                onClick={() => console.log('Chat with seller')}
                className="text-sm bg-[#A5D6A7] text-[#1F2937] px-3 py-1 rounded-full hover:bg-[#B9E4C9] transition-colors"
              >
                Chat dengan Penjual
              </button>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <StarRating rating={product.rating} size="lg" showRating={true} />
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-[#1F2937]">
            ${product.price.toFixed(2)}
            <span className="text-lg text-gray-500 ml-2">/{product.unit}</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-[#1F2937] mb-2">Deskripsi</h3>
            <p className="text-gray-500">{product.description}</p>
          </div>

          {/* Product Details */}
          <div>
            <h3 className="text-lg font-semibold text-[#1F2937] mb-2">Detail Produk</h3>
            <p className="text-gray-500">{product.details}</p>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-lg font-semibold text-[#1F2937] mb-3">Jumlah</h3>
            <QuantityStepper
              quantity={quantity}
              onQuantityChange={setQuantity}
              min={1}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
              className={`p-3 rounded-lg border transition-colors ${
                isFavorite
                  ? 'border-red-500 text-red-500 bg-red-50'
                  : 'border-gray-300 text-[#1F2937] hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            
            <button 
              onClick={handleShare}
              aria-label="Bagikan produk" 
              className="p-3 rounded-lg border border-gray-300 text-[#1F2937] hover:bg-gray-50 transition-colors"
            >
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
          Tambah ke Keranjang - {formatPrice(product.price * quantity)}
        </button>
      </div>

      {/* Desktop Add to Cart Button */}
      <div className="hidden lg:block mt-8">
        <button
          onClick={handleAddToCart}
          className="bg-[#A5D6A7] text-[#1F2937] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#B9E4C9] transition-colors"
        >
          Tambah ke Keranjang - {formatPrice(product.price * quantity)}
        </button>
      </div>
    </div>
  );
}