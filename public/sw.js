var cacheName = 'test';

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  caches.keys().then(keys => {
    keys.forEach(key => {
      if(key === cacheName) return;
      else caches.delete(key);
    })
  });
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    self.clients.claim()
  )
})

self.addEventListener('fetch', async function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
  });


  self.addEventListener('push', function(event) {
    if (event.data) {
      const {
        title,
        body,
        actions,
        badge,
        dir,
        icon,
        image,
        lang,
        renotify,
        tag,
        vibrate,
        data
      } = event.data.json();
      self.registration.showNotification(title, {
        body,
        actions,
        badge,
        dir,
        icon,
        image,
        lang,
        renotify,
        tag,
        vibrate,
        data
      })
    } else {
      console.log('This push event has no data.');
    }
  });
