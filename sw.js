const CACHE_NAME = 'bidyasagar-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/chat.css',
  '/css/profile.css',
  '/js/firebase-config.js',
  '/js/auth.js',
  '/js/chat.js',
  '/js/stories.js',
  '/js/ai-assistant.js',
  '/js/app.js',
  '/pages/chat.html',
  '/pages/profile.html',
  '/pages/rooms.html',
  '/pages/stories.html',
  '/pages/senior-guide.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache.map(url => new Request(url, {cache: 'reload'})))
        .catch(err => console.log('Cache failed for some files:', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(fetchResponse => {
        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
          return fetchResponse;
        }
        const responseToCache = fetchResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return fetchResponse;
      }).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'বিদ্যাসাগর', {
      body: data.body || 'নতুন বার্তা এসেছে!',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-72.png'
    })
  );
});
