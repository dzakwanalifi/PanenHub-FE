'use client';
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';

export default function OrdersPage() {
  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 45.99,
      items: [
        { name: 'Organic Carrots', quantity: 2, price: 2.99 },
        { name: 'Fresh Spinach', quantity: 1, price: 3.49 },
        { name: 'Red Tomatoes', quantity: 3, price: 4.99 },
      ],
      store: 'Green Valley Farms',
      deliveryAddress: '123 Main St, City, State 12345',
    },
    {
      id: 'ORD-002',
      date: '2024-01-12',
      status: 'shipped',
      total: 67.50,
      items: [
        { name: 'Sweet Potatoes', quantity: 2, price: 3.99 },
        { name: 'Fresh Broccoli', quantity: 1, price: 5.49 },
        { name: 'Bell Peppers', quantity: 2, price: 6.99 },
      ],
      store: 'Sunrise Organic',
      deliveryAddress: '123 Main St, City, State 12345',
    },
    {
      id: 'ORD-003',
      date: '2024-01-10',
      status: 'processing',
      total: 23.75,
      items: [
        { name: 'Organic Lettuce', quantity: 1, price: 2.49 },
        { name: 'Baby Potatoes', quantity: 2, price: 3.29 },
      ],
      store: 'Fresh Fields',
      deliveryAddress: '123 Main St, City, State 12345',
    },
    {
      id: 'ORD-004',
      date: '2024-01-08',
      status: 'cancelled',
      total: 89.25,
      items: [
        { name: 'Premium Fruit Basket', quantity: 1, price: 39.99 },
        { name: 'Organic Rice Bundle', quantity: 1, price: 45.99 },
      ],
      store: 'Organic Harvest',
      deliveryAddress: '123 Main St, City, State 12345',
    },
  ];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
          <button className="bg-[#2E7D32] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1B5E20] transition-colors">
            Start Shopping
          </button>
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
                  <p className="text-sm text-[#2E7D32] font-medium">{order.store}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Items ({order.items.length})</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
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
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => console.log('View order details:', order.id)}
                  className="bg-[#2E7D32] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1B5E20] transition-colors"
                >
                  View Details
                </button>
                {order.status === 'delivered' && (
                  <>
                    <button
                      onClick={() => console.log('Leave review for order:', order.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
                    >
                      Leave a Review
                    </button>
                  <button
                    onClick={() => console.log('Reorder:', order.id)}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Reorder
                  </button>
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
  );
}