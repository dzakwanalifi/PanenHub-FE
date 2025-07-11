'use client';
import { useState } from 'react';
import { X, CreditCard, Shield } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  total: number;
}

export default function PaymentModal({ isOpen, onClose, onSuccess, total }: PaymentModalProps) {
  const [processing, setProcessing] = useState(false);

  const handleSimulatePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Secure Payment</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Redirecting to Secure Payment
          </h3>
          <p className="text-gray-600 mb-4">
            You are being redirected to our secure payment partner for safe processing of your ${total.toFixed(2)} payment.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">SSL Encrypted</span>
            </div>
            <p className="text-sm text-blue-700">
              Your payment information is protected by 256-bit encryption
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleSimulatePayment}
            disabled={processing}
            className="w-full bg-[#2E7D32] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1B5E20] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </div>
            ) : (
              'Simulate Successful Payment'
            )}
          </button>
          
          <button
            onClick={onClose}
            disabled={processing}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            In a real application, this would redirect to Stripe, PayPal, or similar secure payment processor
          </p>
        </div>
      </div>
    </div>
  );
} 