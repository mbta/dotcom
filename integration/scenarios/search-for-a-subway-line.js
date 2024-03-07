const { expect } = require("@playwright/test");
const Logger = require("node-json-logger");
const { performance } = require("node:perf_hooks");

const logger = new Logger();

exports.scenario = async ({ page, baseURL }) => {
  const start1 = performance.now();
  await page.goto(`${baseURL}/`);
  const end1 = performance.now();
  const duration1 = Math.floor(end1 - start1);

  // We should be able to use down arrow and enter to select the first result.
  // But, the enter key does not load the page. So, we have to click the first result.
  const start2 = performance.now();
  await page
    .locator("div.search-wrapper input#input")
    .pressSequentially("Green Line");
  const end2 = performance.now();
  const duration2 = Math.floor(end2 - start2);

  const start3 = performance.now();
  await page.waitForSelector("ul#algolia-list");
  await page.locator("ul#algolia-list li:first-child a").click();
  const end3 = performance.now();
  const duration3 = Math.floor(end3 - start3);

  const start4 = performance.now();
  await expect(page.locator("h1.schedule__route-name")).toHaveText(
    "Green Line",
  );
  await page.waitForSelector("li.m-schedule-diagram__stop");
  await expect
    .poll(async () => page.locator("li.m-schedule-diagram__stop").count())
    .toBeGreaterThan(1);
  const end4 = performance.now();
  const duration4 = Math.floor(end4 - start4);

  const start5 = performance.now();
  await page.locator("a.alerts-tab").click();
  await expect(
    page.getByRole("heading", { name: "Alerts", exact: true }),
  ).toBeVisible();
  const end5 = performance.now();
  const duration5 = Math.floor(end5 - start5);

  const duration = Math.floor(
    duration1 + duration2 + duration3 + duration4 + duration5,
  );

  logger.info({ durations: [duration1, duration2, duration3, duration4, duration5], duration });
};
