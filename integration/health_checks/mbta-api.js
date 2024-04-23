const { status200 } = require("../utils");

const options = {
  baseURL: process.env.MBTA_API_BASE_URL,
  url: "/status",
};

exports.check = async (_) => {
  return status200(options);
};
