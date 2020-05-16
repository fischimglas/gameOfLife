importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.precaching.precacheAndRoute([]);
//
// workbox.routing.registerRoute(
//     /\.js$/,
//     new workbox.strategies.NetworkFirst(),
//     new workbox.strategies.StaleWhileRevalidate({cacheName: 'js-cache'})
// );
// workbox.routing.registerRoute(
//     /\.html$/,
//     new workbox.strategies.NetworkFirst()
// );
// workbox.routing.registerRoute(
//     /\.css$/,
//     new workbox.strategies.StaleWhileRevalidate({cacheName: 'css-cache'})
// );
// workbox.routing.registerRoute(
//     /\.(?:png|jpg|jpeg|svg|gif)$/,
//     new workbox.strategies.CacheFirst({cacheName: 'image-cache'})
// );

const precacheController = new workbox.precaching.PrecacheController();
self.addEventListener('install', (event) => {
  event.waitUntil(precacheController.install());
});
self.addEventListener('activate', (event) => {
  event.waitUntil(precacheController.activate());
});
