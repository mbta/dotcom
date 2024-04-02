const { chromium } = require("playwright");
const Logger = require("node-json-logger");
const { parentPort, workerData } = require("worker_threads");
const { performance } = require("node:perf_hooks");
const StatsD = require("hot-shots");

const prefix = "dotcom.monitor.";

const client = new StatsD({ prefix });
const logger = new Logger();

const baseURL = process.env.HOST
  ? `https://${process.env.HOST}`
  : "http://localhost:4001";

parentPort.on("message", async (_) => {
  const { scenario } = require(workerData.path);

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const metric = `${prefix}${workerData.name}`;

  const start = performance.now();

  try {
    await scenario({ page, baseURL });
  } catch(exception) {
    const screenshot = await page.screenshot({quality: 50, type: "jpeg"});

    parentPort.postMessage({exception, metric, screenshot});
    logger.error({ metric, error: exception.message });
  }

  const end = performance.now();
  const duration = Math.floor(end - start);

  client.gauge(workerData.name, duration);
  logger.info({ metric, duration });

  await page.close();
  await context.close();
  await browser.close();
});
