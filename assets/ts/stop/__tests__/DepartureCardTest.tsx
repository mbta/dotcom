import React from "react";
import { cleanup, screen, waitFor, within } from "@testing-library/react";
import DepartureCard from "../components/DepartureCard";
import { Alert, RouteType } from "../../__v3api";
import { baseRoute, renderWithRouter, TEST_LOADER_VALUE } from "./helpers";
import { DepartureInfo } from "../../models/departureInfo";
import { update } from "lodash";
import { RoutePatternWithPolyline } from "../../models/route-patterns";

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
});
