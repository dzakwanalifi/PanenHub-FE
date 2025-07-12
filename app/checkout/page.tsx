'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, MapPin, User, Check, AlertCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { formatPrice } from '@/lib/constants';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import { CheckoutRequest, Address, ShippingMethod } from '@/types';

function CheckoutPage() {
  const router = useRouter();
  const { cart, isLoading: isCartLoading, fetchCart } = useCartStore();
  const { user } = useAuthStore();
  
  // State untuk checkout process
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State untuk alamat dan pengiriman
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('QRIS');

  // State untuk form alamat baru
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    postalCode: '',
  });

  const steps = [
    { id: 1, title: 'Alamat Pengiriman', icon: MapPin },
    { id: 2, title: 'Metode Pengiriman', icon: CreditCard },
    { id: 3, title: 'Pembayaran', icon: Check }
  ];

  // Fetch data saat komponen dimount
  useEffect(() => {
    fetchCart();
    fetchAddresses();
    fetchShippingMethods();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await api.get('/user/addresses');
      setAddresses(response.data);
      // Set alamat default jika ada
      const defaultAddress = response.data.find((addr: Address) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
      // Set default address jika API belum ada
      setAddresses([
        {
          id: 'default-1',
          userId: 'default-user',
          name: 'Alamat Default',
          phone: '081234567890',
          address: 'Jl. Contoh No. 123',
          city: 'Jakarta',
          postalCode: '12345',
          isDefault: true
        }
      ]);
      setSelectedAddressId('default-1');
    }
  };

  const fetchShippingMethods = async () => {
    try {
      const response = await api.get('/shipping/methods');
      setShippingMethods(response.data);
    } catch (error) {
      console.error('Failed to fetch shipping methods:', error);
      // Set default shipping methods jika API belum ada
      setShippingMethods([
        {
          id: 'REGULER',
          name: 'Pengiriman Reguler',
          description: '3-5 hari kerja',
          price: 10000,
          estimatedDays: '3-5 hari'
        },
        {
          id: 'EXPRESS',
          name: 'Pengiriman Express',
          description: '1-2 hari kerja',
          price: 25000,
          estimatedDays: '1-2 hari'
        }
      ]);
    }
  };

  const handleAddNewAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const response = await api.post('/user/addresses', newAddress);
      setAddresses([...addresses, response.data]);
      setSelectedAddressId(response.data.id);
      setShowNewAddressForm(false);
      setNewAddress({
        name: user?.name || '',
        phone: user?.phone || '',
        address: '',
        city: '',
        postalCode: '',
      });
    } catch (error) {
      console.error('Failed to add address:', error);
      setError('Gagal menambah alamat baru');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckout = async () => {
    // Ganti validasi sesuai dokumentasi API - hanya perlu paymentMethod
    if (!paymentMethod) {
      setError("Harap pilih metode pembayaran.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Sesuai dokumentasi, body hanya memerlukan 'payment_method'
      const orderData = {
        payment_method: paymentMethod,
      };

      // Panggil endpoint yang benar
      const response = await api.post('/orders/create_from_cart', orderData);
      
      // API mengembalikan payment_details dengan checkout_url
      const { payment_details } = response.data;
      
      // Jika ada checkout_url, arahkan pengguna ke sana untuk membayar
      if (payment_details && payment_details.checkout_url) {
        window.location.href = payment_details.checkout_url;
      } else {
        // Jika tidak, mungkin hanya menampilkan halaman sukses
        router.push('/checkout/success');
      }

    } catch (err: any) {
      console.error("Gagal membuat pesanan:", err);
      setError("Terjadi kesalahan saat memproses pesanan Anda. Silakan coba lagi.");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-6 md:mb-8">
      {/* Mobile version - vertical layout */}
      <div className="flex md:hidden flex-col space-y-3">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= step.id ? 'bg-[#2E7D32] text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {currentStep > step.id ? (
                <Check className="w-4 h-4" />
              ) : (
                <step.icon className="w-4 h-4" />
              )}
            </div>
            <span className={`ml-3 text-sm font-medium ${
              currentStep >= step.id ? 'text-[#2E7D32]' : 'text-gray-600'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Desktop version - horizontal layout */}
      <div className="hidden md:flex items-center justify-center">
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
    </div>
  );

  const renderAddressStep = () => (
    <Card className="p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Pilih Alamat Pengiriman</h2>
      
      {/* Daftar alamat yang ada */}
      <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`p-3 md:p-4 border rounded-lg cursor-pointer transition-colors touch-manipulation ${
              selectedAddressId === address.id 
                ? 'border-[#2E7D32] bg-green-50' 
                : 'border-gray-200 hover:border-gray-300 active:bg-gray-50'
            }`}
            onClick={() => setSelectedAddressId(address.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">{address.name}</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">{address.phone}</p>
                <p className="text-xs md:text-sm text-gray-600 mt-1 break-words">
                  {address.address}, {address.city} {address.postalCode}
                </p>
                {address.isDefault && (
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Alamat Utama
                  </span>
                )}
              </div>
              <input
                type="radio"
                checked={selectedAddressId === address.id}
                onChange={() => setSelectedAddressId(address.id)}
                className="mt-1 w-4 h-4 md:w-5 md:h-5 text-[#2E7D32] focus:ring-[#2E7D32] focus:ring-2"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tombol tambah alamat baru */}
      {!showNewAddressForm && (
        <Button 
          variant="outline" 
          onClick={() => setShowNewAddressForm(true)}
          className="mb-4 w-full md:w-auto"
          size="lg"
        >
          + Tambah Alamat Baru
        </Button>
      )}

      {/* Form alamat baru */}
      {showNewAddressForm && (
        <Card className="mb-6 p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold mb-4">Tambah Alamat Baru</h3>
          <form onSubmit={handleAddNewAddress} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nama Penerima"
                value={newAddress.name}
                onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                required
                className="text-base"
              />
              <Input
                label="Nomor Telepon"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                required
                type="tel"
                className="text-base"
              />
            </div>
            <Input
              label="Alamat Lengkap"
              value={newAddress.address}
              onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
              required
              className="text-base"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Kota"
                value={newAddress.city}
                onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                required
                className="text-base"
              />
              <Input
                label="Kode Pos"
                value={newAddress.postalCode}
                onChange={(e) => setNewAddress({...newAddress, postalCode: e.target.value})}
                required
                type="number"
                className="text-base"
              />
            </div>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
              <Button type="submit" loading={isProcessing} size="lg" className="w-full md:w-auto">
                Simpan Alamat
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowNewAddressForm(false)}
                size="lg"
                className="w-full md:w-auto"
              >
                Batal
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="flex justify-end">
        <Button 
          onClick={() => setCurrentStep(2)} 
          disabled={!selectedAddressId}
          size="lg"
          className="w-full md:w-auto"
        >
          Lanjut ke Pengiriman
        </Button>
      </div>
    </Card>
  );

  const renderShippingStep = () => (
    <Card className="p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Pilih Metode Pengiriman</h2>
      
      <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
        {shippingMethods.map((method) => (
          <div
            key={method.id}
            className={`p-3 md:p-4 border rounded-lg cursor-pointer transition-colors touch-manipulation ${
              selectedShippingMethod === method.id 
                ? 'border-[#2E7D32] bg-green-50' 
                : 'border-gray-200 hover:border-gray-300 active:bg-gray-50'
            }`}
            onClick={() => setSelectedShippingMethod(method.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">{method.name}</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">{method.description}</p>
                <p className="text-xs md:text-sm text-gray-600">Estimasi: {method.estimatedDays}</p>
              </div>
              <div className="text-right ml-4">
                <p className="font-semibold text-gray-900 text-sm md:text-base">
                  {method.price === 0 ? 'Gratis' : formatPrice(method.price)}
                </p>
                <input
                  type="radio"
                  checked={selectedShippingMethod === method.id}
                  onChange={() => setSelectedShippingMethod(method.id)}
                  className="mt-2 w-4 h-4 md:w-5 md:h-5 text-[#2E7D32] focus:ring-[#2E7D32] focus:ring-2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(1)}
          size="lg"
          className="w-full md:w-auto"
        >
          Kembali ke Alamat
        </Button>
        <Button 
          onClick={() => setCurrentStep(3)} 
          disabled={!selectedShippingMethod}
          size="lg"
          className="w-full md:w-auto"
        >
          Lanjut ke Pembayaran
        </Button>
      </div>
    </Card>
  );

  const renderPaymentStep = () => {
    const selectedShipping = shippingMethods.find(m => m.id === selectedShippingMethod);
    const shippingCost = selectedShipping?.price || 0;
    const subtotal = cart?.total_price || 0;
    const total = subtotal + shippingCost;

    return (
      <div className="space-y-4 md:space-y-6">
        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Ringkasan Pesanan</h2>
          
          {/* Order Items */}
          <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
            {cart?.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Image 
                  src={item.product.image_urls?.[0] || '/images/placeholder-product.svg'} 
                  alt={item.product.title} 
                  width={48} 
                  height={48} 
                  className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2">{item.product.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">Jumlah: {item.quantity} {item.product.unit || 'pcs'}</p>
                </div>
                <p className="font-semibold text-gray-900 text-sm md:text-base flex-shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm md:text-base">Subtotal ({cart?.items.reduce((sum, item) => sum + item.quantity, 0)} item)</span>
              <span className="font-semibold text-sm md:text-base">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm md:text-base">Biaya Kirim</span>
              <span className="font-semibold text-sm md:text-base">
                {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 text-base md:text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Metode Pembayaran</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 touch-manipulation">
                <input
                  type="radio"
                  value="QRIS"
                  checked={paymentMethod === 'QRIS'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 md:w-5 md:h-5 text-[#2E7D32] focus:ring-[#2E7D32] focus:ring-2"
                />
                <span className="text-sm md:text-base">QRIS (Scan & Pay)</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 touch-manipulation">
                <input
                  type="radio"
                  value="BANK_TRANSFER"
                  checked={paymentMethod === 'BANK_TRANSFER'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 md:w-5 md:h-5 text-[#2E7D32] focus:ring-[#2E7D32] focus:ring-2"
                />
                <span className="text-sm md:text-base">Transfer Bank</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 touch-manipulation">
                <input
                  type="radio"
                  value="EWALLET"
                  checked={paymentMethod === 'EWALLET'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 md:w-5 md:h-5 text-[#2E7D32] focus:ring-[#2E7D32] focus:ring-2"
                />
                <span className="text-sm md:text-base">E-Wallet (OVO, GoPay, DANA)</span>
              </label>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm md:text-base">{error}</p>
            </div>
          )}

          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(2)}
              size="lg"
              className="w-full md:w-auto"
            >
              Kembali ke Pengiriman
            </Button>
            <Button 
              onClick={handleCheckout} 
              loading={isProcessing}
              size="lg"
              className="w-full md:w-auto"
            >
              {isProcessing ? 'Memproses...' : 'Bayar Sekarang'}
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  // Loading state
  if (isCartLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600 text-sm md:text-base">Memuat keranjang...</p>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Keranjang Anda kosong</h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base">Silakan tambahkan produk ke keranjang terlebih dahulu</p>
          <Link href="/products">
            <Button size="lg" className="w-full md:w-auto">Lanjut Belanja</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-4 md:mb-8">
          <Link href="/cart">
            <Button variant="outline" size="sm" className="mr-3 md:mr-4">
              <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Kembali ke Keranjang</span>
              <span className="md:hidden">Kembali</span>
            </Button>
          </Link>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Step Content */}
        {currentStep === 1 && renderAddressStep()}
        {currentStep === 2 && renderShippingStep()}
        {currentStep === 3 && renderPaymentStep()}
      </div>
    </div>
  );
}

// Bungkus dengan PrivateRoute untuk memastikan hanya user ter-login yang bisa akses
export default function ProtectedCheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  );
}