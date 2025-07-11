'use client';
import { Edit, Trash2, MapPin } from 'lucide-react';
import Badge from './Badge';

interface AddressCardProps {
  address: {
    id: string;
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

export default function AddressCard({ address, onEdit, onDelete, onSetDefault }: AddressCardProps) {
  const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-[#2E7D32]" />
          <h3 className="text-lg font-semibold text-gray-900">{address.name}</h3>
          {address.isDefault && (
            <Badge variant="success">Utama</Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(address.id)}
            className="p-2 text-gray-600 hover:text-[#2E7D32] hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(address.id)}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-gray-900">{fullAddress}</p>
        <p className="text-sm text-gray-600">Telepon: {address.phone}</p>
        
        {!address.isDefault && onSetDefault && (
          <button
            onClick={() => onSetDefault(address.id)}
            className="text-sm text-[#2E7D32] hover:text-[#1B5E20] font-medium"
          >
            Jadikan Alamat Utama
          </button>
        )}
      </div>
    </div>
  );
}