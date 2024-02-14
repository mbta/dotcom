const https = require('https');

exports.check = function() {
  https.get('https://www.mbta.com/_health', res => {
    if (res.statusCode === 200) {
      return true;
    } else {
      return false;
    }
  });
}
