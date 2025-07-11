'use client';
import { useState } from 'react';
import { X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAddressStore, Address } from '@/store/addressStore';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddressModal({ isOpen, onClose }: AddressModalProps) {
  const addAddress = useAddressStore((state) => state.addAddress);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nama harus diisi';
    if (!formData.phone.trim()) newErrors.phone = 'Nomor telepon harus diisi';
    if (!formData.street.trim()) newErrors.street = 'Alamat jalan harus diisi';
    if (!formData.city.trim()) newErrors.city = 'Kota harus diisi';
    if (!formData.state.trim()) newErrors.state = 'Provinsi harus diisi';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Kode pos harus diisi';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add address
    addAddress(formData);
    
    // Reset form and close modal
    setFormData({
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false,
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Tambah Alamat Baru</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Masukkan nama lengkap"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Telepon
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+62 812-3456-7890"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat Jalan
            </label>
            <Input
              type="text"
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              placeholder="Jl. Sudirman No. 123"
              className={errors.street ? 'border-red-500' : ''}
            />
            {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kota
              </label>
              <Input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Jakarta"
                className={errors.city ? 'border-red-500' : ''}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kode Pos
              </label>
              <Input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                placeholder="12345"
                className={errors.zipCode ? 'border-red-500' : ''}
              />
              {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provinsi
            </label>
            <Input
              type="text"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              placeholder="DKI Jakarta"
              className={errors.state ? 'border-red-500' : ''}
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) => handleInputChange('isDefault', e.target.checked)}
              className="w-4 h-4 text-[#2E7D32] bg-gray-100 border-gray-300 rounded focus:ring-[#2E7D32] focus:ring-2"
            />
            <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
              Jadikan alamat utama
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Batal
            </Button>
            <Button type="submit" className="flex-1">
              Simpan Alamat
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 