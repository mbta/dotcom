const { chromium } = require('playwright');
const { parentPort } = require('worker_threads');
const { performance } = require('node:perf_hooks');
const StatsD = require('hot-shots');

const client = new StatsD({
    prefix: 'dotcom.monitor.',
});

parentPort.once('message', (file) => {
    (async () => {
        const { scenario } = require(file);

        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
    
        const start = performance.now();
    
        await scenario.run({ page, baseURL: process.env.TARGET_URL });
    
        const end = performance.now();
        const duration = end - start;
    
        const metric = scenario.name.toLowerCase().replace(/ /g, '.');

        client.gauge(metric, Math.floor(duration));

        parentPort.postMessage(`Scenario: "${scenario.name}" took ${Math.floor(duration)}ms`);
    
        await browser.close();
    })();
});
