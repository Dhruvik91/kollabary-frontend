const CACHE_NAME = 'kollabary-v1781001906534';
const urlsToCache = [
  '/',
  '/offline',
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Bypass caching and interception in local development
  if (
    self.location.hostname === 'localhost' || 
    self.location.hostname === '127.0.0.1' || 
    self.location.hostname.startsWith('192.168.')
  ) {
    return;
  }

  // Only handle GET requests and avoid caching browser extensions etc
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache valid responses (allow CORS for S3 etc)
        if (!response || response.status !== 200 || (response.type !== 'basic' && response.type !== 'cors')) {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();
        
        // Cache the fetched response
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });
        
        return response;
      })
      .catch(() => {
        // If network fails, try cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            // If not in cache and it's a navigation request, return offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/offline');
            }
            return null;
          });
      })
  );
});

// Push event listener - show notification
self.addEventListener('push', (event) => {
  if (!event.data) return;

  try {
    const payload = event.data.json();
    const title = payload.title || 'Kollabary';
    const options = {
      body: payload.body || '',
      icon: payload.icon || '/icons/icon-192x192.png',
      badge: '/icons/badge-96x96.png',
      data: {
        url: payload.url || '/messages',
      },
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch (error) {
    console.error('Error handling push event:', error);
  }
});

// Notification click listener - open corresponding URL
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/messages';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // If window is already open, focus it and navigate
        for (const client of clientList) {
          if (client.url.endsWith(targetUrl) && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise, open a new window
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
