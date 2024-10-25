const CACHE_NAME = 'palace-of-goods-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/css/styles.css',
  '/assets/social-preview.png'
];

// Install event: caching assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((error) => {
        console.error('Failed to open cache or add assets', error);
      })
  );
});

// Fetch event: serving cached assets, with network fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found, otherwise fetch from network
        return response || fetch(event.request);
      })
      .catch((error) => {
        console.error('Fetch failed; returning offline page instead.', error);
        return caches.match('/index.html'); // Fallback to home page if offline
      })
  );
});

// Activate event: clearing old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
