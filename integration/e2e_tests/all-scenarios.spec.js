import { readdirSync } from "fs";
import { join } from "path";
import { performance } from "node:perf_hooks";
import { test } from "@playwright/test";
import { fileToMetricName } from "../utils";

const filesPath = join(import.meta.dirname, "..", "scenarios");
const files = readdirSync(filesPath);
const tests = await Promise.all(files.map(async file => {
  const filePath = join(filesPath, file);
  const fileContent = await import(filePath);
  const name = fileToMetricName(file);
  return [name, fileContent.scenario];
}));
const baseURL = process.env.HOST
  ? `https://${process.env.HOST}`
  : "http://localhost:4001";

test.describe("All scenarios", { tag: "@scenarios" }, () => {
  for (const [name, scenario] of tests) {
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
  };
});
