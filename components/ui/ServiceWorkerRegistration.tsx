'use client';
import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Cek apakah service worker sudah terdaftar
      navigator.serviceWorker.getRegistration()
        .then((existingRegistration) => {
          if (existingRegistration) {
            console.log('Service Worker sudah terdaftar:', existingRegistration);
            return;
          }
          
          // Register service worker hanya jika belum terdaftar
          return navigator.serviceWorker.register('/sw.js');
        })
        .then((registration) => {
          if (registration) {
            console.log('Service Worker berhasil didaftarkan:', registration);
            
            // Listen untuk update
            registration.addEventListener('updatefound', () => {
              console.log('Service Worker update ditemukan');
            });
          }
        })
        .catch((error) => {
          console.error('Service Worker gagal didaftarkan:', error);
        });
        
      // Listen untuk pesan dari service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Pesan dari Service Worker:', event.data);
      });
    }
  }, []); // Empty dependency array - hanya run sekali

  return null; // Tidak render apa-apa
}
