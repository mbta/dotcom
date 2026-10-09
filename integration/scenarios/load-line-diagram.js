import { expect } from "@playwright/test";

export async function lineScenario({ page, baseURL, route, newVersion = false}) {
  await page.goto(`${baseURL}/schedules/${route}/line${newVersion ? "_new" : ""}`);
  await page.waitForLoadState('load')

}
