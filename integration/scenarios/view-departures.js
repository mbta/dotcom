import { expect } from "@playwright/test";
import { syncLiveView } from "../utils.js";
import { chooseUrl } from "../load_tests/departures.js";

export async function scenario({ page, baseURL, path }) {
  const url = `${baseURL}${path || chooseUrl()}`;
  const response = await page.goto(url);
  await page.waitForLoadState("domcontentloaded");
  await syncLiveView(page, expect);
  expect(response.status()).toBe(200);
  const { route, direction, stop } = infoFromUrl(url);
  const linkToSchedule = page.locator(
    `a[href^="/schedules/${route}?schedule_direction[direction_id]=${direction}"]`,
  );
  expect(linkToSchedule).toBeVisible();
  const linkToStop = page.locator(`a[href^="/stops/${stop}"]`);
  expect(linkToStop).toBeVisible();
  expect(
    page.getByRole("heading", { name: "Upcoming Departures", level: 2 }),
  ).toBeVisible();
  expect(
    page.getByRole("heading", { name: "Daily Schedules", level: 2 }),
  ).toBeVisible();
}

function infoFromUrl(path) {
  const parsedUrl = new URL(path);
  const queryParams = parsedUrl.searchParams;
  return {
    route: queryParams.get("route_id"),
    direction: queryParams.get("direction_id"),
    stop: queryParams.get("stop_id"),
  };
}
