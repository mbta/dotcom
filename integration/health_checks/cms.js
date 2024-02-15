const { status200 } = require("../utils");

const options = {
  baseURL: process.env.DRUPAL_ROOT,
  url: "/pantheon_healthcheck",
};

exports.check = async (_) => {
  return status200(options);
};
