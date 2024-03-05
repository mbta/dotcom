const { status200 } = require("../utils");

const options = {
  baseURL: process.env.V3_URL,
  url: "/status",
};

exports.check = async (_) => {
  return status200(options);
};
