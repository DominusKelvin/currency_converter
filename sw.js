const CACHE_NAME = 'currency-converter-v1'
const urlsToCache = [
    '/',
    '/css/index.css',
    '/js/index.js'
]
self.addEventListener('install', function(event){
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache')
                return cache.addAll(urlsToCache)
        })
    )
})