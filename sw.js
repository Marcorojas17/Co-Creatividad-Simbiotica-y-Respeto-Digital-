const CACHE = 'kronos-28-itza-v0-4-0-bplus';
const ASSETS = [
  './',
  './index.html',
  './404.html',
  './live.html',
  './live3d.html',
  './offline.html',
  './manifest.webmanifest'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);

  // Solo intercepta peticiones del mismo origen
  if (url.origin !== location.origin) return;

  e.respondWith(
    fetch(req)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(req, clone));
        return res;
      })
      .catch(() => {
        return caches.match(req)
          .then(m => m || caches.match('./offline.html'));
      })
  );
});
