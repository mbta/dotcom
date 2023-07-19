import React from "react";
import { render, screen, within } from "@testing-library/react";
import DepartureCard from "../components/DepartureCard";
import { Alert, RouteType } from "../../__v3api";
import { baseRoute } from "./helpers";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { mergeIntoDepartureInfo } from "../../helpers/departureInfo";

const mockClickAction = jest.fn();

describe("DepartureCard", () => {
  it("renders a list item with route name", () => {
    render(
      <DepartureCard
        route={baseRoute("749", 3)}
        departuresForRoute={[]}
        stopName=""
        onClick={mockClickAction}
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
    render(
      <DepartureCard
        route={baseRoute("749", 3)}
        departuresForRoute={[]}
        stopName=""
        alertsForRoute={[]}
        onClick={() => {}}
      />
    );
    expect(
      screen.getByRole("link", { name: "Silver Line 749 Route" })
    ).toHaveAttribute("href", "/schedules/749");
  });

  it("renders icons for modes", () => {
    const iconElements = [0, 1, 2, 3, 4]
      .map(type =>
        render(
          <DepartureCard
            route={baseRoute("", type as RouteType)}
            departuresForRoute={[]}
            stopName=""
            onClick={mockClickAction}
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
    const { container } = render(
      <DepartureCard
        route={route}
        departuresForRoute={[]}
        stopName=""
        onClick={mockClickAction}
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
        effect: "shuttle"
      },
      {
        id: "4321",
        informed_entity: {
          direction_id: [null]
        },
        effect: "suspension"
      },
      {
        id: "0987",
        informed_entity: {
          direction_id: [1]
        },
        effect: "detour"
      }
    ] as Alert[];

    const schedules = [
      {
        route: baseRoute("749", 3),
        trip: { id: "1", direction_id: 0, headsign: "Way 0" }
      },
      {
        route: baseRoute("749", 3),
        trip: { id: "2", direction_id: 1, headsign: "Way 1" }
      }
    ] as ScheduleWithTimestamp[];
    const departures = mergeIntoDepartureInfo(schedules, []);

    render(
      <DepartureCard
        route={baseRoute("749", 3)}
        departuresForRoute={departures}
        stopName=""
        alertsForRoute={alerts}
        onClick={() => {}}
      />
    );

    const suspensionBadges = screen.getAllByText("Stop Closed");
    expect(suspensionBadges.length).toBe(2);
    expect(screen.queryByText("Shuttle Service")).toBeNull();
    expect(screen.queryByText("Detour")).toBeNull();
  });
});
