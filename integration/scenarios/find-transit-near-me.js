const { expect } = require("@playwright/test");

exports.scenario = async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/transit-near-me`);

  await page
    .locator("input#search-transit-near-me__input")
    .pressSequentially("Boston City Hall");
  await page.waitForSelector("div.c-search-bar__-dataset-locations");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await page.waitForSelector("div.m-tnm-sidebar__route");
  await expect
    .poll(async () => page.locator("div.m-tnm-sidebar__route").count())
    .toBeGreaterThan(0);
};
