const fs = require('fs');
const path = require('path');
const { performance } = require('node:perf_hooks');

const { test, expect } = require('@playwright/test');

const filesPath = path.join(__dirname, '..', 'scenarios');
const files = fs.readdirSync(filesPath);

const baseURL = process.env.TARGET_URL;

files.forEach((file) => {
    test.describe('All scenarios', _ => {
        const filePath = path.join(filesPath, file);
        const { scenario } = require(filePath);

        test(scenario.name, async ({ page }) => {
            const start = performance.now();

            await scenario.run({ page, baseURL });

            const end = performance.now();
            const duration = Math.floor(end - start);

            test.info().annotations.push({ type: 'Performance', description: `duration: ${duration}ms, threshold: ${scenario.threshold}ms` });
        });
    });
});
