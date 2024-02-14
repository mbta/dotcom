const axios = require('axios');

const options = {
  baseURL: process.env.V3_API_URL,
  headers: {
    'User-Agent': 'Node',
  },
  method: 'get',
  timeout: 1000,
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
