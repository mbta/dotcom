let callbacks = [];

export default function() {
  callbacks = [];
  window.mapsCallback = function() {
    window.isMapReady = true;
    callbacks.forEach(callback => callback());
    callbacks = [];
  };
}

export function doWhenGoogleMapsIsReady(callback) {
  // If the map is not ready, add it to an array of callback that will get called soon.
  // If the map is ready, call the callback, but with a timeout.
  // The reason for the timeout is so that this function works similar in both cases -- always with a delay, never
  // immediately.
  window.isMapReady ? window.setTimeout(callback, 0) : callbacks.push(callback);
}
