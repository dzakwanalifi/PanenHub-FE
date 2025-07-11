'use client';
import { useState } from 'react';
import { ArrowLeft, Upload, X, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import ImageUploader from './ImageUploader';

interface ProductFormProps {
  productId: string | null;
}

export default function ProductForm({ productId }: ProductFormProps) {
  const isNew = !productId;
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    images: [] as string[],
  });

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({ ...prev, images }));
  };

  const handleSaveDraft = () => {
    console.log('Saving as draft:', formData);
    // TODO: Implement save as draft logic
  };

  const handlePublish = () => {
    console.log('Publishing product:', formData);
    // TODO: Implement publish logic
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
      <div className="px-4 py-6 pb-32 md:pb-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Image Uploader */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>
            <ImageUploader
              images={formData.images}
              onImagesChange={handleImagesChange}
            />
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
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
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Inventory</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (per kg) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="max-w-2xl mx-auto flex items-center space-x-3">
          <button
            onClick={handleSaveDraft}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save as Draft
          </button>
          <button
            onClick={handlePublish}
            className="flex-1 bg-[#2E7D32] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1B5E20] transition-colors flex items-center justify-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            Publish Product
          </button>
        </div>
      </div>
    </div>
  );
}