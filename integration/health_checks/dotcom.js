const { status200 } = require("../utils");

const options = {
  baseURL: `https://${process.env.HOST}`,
  url: "/_health",
};

exports.check = async (_) => {
  return status200(options);
};
