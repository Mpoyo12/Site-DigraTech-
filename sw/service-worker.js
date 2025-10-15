const CACHE_NAME = 'digra-cache-v1';
const urlsToCache = [
  'code.html',
  'manifest.json',
  '/', // racine
];

// Installation
self.addEventListener('install',self.skipWaiting(); // active immédiatement le nouveau SW (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation
self.addEventListener('activate', self.client.claim(); // prend le contrôle sans recharger(event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```
