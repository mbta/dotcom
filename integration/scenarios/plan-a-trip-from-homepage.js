const { expect } = require("@playwright/test");

exports.scenario = async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/`);

  await page
    .locator(".m-tabbed-nav__icon-text", { hasText: "Trip Planner" })
    .click();

  await page.locator("input#from").pressSequentially("South Station");
  await page.waitForSelector(
    "div#from-autocomplete-results span.c-search-bar__-dropdown-menu",
  );
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await page.locator("input#to").pressSequentially("North Station");
  await page.waitForSelector(
    "div#to-autocomplete-results span.c-search-bar__-dropdown-menu",
  );
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await page.locator("button#trip-plan__submit").click();

  await expect(
    page.getByRole("heading", { name: "Trip Planner" }),
  ).toBeVisible();

  await expect
    .poll(async () =>
      page.locator("section#trip-planner-results").count(),
    )
    .toBeGreaterThan(0);
};
