// Inside src/service-worker.js
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('palace-of-goods-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/main.chunk.js',
        '/static/css/styles.css',
        '/assets/social-preview.png',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
