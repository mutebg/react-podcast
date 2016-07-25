
(global => {
  'use strict';

  // Load the sw-tookbox library.
  importScripts('sw-toolbox.js'); // Update path to match your own setup

  //global.toolbox.options.cache.name = 'sw-cache-<%= hash %>';

  global.toolbox.precache(['/', '/search', <%= precache %>]);//its variable populated by node script


  // Turn on debug logging, visible in the Developer Tools' console.
  global.toolbox.options.debug = true;

  // By default, all requests that don't match our custom handler will use the
  // toolbox.networkFirst cache strategy, and their responses will be stored in
  // the default cache.
  global.toolbox.router.default = global.toolbox.networkFirst;

  global.toolbox.router.get(/\.podcastcms\.de\//, global.toolbox.networkOnly);
  //global.toolbox.router.get('', global.toolbox.networkOnly);


  // Boilerplate to ensure our service worker takes control of the page as soon
  // as possible.
  global.addEventListener('install',
      event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate',
      event => event.waitUntil(global.clients.claim()));

  global.addEventListener('push', function(event) {
    console.log('Received a push message', event);

    var title = 'Yay a message.';
    var body = 'We have received a push message.';
    //var icon = '/images/icon-192x192.png';
    //var tag = 'simple-push-demo-notification-tag';

    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        //icon: icon,
        //tag: tag
      })
    );
  });
})(self);
