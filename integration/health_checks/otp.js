const { status200 } = require("../utils");

const options = {
  baseURL: process.env.OPEN_TRIP_PLANNER_URL,
  url: "/health",
};

exports.check = async (_) => {
  return status200(options);
};
