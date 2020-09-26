const cacheName = 'cache-v1';
const resourcesToPrecache = [
    '/offline_pwa/',
    '/offline_pwa/index.html',
    '/offline_pwa/assets/css/style.css',
    '/offline_pwa/assets/img/img.jpg'
];

self.addEventListener('install', event =>{
    console.log('Install Event');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(resourcesToPrecache);
        })
    );    
});

self.addEventListener('activate', event =>{
    console.log('Activate Event');    
});

self.addEventListener('fetch', event =>{
    //console.log('Fetch intercepted for:', event.request.url);    
    event.respondWith(caches.match(event.request)
        .then(cachedResponse=>{
            return cachedResponse || fetch(event.request);
        })
    );
});