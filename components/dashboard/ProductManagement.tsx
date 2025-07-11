'use client';
import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  sales: number;
  status: 'active' | 'draft' | 'out_of_stock';
  image: string;
  category: string;
}

export default function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock products data
  const products: Product[] = [
    {
      id: '1',
      name: 'Organic Carrots',
      price: 2.99,
      stock: 45,
      sales: 120,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      category: 'Vegetables',
    },
    {
      id: '2',
      name: 'Fresh Spinach',
      price: 3.49,
      stock: 0,
      sales: 89,
      status: 'out_of_stock',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      category: 'Vegetables',
    },
    {
      id: '3',
      name: 'Red Tomatoes',
      price: 4.99,
      stock: 28,
      sales: 156,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1546470427-e2e5c92b3c38?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      category: 'Vegetables',
    },
    {
      id: '4',
      name: 'Sweet Potatoes',
      price: 3.99,
      stock: 67,
      sales: 0,
      status: 'draft',
      image: 'https://images.unsplash.com/photo-1519664398569-62bd70cf903e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      category: 'Vegetables',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      draft: { color: 'bg-yellow-100 text-yellow-800', label: 'Draft' },
      out_of_stock: { color: 'bg-red-100 text-red-800', label: 'Out of Stock' },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        
        {/* Desktop Add Button */}
        <Link
          href="/dashboard/products/manage/new"
          className="hidden md:flex bg-[#2E7D32] text-white px-6 py-3 rounded-lg hover:bg-[#1B5E20] transition-colors items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Product
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid - Mobile */}
      <div className="md:hidden space-y-4 mb-20">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-20 h-20 object-cover"
              />
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                  {getStatusBadge(product.status)}
                </div>
                <p className="text-lg font-bold text-[#2E7D32] mb-1">${product.price}</p>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                  <span>Stock: {product.stock}</span>
                  <span>Sales: {product.sales}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/dashboard/products/manage/${product.id}`}
                    className="flex-1 bg-[#2E7D32] text-white py-2 px-3 rounded-lg text-xs text-center hover:bg-[#1B5E20] transition-colors"
                  >
                    Edit
                  </Link>
                  <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Products Table - Desktop */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Product</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Sales</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-lg font-bold text-[#2E7D32]">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {product.sales}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/dashboard/products/manage/${product.id}`}
                        className="bg-[#2E7D32] text-white py-2 px-3 rounded-lg hover:bg-[#1B5E20] transition-colors flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Link>
                      <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile FAB */}
      <Link
        href="/dashboard/products/manage/new"
        className="md:hidden fixed bottom-24 right-4 w-14 h-14 bg-[#2E7D32] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#1B5E20] transition-colors z-40"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
}