const { expect } = require("@playwright/test");

exports.scenario = async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/`);
  await page
    .locator("div.search-wrapper .aa-Input")
    .pressSequentially("leadership");
  await page.waitForTimeout(1000);
  await page.waitForSelector(".c-search-bar__autocomplete-results .aa-List");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Leadership at The MBTA", exact: true })).toBeVisible();
};
