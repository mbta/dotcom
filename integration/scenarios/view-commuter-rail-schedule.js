const { expect } = require("@playwright/test");

exports.scenario = async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/schedules/commuter-rail`);

  await page.getByRole('link', { name: 'Framingham/​Worcester Line' }).click();

  await expect(
    page.getByRole("heading", { name: "FRAMINGHAM/​WORCESTER" }),
  ).toBeVisible();
  await expect
    .poll(async () => page.locator("a.m-timetable__stop-link").count())
    .toBeGreaterThan(1);

  // Get the first and last stop names
  const first = await page
    .locator("a.m-timetable__stop-link")
    .first()
    .textContent();
  const last = await page
    .locator("a.m-timetable__stop-link")
    .last()
    .textContent();

  await page.locator("a#direction-filter").click();

  // Expect them to be reversed after clicking the direction filter
  await expect(page.locator("a.m-timetable__stop-link").first()).toHaveText(
    last,
  );
  await expect(page.locator("a.m-timetable__stop-link").last()).toHaveText(
    first,
  );
};
