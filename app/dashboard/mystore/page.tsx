'use client';
import { useState } from 'react';
import { 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  TrendingUp, 
  DollarSign,
  Users,
  Eye,
  Edit,
  Trash2,
  Plus,
  Wallet,
  Menu,
  X,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';

export default function MyStoreDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data for the dashboard
  const storeStats = {
    totalRevenue: 15420.50,
    totalOrders: 342,
    totalProducts: 28,
    activeCustomers: 156,
    revenueGrowth: 12.5,
    ordersGrowth: 8.3,
  };

  const recentOrders = [
    { id: '#ORD-001', customer: 'Sarah Johnson', amount: 45.99, status: 'pending', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Michael Chen', amount: 67.50, status: 'delivered', date: '2024-01-15' },
    { id: '#ORD-003', customer: 'Emily Davis', amount: 23.75, status: 'processing', date: '2024-01-14' },
    { id: '#ORD-004', customer: 'David Wilson', amount: 89.25, status: 'shipped', date: '2024-01-14' },
  ];

  const products = [
    { id: 1, name: 'Organic Carrots', price: 2.99, stock: 45, sales: 120, image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { id: 2, name: 'Fresh Spinach', price: 3.49, stock: 32, sales: 89, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { id: 3, name: 'Red Tomatoes', price: 4.99, stock: 28, sales: 156, image: 'https://images.unsplash.com/photo-1546470427-e2e5c92b3c38?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { id: 4, name: 'Sweet Potatoes', price: 3.99, stock: 67, sales: 78, image: 'https://images.unsplash.com/photo-1519664398569-62bd70cf903e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'earnings', label: 'Earnings', icon: Wallet },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${storeStats.totalRevenue.toFixed(2)}</p>
              <p className="text-sm text-green-600">+{storeStats.revenueGrowth}% from last month</p>
            </div>
            <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#2E7D32]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{storeStats.totalOrders}</p>
              <p className="text-sm text-green-600">+{storeStats.ordersGrowth}% from last month</p>
            </div>
            <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-[#2E7D32]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{storeStats.totalProducts}</p>
              <p className="text-sm text-gray-600">Available in store</p>
            </div>
            <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-[#2E7D32]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900">{storeStats.activeCustomers}</p>
              <p className="text-sm text-gray-600">This month</p>
            </div>
            <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-[#2E7D32]" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <button className="text-[#2E7D32] hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-3 text-sm font-medium text-gray-600">Order ID</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Customer</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Amount</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Status</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-3 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="py-3 text-sm text-gray-600">{order.customer}</td>
                  <td className="py-3 text-sm font-medium text-gray-900">${order.amount}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Products</h3>
        <button className="bg-[#2E7D32] text-white px-4 py-2 rounded-lg hover:bg-[#1B5E20] transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
              <p className="text-2xl font-bold text-[#2E7D32] mb-2">${product.price}</p>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>Stock: {product.stock}</span>
                <span>Sales: {product.sales}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-[#2E7D32] text-white py-2 px-3 rounded-lg hover:bg-[#1B5E20] transition-colors flex items-center justify-center">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>
                <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'products':
        return renderProducts();
      case 'earnings':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings</h3>
            <p className="text-gray-600 mb-4">View your detailed earnings and payout information.</p>
            <a
              href="/dashboard/earnings"
              className="bg-[#2E7D32] text-white px-4 py-2 rounded-lg hover:bg-[#1B5E20] transition-colors inline-block"
            >
              Go to Earnings Dashboard
            </a>
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Orders</h3>
            <p className="text-gray-600">Order management interface will be implemented here.</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h3>
            <p className="text-gray-600">Detailed analytics and reporting will be implemented here.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Settings</h3>
            <p className="text-gray-600">Store configuration and settings will be implemented here.</p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="flex">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:inset-0
        `}>
          <div className="flex flex-col flex-grow bg-white shadow-lg">
            <div className="flex items-center flex-shrink-0 px-6 py-4 border-b border-gray-200">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="md:hidden mr-3 p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">My Store</h1>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#2E7D32] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64">
          <div className="p-6">
            {/* Mobile Header */}
            <div className="md:hidden mb-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">My Store</h1>
                <div className="w-10"></div> {/* Spacer for centering */}
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome to your store dashboard. Manage your products, orders, and analytics.
              </p>
            </div>

            {/* Content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}