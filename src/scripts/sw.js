import "regenerator-runtime";
import CacheHelper from "./utils/cache-helper";

const assetsToCache = [
  "./",
  "./icons/icon72x72.png",
  "./icons/icon96x96.png",
  "./icons/icon128x128.png",
  "./icons/icon144x144.png",
  "./icons/icon152x152.png",
  "./icons/icon192x192.png",
  "./icons/icon384x384.png",
  "./icons/icon512x512.png",
  "./index.html",
  "./icon.png",
  "./app.bundle.js",
  "./app.webmanifest",
  "./sw.bundle.js",
];

self.addEventListener("install", (event) => {
  console.log("Installing Service Worker...");

  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener("activate", (event) => {
  console.log("Activating Service Worker...");

  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener("fetch", (event) => {
  console.log(event.request);

  event.respondWith(CacheHelper.revalidateCache(event.request));
});
