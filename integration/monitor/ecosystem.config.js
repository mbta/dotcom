module.exports = {
  apps: [
    {
      name: "all-health-checks",
      script: "./integration/monitor/all-health-checks.js",
      instances: 1,
      max_memory_restart: "256M",
      exec_mode : "cluster"
    },
    {
      name: "all-scenarios",
      script: "./integration/monitor/all-scenarios.js",
      instances: 1,
      max_memory_restart: "1024M",
      exec_mode : "cluster"
    },
  ],
};
