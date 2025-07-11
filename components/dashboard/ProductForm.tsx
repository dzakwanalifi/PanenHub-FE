'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, X, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import ImageUploader from './ImageUploader';
import { getMockAIResponse, AIProductResponse } from '@/lib/mock-data';

interface ProductFormProps {
  productId: string | null;
}

export default function ProductForm({ productId }: ProductFormProps) {
  const isNew = !productId;
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showForm, setShowForm] = useState(!isNew);
  const [aiGenerated, setAiGenerated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    images: [] as string[],
  });
  const [hasTriggeredAI, setHasTriggeredAI] = useState(false);

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
    if (isNew && formData.images.length > 0 && !hasTriggeredAI) {
      setHasTriggeredAI(true);
      setIsAnalyzing(true);
      
      // Simulate AI processing delay
      setTimeout(() => {
        const aiResponse = getMockAIResponse(formData.images[0]);
        
        // Populate form with AI response
        setFormData(prev => ({
          ...prev,
          name: aiResponse.productName,
          description: aiResponse.description,
          price: aiResponse.suggestedPrice.toString(),
          category: aiResponse.suggestedCategory,
        }));
        
        setIsAnalyzing(false);
        setShowForm(true);
        setAiGenerated(true);
      }, 2500); // 2.5 second delay
    }
  }, [formData.images, isNew, hasTriggeredAI]);

  // Reset AI state when images are removed
  useEffect(() => {
    if (formData.images.length === 0) {
      setHasTriggeredAI(false);
      setShowForm(!isNew);
      setAiGenerated(false);
      setIsAnalyzing(false);
      
      // Clear form data when starting over
      if (isNew) {
        setFormData(prev => ({
          ...prev,
          name: '',
          description: '',
          price: '',
          category: '',
        }));
      }
    }
  }, [formData.images.length, isNew]);

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
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
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
            </>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      {showForm && (
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
              disabled={isAnalyzing}
              className="flex-1 bg-[#2E7D32] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1B5E20] transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Eye className="w-4 h-4 mr-2" />
              Publish Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}