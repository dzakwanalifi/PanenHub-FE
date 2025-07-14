// Service Worker untuk PWA PanenHub
const CACHE_NAME = 'panenhub-v1';
const STATIC_CACHE = 'panenhub-static-v1';
const DYNAMIC_CACHE = 'panenhub-dynamic-v1';
const API_CACHE = 'panenhub-api-v1';

// Assets untuk di-cache
const STATIC_ASSETS = [
  '/',
  '/login',
  '/signup',
  '/products',
  '/cart',
  '/group-buy',
  '/offline',
  '/manifest.json',
  // Add critical CSS and JS files
  '/_next/static/css/',
  '/_next/static/js/',
];

// API endpoints untuk cache dengan strategi khusus
const API_ENDPOINTS = [
  '/api/group-buy',
  '/api/products', 
  '/api/stores',
  '/api/v1/products',
  '/api/v1/stores',
  '/api/v1/categories',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('Failed to cache static assets:', error);
      })
  );
  
  // Skip waiting untuk update langsung
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== API_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all pages
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip chrome-extension dan browser internal URLs
  if (url.protocol === 'chrome-extension:' || 
      url.protocol === 'moz-extension:' ||
      url.protocol === 'safari-extension:') {
    return;
  }

  // Skip cross-origin requests kecuali untuk resources yang diperlukan
  if (url.origin !== self.location.origin) {
    // Allow caching untuk CDN dan external assets yang aman
    if (url.hostname.includes('cdn') || 
        url.hostname.includes('googleapis') ||
        url.hostname.includes('fonts')) {
      event.respondWith(cacheFirstStrategy(request));
    }
    return;
  }

  // Hanya cache GET requests, biarkan POST/PUT/DELETE lewat langsung ke network
  if (request.method !== 'GET') {
    // Untuk non-GET requests (POST, PUT, DELETE), langsung ke network tanpa cache
    return;
  }

  // Strategy untuk API calls (hanya GET)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Strategy untuk static assets
  if (request.destination === 'image' || 
      request.destination === 'style' || 
      request.destination === 'script' ||
      request.destination === 'font') {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Strategy untuk pages
  event.respondWith(staleWhileRevalidateStrategy(request));
});

// Cache First Strategy - untuk assets yang jarang berubah
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.status === 200) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    // Return offline fallback if available
    return await caches.match('/offline') || new Response('Offline');
  }
}

// Network First Strategy - untuk API calls
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful GET requests
    if (networkResponse.status === 200 && request.method === 'GET') {
      const cache = await caches.open(API_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache for:', request.url);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response for API calls
    return new Response(
      JSON.stringify({ 
        error: 'Offline',
        message: 'No internet connection available'
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Stale While Revalidate Strategy - untuk pages
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.status === 200) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => cachedResponse || caches.match('/offline'));

  return cachedResponse || await fetchPromise;
}

// Background sync untuk offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync-cart') {
    event.waitUntil(syncOfflineActions());
  }
});

// Push notification handler
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  const options = {
    body: event.data?.text() || 'Ada update terbaru di PanenHub!',
    icon: '/images/icon-192x192.png',
    badge: '/images/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'Lihat Sekarang',
        icon: '/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'Tutup',
        icon: '/images/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('PanenHub', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sync offline actions when back online
async function syncOfflineActions() {
  try {
    // Implement sync logic for offline cart actions
    console.log('Syncing offline actions...');
    
    // This would sync any offline actions stored in IndexedDB
    // For now, just log the sync attempt
    return Promise.resolve();
  } catch (error) {
    console.error('Failed to sync offline actions:', error);
    return Promise.reject(error);
  }
}

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});
