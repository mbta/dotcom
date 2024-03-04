const fs = require("fs");
const path = require("path");
const { performance } = require("node:perf_hooks");
const { test } = require("@playwright/test");

const { fileToMetricName } = require("../utils");

const filesPath = path.join(__dirname, "..", "scenarios");
const files = fs.readdirSync(filesPath);

const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL || (process.env.HOST
  ? `https://${process.env.HOST}`
  : "http://localhost:4001");

files.forEach((file) => {
  test.describe("All scenarios", (_) => {
    const filePath = path.join(filesPath, file);
    const { scenario } = require(filePath);

    const name = fileToMetricName(file);

    test(name, async ({ page }) => {
      const start = performance.now();

      await scenario({ page, baseURL });

      const end = performance.now();
      const duration = Math.floor(end - start);

      test.info().annotations.push({
        type: "performance",
        description: `duration: ${duration}ms`,
      });
    });
  });
});
