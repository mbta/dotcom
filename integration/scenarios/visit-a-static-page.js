import { expect } from "@playwright/test";

export async function scenario({ page, baseURL }) {
  await page.goto(`${baseURL}/`);

  await page.getByRole("button", { name: "About" }).click();

  await page
    .getByLabel("Main")
    .getByRole("link", { name: "Leadership" })
    .click();

  await expect(
    page.getByRole("heading", { name: "Leadership at The MBTA" }),
  ).toBeVisible();
}
