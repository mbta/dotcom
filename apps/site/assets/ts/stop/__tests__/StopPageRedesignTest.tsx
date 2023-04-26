import React from "react";
import { screen, within } from "@testing-library/dom";
import { render } from "@testing-library/react";
import StopPageRedesign from "../components/StopPageRedesign";
import * as useStop from "../../hooks/useStop";
import { Stop, ParkingLot } from "../../__v3api";
import * as useRoute from "../../hooks/useRoute";
import { newLatOrLon, routeWithPolylines } from "./helpers";
import { RouteWithPolylines } from "../../hooks/useRoute";

test("StopPageRedesign shows Loading without stop or routes", () => {
  jest.spyOn(useRoute, "useRoutesByStop").mockImplementation(() => {
    return undefined;
  });
  jest.spyOn(useStop, "default").mockImplementation(() => {
    return undefined;
  });

  render(<StopPageRedesign stopId="123" />);
  expect(screen.queryByText("Loading...")).toBeDefined();
});

describe("StopPageRedesign", () => {
  beforeAll(() => {
    jest.spyOn(useStop, "default").mockImplementation(() => {
      return {
        id: "123",
        name: "Test Stop",
        parking_lots: [] as ParkingLot[],
        accessibility: ["ramp"],
        latitude: newLatOrLon(),
        longitude: newLatOrLon()
      } as Stop;
    });
  });

  it("should render", () => {
    jest.spyOn(useRoute, "useRoutesByStop").mockImplementation(() => {
      return [];
    });

    render(<StopPageRedesign stopId="123" />);
    expect(screen.queryByText("Test Stop")).not.toBeNull();
  });

  it("gets lines to show on the map", () => {
    const testRoutesWithPolylines: RouteWithPolylines[] = [
      routeWithPolylines("SomeBus", 3, 0),
      routeWithPolylines("741", 3, 2),
      routeWithPolylines("AnotherBus", 0, 0),
      routeWithPolylines("Train1", 1, 3),
      routeWithPolylines("Train2", 1, 4),
      routeWithPolylines("Train3", 1),
      routeWithPolylines("FerryRoute", 4, 0)
    ];
    jest.spyOn(useRoute, "useRoutesByStop").mockImplementation(() => {
      return testRoutesWithPolylines;
    });

    const { container } = render(<StopPageRedesign stopId="123" />);

    // All routes appear in departures list
    const routeList = container.querySelector<HTMLElement>(
      "ul.stop-departures"
    )!;
    const routeNames = testRoutesWithPolylines.map(route => route.name);
    routeNames.forEach(name => {
      expect(within(routeList).getByText(name, { exact: false })).toBeTruthy();
    });

    // only certain routes show in map
    const mapPolylines = container.querySelectorAll(
      "[aria-label='Map with stop'] .leaflet-overlay-pane path"
    );
    expect(mapPolylines).toHaveLength(10);
  });
});
