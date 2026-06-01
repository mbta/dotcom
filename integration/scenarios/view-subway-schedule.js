import { expect } from "@playwright/test";

export async function scenario({ page, baseURL }) {
  await page.goto(`${baseURL}/schedules`);

  await page
    .locator("span.c-grid-button__name")
    .getByText("Orange Line")
    .click();

  await expect(page.locator("h1.schedule__route-name")).toHaveText(
    "Orange Line",
  );

  await page.waitForSelector(".m-schedule-diagram__stop-link span");
  await expect
    .poll(async () => page.locator(".m-schedule-diagram__stop-link").count())
    .toBeGreaterThan(1);

  // Get the first and last stop names
  const first = await page
    .locator(".m-schedule-diagram__stop-link span:last-child")
    .first()
    .textContent();
  const last = await page
    .locator(".m-schedule-diagram__stop-link span:last-child")
    .last()
    .textContent();

  await page.locator("button.m-schedule-direction__button").click();

  // Expect them to be reversed after clicking the direction filter
  await expect(
    page.locator(".m-schedule-diagram__stop-link span:last-child").first(),
  ).toHaveText(last);
  await expect(
    page.locator(".m-schedule-diagram__stop-link span:last-child").last(),
  ).toHaveText(first);
}
