const { expect } = require("@playwright/test");

exports.scenario = async ({ page, baseURL }) => {
  // This test only works in mobile (when it displays the form in a detached overlay), for obscure Algolia autocomplete JavaScript library reasons
  await page.setViewportSize({
    "width": 375,
    "height": 667
  });
  await page.goto(`${baseURL}/`);
  await page
    .locator(".m-tabbed-nav__icon-text", { hasText: "Trip Planner" })
    .click();

  await page.locator("#trip-planner-input-form--from").click()
  await page.locator(".aa-DetachedOverlay input[type='search']").pressSequentially("North Station");
  await page.locator(".aa-DetachedOverlay .aa-Item").first().click();

  await page.locator("#trip-planner-input-form--to").click()
  await page.locator(".aa-DetachedOverlay input[type='search']").pressSequentially("South Station");
  await page.locator(".aa-DetachedOverlay .aa-Item").first().click();

  await page.locator("button#trip-plan__submit").click();
  await page.waitForURL("/trip-planner?plan=*");

  await expect
    .poll(async () =>
      page.locator("section#trip-planner-results").count()
    )
    .toBeGreaterThan(0);
};
