const CACHE_NAME = "digra-cache-v1";
const urlsToCache = [
  "code.html",
  "manifest.json",
  "sw/service-worker.js"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw/service-worker.js').then(registration => {
      console.log('Service Worker enregistré');setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);
    }).catch(error => {
      console.error('Erreur SW :', error);
    });
  }
</script>
