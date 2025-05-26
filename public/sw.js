// This service worker is generated with the help of vite-plugin-pwa
// It handles precaching of assets and offline functionality

// Define cache name and version
const CACHE_NAME = 'guitar-mate-v1';

// List of assets to precache (will be populated by the PWA plugin)
const PRECACHE_ASSETS = self.__WB_MANIFEST || [];

// Install event - precache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Make sure to cache the offline fallback page
        const offlineAssets = [
          '/offline.html',
          ...PRECACHE_ASSETS
        ];
        return cache.addAll(offlineAssets);
      })
      // Skip waiting means the new service worker will become active immediately
      // We don't use self.skipWaiting() here because we want to allow the user to choose
      // whether to update or not
  );
});

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('guitar-mate-') && cacheName !== CACHE_NAME;
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(event.request)
            .then((response) => {
              // Don't cache responses that aren't successful
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response as it's a stream that can only be consumed once
              const responseToCache = response.clone();

              // Store in cache
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            })
            .catch(() => {
              // If fetch fails (offline), return the offline page for HTML requests
              if (event.request.mode === 'navigate') {
                return caches.match('/offline.html').then(response => {
                  return response || caches.match('/');
                });
              }
            });
        })
    );
  }
});
