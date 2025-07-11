'use client';
import { X, Store, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QuickSellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickSellModal({ isOpen, onClose }: QuickSellModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleCreateStore = () => {
    onClose();
    // Navigate to store creation flow (for now, redirect to account page)
    router.push('/account');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="w-16 h-16 bg-[#A5D6A7] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-[#A5D6A7]" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Ready to sell your harvest?
          </h2>
          
          <p className="text-gray-600 mb-8">
            Let's create your store in 1 minute and start connecting with customers who want fresh, local produce!
          </p>

          <div className="space-y-3">
            <button
              onClick={handleCreateStore}
              className="w-full bg-[#A5D6A7] text-[#1F2937] py-3 px-6 rounded-lg font-semibold hover:bg-[#B9E4C9] transition-colors flex items-center justify-center"
            >
              Create My Store
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            
            <button
              onClick={onClose}
              className="w-full text-gray-600 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}