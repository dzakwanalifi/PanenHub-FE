'use client';
import { useState } from 'react';

interface NotificationToggleProps {
  label: string;
  description: string;
  defaultEnabled?: boolean;
  onChange?: (enabled: boolean) => void;
}

export default function NotificationToggle({ 
  label, 
  description, 
  defaultEnabled = false, 
  onChange 
}: NotificationToggleProps) {
  const [enabled, setEnabled] = useState(defaultEnabled);

  const handleToggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-lg">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{label}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:ring-offset-2 ${
          enabled ? 'bg-[#2E7D32]' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}