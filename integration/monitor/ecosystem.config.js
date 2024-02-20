module.exports = {
  apps: [
    {
      name: "all-health-checks",
      script: "./integration/monitor/all-health-checks.js",
      instances: 1,
    },
    {
      name: "all-scenarios",
      script: "./integration/monitor/all-scenarios.js",
      instances: 1,
    },
  ],
};
