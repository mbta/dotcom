const axios = require('axios');

const options = {
  baseURL: process.env.DRUPAL_ROOT,
  headers: {
    'User-Agent': 'Node',
  },
  method: 'get',
  timeout: 1000,
  url: '/pantheon_healthcheck',
}

exports.check = async _ => {
  try {
    const res = await axios.request(options);
    return res.status === 200;
  } catch (e) {
    return false;
  }
}
