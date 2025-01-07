module.exports = {
  apps: [
    {
      name: "all-health-checks",
      script: "./integration/monitor/all-health-checks.js",
      instances: 1,
      max_memory_restart: "128M",
      exec_mode : "cluster"
    },
    {
      name: "all-scenarios",
      script: "./integration/monitor/all-scenarios.js",
      instances: 1,
      max_memory_restart: "512M",
      exec_mode : "cluster"
    },
  ],
};
