import React from "react";
import { screen, within } from "@testing-library/dom";
import { render } from "@testing-library/react";
import StopPageRedesign from "../components/StopPageRedesign";
import * as useStop from "../../hooks/useStop";
import { Stop, ParkingLot, Route } from "../../__v3api";
import * as useRoute from "../../hooks/useRoute";
import { baseRoute, newLatOrLon, newPolyline } from "./helpers";
import { RoutesWithPolylines } from "../../hooks/useRoute";

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

  it("filters lines to show on the map", () => {
    const testRoutesWithPolylines: RoutesWithPolylines[] = [
      [baseRoute("SomeBus", 3), [newPolyline(), newPolyline(), newPolyline()]],
      [baseRoute("741", 3), [newPolyline(), newPolyline()]],
      [baseRoute("AnotherBus", 3), [newPolyline()]],
      [baseRoute("Train1", 1), [newPolyline(), newPolyline(), newPolyline()]],
      [
        baseRoute("Train2", 1),
        [newPolyline(), newPolyline(), newPolyline(), newPolyline()]
      ],
      [baseRoute("Train3", 1), [newPolyline()]],
      [baseRoute("FerryRoute", 4), [newPolyline(), newPolyline()]]
    ];
    jest.spyOn(useRoute, "useRoutesByStop").mockImplementation(() => {
      return testRoutesWithPolylines;
    });

    const { container } = render(<StopPageRedesign stopId="123" />);

    // All routes appear in departures list
    const routeList = container.querySelector<HTMLElement>(
      "ul.stop-departures"
    )!;
    const routeNames = testRoutesWithPolylines.flatMap(([route]) => route.name);
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
