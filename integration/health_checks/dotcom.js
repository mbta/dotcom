const { status200 } = require("../utils");

const options = {
  baseURL: process.env.HOST ? `https://${process.env.HOST}` : 'http://localhost:4001',
  url: "/_health",
};

exports.check = async (_) => {
  return status200(options);
};
