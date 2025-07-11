'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, MapPin, User, Check } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { calculateServerSideTotal } from '@/lib/utils';
import { formatPrice } from '@/lib/constants';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import PaymentModal from '@/components/ui/PaymentModal';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const router = useRouter();
  
  // Use server-side calculation for authoritative pricing
  const priceData = calculateServerSideTotal(items);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const steps = [
    { id: 1, title: 'Pengiriman', icon: MapPin },
    { id: 2, title: 'Pembayaran', icon: CreditCard },
    { id: 3, title: 'Tinjau', icon: Check }
  ];

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setCurrentStep(3);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Clear cart and redirect to success page
    clearCart();
    router.push('/checkout/success');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            currentStep >= step.id ? 'bg-[#2E7D32] text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {currentStep > step.id ? (
              <Check className="w-5 h-5" />
            ) : (
              <step.icon className="w-5 h-5" />
            )}
          </div>
          <span className={`ml-2 text-sm font-medium ${
            currentStep >= step.id ? 'text-[#2E7D32]' : 'text-gray-600'
          }`}>
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-12 h-0.5 mx-4 ${
              currentStep > step.id ? 'bg-[#2E7D32]' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderShippingStep = () => (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Informasi Pengiriman</h2>
      <form onSubmit={handleShippingSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nama Lengkap"
            value={shippingInfo.fullName}
            onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
            required
          />
          <Input
            label="Email"
            type="email"
            value={shippingInfo.email}
            onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
            required
          />
        </div>
        <Input
          label="Nomor Telepon"
          value={shippingInfo.phone}
          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
          required
        />
        <Input
          label="Alamat"
          value={shippingInfo.address}
          onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Kota"
            value={shippingInfo.city}
            onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
            required
          />
          <Input
            label="Provinsi"
            value={shippingInfo.state}
            onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
            required
          />
          <Input
            label="Kode Pos"
            value={shippingInfo.zipCode}
            onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" size="lg">Lanjut ke Pembayaran</Button>
        </div>
      </form>
    </Card>
  );

  const renderPaymentStep = () => (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Informasi Pembayaran</h2>
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <CreditCard className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Proses Pembayaran Aman</h3>
          <p className="text-gray-600 mb-4">
            Pembayaran Anda akan diproses dengan aman melalui mitra pembayaran terpercaya kami. 
            Kami menggunakan enkripsi standar industri untuk melindungi informasi keuangan Anda.
          </p>
                     <p className="text-sm text-gray-500">
             Total Pembayaran: <span className="font-semibold text-gray-900">{formatPrice(priceData.finalTotal)}</span>
           </p>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            Kembali ke Pengiriman
          </Button>
          <Button onClick={handlePaymentSubmit} size="lg">
            Lanjut ke Pembayaran Aman
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
              <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Tinjau Pesanan</h2>
        
        {/* Order Items */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.cartItemId} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Image src={item.image} alt={item.name} width={64} height={64} className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.store}</p>
                <p className="text-sm text-gray-600">Jumlah: {item.quantity}</p>
              </div>
              <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">{formatPrice(priceData.subtotal)}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Biaya Kirim</span>
            <span className="font-semibold">
              {priceData.shipping === 0 ? 'Gratis' : formatPrice(priceData.shipping)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Diskon</span>
            <span className="font-semibold text-green-600">-{formatPrice(priceData.discount)}</span>
          </div>
          <div className="flex justify-between items-center mb-4 text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(priceData.finalTotal)}</span>
          </div>
        </div>

        <form onSubmit={handleFinalSubmit}>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(2)}>
              Kembali ke Pembayaran
            </Button>
            <Button type="submit" size="lg" loading={loading}>
              {loading ? 'Memproses...' : 'Buat Pesanan'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Keranjang Anda kosong</h1>
          <Link href="/">
            <Button>Lanjut Belanja</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/cart" className="flex items-center text-gray-600 hover:text-[#2E7D32] mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Keranjang
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {renderStepIndicator()}

        <div className="max-w-2xl mx-auto">
          {currentStep === 1 && renderShippingStep()}
          {currentStep === 2 && renderPaymentStep()}
          {currentStep === 3 && renderReviewStep()}
        </div>

        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          total={priceData.finalTotal}
        />
      </div>
    </ProtectedRoute>
  );
}