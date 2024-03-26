const { expect } = require("@playwright/test");

exports.scenario = async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/`);

  // We should be able to use down arrow and enter to select the first result.
  // But, the enter key does not load the page. So, we have to click the first result.
  await page
    .locator("div.search-wrapper input#search-input")
    .pressSequentially("Blue Line");
  await page.waitForSelector("ul#search-algolia-list");
  await page.locator("ul#search-algolia-list li:first-child a").click();

  await expect(page.locator("h1.schedule__route-name")).toHaveText(
    "Blue Line",
  );
  await page.waitForSelector("li.m-schedule-diagram__stop");
  await page.waitForSelector("div.m-schedule-diagram__predictions");
  await expect
    .poll(async () => page.locator("div.m-schedule-diagram__prediction-time").count())
    .toBeGreaterThan(1);

  await page.locator("a.alerts-tab").click();
  await expect(
    page.getByRole("heading", { name: "Alerts", exact: true }),
  ).toBeVisible();
};
