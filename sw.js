const CACHE = 'ortopedia-dental-v04';
const ASSETS = ['./','./index.html','./styles.css','./questions.js','./questions-extra-deck1.js','./questions-extra-deck2.js','./questions-extra-deck3.js','./cases.js','./cases-deck1.js','./cases-deck2.js','./cases-deck3.js','./cases-deck4.js','./cases-deck5.js','./cases-extra-deck1.js','./cases-extra-deck2.js','./cases-extra-deck3.js','./cases-extra-deck4.js','./cases-extra-deck5.js','./app.js','./manifest.webmanifest'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener('fetch', event => event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request))));
