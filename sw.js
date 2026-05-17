/* B4B Moldova · Service Worker
 * Caching strategy: Network-first cu fallback offline
 * Versiune: 2026-05-16
 */

const CACHE_VERSION = 'b4b-v1-2026-05-16';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/404.html',
  '/og-image.jpg',
  '/B4B_Ghid_7_Procese_2026.pdf'
];

// Install: pre-cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch(err => {
        console.log('[SW] Cache add failed:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_VERSION)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch: network-first cu fallback la cache
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Doar GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  // Skip api/ paths
  if (url.pathname.startsWith('/api/')) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed → try cache
        return caches.match(request).then((cached) => {
          if (cached) return cached;

          // For navigation requests, fallback to offline page
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }

          return new Response('Offline', { status: 503, statusText: 'Offline' });
        });
      })
  );
});
