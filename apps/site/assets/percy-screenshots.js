#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

const PercyScript = require("@percy/script");

const BASE_URL = "http://localhost:8082";
// chosen date is a weekday near the end of the current rating. should be updated each rating.
const date = "2021-03-12";
const [year, month, day] = date.split("-");
const DATE_TIME_PARAMS = `date=${date}&date_time=${date}T15:00:00-05:00`;

PercyScript.run(async (page, percySnapshot) => {
  // Disable maximum timeouts in Puppeteer
  page.setDefaultTimeout(60000);

  /* 1. Home Page */
  await page.goto(BASE_URL);
  await percySnapshot("Home");

  /* 2-5. Navigation Header */
  const header_sections = ["#gettingAround", "#fares", "#contactUs", "#more"];
  for (const selector of header_sections) {
    await page.goto(BASE_URL);
    await page.click(`a[data-target="${selector}"]`);
    await percySnapshot(`Header ${selector}`, { widths: [800, 1089, 1345] }); // it only shows at smaller screen widths anyway
  }

  /* 6. Trip Planner */
  await page.goto(
    `${BASE_URL}/trip-planner?_utf8=✓&plan[from]=Boston+Children's+Museum,+Congress+Street,+Boston,+MA,+USA&plan[from_latitude]=42.3518682&plan[from_longitude]=-71.04999250000003&plan[to]=Government+Center&plan[to_latitude]=42.359705&plan[to_longitude]=-71.059215&plan[time]=depart&plan[date_time][hour]=11&plan[date_time][minute]=35&plan[date_time][am_pm]=AM&plan[date_time][month]=${month}&plan[date_time][day]=${day}&plan[date_time][year]=${year}&plan[modes][subway]=false&plan[modes][subway]=true&plan[modes][commuter_rail]=false&plan[modes][commuter_rail]=true&plan[modes][bus]=false&plan[modes][bus]=true&plan[modes][ferry]=false&plan[modes][ferry]=true&plan[optimize_for]=best_route#plan_result_focus`,
    {
      requestHeaders: {
        "X-WM-Proxy-Url": "https://dev.otp.mbtace.com"
      }
    }
  ); // need to mock the OpenTripPlanner response
  await page.waitForTimeout(60000);
  await percySnapshot("Trip Planner Results");

  /*
    7 - 11. Schedules & Maps 
    TODO: Add directions
  */
  const schedule_sections = [
    ["CR-Worcester", "timetable"],
    ["CR-Worcester", "line"],
    ["Green", "line"],
    ["Red", "line"],
    ["1", "line"]
  ];
  for (const [route, tab] of schedule_sections) {
    await page.goto(
      `${BASE_URL}/schedules/${route}/${tab}?${DATE_TIME_PARAMS}`
    );
    if (tab === "line") {
      await page.waitForSelector(".m-schedule-diagram");
    } else {
      await page.waitForSelector(".m-timetable");
    }
    await percySnapshot(`${route} ${tab}`);
  }

  /* 12 - 13. Stops */
  for (const mode of ["subway", "commuter-rail"]) {
    await page.goto(`${BASE_URL}/stops/${mode}?${DATE_TIME_PARAMS}`);
    await page.waitForSelector(".page-section");
    await percySnapshot(`Stops List ${mode}`);
  }

  /* 14. Retail Sales Locations */
  await page.goto(
    `${BASE_URL}/fares/retail-sales-locations?latitude=42.3491637&longitude=-71.0663166&${DATE_TIME_PARAMS}`
  );
  await percySnapshot("Retail Sales Locations");

  /* 15. Search */
  await page.goto(`${BASE_URL}/search?${DATE_TIME_PARAMS}`);
  await percySnapshot("Search Page");
});
