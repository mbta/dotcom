const { expect } = require("@playwright/test");

exports.scenario = async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/stops/subway`);
  await page
    .locator("div.search-wrapper .aa-Input")
    .pressSequentially("Alewife");
  await page.waitForTimeout(1000);
  await page.waitForSelector(".c-search-bar__autocomplete-results .aa-List");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Alewife", exact: true }),
  ).toBeVisible();
  await expect(page.locator("div.map--loaded")).toBeVisible();
  await page.waitForSelector("ul.stop-departures");
  await expect
    .poll(async () => page.locator("li.departure-card").count())
    .toBeGreaterThan(0);
};
