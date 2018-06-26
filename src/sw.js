if (workbox) {
  workbox.routing.registerNavigationRoute('/index.html');

  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

  const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueueName', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
  });

  workbox.routing.registerRoute(
    /\/reviews\/.*\/*/,
    workbox.strategies.networkOnly({
      plugins: [bgSyncPlugin],
    }),
    'POST'
  );

  workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.networkFirst()
  );

  workbox.routing.registerRoute(
    // Cache CSS files
    /.*\.css/,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
      // Use a custom cache name
      cacheName: 'css-cache',
    })
  );

  workbox.routing.registerRoute(
    // Cache image files
    /.*\.woff2/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'fonts-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images
          maxEntries: 20,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    // Cache image files
    /.[^@]+[\.(?:png|jpg|jpeg|svg|gif|webp)]/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images
          maxEntries: 20,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    })
  );
} else
  console.log('Boo! Workbox didn\'t load 😬');

