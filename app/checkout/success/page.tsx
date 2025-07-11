'use client';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CheckoutSuccessPage() {
  const orderId = `ORD-${Date.now().toString().slice(-6)}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        <Card className="mb-8">
          <div className="text-left">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number</span>
                <span className="font-semibold">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date</span>
                <span className="font-semibold">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-semibold">3-5 business days</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="bg-blue-50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-blue-900">What's Next?</h3>
          </div>
          <p className="text-blue-800 mb-4">
            You'll receive an email confirmation shortly with your order details and tracking information.
          </p>
          <p className="text-blue-800">
            Our farmers are preparing your fresh produce with care!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/orders">
            <Button variant="outline" className="w-full sm:w-auto">
              View Order History
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full sm:w-auto">
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}