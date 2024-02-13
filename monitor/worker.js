const { chromium } = require('playwright');
const Logger = require('node-json-logger');
const { parentPort, workerData } = require('worker_threads');
const { performance } = require('node:perf_hooks');
const StatsD = require('hot-shots');

const prefix = 'dotcom.monitor.';

const client = new StatsD({ prefix });
const logger = new Logger();

parentPort.on('message', async _ => {
    const { scenario } = require(workerData.path);

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const start = performance.now();

    await scenario({ page, baseURL: process.env.TARGET_URL });

    const end = performance.now();
    const duration = Math.floor(end - start);

    client.gauge(workerData.name, duration);
    logger.info({metric: workerData.name, duration});

    await browser.close();
});
