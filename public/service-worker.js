importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.setConfig({
    debug: true,
  });
  workbox.loadModule('workbox-strategies');
  workbox.routing.registerRoute(
    new RegExp('/.*'),
    new workbox.strategies.CacheFirst()
  );
  workbox.routing.registerRoute(
    new RegExp('h.*'),
    new workbox.strategies.StaleWhileRevalidate()
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
