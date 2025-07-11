'use client';
import { useState } from 'react';
import { ArrowLeft, Plus, MapPin } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AddressCard from '@/components/ui/AddressCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  // Mock addresses data
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true,
    },
    {
      id: '2',
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      street: '456 Oak Avenue',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      isDefault: false,
    },
  ]);

  const handleEditAddress = (id: string) => {
    console.log('Edit address:', id);
    // In a real app, this would open an edit modal or navigate to edit page
    alert(`Edit address functionality would be implemented here for address ${id}`);
  };

  const handleDeleteAddress = (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
    }
  };

  const handleAddNewAddress = () => {
    console.log('Add new address');
    // In a real app, this would open an add address modal or navigate to add page
    alert('Add new address functionality would be implemented here');
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/account" className="p-2 hover:bg-gray-100 rounded-lg mr-3">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Address Book</h1>
          </div>
          <Button onClick={handleAddNewAddress} className="hidden md:flex">
            <Plus className="w-4 h-4 mr-2" />
            Add New Address
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {addresses.length === 0 ? (
            /* Empty State */
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No addresses saved</h3>
              <p className="text-gray-600 mb-8">Add your first address to make checkout faster</p>
              <Button onClick={handleAddNewAddress} size="lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Address
              </Button>
            </div>
          ) : (
            /* Address List */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile FAB */}
        <button
          onClick={handleAddNewAddress}
          className="md:hidden fixed bottom-24 right-4 w-14 h-14 bg-[#2E7D32] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#1B5E20] transition-colors z-40"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </ProtectedRoute>
  );
}