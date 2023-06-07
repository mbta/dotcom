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
        url: "https://www.mbta.com"
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

  it("should only render alerts not in global banner", () => {
    const globalBanner = (
      <div className="announcement-container alert-announcement__container">
        <div className="container">
          <div className="alert-announcement__header">
            <div className="c-alert-item c-alert-item--system">
              <div className="c-alert-item__icon">
                <span className="notranslate c-svg__icon-alerts-triangle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 48 48"
                  >
                    {" "}
                    <title> alert </title>{" "}
                    <path
                      fill="#1c1e23"
                      d="m47.55089 42.53651-20.5403-40.60229a3.60991 3.60991 0 0 0 -1.27059-1.3994 3.08289 3.08289 0 0 0 -3.4708 0 3.57213 3.57213 0 0 0 -1.2518 1.3994l-20.5404 40.60229a3.715 3.715 0 0 0 0 3.6423 3.47281 3.47281 0 0 0 1.2518 1.3228 3.21739 3.21739 0 0 0 1.70689.49839h41.1186a3.16147 3.16147 0 0 0 1.688-.49841 3.47248 3.47248 0 0 0 1.2517-1.3228 3.71467 3.71467 0 0 0 .0569-3.64228z"
                    ></path>{" "}
                    <g fill="#fff">
                      {" "}
                      <path d="m27.04259 39.22282a.71323.71323 0 0 1 -.21909.544.73324.73324 0 0 1 -.54.2332h-4.5683a.73294.73294 0 0 1 -.5394-.2332.77238.77238 0 0 1 -.2192-.544v-4.4456a.77247.77247 0 0 1 .2192-.544.73331.73331 0 0 1 .53939-.23322h4.56881a.73351.73351 0 0 1 .54.2332.71375.71375 0 0 1 .2192.544z"></path>{" "}
                      <path d="m26.73759 30.35892a.62508.62508 0 0 1 -.2345.4568.7061.7061 0 0 1 -.516.1828h-4.12809a.73374.73374 0 0 1 -.516-.1828.53482.53482 0 0 1 -.219-.4568l-1.1215-14.4817a.71.71 0 0 1 .2189-.5848.76.76 0 0 1 .516-.2924h6.512a.81448.81448 0 0 1 .53161.2924.70371.70371 0 0 1 .2189.53z"></path>{" "}
                    </g>
                  </svg>
                </span>
              </div>
              <div className="c-alert-item__top">
                <div className="c-alert-item__top-text-container">
                  <div className="c-alert-item__effect">Suspension</div>
                  <div>
                    Route 110 service suspended beginning at 12:51 PM Testing -
                    Route 110 Suspended on all stops
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
        effect: "suspension"
      },
      {
        informed_entity: {
          entities: [{ route: "SL9" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000004",
        header: "Test Alert The Elevator is Malfunctioning",
        effect: "stop_closure"
      }
    ] as Alert[];

    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockReturnValue({ status: FetchStatus.Data, data: alertsForRoute });

    render(globalBanner);
    render(<StopPageRedesign stopId="Test 1" />);

    expect(
      screen.getByText(/Test Alert The Elevator is Malfunctioning/)
    ).toBeInTheDocument();
    const suspensionAlerts = screen.getAllByText(
      /Route 110 service suspended beginning at 12:51 PM Testing - Route 110 Suspended on all stops/
    );
    expect(suspensionAlerts.length).toBe(1);
  });
});
