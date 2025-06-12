import React from "react";
import { cleanup, screen, waitFor, within } from "@testing-library/react";
import DepartureCard from "../components/DepartureCard";
import { Alert, RouteType, Stop, Trip } from "../../__v3api";
import { baseRoute, renderWithRouter, TEST_LOADER_VALUE } from "./helpers";
import { DepartureInfo } from "../../models/departureInfo";
import { update } from "lodash";
import { RoutePatternWithPolyline } from "../../models/route-patterns";
import { ScheduleWithTimestamp } from "../../models/schedules";

const testRoute = baseRoute(Object.keys(TEST_LOADER_VALUE)[0], 3);
const routePatternsByHeadsign = TEST_LOADER_VALUE[testRoute.id];

// give all canonical: true route patterns to avoid rendering empty cards
for (const h of Object.keys(routePatternsByHeadsign)) {
  update(routePatternsByHeadsign, `${h}.route_patterns`, route_patterns =>
    route_patterns.map((rp: RoutePatternWithPolyline) => ({
      ...rp,
      canonical: true
    }))
  );
}

const trip = {
  route_pattern_id: "Red-0",
  shape_id: "9900002",
  headsign: "Foo",
  "bikes_allowed?": true,
  occupancy: "not_crowded",
  direction_id: 1,
  name: "077",
  id: "1234"
} as Trip;

const stop = {
  accessibility: [],
  bike_storage: [],
  address: null,
  closed_stop_info: null,
  "has_charlie_card_vendor?": true,
  "has_fare_machine?": true,
  fare_facilities: [],
  id: "1234",
  "child?": true,
  latitude: 71,
  longitude: 43,
  name: "Foo",
  municipality: "Boston",
  note: null,
  parking_lots: [],
  "station?": true,
  "ferry?": false,
  type: "station"
} as Stop;

const schedule = {
  route: baseRoute("Red", 1),
  trip: trip,
  stop: stop,
  "flag?": true,
  "early_departure?": true,
  "last_stop?": true,
  stop_sequence: 1,
  stop_headsign: "Foo",
  pickup_type: 1
} as ScheduleWithTimestamp;

const departure = {
  schedule: schedule,
  trip: trip,
  isCancelled: false,
  isSkipped: false,
  isDelayed: false,
  routeMode: "ferry"
} as DepartureInfo;

describe("DepartureCard", () => {
  afterEach(cleanup);

  it("renders a list item with route name", async () => {
    renderWithRouter(
      <DepartureCard
        route={testRoute}
        departuresForRoute={[]}
        alertsForRoute={[]}
        routePatternsByHeadsign={routePatternsByHeadsign}
      />
    );
    await waitFor(() => {
      const listItem = screen.getByRole("listitem");
      expect(listItem).toBeInTheDocument();
      expect(within(listItem).getByText(testRoute.name)).toBeInTheDocument();
    });
  });

  it("route card header links to schedule page for route", async () => {
    renderWithRouter(
      <DepartureCard
        route={testRoute}
        departuresForRoute={[]}
        alertsForRoute={[]}
        routePatternsByHeadsign={routePatternsByHeadsign}
      />
    );
    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: testRoute.name }).getAttribute("href")
      ).toStartWith(`/schedules/${testRoute.id}`);
    });
  });

  ([0, 1, 2, 3, 4] as RouteType[]).forEach(type => {
    it(`renders icons for modes - type ${type}`, async () => {
      const { container } = renderWithRouter(
        <DepartureCard
          route={{ ...testRoute, type }}
          departuresForRoute={[]}
          alertsForRoute={[]}
          routePatternsByHeadsign={routePatternsByHeadsign}
        />
      );

      await waitFor(() => {
        const el = container.querySelector(".c-svg__icon");
        expect(el).toBeInTheDocument();
      });
    });
  });

  it.each`
    route                       | expectedClass
    ${baseRoute("Green-B", 0)}  | ${".u-bg--green-line"}
    ${baseRoute("Mattapan", 0)} | ${".u-bg--red-line"}
    ${baseRoute("Red", 1)}      | ${".u-bg--red-line"}
    ${baseRoute("Orange", 1)}   | ${".u-bg--orange-line"}
    ${baseRoute("Blue", 1)}     | ${".u-bg--blue-line"}
    ${baseRoute("", 1)}         | ${".u-bg--unknown"}
    ${baseRoute("", 2)}         | ${".u-bg--commuter-rail"}
    ${baseRoute("749", 3)}      | ${".u-bg--silver-line"}
    ${baseRoute("", 3)}         | ${".u-bg--bus"}
    ${baseRoute("", 4)}         | ${".u-bg--ferry"}
  `(
    "renders different colors for routes/modes",
    async ({ route, expectedClass }) => {
      const { container } = renderWithRouter(
        <DepartureCard
          route={route}
          departuresForRoute={[]}
          alertsForRoute={[]}
          routePatternsByHeadsign={routePatternsByHeadsign}
        />
      );
      await waitFor(() => {
        expect(container.querySelector(expectedClass)).toBeInTheDocument();
      });
    }
  );

  it("passes alerts for both directions to the departure times for all headsigns", async () => {
    // Suspension Alerts show up before Shuttle Service and Detour Alerts
    // If the alert that affects that affects both directions is a Suspension alert
    // then it should take any priority over the Shuttle Service Alerts which
    // are both direction specific.  By the Suspension alert showing up
    // This test validates that alerts affecting both directions are passed
    // to the child components
    const alerts = [
      {
        id: "1234",
        informed_entity: {
          direction_id: [0]
        },
        effect: "shuttle",
        lifecycle: "new"
      },
      {
        id: "4321",
        informed_entity: {
          direction_id: [null]
        },
        effect: "suspension",
        lifecycle: "new"
      },
      {
        id: "0987",
        informed_entity: {
          direction_id: [1]
        },
        effect: "detour",
        lifecycle: "new"
      }
    ] as Alert[];

    const route = baseRoute("Red", 1);
    const routePatterns = TEST_LOADER_VALUE["Red"];

    const departures = [departure];

    renderWithRouter(
      <DepartureCard
        route={route}
        departuresForRoute={departures}
        alertsForRoute={alerts}
        routePatternsByHeadsign={routePatterns}
      />
    );

    await waitFor(() => {
      const suspensionBadges = screen.getAllByText("Detour");
      expect(suspensionBadges.length).toBe(departures.length);
    });
  });
});
