/* Triptych service worker — offline-first cache */
const VERSION = "triptych-v6-2026-05-23-k";
const CORE = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.jsx",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
];
const CDN = [
  "https://unpkg.com/react@18/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) =>
      cache.addAll([...CORE, ...CDN]).catch(() => {
        // Pre-cache CDN best-effort — don't block install if a CDN request fails
        return cache.addAll(CORE);
      })
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Network-first for the dictionary API (don't poison cache with offline misses)
  if (url.hostname === "api.dictionaryapi.dev") {
    event.respondWith(fetch(req).catch(() => new Response("[]", { status: 503 })));
    return;
  }

  // Cache-first for app shell + CDN
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((resp) => {
          // Cache successful same-origin and known-CDN responses
          if (resp && resp.status === 200 && (url.origin === self.location.origin ||
              CDN.some((c) => req.url.startsWith(new URL(c).origin)))) {
            const copy = resp.clone();
            caches.open(VERSION).then((cache) => cache.put(req, copy));
          }
          return resp;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
