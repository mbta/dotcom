import { expect } from "@playwright/test";
import { syncLiveView } from "../utils.js";
import { scenario } from "../scenarios/view-departures.js";
import { parse } from "csv-parse/sync";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import { join } from "path";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const csvPath = join(__dirname, "./schedule_finder_visits.csv");
const sfVisitData = parse(readFileSync(csvPath), {
  columns: true,
  skip_empty_lines: true,
});

// Also called in the scenario in view-departures.js
export function chooseUrl(allVisits) {
  const visit =
    allVisits == undefined ? chooseVisit(sfVisitData) : chooseVisit(allVisits);
  const { route, direction, stop } = visit;
  return "/departures?route_id=442&direction_id=0&stop_id=4702";
  // return `/departures?route_id=${route}&direction_id=${direction}&stop_id=${stop}`;
}

function chooseVisit(allVisits) {
  // the count field is the weighting. choose a visit based on it
  const expandedVisits = [].concat(
    ...allVisits.map((obj) => Array(obj.count).fill(obj)),
  );
  return expandedVisits[Math.floor(Math.random() * expandedVisits.length)];
}

/*
 *
This load test expands upon the simpler scenario from view-departures.js
- Toggles an upcoming departure and checks for a departure time
  - Toggles showing more stops in the trip
- Toggles showing additional upcoming departures for the day
- Taggles a daily schedule and checks for a departure time
- Changes the selected service, then toggles a daily schedule again
*
*/
export async function loadScenario(page, context, events, test) {
  const path = chooseUrl(context.vars.sfVisits);
  await scenario({ page, baseURL: context.vars.target, path, test });
  const { step } = test;
  await step("Upcoming departures", async () => {
    const upcomingSection = page.getByTestId("upcoming-departures");
    const departure = upcomingSection.locator("details");
    if ((await departure.count()) > 0) {
      await step("Open first", async () => {
        await departure.first().click();
        await checkTimeDetails(departure);
        const moreStops = departure.getByText("Show More Stops").first();
        if (await moreStops.isVisible()) {
          await step("Show more", async () => {
            await moreStops.first().click();
            expect(
              departure.first().getByText("Hide More Stops"),
            ).toBeVisible();
          });
        }
      });
    }
    const laterToday = upcomingSection.locator("details", {
      hasText: /trip(s?) later today/,
    });
    if ((await laterToday.count()) > 0) {
      await step("Open later trips", async () => {
        await laterToday.first().click();
        expect(laterToday.first()).toContainText("Hide");
      });
    }
  });
  await step("Daily schedules", async () => {
    const dailySchedulesSection = page.getByTestId("daily-schedules");
    await syncLiveView(page, expect);
    const schedule = dailySchedulesSection.locator("details");
    if ((await schedule.count()) > 0) {
      await step("Open first", async () => {
        await schedule.first().click();
        await syncLiveView(page, expect);
        await checkTimeDetails(schedule.first());
      });
    }

    const serviceSelector = dailySchedulesSection.getByLabel(
      "Choose a schedule type from the available options",
    );

    if (await serviceSelector.isVisible()) {
      await step("Change schedule", async () => {
        await changeSelectedService(serviceSelector);
        await syncLiveView(page, expect);
        const schedule = dailySchedulesSection.locator("details");
        if ((await schedule.count()) > 0) {
          await step("Open another", async () => {
            await schedule.first().click();
            await syncLiveView(page, expect);
            await checkTimeDetails(schedule.first());
          });
        }
      });
    }
  });
}

async function checkTimeDetails(detailsLocator) {
  const expandedDetails = detailsLocator.locator("> div").first();
  expect(expandedDetails).toBeVisible();
  expect(expandedDetails).toHaveText(/[1-12]?|[1-9]:[0-5][0-9] (AM|PM)/);
}

async function changeSelectedService(serviceSelector) {
  await serviceSelector.scrollIntoViewIfNeeded();
  const currentValue = await serviceSelector.inputValue();
  const allValues = await serviceSelector
    .getByRole("option")
    .evaluateAll((options) => options.map((o) => o.value));
  const newValue = allValues.find((v) => v != currentValue);
  return serviceSelector.selectOption({ value: newValue });
}

// Artillery needs this
export function $rewriteMetricName(metricName, metricType) {
  return metricName.replaceAll(" ", "_");
}
