const { status200 } = require("../utils");

const options = {
  baseURL: process.env.V3_URL,
  url: "/_health",
};

exports.check = async (_) => {
  return status200(options);
};
