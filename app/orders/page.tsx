'use client';
import { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck, Star, CreditCard, Eye } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Spinner from '@/components/ui/Spinner';
import { formatPrice } from '@/lib/constants';
import Link from 'next/link';
import api from '@/lib/api';

interface CheckoutSession {
  id: string;
  checkout_session_id: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'expired';
  payment_method: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
  tripay_reference?: string;
  tripay_payment_url?: string;
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
}

export default function OrdersPage() {
  const { user } = useAuthStore();
  const [checkoutSessions, setCheckoutSessions] = useState<CheckoutSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCheckoutSessions = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching checkout sessions for user:', user?.id);
      const response = await api.get('/payments/checkout/history');
      console.log('Checkout sessions response:', response.data);
      setCheckoutSessions(response.data || []);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching checkout sessions:', err);
      console.error('Error details:', {
        status: err.response?.status,
        message: err.response?.data?.message,
        url: err.config?.url
      });
      setError(err.response?.data?.message || 'Gagal memuat riwayat transaksi');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCheckoutSessions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'failed':
      case 'expired':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusVariant = (status: string): 'success' | 'info' | 'warning' | 'error' => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
      case 'expired':
        return 'error';
      default:
        return 'info';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pembayaran Berhasil';
      case 'pending':
        return 'Menunggu Pembayaran';
      case 'failed':
        return 'Pembayaran Gagal';
      case 'expired':
        return 'Pembayaran Kedaluwarsa';
      default:
        return status;
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Silakan login untuk melihat riwayat transaksi</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Riwayat Transaksi</h1>
          <p className="text-gray-600">Lacak dan kelola riwayat transaksi Anda</p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat transaksi...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchCheckoutSessions} variant="outline">
              Coba Lagi
            </Button>
          </div>
        ) : checkoutSessions.length === 0 ? (
          <div className="text-center max-w-md mx-auto">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Belum ada transaksi</h2>
            <p className="text-gray-600 mb-8">
              Anda belum melakukan transaksi apapun. Mulai belanja untuk melihat transaksi di sini.
            </p>
            <Button size="lg">Mulai Belanja</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {checkoutSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-2xl shadow-lg p-6">
                {/* Transaction Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">#{session.tripay_reference || session.id}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(session.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    {session.orders && session.orders.length > 0 && (
                      <p className="text-sm text-[#2E7D32] font-medium">
                        {session.orders[0].store.store_name}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(session.payment_status)}
                      <Badge variant={getStatusVariant(session.payment_status)}>
                        {getStatusText(session.payment_status)}
                      </Badge>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {formatPrice(session.total_amount)}
                    </p>
                  </div>
                </div>

                {/* Transaction Items */}
                {session.orders && session.orders.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Items ({session.orders.reduce((total, order) => total + order.order_items.length, 0)})
                    </h4>
                    <div className="space-y-2">
                      {session.orders.map((order) => 
                        order.order_items.map((item, index) => (
                          <div key={`${order.id}-${index}`} className="flex items-center space-x-4 py-2">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{item.product.title}</p>
                              <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Shipping Information */}
                {session.orders && session.orders[0]?.status && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Status Pengiriman</h4>
                    <p className="text-sm text-gray-600">
                      {session.orders[0].status === 'processing' ? 'Sedang Diproses' : 
                       session.orders[0].status === 'shipped' ? 'Sedang Dikirim' :
                       session.orders[0].status === 'delivered' ? 'Sudah Diterima' : 
                       session.orders[0].status === 'cancelled' ? 'Dibatalkan' : 
                       session.orders[0].status}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 flex-wrap gap-2">
                  <Button
                    onClick={() => {
                      window.location.href = `/transaction?session=${session.id}`;
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Lihat Detail
                  </Button>
                  
                  {session.payment_status === 'pending' && session.tripay_payment_url && (
                    <Button
                      onClick={() => {
                        window.open(session.tripay_payment_url, '_blank');
                      }}
                      size="sm"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Lanjutkan Pembayaran
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}