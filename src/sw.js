if (workbox) {
  workbox.skipWaiting();
  workbox.clientsClaim();

  workbox.core.setCacheNameDetails({
    prefix: 'hinteat',
    suffix: 'v2',
  });

  workbox.routing.registerNavigationRoute('/index.html');

  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

  const bgSyncReview = new workbox.backgroundSync.Plugin('hinteat-sync-review-v1', {
    maxRetentionTime: 24 * 60,
  });

  workbox.routing.registerRoute(
    /.*\/reviews\/.*\/*/,
    workbox.strategies.networkOnly({
      plugins: [bgSyncReview],
    }),
    'POST'
  );

  workbox.routing.registerRoute(
    new RegExp('(?=^.*.js)(?!^.*maps\.googleapis).*'),
    workbox.strategies.networkFirst()
  );

  workbox.routing.registerRoute(
    // Cache CSS files
    /.*\.css/,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
      // Use a custom cache name
      cacheName: 'hinteat-css-v1',
    })
  );

  workbox.routing.registerRoute(
    // Cache image files
    /.*\.woff2/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'hinteat-fonts-v1',
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
    /.*\.(?:png|jpg|jpeg|svg|gif|webp)/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'hinteat-images-v1',
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

