const fs = require("fs");
const path = require("path");
const { test } = require("@playwright/test");
const { fileToMetricName } = require("../utils");
const Logger = require("node-json-logger");
const StatsD = require("hot-shots");

const prefix = "dotcom.monitor.";
const client = new StatsD({ prefix });
const logger = new Logger();

const filesPath = path.join(__dirname, "..", "scenarios");
const tests = fs.readdirSync(filesPath).map(file => {
  const filePath = path.join(filesPath, file);
  const { scenario } = require(filePath);
  const name = fileToMetricName(file);
  return [name, scenario];
});

/* 
 * For each test, use its test info to get the duration and test errors
 * Log the durations, and capture screenshots for failures
 */
async function LogMetricsAndScreenshots({ page }) {
  const { duration, errors, title, retry, project } = test.info();
  const metric = `${prefix}${title}`;

  client.gauge(title, duration);
  if (errors.length > 0) {
    const screenshot = await page.screenshot({ fullPage: true });
    await test.info().attach('screenshot', {
      body: screenshot,
      contentType: 'image/png',
    });

    /* 
     * only log the error/send screenshot to Sentry on final fail, 
     * not on every single retry
     */
    if (retry == project.retries) {
      if (process.env.SENTRY_DSN) {
        Sentry.getCurrentScope().addAttachment({
          filename: `${metric}-${Date.now()}.jpeg`,
          data: screenshot,
        });
      }
      
      errors.forEach((error) => {
        logger.error({ metric, error: error.message });
        if (process.env.SENTRY_DSN) {
          Sentry.captureException(error);
        }
      });

      if (process.env.SENTRY_DSN) {
        Sentry.getCurrentScope().clearAttachments();
      }
    }
  } else {
    logger.info({ metric, duration });
  }
}

const baseURL = process.env.HOST
  ? `https://${process.env.HOST}`
  : "http://localhost:4001";

test.use({ 
  baseURL,
  browserName: "chromium",
  headless: true,
  screenshot: "off",
  trace: "off",
  userAgent: "Playwright",
  video: "off"
});
test.describe.configure({ mode: "parallel", retries: 2, timeout: 20000 });
test.describe("All scenarios", { tag: "@scenarios" }, async () => {
  test.afterEach(LogMetricsAndScreenshots);
  tests.forEach(([name, scenario]) => {
    test(name, { tag: `@${name}` }, scenario);
  });
});

