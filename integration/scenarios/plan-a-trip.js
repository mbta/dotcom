const { expect } = require("@playwright/test");
const { syncLiveView } = require("../utils");

exports.scenario = async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/trip-planner`);
  await syncLiveView(page, expect);

  await expect(
    page.getByRole("heading", { name: "Trip Planner" }),
  ).toBeVisible();

  await page.locator("#trip-planner-input-form--from input[type='search']").pressSequentially("North Station");
  await page.waitForSelector(
    "ul.aa-List",
  );
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  // The A location pin.
  const fromPin = page.locator("svg.mbta-metro-map-pin").filter({ hasText: "A" });
  await fromPin.waitFor("visible");

  await page.locator("#trip-planner-input-form--to input[type='search']").pressSequentially("South Station");
  await page.waitForSelector(
    "ul.aa-List",
  );
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  // The B location pin.
  const toPin = page.locator("svg.mbta-metro-map-pin").filter({ hasText: "B" });
  await toPin.waitFor("visible");

  await expect
    .poll(async () =>
      page.locator("section#trip-planner-results").count(),
    )
    .toBeGreaterThan(0);
};
