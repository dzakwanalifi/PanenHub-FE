'use client';
import { Package, Clock, CheckCircle, XCircle, Truck, Star } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { getOrdersByUserId } from '@/lib/mock-data';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function OrdersPage() {
  const { user } = useAuthStore();
  const orders = user ? getOrdersByUserId(user.id) : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusVariant = (status: string): 'success' | 'info' | 'warning' | 'error' => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'info';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'info';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your order history</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center max-w-md mx-auto">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Button size="lg">Start Shopping</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-600">Ordered on {order.date}</p>
                    <p className="text-sm text-[#2E7D32] font-medium">{order.storeName}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(order.status)}
                      <Badge variant={getStatusVariant(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                    <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Items ({order.items.length})</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 py-2">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Delivery Address</h4>
                  <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => console.log('View order details:', order.id)}
                  >
                    View Details
                  </Button>
                  {order.status === 'delivered' && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => console.log('Leave review for order:', order.id)}
                      >
                        <Star className="w-4 h-4 mr-1" />
                        Leave Review
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log('Reorder:', order.id)}
                      >
                        Reorder
                      </Button>
                    </>
                  )}
                  {order.status === 'processing' && (
                    <button
                      onClick={() => console.log('Cancel order:', order.id)}
                      className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                    >
                      Cancel Order
                    </button>
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