const { expect, test } = require("@playwright/test");

const baseURL = process.env.HOST
  ? `https://${process.env.HOST}`
  : "http://localhost:4001";

test.use({ baseURL, headless: true, screenshot: { mode: "only-on-failure" }, video: "off" });

/**
 * One-off test suite to verify the mobile app banner is configured to show where it's supposed to.
 * 
 * Defaults to running against localhost, but can run against any site using
 * the HOST environment variable, e.g.
 * 
 * HOST=dev.mbtace.com npx playwright test mobile-app-banner
 */

[
  ["subway", "Blue", ["/line", "/alerts"]],
  ["bus", "111", ["/line", "/alerts"]],
  ["commuter rail", "CR-Fitchburg", ["/timetable", "/line", "/alerts"]],
].forEach(modeTest => {
  const [modeName, routeId, tabs] = modeTest;
  test.describe(`${modeName} schedule`, () => {
    tabs.forEach(tabPath => {
      test(tabPath, async ({ page, isMobile }) => {
        await page.goto(`/schedules/${routeId}${tabPath}`);
        await checkBannerVisibility(page, isMobile);
        if (tabPath == "/line") {
          const scheduleFinderLinkName = modeName == "subway" ? "View upcoming departures" : "View schedule";
          await page.getByRole("button", { name: scheduleFinderLinkName }).first().click();
          const modal = await page.getByRole("dialog");
          await checkBannerVisibility(modal, isMobile);
        }
      });
    });
  });
});

test("does not show on schedule page (ferry)", async ({ page }) => {
  await page.goto("/schedules/Boat-F1");
  await bannerIsNotVisible(page);
});
test("shows in Transit Near Me", async ({ page, isMobile }) => {
  await page.goto("/transit-near-me");
  await checkBannerVisibility(page, isMobile);
});
test("shows on stop pages", async ({ page, isMobile }) => {
  await page.goto("/stops/1");
  await checkBannerVisibility(page, isMobile);
});

async function bannerIsVisible(locator) {
  const banner = locator.locator("#mobile-app-banner");
  await expect(banner).toBeVisible();
}

async function bannerIsNotVisible(locator) {
  const banner = locator.locator("#mobile-app-banner");
  await expect(banner).toBeHidden();
}

async function checkBannerVisibility(locator, isMobile) {
  if (isMobile) {
    await bannerIsVisible(locator);
  } else {
    await bannerIsNotVisible(locator);
  }
}