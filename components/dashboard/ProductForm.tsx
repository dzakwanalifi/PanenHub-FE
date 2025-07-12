'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, X, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';
import { useProductStore } from '@/store/productStore';
import { Product, ProductFormData } from '@/types';
import LoadingSpinner from '@/components/ui/Spinner';

interface ProductFormProps {
  productId: string | null;
}

interface ImageProcessResult {
  blob?: Blob;
  url?: string;
  index: number;
  isNew: boolean;
}

export default function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter();
  const isNew = !productId;
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showForm, setShowForm] = useState(!isNew);
  const [aiGenerated, setAiGenerated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { products, createProduct, updateProduct } = useProductStore();
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    images: [],
  });

  // Load existing product data if editing
  useEffect(() => {
    if (!isNew && productId) {
      const product = products.find(p => p.id === productId);
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price.toString(),
          stock: product.stock.toString(),
          images: product.images,
        });
      }
    }
  }, [isNew, productId, products]);

  const categories = [
    'Vegetables',
    'Fruits',
    'Grains',
    'Dairy',
    'Meat',
    'Seafood',
    'Herbs & Spices',
    'Other',
  ];

  // AI Analysis Effect
  useEffect(() => {
    if (isNew && formData.images.length > 0 && !aiGenerated) {
      setIsAnalyzing(true);
      
      // Simulate AI processing delay
      setTimeout(() => {
        // For now, we'll just set some placeholder data
        setFormData(prev => ({
          ...prev,
          name: 'Fresh Product',
          description: 'High-quality fresh product',
          price: '10000',
          category: 'Vegetables',
        }));
        
        setIsAnalyzing(false);
        setShowForm(true);
        setAiGenerated(true);
      }, 1500);
    }
  }, [formData.images, isNew, aiGenerated]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({ ...prev, images }));
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    setIsSubmitting(true);
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('description', formData.description);
      formDataToSubmit.append('price', formData.price);
      formDataToSubmit.append('stock', formData.stock);
      formDataToSubmit.append('category', formData.category);
      formDataToSubmit.append('status', isDraft ? 'draft' : 'active');
      
      // Handle image uploads
      const convertImageToBlob = async (image: string) => {
        const response = await fetch(image);
        return await response.blob();
      };

      // Process all images in parallel
      const imagePromises = formData.images.map(async (image, index): Promise<ImageProcessResult> => {
        if (image.startsWith('data:')) {
          const blob = await convertImageToBlob(image);
          return { blob, index, isNew: true };
        }
        return { url: image, index, isNew: false };
      });

      const processedImages = await Promise.all(imagePromises);

      // Add processed images to form data
      processedImages.forEach(result => {
        if (result.isNew && result.blob) {
          formDataToSubmit.append('images', result.blob, `image-${result.index}.jpg`);
        } else if (result.url) {
          formDataToSubmit.append('existingImages', result.url);
        }
      });

      if (isNew) {
        await createProduct(formDataToSubmit);
      } else if (productId) {
        await updateProduct(productId, formDataToSubmit);
      }

      router.push('/dashboard/products');
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/dashboard/products"
                className="p-2 hover:bg-gray-100 rounded-lg mr-3"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-lg md:text-xl font-bold text-gray-900">
                {isNew ? 'Add New Product' : 'Edit Product'}
              </h1>
            </div>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4 md:p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* AI Instruction for New Products */}
          {isNew && !showForm && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Your Product</h2>
              <p className="text-lg text-gray-600 mb-4">Start by uploading a photo of your product</p>
              <p className="text-sm text-gray-500">Our AI will automatically generate product details for you ✨</p>
            </div>
          )}

          {/* Image Uploader */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isNew ? 'Upload Product Photo' : 'Product Images'}
            </h3>
            <ImageUploader
              images={formData.images}
              onImagesChange={handleImagesChange}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {/* AI Generated Notice */}
          {aiGenerated && showForm && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">✨</span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">AI Magic Complete!</h4>
                  <p className="text-sm text-gray-600">Here are the details we generated for you. Feel free to edit them as needed.</p>
                </div>
              </div>
            </div>
          )}

          {/* Form Fields - Only show when ready */}
          {showForm && (
            <>
              {/* Basic Information */}
              <div className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-500 ${
                aiGenerated ? 'animate-fade-in' : ''
              }`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter product name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your product..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-500 ${
                aiGenerated ? 'animate-fade-in' : ''
              }`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Inventory</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (per kg) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="0"
                        min="0"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => handleInputChange('stock', e.target.value)}
                      placeholder="0"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      {showForm && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
          <div className="max-w-2xl mx-auto flex items-center space-x-3">
            <button
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              Save as Draft
            </button>
            <button
              onClick={() => handleSubmit(false)}
              disabled={isSubmitting}
              className="flex-1 bg-[#2E7D32] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1B5E20] transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <LoadingSpinner className="w-4 h-4 mr-2" />
              ) : (
                <Eye className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? 'Saving...' : 'Publish Product'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}