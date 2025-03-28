/**
 * This test goes to almost every page a typical user would visit. Tests will
 * fail if the page responds in a server error or a 404 error, or if any of the
 * endpoints called in the background during the test fail. This group of tests
 * is intended to be shallow, with more in-depth functionality tested elsewhere.
 *
 * More testing done on critical user journeys, in the Playwright end-to-end
 * testing scenarios.
 * 
 * HOST=dev.mbtace.com npx playwright test smoke
 */
const { describe, expect, test } = require("@playwright/test");

const baseURL = process.env.HOST
  ? `https://${process.env.HOST}`
  : "http://localhost:4001";

test.use({ baseURL, headless: true, screenshot: { mode: "only-on-failure", fullPage: true }, video: "off", trace: "off", bypassCSP: false });

test.describe(`${baseURL} passes smoke test`, () => {
  /**
   *  Homepage tabs and navigation are covered in other tests, so we don't test
   *  those here. Here just checks the relevant content is available.
   */
  test("home page", async ({ page, baseURL }) => {
    await ok(page, "/");
    await page.getByRole("heading", { name: "Find a Location" });
    await page.getByRole("heading", { name: "Contact Us" });

    const main = page.locator("main");
    await expect(main).toContainText("Ferry One-Way");
    await expect(main).toContainText("Important Links");
    await expect(main).toContainText("Press Releases");
    await expect(main).toContainText("MBTA User Guides");
    await hasPositiveCount(page, ".user-guides .guide")
    await hasPositiveCount(page, "a.m-homepage__news-item");
    const promoted = page.locator("#whats-happening-promoted > div");
    await expect(promoted).toHaveCount(2);
    await expect(main).toContainText("Upcoming Public Meetings and Events");
    await hasPositiveCount(page, "li.m-event");
  });

  test("fares by mode", async ({ page }) => {
    await ok(page, "/fares");
    const cards = page.locator(".c-fare-card");
    await expect(cards).toHaveCount(6);
    await ok(page, "/fares/commuter-rail-fares");
    await ok(page, "/fares/bus-fares");
    await ok(page, "/fares/subway-fares");
    await ok(page, "/fares/ferry-fares");
  });

  test("fares sales locations", async ({ page }) => {
    const resultSelector = ".c-search-bar__autocomplete-results .aa-List li";
    await ok(page, "/fares/retail-sales-locations");
    await page
      .getByPlaceholder('Enter a location')
      .pressSequentially('Boston Common');
    await hasPositiveCount(page, resultSelector);
    await page.locator(resultSelector).first().click();
    await expect(page).toHaveURL(new RegExp("address=Boston\\+Common"));
    await hasPositiveCount(page, ".c-sales-locations__card");
  });

  test("events page, selected event, add to calendar", async ({ page }) => {
    test.slow();
    await ok(page, "/events");
    await page.locator(".m-event__title a:visible").first().click();
    const main = page.locator("main");
    expect(main).toContainText("Meeting Info");
    expect(main).toContainText("Event Description");
    await main.getByRole("link", { name: "Add to Calendar " }).click();
  });

  test("projects page, filter, selected project", async ({ page }) => {
    test.slow();
    await ok(page, "/projects");
    await page.locator("#mode-button__bus").click();
    await page.getByRole("heading", { name: "Bus Projects" });
    await page.locator(".m-more-projects-table__title").last().click();
  });

  test("news page, selected news entry", async ({ page }) => {
    await ok(page, "/news");
    await page.locator("main").getByRole('link').first().click();
  });

  test("stops & stations page, selected station", async ({ page }) => {
    await ok(page, "/stops");
    await page.getByRole("link", { name: "Ferry" }).click();
    await page.getByRole("link", { name: "Hingham Ferry accessible" }).click();
    await page.getByRole("heading", { name: "Hingham" });
    await page.getByRole("heading", { name: "Stop Information" });
  });

  test("schedules & maps page (all links)", async ({ page, request }) => {
    await ok(page, "/schedules");
    const links = await page.$$("main a:visible[href]");
    await Promise.all(links.map(async link => {
      const href = await link.getAttribute("href");
      return request.get(href);
    }));
  });

  const schedule_sections = [
    ["Boat-F1", "timetable"],
    ["CR-Worcester", "timetable"],
    ["CR-Fairmount", "line"],
    ["Green", "line"],
    ["Green-E", "line"],
    ["Red", "line"],
    ["1", "line"]
  ];
  describe("selected schedules", async () => {
    for (let [route, tab] of schedule_sections) {
      test(`/schedules/${route}/${tab}`, async ({ page }) => {
        await ok(page, `/schedules/${route}/${tab}`);
        let url = page.url();
        if (tab == "line") {
          // test both directions
          if (url.includes("schedule_direction[direction_id]=1")) {
            await page.getByText("Change Direction").click();
            await expect(page).toHaveURL(/schedule_direction[direction_id]=0/);
          } else if (url.includes("schedule_direction[direction_id]=0")) {
            await page.getByText("Change Direction").click();
            await expect(page).toHaveURL(/schedule_direction[direction_id]=1/);
          }
        } else {
          await page.locator(".m-timetable");
        }
      })

    }
  });

  test("alerts page", async ({ page }) => {
    await ok(page, "/alerts");
    await page
      .locator(".m-alerts__mode-buttons .m-alerts__mode-name")
      .getByText("Bus")
      .click();
    await page.getByText("Planned Service Alerts").click();
  });

  test("search page", async ({ page }) => {
    await ok(page, "/search");
    await page
      .getByPlaceholder('Search for routes, places, information, and more')
      .pressSequentially('Charles');
    await expect(page).toHaveURL(/query=Charles/);
    const searchResults = page.locator("#search-results-container")
    await hasPositiveCount(searchResults, ".c-search-result__hit-name")
    await expect(searchResults).toContainText("Charles/MGH")
    await expect(searchResults).toContainText("Red Blue Connector")
    await page.locator("#facet-label-stops").click(); // show stops and stations only
    await expect(searchResults).toContainText("Charles/MGH");
    await expect(searchResults).not.toContainText("Red Blue Connector");
  });

  test("bus stop change page", async ({ page }) => {
    await ok(page, "/bus-stop-changes");
    await page.getByText("Past Changes").click();
  });

  test("a few more popular pages", async ({ page }) => {
    await ok(page, "/customer-support");
    await ok(page, "/accessibility");
    await ok(page, "/destinations");
    await ok(page, "/parking");
  });
});

async function ok(page, path) {
  const response = await page.goto(path);
  expect(response.status()).toBe(200);
}

async function hasPositiveCount(page, selector) {
  await expect
    .poll(async () =>
      page.locator(selector).count(),
    )
    .toBeGreaterThan(0);
}
