const cron = require("node-cron");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const Sentry = require("@sentry/node");
const { Worker } = require("worker_threads");

const { fileToMetricName } = require("../utils");
const RateLimiter = require("./rate-limiter");

const filesPath = path.join(__dirname, "..", "scenarios");

/*
 * Create a rate limiter that allows only one lease per hour.
 */
const rateLimiter = new RateLimiter(60 * 60 * 1000, 1);

/*
 * Initialize Sentry with the DSN and environment from the environment variables.
 * Add a beforeSend callback that will only send events if the rate limiter allows it.
 */
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT,
  beforeSend(event) {
    if (process.env.SENTRY_ENVIRONMENT == "prod") {
      return rateLimiter.lease() ? event : null;
    }

    return null;
  }
});

/*
 * Create a worker for each scenario file in the scenarios directory.
 */
const workers = fs.readdirSync(filesPath).map((file) => {
  const name = fileToMetricName(file);
  const worker = new Worker(path.join(__dirname, "worker.js"), {
    workerData: { name, path: path.join(filesPath, file) },
  });

  worker.on("message", ({ exception, metric, screenshot }) => {
    Sentry.getCurrentScope().addAttachment({
      filename: `${metric}-${Date.now()}.jpeg`,
      data: screenshot,
    });

    Sentry.captureException(exception);

    Sentry.getCurrentScope().clearAttachments();
  });

  return worker;
});

/*
 * A task runs every 5 minutes between the hours of 5am and midnight EST.
 * Spread out the worker runs over the minute to avoid overwhelming the
 * system. If we receive a message from a worker, it means that there was a
 * failure. Capture the exception with Sentry and attach a screenshot to the
 * event.
 */
cron.schedule("*/5 5-23 * * *", (_) => {
  workers.forEach((worker, index) => {
    setTimeout(
      (_) => {
        worker.postMessage(null);
      },
      (60 * 1000 / workers.length) * index,
    );
  });
}, {
  scheduled: true,
  timezone: "America/New_York"
});

/*
 * Restart all the scenarios every day at midnight.
 */
cron.schedule("0 0 * * *", (_) => {
  exec("pm2 restart all-scenarios", (_error, _stdout, _stderr) => {});
});
