/*
 * Minimal service worker.
 *
 * Purpose is installability (browsers require a registered SW with a fetch
 * handler before offering "Add to home screen") plus a graceful offline page
 * for navigations. It deliberately does NOT cache API responses — health
 * answers must always be fresh — and does not pre-cache the app shell, which
 * would risk serving stale hashed assets after a deploy.
 */
const CACHE = 'sehatkosh-v1'
const OFFLINE_FALLBACK = '/'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(OFFLINE_FALLBACK)).catch(() => undefined)
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  // Only handle top-level navigations; everything else goes straight to the
  // network so API calls and hashed assets behave exactly as before.
  if (request.method !== 'GET' || request.mode !== 'navigate') return

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone()
        caches.open(CACHE).then((cache) => cache.put(OFFLINE_FALLBACK, copy)).catch(() => undefined)
        return response
      })
      .catch(() => caches.match(OFFLINE_FALLBACK).then((cached) => cached ?? Response.error()))
  )
})
