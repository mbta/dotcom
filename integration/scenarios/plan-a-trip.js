import { expect, selectors } from "@playwright/test";
import { syncLiveView } from "../utils.js";

export async function scenario({ page, baseURL }) {
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
  const fromPin = page.locator("svg.mbta-map-pin").filter({ hasText: "A" });
  await fromPin.waitFor("visible");

  await page.locator("#trip-planner-input-form--to input[type='search']").pressSequentially("South Station");
  await page.waitForSelector(
    "ul.aa-List",
  );
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  // The B location pin.
  const toPin = page.locator("svg.mbta-map-pin").filter({ hasText: "B" });
  await toPin.waitFor("visible");

  await expect
    .poll(async () =>
      page.locator("section#trip-planner-results").count(),
    )
    .toBeGreaterThan(0);

  //Find the first details link and expand that itinerary
  await expect
    .poll(async () =>
      page.getByText(/Details/).count(),
    )
    .toBeGreaterThan(0);
 
  await page.getByText(/Details/).first().click();

  //Assert that the details show up
  selectors.setTestIdAttribute("data-test, data-testid");
  await expect.poll(async () => 
    page.getByTestId(/itinerary_detail/).count()
  ).toBeGreaterThan(0);

  //Assert that we can go back to the results list
  expect(await page.getByText(/View All Options/)).toBeVisible();
  await page.getByText(/View All Options/).click();



}
