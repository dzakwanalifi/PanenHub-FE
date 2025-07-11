'use client';
import { useState } from 'react';
import { ArrowLeft, Camera, Save } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Avatar from '@/components/ui/Avatar';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = () => {
    // In a real app, this would open a file picker
    console.log('Avatar upload clicked');
    // For demo, we'll just show a placeholder
    alert('Avatar upload functionality would be implemented here');
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Saving profile changes:', formData);
    setLoading(false);
    alert('Profile updated successfully!');
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/account" className="p-2 hover:bg-gray-100 rounded-lg mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile Settings</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Avatar Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <Avatar 
                  src={formData.avatar} 
                  alt={formData.name} 
                  size="xl" 
                  fallback={formData.name}
                />
                <button
                  onClick={handleAvatarUpload}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-[#2E7D32] text-white rounded-full flex items-center justify-center hover:bg-[#1B5E20] transition-colors shadow-lg"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-3">Click the camera icon to change your profile picture</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                disabled
                helperText="Email cannot be changed for security reasons"
              />

              <Input
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button
                onClick={handleSaveChanges}
                loading={loading}
                size="lg"
                className="w-full md:w-auto"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}