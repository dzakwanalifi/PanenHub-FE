'use client';
import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);
    
    // Check if running on iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Check if already installed (running in standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsInstalled(isStandalone);

    // Don't show prompt if already installed
    if (isStandalone) return;

    // Check if already dismissed in this session
    const isDismissed = sessionStorage.getItem('pwa-prompt-dismissed');
    if (isDismissed) return;

    // Handle beforeinstallprompt event (Android/Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a delay (better UX)
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    };

    // Handle app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowPrompt(false);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session - safe client-side check
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('pwa-prompt-dismissed', 'true');
    }
  };

  // Don't render on server or if not client-side ready
  if (!isClient) {
    return null;
  }

  // Don't show if already installed
  if (isInstalled) {
    return null;
  }

  // iOS Installation Instructions
  if (isIOS && showPrompt) {
    return (
      <div className="fixed bottom-20 left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 md:bottom-4 md:right-4 md:left-auto md:w-80">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-[#4CAF50]" />
            <h3 className="font-semibold text-gray-900">Install PanenHub</h3>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">
          Install PanenHub sebagai aplikasi di iPhone/iPad Anda:
        </p>
        
        <ol className="text-sm text-gray-600 space-y-2 mb-4">
          <li className="flex items-center space-x-2">
            <span className="flex-shrink-0 w-5 h-5 bg-[#4CAF50] text-white rounded-full flex items-center justify-center text-xs">1</span>
            <span>Tap tombol Share (kotak dengan panah naik)</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="flex-shrink-0 w-5 h-5 bg-[#4CAF50] text-white rounded-full flex items-center justify-center text-xs">2</span>
            <span>Pilih &quot;Add to Home Screen&quot;</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="flex-shrink-0 w-5 h-5 bg-[#4CAF50] text-white rounded-full flex items-center justify-center text-xs">3</span>
            <span>Tap &quot;Add&quot; untuk install</span>
          </li>
        </ol>
        
        <button
          onClick={handleDismiss}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors"
        >
          Mengerti, terima kasih
        </button>
      </div>
    );
  }

  // Android/Desktop Installation Prompt
  if (showPrompt && deferredPrompt) {
    return (
      <div className="fixed bottom-20 left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 md:bottom-4 md:right-4 md:left-auto md:w-80">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-[#4CAF50]" />
            <h3 className="font-semibold text-gray-900">Install PanenHub</h3>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Install PanenHub sebagai aplikasi untuk akses lebih cepat dan fitur offline.
        </p>
        
        <div className="flex space-x-2">
          <button
            onClick={handleInstall}
            className="flex-1 bg-[#4CAF50] text-white py-2 px-4 rounded-lg text-sm hover:bg-[#45A049] transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Install</span>
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-gray-600 text-sm hover:bg-gray-100 rounded-lg transition-colors"
          >
            Nanti
          </button>
        </div>
      </div>
    );
  }

  return null;
}
