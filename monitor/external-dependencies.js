const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const StatsD = require('hot-shots');

const client = new StatsD({
    prefix: 'dotcom.monitor.healthcheck',
});
const logger = new Logger();

const filesPath = path.join(__dirname, '..', 'health_checks');
const files = fs.readdirSync(filesPath);

cron.schedule('* * * * *', _ => {
  files.forEach((file) => {
    const filePath = path.join(filesPath, file);
    const { check } = require(filePath);

    const value = check() ? 1 : 0;

    const metric = file.toLowerCase().replace('-', '.').replace('.js', '');

    client.gauge(metric, value);
    logger.info({metric, value});
  });
});
