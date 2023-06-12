import React from "react";
import { screen, within } from "@testing-library/dom";
import { render } from "@testing-library/react";
import StopPageRedesign from "../components/StopPageRedesign";
import * as useStop from "../../hooks/useStop";
import { Stop, ParkingLot, InformedEntitySet, Alert } from "../../__v3api";
import * as useRoute from "../../hooks/useRoute";
import { newLatOrLon, routeWithPolylines } from "./helpers";
import { RouteWithPolylines } from "../../hooks/useRoute";
import * as useSchedules from "../../hooks/useSchedules";
import * as useAlerts from "../../hooks/useAlerts";
import { add, format } from "date-fns";
import { FetchStatus } from "../../helpers/use-fetch";
import { gl } from "date-fns/locale";
import ReactDOMServer from "react-dom/server";

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

    jest.spyOn(useStop, "default").mockReturnValue({
      status: FetchStatus.Data,
      data: {
        id: "123",
        name: "Test Stop",
        parking_lots: [] as ParkingLot[],
        accessibility: ["ramp"],
        latitude: newLatOrLon(),
        longitude: newLatOrLon()
      } as Stop
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
    jest
      .spyOn(useRoute, "useRoutesByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: undefined });
    jest
      .spyOn(useStop, "default")
      .mockReturnValue({ status: FetchStatus.Data, data: undefined });

    render(<StopPageRedesign stopId="123" />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("shows Loading without alerts", () => {
    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: undefined });
    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockReturnValue({ status: FetchStatus.Data, data: undefined });

    render(<StopPageRedesign stopId="123" />);
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

    const { container } = render(<StopPageRedesign stopId="123" />);

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

    const { container } = render(<StopPageRedesign stopId="123" />);

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
        url: "https://www.mbta.com",
        banner: null
      }
    ];

    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: lowAlerts });

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
      .mockReturnValue({ status: FetchStatus.Data, data: alertsForStop });

    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockReturnValue({ status: FetchStatus.Data, data: alertsForRoute });

    render(<StopPageRedesign stopId="Test 1" />);

    expect(screen.getByText(/Road Is Closed/)).toBeInTheDocument();
    expect(screen.queryByText(/Road Is Open/)).toBeNull();
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
        effect: "1"
      }
    ] as Alert[];

    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: alertsForStop });

    render(<StopPageRedesign stopId="Test 1" />);

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

    render(<StopPageRedesign stopId="Test 1" />);

    expect(
      screen.getByText(/Test Alert The Elevator is Malfunctioning/)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        /Route 110 service suspended beginning at 12:51 PM Testing - Route 110 Suspended on all stops/
      )
    ).toBeNull();
  });
});
