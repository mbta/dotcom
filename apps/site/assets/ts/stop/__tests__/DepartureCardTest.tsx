import React from "react";
import { screen, within } from "@testing-library/react";
import DepartureCard from "../components/DepartureCard";
import { Alert, RouteType } from "../../__v3api";
import { baseRoute, renderWithRouter } from "./helpers";
import { DepartureInfo } from "../../models/departureInfo";

describe("DepartureCard", () => {
  it("renders a list item with route name", () => {
    renderWithRouter(
      <DepartureCard
        route={baseRoute("749", 3)}
        departuresForRoute={[]}
        stopName=""
        alertsForRoute={[]}
      />
    );
    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeInTheDocument();
    expect(
      within(listItem).getByText("Silver Line 749 Route")
    ).toBeInTheDocument();
  });

  it("route card header links to schedule page for route", () => {
    renderWithRouter(
      <DepartureCard
        route={baseRoute("749", 3)}
        departuresForRoute={[]}
        stopName=""
        alertsForRoute={[]}
      />
    );
    expect(
      screen.getByRole("link", { name: "Silver Line 749 Route" })
    ).toHaveAttribute("href", "/schedules/749");
  });

  it("renders icons for modes", () => {
    const iconElements = [0, 1, 2, 3, 4]
      .map(type =>
        renderWithRouter(
          <DepartureCard
            route={baseRoute("", type as RouteType)}
            departuresForRoute={[]}
            stopName=""
            alertsForRoute={[]}
          />
        )
      )
      .map(({ container }) => container.querySelector(".c-svg__icon"));
    iconElements.forEach(el => expect(el).toBeInTheDocument());
    expect(iconElements[0]).toEqual(iconElements[1]); // both use the subway icon
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
  `("renders different colors for routes/modes", ({ route, expectedClass }) => {
    const { container } = renderWithRouter(
      <DepartureCard
        route={route}
        departuresForRoute={[]}
        stopName=""
        alertsForRoute={[]}
      />
    );
    expect(container.querySelector(expectedClass)).toBeInTheDocument();
  });

  it("passes alerts for both directions to the departure times", () => {
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

    const departures = [] as DepartureInfo[];

    renderWithRouter(
      <DepartureCard
        route={baseRoute("749", 3)}
        departuresForRoute={departures}
        stopName="Shining Time Station"
        alertsForRoute={alerts}
      />
    );

    const suspensionBadges = screen.getAllByText("No Service");
    expect(suspensionBadges.length).toBe(2);
    expect(screen.queryByText("Shuttle Service")).toBeNull();
    expect(screen.queryByText("Detour")).toBeNull();
  });
});
