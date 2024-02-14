const axios = require('axios');

const options = {
  baseURL: process.env.OPEN_TRIP_PLANNER_2_URL,
  headers: {
    'User-Agent': 'Node',
  },
  method: 'get',
  timeout: 1000,
  url: '/health',
}

exports.check = async _ => {
  try {
    const res = await axios.request(options);
    return res.status === 200;
  } catch (e) {
    return false;
  }
}
