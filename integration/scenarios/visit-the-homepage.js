import { expect } from "@playwright/test";

export async function scenario({ page, baseURL }) {
  await page.goto(`${baseURL}/`);

  await expect(
    page.getByRole("heading", { name: "MBTA Homepage" }),
  ).toBeVisible();
}
