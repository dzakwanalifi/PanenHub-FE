'use client';
import { ReactNode } from 'react';
import { MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import MobileTabBar from './MobileTabBar';
import NetworkStatus from '@/components/ui/NetworkStatus';
import OptimisticUpdatesIndicator from '@/components/ui/OptimisticUpdatesIndicator';
import PWAInstallPrompt from '@/components/ui/PWAInstallPrompt';
import ServiceWorkerRegistration from '@/components/ui/ServiceWorkerRegistration';
import PerformanceMonitor from '@/components/ui/PerformanceMonitor';
import { toast } from '@/hooks/use-toast';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  
  // Only show geofence button on home page
  const showGeofenceButton = pathname === '/';

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
      <ServiceWorkerRegistration />
      <PerformanceMonitor />
      <NetworkStatus />
      <OptimisticUpdatesIndicator />
      <Header />
      <main className="pb-20 md:pb-0">
        {children}
      </main>
      <MobileTabBar />
      <PWAInstallPrompt />
      
      {/* Demo Geofence Button - Only show on home page */}
      {showGeofenceButton && (
        <button
          onClick={triggerGeofenceNotification}
          className="fixed bottom-32 left-4 bg-[#4CAF50] text-white p-3 rounded-full shadow-lg hover:bg-[#45A049] transition-colors z-40 md:bottom-4"
          title="Simulasi Notifikasi Geofence (Demo)"
        >
          <MapPin className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}