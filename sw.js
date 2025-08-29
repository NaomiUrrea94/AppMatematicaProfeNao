// Define un nombre para el caché de la aplicación.
const CACHE_NAME = 'desafio-matematico-cache-v1';

// Lista de archivos que se guardarán en el caché para que la app funcione sin conexión.
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.min.js',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js'
];

// Evento 'install': Se dispara cuando el Service Worker se instala.
// Aquí abrimos el caché y guardamos todos nuestros archivos.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': Se dispara cada vez que la página pide un recurso (un archivo, una imagen, etc.).
// Primero, intentamos buscar el recurso en la red.
// Si falla (porque no hay conexión), lo buscamos en el caché.
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
