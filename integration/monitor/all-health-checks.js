const cron = require("node-cron");
const fs = require("fs");
const Logger = require("node-json-logger");
const path = require("path");
const StatsD = require("hot-shots");

const { fileToMetricName } = require("../utils");

const prefix = "dotcom.monitor.healthcheck.";

const client = new StatsD({ prefix });
const logger = new Logger();

const filesPath = path.join(__dirname, "..", "health_checks");
const files = fs.readdirSync(filesPath);

cron.schedule("* * * * *", (_) => {
  files.forEach(async (file, index) => {
    setTimeout(
      async (_) => {
        const filePath = path.join(filesPath, file);
        const { check } = require(filePath);

        const name = fileToMetricName(file);
        const value = (await check()) ? 1 : 0;

        client.gauge(name, value);
        logger.info({ metric: `${prefix}${name}`, value });
      },
      (60000 / files.length) * index,
    );
  });
});
