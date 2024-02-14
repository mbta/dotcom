const { createCluster } = require('redis');

const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

exports.check = async _ => {
  const cluster = createCluster({rootNodes: [{ url }]});

  let healthy = true;

  try {
    await cluster.connect();
    await cluster.quit();
  } catch (e) {
    healthy = false;
  }

  return healthy;
}
