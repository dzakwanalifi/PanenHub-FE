'use client';
import { ReactNode } from 'react';
import { MapPin } from 'lucide-react';
import Header from './Header';
import MobileTabBar from './MobileTabBar';
import { toast } from '@/hooks/use-toast';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const triggerGeofenceNotification = () => {
    const storeNames = ['Kebun Segar Pak Budi', 'Tani Jaya', 'Green Valley Farms', 'Organic Paradise'];
    const products = ['tomat organik', 'wortel segar', 'bayam hijau', 'paprika merah'];
    
    const randomStore = storeNames[Math.floor(Math.random() * storeNames.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    
    toast({
      title: "🌱 Anda dekat dengan petani lokal!",
      description: `Anda berada di dekat ${randomStore}! Mereka punya promo spesial untuk ${randomProduct} hari ini.`,
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pb-20 md:pb-0">
        {children}
      </main>
      <MobileTabBar />
      
      {/* Demo Geofence Button */}
      <button
        onClick={triggerGeofenceNotification}
        className="fixed bottom-32 left-4 bg-[#2E7D32] text-white p-3 rounded-full shadow-lg hover:bg-[#1B5E20] transition-colors z-40 md:bottom-4"
        title="Simulasi Notifikasi Geofence (Demo)"
      >
        <MapPin className="w-5 h-5" />
      </button>
    </div>
  );
}