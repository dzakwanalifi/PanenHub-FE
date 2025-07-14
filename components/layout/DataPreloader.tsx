'use client';
import { useEffect } from 'react';

// Component untuk preload data di background
export default function DataPreloader() {
  useEffect(() => {
    const preloadCriticalData = async () => {
      try {
        console.log('🚀 Starting aggressive data preloading...');
        
        // Array of APIs to preload
        const apisToPreload = [
          { url: '/api/group-buy', name: 'Group Buy' },
          { url: '/api/products', name: 'Products' },
          { url: '/api/stores', name: 'Stores' }
        ];

        // Preload all APIs simultaneously untuk speed
        const preloadPromises = apisToPreload.map(async ({ url, name }) => {
          try {
            console.log(`🚀 Preloading ${name} data...`);
            const response = await fetch(url, {
              headers: {
                'Cache-Control': 'max-age=300, stale-while-revalidate=60'
              }
            });
            
            if (response.ok) {
              // Read response to cache it in browser
              await response.clone().json();
              console.log(`✅ ${name} data preloaded successfully`);
            } else {
              console.log(`⚠️ ${name} preload returned ${response.status}`);
            }
          } catch (error) {
            console.log(`❌ ${name} preload failed:`, error);
          }
        });

        // Execute all preloads
        await Promise.all(preloadPromises);
        console.log('🎉 All critical data preloaded!');

        // Send message to service worker untuk cache warming
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'PRELOAD_APIS'
          });
        }

      } catch (error) {
        console.log('Background preload error:', error);
      }
    };

    // Start preloading immediately tanpa delay
    preloadCriticalData();
    
    // Also setup periodic refresh setiap 5 menit
    const intervalId = setInterval(preloadCriticalData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Component ini tidak render apa-apa
  return null;
}
