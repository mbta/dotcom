const { expect } = require("@playwright/test");

exports.scenario = async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/schedules`);

  await page
    .locator("span.c-grid-button__name")
    .getByText("Orange Line")
    .click();

  await expect(page.locator("h1.schedule__route-name")).toHaveText(
    "Orange Line",
  );

  await page.waitForSelector("h4.m-schedule-diagram__stop-link a span");
  await expect
    .poll(async () =>
      page.locator("h4.m-schedule-diagram__stop-link a span").count(),
    )
    .toBeGreaterThan(1);

  // Get the first and last stop names
  const first = await page
    .locator("h4.m-schedule-diagram__stop-link a span:last-child")
    .first()
    .textContent();
  const last = await page
    .locator("h4.m-schedule-diagram__stop-link a span:last-child")
    .last()
    .textContent();

  await page.locator("button.m-schedule-direction__button").click();

  // Expect them to be reversed after clicking the direction filter
  await expect(
    page.locator("h4.m-schedule-diagram__stop-link a span:last-child").first(),
  ).toHaveText(last);
  await expect(
    page.locator("h4.m-schedule-diagram__stop-link a span:last-child").last(),
  ).toHaveText(first);
};
