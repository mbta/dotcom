import React from "react";
import { screen, within } from "@testing-library/dom";
import { act, RenderResult } from "@testing-library/react";
import StopPageRedesign from "../components/StopPageRedesign";
import * as useStop from "../../hooks/useStop";
import { InformedEntitySet, Alert } from "../../__v3api";
import * as useRoute from "../../hooks/useRoute";
import {
  customStop,
  newLatOrLon,
  renderWithRouter,
  routeWithPolylines
} from "./helpers";
import { RouteWithPolylines } from "../../hooks/useRoute";
import * as useSchedules from "../../hooks/useSchedules";
import * as useAlerts from "../../hooks/useAlerts";
import { add, format, formatISO } from "date-fns";
import { FetchStatus } from "../../helpers/use-fetch";
import * as usePredictionsChannel from "../../hooks/usePredictionsChannel";
import { PredictionWithTimestamp } from "../../models/predictions";

const renderWithAct = (children: React.ReactElement) =>
  act(() => {
    renderWithRouter(children);
  });

describe("StopPageRedesign", () => {
  beforeEach(() => {
    jest
      .spyOn(useRoute, "useRoutesByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: [] });

    jest
      .spyOn(useSchedules, "useSchedulesByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: [] });

    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: [] });
    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockReturnValue({ status: FetchStatus.Data, data: [] });

    jest
      .spyOn(useStop, "useFacilitiesByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: [] });

    jest.spyOn(useStop, "useStop").mockReturnValue({
      status: FetchStatus.Data,
      data: customStop({
        id: "123",
        name: "Test Stop",
        accessibility: ["ramp"],
        latitude: newLatOrLon(),
        longitude: newLatOrLon()
      })
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render", () => {
    renderWithAct(<StopPageRedesign stopId="123" />);
    expect(screen.queryByText("Test Stop")).not.toBeNull();
  });

  it("shows Loading without stop or routes", () => {
    jest
      .spyOn(useRoute, "useRoutesByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: undefined });
    jest
      .spyOn(useStop, "useStop")
      .mockReturnValue({ status: FetchStatus.Data, data: undefined });

    renderWithAct(<StopPageRedesign stopId="123" />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("shows Loading without alerts", () => {
    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: undefined });
    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockReturnValue({ status: FetchStatus.Data, data: undefined });

    renderWithAct(<StopPageRedesign stopId="123" />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("all modes show up in departure list", () => {
    const testRoutesWithPolylines: RouteWithPolylines[] = [
      routeWithPolylines("SomeBus", 3, 1),
      routeWithPolylines("741", 3, 2),
      routeWithPolylines("AnotherBus", 0, 1),
      routeWithPolylines("Train1", 1, 3),
      routeWithPolylines("Train2", 1, 4),
      routeWithPolylines("Train3", 1),
      routeWithPolylines("FerryRoute", 4, 1)
    ];
    jest.spyOn(useRoute, "useRoutesByStop").mockReturnValue({
      status: FetchStatus.Data,
      data: testRoutesWithPolylines
    });

    let renderResult: RenderResult;
    act(() => {
      renderResult = renderWithRouter(<StopPageRedesign stopId="123" />);
    });
    const { container } = renderResult!;
    // All routes appear in departures list
    const routeList = container.querySelector<HTMLElement>(
      "ul.stop-departures"
    )!;
    const routeNames = testRoutesWithPolylines.map(route => route.name);
    routeNames.forEach(name => {
      expect(within(routeList).getByText(name, { exact: false })).toBeTruthy();
    });
  });

  it("only subway, cr, and SL polylines shown by default", () => {
    const subwayRoute = routeWithPolylines("TrainRoute", 1, 3);
    const crRoute = routeWithPolylines("CRRoute", 2, 3);
    const slRoute = routeWithPolylines("741", 2, 3);
    const busRoute = routeWithPolylines("ABus", 3, 3);

    jest.spyOn(useRoute, "useRoutesByStop").mockReturnValue({
      status: FetchStatus.Data,
      data: [subwayRoute, crRoute, slRoute, busRoute]
    });

    let renderResult: RenderResult;
    act(() => {
      renderResult = renderWithRouter(<StopPageRedesign stopId="123" />);
    });
    const { container } = renderResult!;

    [subwayRoute, crRoute, slRoute]
      .flatMap(route => route.polylines)
      .forEach(({ id }) => {
        expect(
          container.querySelector(`.stop-map_line--${id}`)
        ).toBeInTheDocument();
      });

    busRoute.polylines.forEach(({ id }) => {
      expect(container.querySelector(`.stop-map_line--${id}`)).toBeNull();
    });
  });

  const dateFormatter = (date: Date): string => {
    return formatISO(date);
  };

  it("should render shuttle alerts", () => {
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
        effect: "shuttle",
        description: "",
        url: "https://www.mbta.com",
        banner: null
      }
    ];

    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: lowAlerts });

    renderWithAct(<StopPageRedesign stopId="123" />);
    expect(
      screen.queryByText("There is construction at this station.")
    ).not.toBeNull();
  });

  it("should only render closures, shuttles, moved stops, and supensions", () => {
    const now = new Date();
    const future1 = add(now, { days: 1 });
    const alertsForRoute: Alert[] = [
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000003",
        header: "Test Alert The Walkway has spillage",
        effect: "detour"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000013",
        header: "The Elevator Is Closed",
        effect: "elevator_closure"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000004",
        header: "Road Closed",
        effect: "shuttle"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000005",
        header: "Stop Closed",
        effect: "stop_closure"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000006",
        header: "Route Suspended",
        effect: "suspension"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000009",
        header: "Station Closed",
        effect: "station_closure"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000008",
        header: "Stop has Moved",
        effect: "stop_moved"
      }
    ] as Alert[];

    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockReturnValue({ status: FetchStatus.Data, data: alertsForRoute });

    renderWithAct(<StopPageRedesign stopId="Test 1" />);
    expect(screen.getByText(/Road Closed/)).toBeInTheDocument();
    expect(screen.getByText(/Stop Closed/)).toBeInTheDocument();
    expect(screen.getByText(/Stop has Moved/)).toBeInTheDocument();
    expect(screen.getByText(/Route Suspended/)).toBeInTheDocument();
    expect(screen.getByText(/Station Closed/)).toBeInTheDocument();
    expect(screen.queryByText(/The Walkway has spillage/)).toBeNull();
    expect(screen.queryByText(/The Elevator Is Closed/)).toBeNull();
  });

  it("should only render current stop alerts and route alerts within 7 days", () => {
    const now = new Date();
    const past1 = add(now, { days: -1 });
    const past2 = add(now, { days: -5 });
    const future1 = add(now, { days: 3 });
    const future2 = add(now, { days: 8 });
    const future3 = add(now, { days: 9 });

    const alertsForStop: Alert[] = [
      {
        informed_entity: {
          entities: [{ stop: "Test 1" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000001",
        header: "Test Alert The Road Is Closed",
        effect: "suspension"
      },
      {
        informed_entity: {
          entities: [{ stop: "Test 1" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(past2), dateFormatter(past1)]],
        lifecycle: "new",
        id: "000009",
        header: "Test Alert The Station is Closed",
        effect: "station_closure"
      },
      {
        informed_entity: {
          entities: [{ stop: "Test 1" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(past1), dateFormatter(future3)]],
        lifecycle: "new",
        id: "000002",
        header: "Test Alert The Road Is Open",
        effect: "stop_closure"
      }
    ] as Alert[];

    const alertsForRoute: Alert[] = [
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(future2), dateFormatter(future3)]],
        lifecycle: "new",
        id: "000003",
        header: "Test Alert The Walkway has spillage",
        effect: "stop_closure"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 3" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(past1), dateFormatter(future3)]],
        lifecycle: "new",
        id: "000004",
        header: "Test Alert The Elevator is Malfunctioning",
        effect: "stop_closure"
      }
    ] as Alert[];

    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: alertsForStop });

    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockReturnValue({ status: FetchStatus.Data, data: alertsForRoute });

    renderWithAct(<StopPageRedesign stopId="Test 1" />);

    expect(screen.getByText(/Road Is Closed/)).toBeInTheDocument();
    expect(screen.queryByText(/Road Is Open/)).toBeInTheDocument();
    expect(screen.queryByText(/Test Alert The Station is Closed/)).toBeNull();
    expect(screen.queryByText(/The Walkway has spillage/)).toBeNull();
    expect(screen.getByText(/Elevator is Malfunctioning/)).toBeInTheDocument();
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
        effect: "stop_closure"
      }
    ] as Alert[];

    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: alertsForStop });

    renderWithAct(<StopPageRedesign stopId="Test 1" />);

    expect(screen.queryByText("Road Is Closed")).toBeNull();
  });

  it("should only render alerts with no banner", () => {
    const now = new Date();
    const future1 = add(now, { days: 3 });
    const alertsForRoute: Alert[] = [
      {
        informed_entity: {
          entities: [{ route: "CT6" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(future1), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000003",
        header:
          "Route 110 service suspended beginning at 12:51 PM Testing - Route 110 Suspended on all stops",
        effect: "suspension",
        banner:
          "Route 110 service suspended beginning at 12:51 PM Testing - Route 110 Suspended on all stops"
      },
      {
        informed_entity: {
          entities: [{ route: "SL9" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000004",
        header: "Test Alert The Elevator is Malfunctioning",
        effect: "stop_closure",
        banner: null
      }
    ] as Alert[];

    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockReturnValue({ status: FetchStatus.Data, data: alertsForRoute });

    renderWithAct(<StopPageRedesign stopId="Test 1" />);

    expect(
      screen.getByText(/Test Alert The Elevator is Malfunctioning/)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        /Route 110 service suspended beginning at 12:51 PM Testing - Route 110 Suspended on all stops/
      )
    ).toBeNull();
  });

  it("should show error message when null predictions", () => {
    jest.spyOn(usePredictionsChannel, "default").mockReturnValue(null);
    renderWithAct(<StopPageRedesign stopId="123" />);
    expect(
      screen.getByText("Live information could not be loaded.")
    ).toBeInTheDocument();
  });

  it("should not show error message when non-null predictions", () => {
    jest
      .spyOn(usePredictionsChannel, "default")
      .mockReturnValue([] as PredictionWithTimestamp[]);
    renderWithAct(<StopPageRedesign stopId="123" />);
    expect(
      screen.queryByText("Live information could not be loaded.")
    ).toBeNull();
  });
});
