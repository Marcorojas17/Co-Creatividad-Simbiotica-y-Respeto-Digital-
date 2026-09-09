const CACHE='cymatic-v1-PLATINUM-289';
const CORE=['./','./index.html','./offline.html','./manifest.webmanifest','./design-system/glass.css','./core-dsp/frequency_engine.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request).catch(()=>caches.match('./offline.html')))));
