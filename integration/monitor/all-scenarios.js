const cron = require("node-cron");
const { exec } = require("child_process");
const Sentry = require("@sentry/node");
const RateLimiter = require("./rate-limiter");

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
 * A task runs every minute between the hours of 5am and midnight EST.
 */
cron.schedule("* 5-23 * * *", (_) => {
  exec("npx playwright test all-scenarios", (_error, _stdout, _stderr) => {});
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
