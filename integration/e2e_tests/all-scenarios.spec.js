const fs = require("fs");
const path = require("path");
const { performance } = require("node:perf_hooks");
const { test } = require("@playwright/test");

const { fileToMetricName } = require("../utils");

const filesPath = path.join(__dirname, "..", "scenarios");
const files = fs.readdirSync(filesPath);
const tests = files.map(file => {
  const filePath = path.join(filesPath, file);
  const { scenario } = require(filePath);
  const name = fileToMetricName(file);
  return [name, scenario];
});
const baseURL = process.env.HOST
  ? `https://${process.env.HOST}`
  : "http://localhost:4001";

test.describe("All scenarios", { tag: "@scenarios" }, () => {
  tests.forEach(([name, scenario]) => {
    test(name, { tag: `@${name}` }, async ({ page }) => {
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
