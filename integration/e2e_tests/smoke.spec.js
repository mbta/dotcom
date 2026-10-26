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
import { expect, test } from "@playwright/test";
import { syncLiveView } from "../utils";

const baseURL = process.env.HOST
  ? `https://${process.env.HOST}`
  : "http://localhost:4001";

test.use({
  baseURL,
  headless: true,
  screenshot: { mode: "only-on-failure", fullPage: true },
  video: "off",
  trace: "off",
  bypassCSP: false,
});

test.describe(`${baseURL} passes smoke test`, () => {
  /**
   *  Homepage tabs and navigation are covered in other tests, so we don't test
   *  those here. Here just checks the relevant content is available.
   */
  test("home page", async ({ page, baseURL }) => {
    await ok(page, "/");
    await page.getByRole("heading", { name: "Find a Location" });
    await page.getByRole("heading", { name: "Fares" });
    await page.getByRole("heading", { name: "Contact Us" });

    const main = page.locator("main");
    await expect(main).toContainText("Important Links");
    await expect(main).toContainText("Press Releases");
    await expect(main).toContainText("MBTA User Guides");
    await hasPositiveCount(page, ".user-guides .guide");
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
      .getByPlaceholder("Enter a location")
      .pressSequentially("Boston Common");
    await hasPositiveCount(page, resultSelector);
    await page.locator(resultSelector).first().click();
    await expect(page).toHaveURL(new RegExp("address=Boston\\+Common"));
    await hasPositiveCount(page, ".c-sales-locations__card");
  });

  test("events page, selected event, add to calendar", async ({ page }) => {
    test.slow();
    await ok(page, "/events");
    await page.locator(".m-event__title a:visible").last().click();
    const main = page.locator("main");
    expect(main).toContainText("Meeting Info");
    expect(main).toContainText("Event Description");
    await main.getByRole("link", { title: /Add .* to Calendar/i }).click();//Adding a pattern here in case we decide to change the title to "Add {event title} to Calendar" here too
  });

  test("projects page, filter, selected project", async ({ page }) => {
    await ok(page, "/projects");
    await page.getByRole("button", { name: "Bus", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "All Bus Projects" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Show More" }).click();
    const lastProject = page.locator(".m-more-projects-table__title").last();
    const projectTitle = await lastProject.innerText();
    await lastProject.click();
    await expect(page).toHaveURL(/\/projects\//);
    await expect(
      page.getByRole("heading", { name: projectTitle, exact: true }),
    ).toBeVisible();
  });

  test("news page, selected news entry", async ({ page }) => {
    await ok(page, "/news");
    await page.locator("main").getByRole("link").first().click();
  });

  test("stops & stations page, selected station", async ({ page }) => {
    await ok(page, "/stops");
    await page.getByRole("link", { name: "Ferry", exact: true }).click();
    await page.getByRole("link", { name: "Charlestown Ferry" }).click();
    await page.getByRole("heading", { name: "Charlestown" });
    await page.getByRole("heading", { name: "Stop Information" });
  });

  const schedule_sections = [
    ["Boat-F1", "timetable"],
    ["CR-Worcester", "timetable"],
    ["CR-Fairmount", "line"],
    ["Green", "line"],
    ["Green-E", "line"],
    ["Red", "line"],
    ["1", "line"],
  ];
  test.describe("selected schedules", async () => {
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
      });
    }
  });

  test("alerts page", async ({ page }) => {
    await ok(page, "/alerts");
    await page
      .locator(".m-alerts__mode-buttons .m-alerts__mode-name")
      .getByText("Bus")
      .click();
    await page.getByRole("link", { name: "Access" }).click();  //All/current/planned buttons+behavior have been removed from this page.  We'll click on a mode button instead to verify things.
  });

  test("search page", async ({ page }) => {
    await ok(page, "/search");
    await syncLiveView(page, expect);
    await page
      .getByPlaceholder("Search for routes, places, information, and more")
      .pressSequentially("Charles", { delay: 100 });
    await expect(page).toHaveURL(/query=Charles/);
    const searchResults = page.locator("#search-page-results");
    await hasPositiveCount(searchResults, "li a");
    await expect(searchResults).toContainText("Charles/MGH");
    await expect(searchResults).toContainText("Red Blue Connector");

    const checkboxLocator = page.locator(
      '#search-page-filters input[type="checkbox"]',
    );
    for (const el of await checkboxLocator.all()) {
      await el.dispatchEvent("click");
    }
    await page.getByLabel("Stations and Stops").dispatchEvent("click"); // show stops and stations only

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

  test("inaccessible stations don't show accesiblity icon", async ({page}) => {
    await ok(page, "/stops/place-bomnl");//Bowdoin (blue)
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: false});
    await ok(page, "/stops/place-WML-0081");//Newtonvile (Worcester)
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: false});
    await ok(page, "/stops/place-valrd");//Valley Road (Mattapan)
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: false});
    await ok(page, "/stops/place-hymnl");//Hynes (Green)
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: false});
    //Busses, ferries, orange, and red are all accessible it seems.
  });

  test("accessible stations do show the accessible icon", async ({page}) => {
    await ok(page, "/stops/place-dwnxg");
    await expect( page.getByLabel("Accessible") ).toBeVisible();
    await ok(page, "/stops/place-sstat");
    await expect( page.getByLabel("Accessible") ).toBeVisible();
    await ok(page, "/stops/place-north");
    await expect( page.getByLabel("Accessible") ).toBeVisible();
    await ok(page, "/stops/place-pktrm");
    await expect( page.getByLabel("Accessible") ).toBeVisible();
    await ok(page, "/stops/place-gover");
    await expect( page.getByLabel("Accessible") ).toBeVisible();
  })

  test("inaccessible stations that only serve buses show accessibilty icon", async ({page}) => {
    // This is only a subset of applicable stops.
    // Bus Route 1
    await ok(page, "/stops/104");//Massachusetts Ave @ Inman St
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: true});
    // Bus Route 15
    await ok(page, "/stops/1481");//Dudley St @ Belden St
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: true});
    await ok(page, "/stops/1489");//Dudley St @ Dearborn St
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: true});
    // Bus Route 18
    await ok(page, "/stops/312");//Auckland St @ Dewar St
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: true});
    // Bus Route 21
    await ok(page, "/stops/542");//Morton St @ Theodore St
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: true});
    // 34E
    await ok(page, "/stops/91618");//624 Washington St opp Bird Middle School
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: true});
    // 59
    await ok(page, "/stops/81442");//Hillside Ave @ Hunnewell St
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: true});
    await ok(page, "/stops/84885");//Winchester St @ Centre St
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: true});
    // 100
    await ok(page, "/stops/5269");//Fellsway @ Myrtle St
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: true});
    // 139
    await ok(page, "/stops/16000");//Wyoming St @ Ravine Rd
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: true});
    // 350/354
    await ok(page, "/stops/8234");//Cambridge St @ Church Ln
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: true});
    // 429/430
    await ok(page, "/stops/7523");//Vine St @ Beech St
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: true});
    // 558
    await ok(page, "/stops/78121");//River St @ Jackson St
    await expect( page.getByLabel("Accessible") ).toBeVisible({visible: true});
  });
});

async function ok(page, path) {
  const response = await page.goto(path);
  expect(response.status()).toBe(200);
}

async function hasPositiveCount(page, selector) {
  await expect
    .poll(async () => page.locator(selector).count())
    .toBeGreaterThan(0);
}
