const axios = require("axios");
const Logger = require('node-json-logger');

const axiosOptions = {
  headers: {
    "User-Agent": "Node",
  },
  method: "get",
  timeout: 1000,
};
const logger = new Logger();

const status200 = async (options) => {
  let healthy = false;

  try {
    const res = await axios.request(Object.assign(axiosOptions, options));

    if (res.status === 200) {
      healthy = true;
    }
  } catch (e) {
    logger.error({ baseURL: options.baseURL, error: e.message });

    healthy = false;
  }

  return healthy;
};

const fileToMetricName = (file) =>
  file.replace(/-/g, "_").replace(".js", "").toLowerCase();

module.exports = {
  fileToMetricName,
  status200,
};
