const { expect } = require("@playwright/test");

exports.scenario = async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/transit-near-me`);

  await page
    .getByPlaceholder('Enter a location')
    .pressSequentially('Boston City Hall');

  await page.locator("#search-locations-list[role='listbox']")
    .getByRole("option")
    .first()
    .click();

  await page.waitForSelector("div.m-tnm-sidebar__route");
  await expect
    .poll(async () => page.locator("div.m-tnm-sidebar__route").count())
    .toBeGreaterThan(0);
  await expect
    .poll(async () => page.locator("img.leaflet-marker-icon").count())
    .toBeGreaterThan(0);
};
