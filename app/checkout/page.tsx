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
    if (!cart || !selectedAddressId || !selectedShippingMethod) {
      setError("Harap lengkapi alamat dan metode pengiriman.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const checkoutData: CheckoutRequest = {
        cartId: cart.id,
        addressId: selectedAddressId,
        shippingMethod: selectedShippingMethod,
        paymentMethod: paymentMethod,
      };

      // Gunakan endpoint yang sesuai dengan dokumentasi API
      const response = await api.post('/orders/create_from_cart', {
        payment_method: paymentMethod
      });
      
      // Jika berhasil, arahkan ke halaman sukses dengan detail pembayaran
      const { payment_details } = response.data;
      
      if (payment_details?.checkout_url) {
        // Redirect ke halaman pembayaran TriPay
        window.location.href = payment_details.checkout_url;
      } else {
        // Jika tidak ada URL pembayaran, arahkan ke halaman sukses
        router.push('/checkout/success');
      }

    } catch (err: any) {
      console.error("Gagal membuat pesanan:", err);
      const errorMessage = err.response?.data?.message || "Terjadi kesalahan saat memproses pesanan Anda. Silakan coba lagi.";
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
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

  const renderAddressStep = () => (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Pilih Alamat Pengiriman</h2>
      
      {/* Daftar alamat yang ada */}
      <div className="space-y-4 mb-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedAddressId === address.id 
                ? 'border-[#2E7D32] bg-green-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedAddressId(address.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{address.name}</h3>
                <p className="text-sm text-gray-600">{address.phone}</p>
                <p className="text-sm text-gray-600 mt-1">
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
                className="mt-1"
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
          className="mb-4"
        >
          + Tambah Alamat Baru
        </Button>
      )}

      {/* Form alamat baru */}
      {showNewAddressForm && (
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Tambah Alamat Baru</h3>
          <form onSubmit={handleAddNewAddress} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nama Penerima"
                value={newAddress.name}
                onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                required
              />
              <Input
                label="Nomor Telepon"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                required
              />
            </div>
            <Input
              label="Alamat Lengkap"
              value={newAddress.address}
              onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Kota"
                value={newAddress.city}
                onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                required
              />
              <Input
                label="Kode Pos"
                value={newAddress.postalCode}
                onChange={(e) => setNewAddress({...newAddress, postalCode: e.target.value})}
                required
              />
            </div>
            <div className="flex space-x-4">
              <Button type="submit" loading={isProcessing}>
                Simpan Alamat
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowNewAddressForm(false)}
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
        >
          Lanjut ke Pengiriman
        </Button>
      </div>
    </Card>
  );

  const renderShippingStep = () => (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Pilih Metode Pengiriman</h2>
      
      <div className="space-y-4 mb-6">
        {shippingMethods.map((method) => (
          <div
            key={method.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedShippingMethod === method.id 
                ? 'border-[#2E7D32] bg-green-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedShippingMethod(method.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{method.name}</h3>
                <p className="text-sm text-gray-600">{method.description}</p>
                <p className="text-sm text-gray-600">Estimasi: {method.estimatedDays}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {method.price === 0 ? 'Gratis' : formatPrice(method.price)}
                </p>
                <input
                  type="radio"
                  checked={selectedShippingMethod === method.id}
                  onChange={() => setSelectedShippingMethod(method.id)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          Kembali ke Alamat
        </Button>
        <Button 
          onClick={() => setCurrentStep(3)} 
          disabled={!selectedShippingMethod}
          size="lg"
        >
          Lanjut ke Pembayaran
        </Button>
      </div>
    </Card>
  );

  const renderPaymentStep = () => {
    const selectedShipping = shippingMethods.find(m => m.id === selectedShippingMethod);
    const shippingCost = selectedShipping?.price || 0;
    const subtotal = cart?.totalPrice || 0;
    const total = subtotal + shippingCost;

    return (
      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>
          
          {/* Order Items */}
          <div className="space-y-4 mb-6">
            {cart?.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Image 
                  src={item.imageUrl || '/placeholder-product.jpg'} 
                  alt={item.name} 
                  width={64} 
                  height={64} 
                  className="w-16 h-16 object-cover rounded-lg" 
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">Jumlah: {item.quantity} {item.unit || 'pcs'}</p>
                </div>
                <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Subtotal ({cart?.totalItems} item)</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Biaya Kirim</span>
              <span className="font-semibold">
                {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Metode Pembayaran</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="QRIS"
                  checked={paymentMethod === 'QRIS'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>QRIS (Scan & Pay)</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="BANK_TRANSFER"
                  checked={paymentMethod === 'BANK_TRANSFER'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Transfer Bank</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  value="EWALLET"
                  checked={paymentMethod === 'EWALLET'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>E-Wallet (OVO, GoPay, DANA)</span>
              </label>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(2)}>
              Kembali ke Pengiriman
            </Button>
            <Button 
              onClick={handleCheckout} 
              loading={isProcessing}
              size="lg"
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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600">Memuat keranjang...</p>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Keranjang Anda kosong</h1>
          <p className="text-gray-600 mb-6">Silakan tambahkan produk ke keranjang terlebih dahulu</p>
          <Link href="/products">
            <Button>Lanjut Belanja</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/cart">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Keranjang
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 ml-4">Checkout</h1>
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