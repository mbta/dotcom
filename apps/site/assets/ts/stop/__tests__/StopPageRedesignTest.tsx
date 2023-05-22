import React from "react";
import {
  screen,
  waitForElementToBeRemoved,
  within
} from "@testing-library/dom";
import { render } from "@testing-library/react";
import StopPageRedesign from "../components/StopPageRedesign";
import * as useStop from "../../hooks/useStop";
import { Stop, ParkingLot, InformedEntitySet, Alert } from "../../__v3api";
import * as useRoute from "../../hooks/useRoute";
import { newLatOrLon, routeWithPolylines } from "./helpers";
import { RouteWithPolylines } from "../../hooks/useRoute";
import * as useSchedules from "../../hooks/useSchedules";
import * as useAlerts from "../../hooks/useAlerts";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { add, format } from "date-fns";

describe("StopPageRedesign", () => {
  beforeEach(() => {
    // Empty arrays need be defined outsite the mocks
    // putting these directly inside the mocks led to maximum
    // update depth errors
    const routesByStopArray: RouteWithPolylines[] = [];
    const alertsArray: Alert[] = [];
    const schedulesArray: ScheduleWithTimestamp[] = [];

    jest.spyOn(useRoute, "useRoutesByStop").mockImplementation(() => {
      return routesByStopArray;
    });

    jest.spyOn(useSchedules, "useSchedulesByStop").mockImplementation(() => {
      return schedulesArray;
    });

    jest.spyOn(useAlerts, "useAlertsByStop").mockImplementation(() => {
      return alertsArray;
    });

    jest.spyOn(useAlerts, "useAlertsByRoute").mockImplementation(() => {
      return alertsArray;
    });

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

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render", () => {
    render(<StopPageRedesign stopId="123" />);
    expect(screen.queryByText("Test Stop")).not.toBeNull();
  });

  it("shows Loading without stop or routes", () => {
    jest.spyOn(useRoute, "useRoutesByStop").mockImplementation(() => {
      return undefined;
    });
    jest.spyOn(useStop, "default").mockImplementation(() => {
      return undefined;
    });

    render(<StopPageRedesign stopId="123" />);
    expect(screen.queryByText("Loading...")).toBeDefined();
  });

  it("shows Loading without alerts", () => {
    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockImplementation(() => undefined);
    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockImplementation(() => undefined);

    render(<StopPageRedesign stopId="123" />);
    expect(screen.queryByText("Loading...")).toBeDefined();
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

  const dateFormatter = (date: Date): string => {
    return format(date, "yyyy-M-d HH:mm");
  };

  it("should render alerts", () => {
    const now = new Date();
    const future1 = add(now, { days: 1 });
    const lowAlerts: Alert[] = [
      {
        updated_at: "Updated: 4/11/2019 09:33A",
        severity: 7,
        priority: "low",
        lifecycle: "new",
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        informed_entity: {} as InformedEntitySet,
        id: "00005",
        header: "There is construction at this station.",
        effect: "other",
        description: "",
        url: "https://www.mbta.com"
      }
    ];

    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockImplementation(() => lowAlerts);

    render(<StopPageRedesign stopId="123" />);
    expect(
      screen.queryByText("There is construction at this station.")
    ).not.toBeNull();
  });

  it("should only render current alerts and not future alerts", () => {
    const now = new Date();
    const future1 = add(now, { days: 1 });
    const future2 = add(now, { days: 3 });

    const alertsForStop: Alert[] = [
      {
        informed_entity: {
          entities: [{ stop: "Test 1" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000001",
        header: "Test Alert The Road Is Closed",
        effect: "1"
      },
      {
        informed_entity: {
          entities: [{ stop: "Test 1" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(future1), dateFormatter(future2)]],
        lifecycle: "new",
        id: "000002",
        header: "Test Alert The Road Is Open",
        effect: "2"
      }
    ] as Alert[];

    const alertsForRoute: Alert[] = [
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(future1), dateFormatter(future2)]],
        lifecycle: "new",
        id: "000003",
        header: "Test Alert The Walkway has spillage",
        effect: "3"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 3" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future2)]],
        lifecycle: "new",
        id: "000004",
        header: "Test Alert The Elevator is Malfunctioning",
        effect: "4"
      }
    ] as Alert[];

    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockImplementation(() => alertsForStop);

    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockImplementation(() => alertsForRoute);

    render(<StopPageRedesign stopId="Test 1" />);

    expect(screen.queryByText("Road Is Closed")).toBeDefined();
    expect(screen.queryByText("Road Is Open")).toBeNull();
    expect(screen.queryByText("The Walkway has spillage")).toBeNull();
    expect(screen.queryByText("Elevator is Malfunctioning")).toBeDefined();
  });

  it("should not render past alerts", () => {
    const now = new Date();
    const past1 = add(now, { days: -1 });
    const past2 = add(now, { days: -3 });

    const alertsForStop: Alert[] = [
      {
        informed_entity: {
          entities: [{ stop: "Test 1" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(past2), dateFormatter(past1)]],
        lifecycle: "new",
        id: "000001",
        header: "Test Alert The Road Is Closed",
        effect: "1"
      }
    ] as Alert[];

    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockImplementation(() => alertsForStop);

    render(<StopPageRedesign stopId="Test 1" />);

    expect(screen.queryByText("Road Is Closed")).toBeNull();
  });
});
