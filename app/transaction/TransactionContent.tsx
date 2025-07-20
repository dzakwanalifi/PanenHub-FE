'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, Clock, RefreshCw, CreditCard } from 'lucide-react';
import { formatPrice } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';

interface TransactionDetail {
  id: string;
  checkout_session_id: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'expired';
  payment_method: string;
  total_amount: number;
  created_at: string;
  orders: Array<{
    id: string;
    total_price: number;
    status: string;
    store: {
      store_name: string;
    };
    order_items: Array<{
      id: string;
      quantity: number;
      price: number;
      product: {
        title: string;
        image_urls: string[];
      };
    }>;
  }>;
  tripay_reference?: string;
  tripay_payment_url?: string;
}

export default function TransactionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');
  
  const [transaction, setTransaction] = useState<TransactionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTransactionDetail = async () => {
    if (!sessionId) {
      setError('Session ID tidak ditemukan');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.get(`/payments/checkout/${sessionId}`);
      setTransaction(response.data.checkout_session);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching transaction:', err);
      setError(err.response?.data?.message || 'Gagal memuat detail transaksi');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTransaction = async () => {
    setIsRefreshing(true);
    await fetchTransactionDetail();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchTransactionDetail();
  }, [sessionId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'failed':
      case 'expired':
        return <XCircle className="w-8 h-8 text-red-500" />;
      case 'pending':
      default:
        return <Clock className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pembayaran Berhasil';
      case 'failed':
        return 'Pembayaran Gagal';
      case 'expired':
        return 'Pembayaran Kedaluwarsa';
      case 'pending':
      default:
        return 'Menunggu Pembayaran';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'failed':
      case 'expired':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'pending':
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Spinner />
            <p className="mt-4 text-gray-600">Memuat detail transaksi...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-md mx-auto">
            <XCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Terjadi Kesalahan</h1>
            <p className="text-gray-500 mb-8">{error}</p>
            <div className="space-y-3">
              <Button onClick={refreshTransaction} className="w-full">
                Coba Lagi
              </Button>
              <Link href="/orders" className="block">
                <Button variant="outline" className="w-full">
                  Kembali ke Transaksi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-xl font-bold text-gray-900 mb-2">Transaksi Tidak Ditemukan</h1>
            <p className="text-gray-500 mb-8">Session transaksi tidak valid atau telah kedaluwarsa.</p>
            <Link href="/orders">
              <Button className="w-full">Kembali ke Transaksi</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Detail Transaksi</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Status Card */}
        <Card className="p-6 mb-6">
          <div className="text-center">
            <div className="mb-4">
              {getStatusIcon(transaction.payment_status)}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {getStatusText(transaction.payment_status)}
            </h2>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(transaction.payment_status)}`}>
              {transaction.payment_status.toUpperCase()}
            </div>
            
            {transaction.payment_status === 'pending' && (
              <div className="mt-4">
                <Button
                  onClick={refreshTransaction}
                  disabled={isRefreshing}
                  variant="outline"
                  size="sm"
                  className="inline-flex items-center space-x-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh Status</span>
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Payment Details */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detail Pembayaran</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Pembayaran</span>
              <span className="font-semibold text-lg">{formatPrice(transaction.total_amount)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Metode Pembayaran</span>
              <span className="font-medium">{transaction.payment_method}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Tanggal Transaksi</span>
              <span className="font-medium">
                {new Date(transaction.created_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">ID Transaksi</span>
              <span className="font-mono text-sm">{transaction.checkout_session_id}</span>
            </div>

            {transaction.tripay_reference && (
              <div className="flex justify-between">
                <span className="text-gray-600">Referensi TriPay</span>
                <span className="font-mono text-sm">{transaction.tripay_reference}</span>
              </div>
            )}
          </div>

          {/* Payment Button for Pending */}
          {transaction.payment_status === 'pending' && transaction.tripay_payment_url && (
            <div className="mt-6 pt-4 border-t">
              <a
                href={transaction.tripay_payment_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full inline-flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Lanjutkan Pembayaran</span>
                </Button>
              </a>
            </div>
          )}
        </Card>

        {/* Order Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detail Pesanan</h3>
          
          <div className="space-y-6">
            {transaction.orders.map((order) => (
              <div key={order.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{order.store.store_name}</h4>
                    <p className="text-sm text-gray-500">Order #{order.id.substring(0, 8)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(order.total_price)}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Image
                        src={item.product.image_urls?.[0] || '/images/placeholder-product.svg'}
                        alt={item.product.title}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.product.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.quantity}x {formatPrice(item.price)}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(item.quantity * item.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="mt-6 flex space-x-3">
          <Link href="/orders" className="flex-1">
            <Button variant="outline" className="w-full">
              Lihat Semua Transaksi
            </Button>
          </Link>
          {transaction.payment_status === 'paid' && (
            <Link href="/" className="flex-1">
              <Button className="w-full">
                Lanjut Belanja
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
