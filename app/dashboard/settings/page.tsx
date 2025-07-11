'use client';
import { useState } from 'react';
import { ArrowLeft, Upload, Save, Settings as SettingsIcon, Truck, CreditCard, Menu, X } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

export default function StoreSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Store Profile Form Data
  const [profileData, setProfileData] = useState({
    storeName: 'Green Valley Farms',
    storeDescription: 'Organic produce grown with care and sustainability in mind',
    storeBanner: '',
    storeLogo: '',
  });

  // Shipping Options Data
  const [shippingOptions, setShippingOptions] = useState({
    instantCourier: true,
    sameDay: true,
    regular: true,
    flatRate: '5.99',
  });

  // Payout Information Data
  const [payoutData, setPayoutData] = useState({
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountHolderName: '',
  });

  const tabs = [
    { id: 'profile', label: 'Store Profile', icon: SettingsIcon },
    { id: 'shipping', label: 'Shipping Options', icon: Truck },
    { id: 'payout', label: 'Payout Information', icon: CreditCard },
  ];

  const handleProfileInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleShippingToggle = (option: string) => {
    setShippingOptions(prev => ({ ...prev, [option]: !prev[option as keyof typeof prev] }));
  };

  const handlePayoutInputChange = (field: string, value: string) => {
    setPayoutData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (type: 'banner' | 'logo') => {
    console.log(`Upload ${type} clicked`);
    alert(`${type} upload functionality would be implemented here`);
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Saving settings:', { profileData, shippingOptions, payoutData });
    setLoading(false);
    alert('Settings saved successfully!');
  };

  const renderStoreProfile = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Information</h3>
        <div className="space-y-4">
          <Input
            label="Store Name"
            value={profileData.storeName}
            onChange={(e) => handleProfileInputChange('storeName', e.target.value)}
            placeholder="Enter your store name"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
            <textarea
              value={profileData.storeDescription}
              onChange={(e) => handleProfileInputChange('storeDescription', e.target.value)}
              placeholder="Describe your store and what makes it special..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Store Banner */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Banner</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2E7D32] transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload store banner</p>
              <p className="text-xs text-gray-500 mb-4">Recommended: 1200x400px</p>
              <Button variant="outline" size="sm" onClick={() => handleImageUpload('banner')}>
                Choose File
              </Button>
            </div>
          </div>

          {/* Store Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2E7D32] transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload store logo</p>
              <p className="text-xs text-gray-500 mb-4">Recommended: 200x200px</p>
              <Button variant="outline" size="sm" onClick={() => handleImageUpload('logo')}>
                Choose File
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderShippingOptions = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Shipping Methods</h3>
        <p className="text-gray-600 mb-6">Select which shipping options you want to offer to customers</p>
        
        <div className="space-y-4">
          {[
            { key: 'instantCourier', label: 'Instant Courier', description: 'Same-day delivery within 2-4 hours' },
            { key: 'sameDay', label: 'Same-Day Delivery', description: 'Delivery within the same day' },
            { key: 'regular', label: 'Regular Delivery', description: 'Standard delivery within 2-3 days' },
          ].map((option) => (
            <div key={option.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{option.label}</h4>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
              <button
                onClick={() => handleShippingToggle(option.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:ring-offset-2 ${
                  shippingOptions[option.key as keyof typeof shippingOptions] ? 'bg-[#2E7D32]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    shippingOptions[option.key as keyof typeof shippingOptions] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Rate</h3>
        <div className="max-w-xs">
          <Input
            label="Flat Shipping Rate ($)"
            type="number"
            value={shippingOptions.flatRate}
            onChange={(e) => setShippingOptions(prev => ({ ...prev, flatRate: e.target.value }))}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          This rate will apply to all enabled shipping methods
        </p>
      </div>
    </div>
  );

  const renderPayoutInformation = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <CreditCard className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Secure Information</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Your banking information is encrypted and stored securely. We never share this information with third parties.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Account Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Bank Name"
            value={payoutData.bankName}
            onChange={(e) => handlePayoutInputChange('bankName', e.target.value)}
            placeholder="Enter bank name"
          />
          
          <Input
            label="Account Holder Name"
            value={payoutData.accountHolderName}
            onChange={(e) => handlePayoutInputChange('accountHolderName', e.target.value)}
            placeholder="Enter account holder name"
          />
          
          <Input
            label="Account Number"
            value={payoutData.accountNumber}
            onChange={(e) => handlePayoutInputChange('accountNumber', e.target.value)}
            placeholder="Enter account number"
            type="password"
          />
          
          <Input
            label="Routing Number"
            value={payoutData.routingNumber}
            onChange={(e) => handlePayoutInputChange('routingNumber', e.target.value)}
            placeholder="Enter routing number"
          />
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Payout Schedule</h4>
        <p className="text-sm text-blue-800">
          Payouts are processed every Friday for the previous week's earnings. 
          Minimum payout amount is $50.00.
        </p>
      </div>
    </div>
  );

  return (
    <ProtectedRoute requireSeller>
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
                <h1 className="text-xl font-bold text-gray-900">Store Settings</h1>
              </div>
              <nav className="flex-1 px-4 py-4 space-y-2">
                <Link
                  href="/dashboard/mystore"
                  className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-3" />
                  Back to Dashboard
                </Link>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#2E7D32] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5 mr-3" />
                    {tab.label}
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
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  <h1 className="text-xl font-bold text-gray-900">Store Settings</h1>
                  <div className="w-10"></div>
                </div>
              </div>

              {/* Desktop Header */}
              <div className="hidden md:block mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h1>
                <p className="text-gray-600">
                  Configure your store settings and preferences
                </p>
              </div>

              {/* Content */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                {activeTab === 'profile' && renderStoreProfile()}
                {activeTab === 'shipping' && renderShippingOptions()}
                {activeTab === 'payout' && renderPayoutInformation()}
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleSaveSettings}
                  loading={loading}
                  size="lg"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}