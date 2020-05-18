var dependencies = [
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js",
    'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css',
    "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.bundle.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css",
    "https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js",
    "https://www.gstatic.com/firebasejs/7.14.2/firebase-auth.js",
    "https://www.gstatic.com/firebasejs/7.14.2/firebase-analytics.js",
]

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('airhorner').then(function (cache) {
            return cache.addAll([
                '/',
                '/auth',
                '/creator',
                '/main',
                '/demo',
                '/caretaker',
                '/404.html'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});