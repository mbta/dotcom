import { test } from "@playwright/test";
import { loadScenario } from "../load_tests/departures";

// To run in playwright directly via `npx playwright test visit-departures`
test(
  "Departures page shows departures",
  { tag: "@departures" },
  async ({ page, baseURL }) => {
    await loadScenario(page, { vars: { target: baseURL } }, undefined, test);
  },
);
