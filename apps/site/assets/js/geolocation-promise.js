export default function() {
  return new Promise(function(resolve, reject) {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject("window.navigator.geolocation not enabled");
    }
  });
}
