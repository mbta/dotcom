const { expect } = require("@playwright/test");

exports.scenario = async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/search`);

  await page
    .getByPlaceholder("Search for routes, places, information, and more")
    .pressSequentially("Orange Line");
  const results = page.locator("div#search-page-results");
  await expect(results).toBeVisible();
  await page
    .locator("section ul li a")
    .filter({ hasText: "Orange Line" })
    .first()
    .click();

  await expect(page.locator("h1.schedule__route-name")).toHaveText(
    "Orange Line",
  );
  await page.waitForSelector("li.m-schedule-diagram__stop");

  await page.locator("a.alerts-tab").click();
  await expect(
    page.getByRole("heading", { name: "Alerts", exact: true }),
  ).toBeVisible();
};
