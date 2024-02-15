const { createCluster } = require("redis");

const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

exports.check = async (_) => {
  const cluster = createCluster({ rootNodes: [{ url }] });

  let healthy = false;

  try {
    await cluster.connect();
    await cluster.quit();
    healthy = true;
  } catch (e) {
    healthy = false;
  }

  return healthy;
};
