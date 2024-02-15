const axios = require("axios");

const axiosOptions = {
  headers: {
    "User-Agent": "Node",
  },
  method: "get",
  timeout: 1000,
};

const status200 = async (options) => {
  let healthy = false;

  try {
    const res = await axios.request(Object.assign(axiosOptions, options));

    if (res.status === 200) {
      healthy = true;
    }
  } catch (e) {
    healthy = false;
  }

  return healthy;
};

const fileToMetricName = (file) =>
  file.replace(/-/g, ".").replace(".js", "").toLowerCase();

module.exports = {
  fileToMetricName,
  status200,
};
