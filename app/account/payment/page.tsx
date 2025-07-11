'use client';
import { ArrowLeft, CreditCard, Plus } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function PaymentPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/account" className="p-2 hover:bg-gray-100 rounded-lg mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Payment Methods</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Coming Soon Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-[#2E7D32] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-[#2E7D32]" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Methods</h2>
            <p className="text-gray-600 mb-8">
              Securely save your payment methods for faster checkout. This feature is coming soon!
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What you'll be able to do:</h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Save credit and debit cards securely</li>
                <li>• Add multiple payment methods</li>
                <li>• Set a default payment method</li>
                <li>• Quick checkout with saved cards</li>
                <li>• Manage billing addresses</li>
              </ul>
            </div>

            <Button disabled className="mb-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method (Coming Soon)
            </Button>

            <p className="text-sm text-gray-500">
              For now, you can add payment methods during checkout
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-6 bg-green-50 rounded-2xl">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Security First</h3>
            <p className="text-sm text-green-800">
              When this feature launches, all payment information will be encrypted and stored securely. 
              We never store your full card details on our servers.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}