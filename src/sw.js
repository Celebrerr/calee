const filesToCache = ['/', 'main.css', 'main.js', 'index.html', '404.html'];
const staticCacheName = 'cache-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
            .then(async (response) => {
                const cache = await caches.open(staticCacheName);
                cache.put(event.request.url, response.clone());

                return response;
            })
            .catch(async (error) => {
                const cache = await caches.open(staticCacheName);
                const cachedResponse = await cache.match('404.html');

                return cachedResponse;
            })
    );
});
