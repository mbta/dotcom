const axios = require('axios');

const options = {
  baseURL: 'https://www.mbta.com',
  headers: {
    'User-Agent': 'Node',
  },
  method: 'get',
  url: '/_health',
}

exports.check = async _ => {
  try {
    const res = await axios.request(options);
    return res.status === 200;
  } catch (e) {
    return false;
  }
}
