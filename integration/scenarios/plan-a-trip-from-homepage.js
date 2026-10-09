import { expect } from "@playwright/test";
import { syncLiveView } from "../utils.js";

export async function scenario({ page, baseURL }) {
  await page.goto(`${baseURL}/`);
  await page
    .locator(".m-tabbed-nav__icon-text", { hasText: "Trip Planner" })
    .click();

  await page.locator("#trip-planner-input-form--from input[type='search']").pressSequentially("North Station");
  await page.locator(".aa-Item", { hasText: "North Station" }).first().waitFor();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(
    page.locator("input[name='plan[from][latitude]']"),
  ).not.toHaveValue("");

  await page.locator("#trip-planner-input-form--to input[type='search']").pressSequentially("South Station");
  await page.locator(".aa-Item", { hasText: "South Station" }).first().waitFor();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(
    page.locator("input[name='plan[to][latitude]']"),
  ).not.toHaveValue("");

  await page.locator("button#trip-plan__submit").click();
  await page.waitForURL("/trip-planner?plan=*");
  await syncLiveView(page, expect);

  await expect
    .poll(async () =>
      page.locator("section#trip-planner-results").count()
    )
    .toBeGreaterThan(0);
}
