const { expect } = require("@playwright/test");

exports.scenario = async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/transit-near-me`);

  await page
    .getByPlaceholder('Enter a location')
    .pressSequentially('Boston City Hall');

  await page.waitForTimeout(1000);
  await page.waitForSelector(".c-search-bar__autocomplete-results .aa-List");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(10000);
  await expect
    .poll(async () => page.locator("div.m-tnm-sidebar__route").count())
    .toBeGreaterThan(0);
  await expect
    .poll(async () => page.locator("img.leaflet-marker-icon").count())
    .toBeGreaterThan(0);
};
