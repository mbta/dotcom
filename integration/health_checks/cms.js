const { status200 } = require("../utils");

const options = {
  baseURL: process.env.CMS_API_BASE_URL,
  url: "/pantheon_healthcheck",
};

exports.check = async (_) => {
  return status200(options);
};
