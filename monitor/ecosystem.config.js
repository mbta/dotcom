module.exports = {
  apps : [{
    name: "all-health-checks",
    script: "./monitor/all-health-checks.js",
    instances: 1
  }, {
    name: "all-scenarios",
    script: "./monitor/all-scenarios.js",
    instances: 1
  }]
}
