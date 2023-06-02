import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeparturesAndMap from "../components/DeparturesAndMap";
import { DirectionId, Stop } from "../../__v3api";
import { RouteWithPolylines } from "../../hooks/useRoute";
import { baseRoute, routeWithPolylines } from "./helpers";
import * as useRoute from "../../hooks/useRoute";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { add } from "date-fns";
import * as useVehiclesChannel from "../../hooks/useVehiclesChannel";
import { Route } from "../../__v3api";
import { FetchStatus } from "../../helpers/use-fetch";

const stop = {
  id: "test-stop",
  name: "Test Stop",
  latitude: 42.3519,
  longitude: 71.0552
} as Stop;
const route = baseRoute("TestRoute", 3);
const now = Date.now();

const schedules = [
  {
    route: route,
    stop: stop,
    trip: { id: "1", headsign: "TestRoute Route", direction_id: 1 },
    time: add(now, { minutes: 10 })
  },
  {
    route: route,
    stop: stop,
    trip: { id: "2", headsign: "TestRoute Route", direction_id: 0 },
    time: add(now, { minutes: 15 })
  },
  {
    route: route,
    stop: stop,
    trip: { id: "4", headsign: "TestRoute Route", direction_id: 1 },
    time: add(now, { minutes: 20 })
  }
] as ScheduleWithTimestamp[];

const v1 = {
  id: "y1799",
  route_id: "39",
  stop_id: "72",
  trip_id: "25",
  shape_id: "shape_1",
  direction_id: 1 as DirectionId,
  status: "STOPPED",
  latitude: 2.2,
  longitude: 1.1,
  bearing: 140,
  crowding: null
};
const v2 = {
  id: "y1800",
  route_id: "39",
  stop_id: "73",
  trip_id: "25",
  shape_id: "shape_1",
  direction_id: 1 as DirectionId,
  status: "STOPPED",
  latitude: 2.4,
  longitude: 1.3,
  bearing: 141,
  crowding: null
};

const testRoutesWithPolylines: RouteWithPolylines[] = [
  routeWithPolylines("SomeBus", 3, 0)
];
jest
  .spyOn(useRoute, "useRoutesByStop")
  .mockReturnValue({ status: FetchStatus.Data, data: testRoutesWithPolylines });

beforeEach(() => {
  jest.spyOn(useVehiclesChannel, "default").mockReturnValue([]);
});

describe("DeparturesAndMap", () => {
  it("should render", () => {
    let departuresAndMap = render(
      <DeparturesAndMap
        routes={[]}
        stop={stop}
        schedules={[]}
        routesWithPolylines={testRoutesWithPolylines}
        alerts={[]}
      />
    );

    const arr = departuresAndMap.baseElement.querySelector(
      ".stop-routes-and-map"
    );
    expect(arr).toBeInTheDocument();
  });

  it("opens departure list on click", async () => {
    const user = userEvent.setup();
    render(
      <DeparturesAndMap
        routes={[route]}
        stop={stop}
        schedules={schedules}
        routesWithPolylines={testRoutesWithPolylines}
        alerts={[]}
      />
    );

    const headSigns = screen.getAllByText(/TestRoute Route/);
    expect(headSigns.length).toBe(3);
    // The 2nd headsign instance is a clickable route
    await user.click(headSigns[1]);

    expect(screen.getByText("Back to all Test Stop routes")).toBeDefined();
  });

  it("closes departure list on click", async () => {
    const user = userEvent.setup();
    render(
      <DeparturesAndMap
        routes={[route]}
        stop={stop}
        schedules={schedules}
        routesWithPolylines={testRoutesWithPolylines}
        alerts={[]}
      />
    );

    const headSigns = screen.getAllByText(/TestRoute Route/);
    expect(headSigns.length).toBe(3);
    // The 2nd headsign instance is a clickable route
    await user.click(headSigns[1]);

    const back = screen.getByText("Back to all Test Stop routes");
    expect(back).toBeDefined();
    await user.click(back);

    expect(screen.queryByText("Back to all Test Stop routes")).toBeNull();
  });

  it("shows cr, subway, SL map routes by default", () => {
    const subwayRoute = routeWithPolylines("TrainRoute", 1, 3);
    const crRoute = routeWithPolylines("CRRoute", 2, 3);
    const slRoute = routeWithPolylines("741", 2, 3);
    const busRoute = routeWithPolylines("ABus", 3, 3);

    const allRoutes = [subwayRoute, crRoute, slRoute, busRoute];

    jest.spyOn(useRoute, "useRoutesByStop").mockReturnValue({
      status: FetchStatus.Data,
      data: [subwayRoute, crRoute, slRoute, busRoute]
    });

    const { container } = render(
      <DeparturesAndMap
        routes={[route]}
        stop={stop}
        schedules={schedules}
        routesWithPolylines={allRoutes}
        alerts={[]}
      />
    );

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

  it("when a row is clicked, vehicles for that route and the line for the selection are rendered", async () => {
    const subwayRoute = routeWithPolylines("TrainRoute", 1, 3);
    const crRoute = routeWithPolylines("CRRoute", 2, 3);
    const slRoute = routeWithPolylines("741", 2, 3);
    const busRoute = routeWithPolylines("ABus", 3, 3);

    const allRoutes = [subwayRoute, crRoute, slRoute, busRoute];

    jest.spyOn(useRoute, "useRoutesByStop").mockReturnValue({
      status: FetchStatus.Data,
      data: [subwayRoute, crRoute, slRoute, busRoute]
    });

    jest
      .spyOn(useVehiclesChannel, "default")
      .mockImplementation(routeSpec => (routeSpec === null ? [] : [v1, v2]));

    const busSchedules = [
      {
        route: busRoute as Route,
        stop: stop,
        trip: {
          id: "1",
          headsign: "BusRoute Headsign 1",
          direction_id: 1,
          shape_id: busRoute.polylines[0].id
        },
        time: add(Date.now(), { minutes: 10 })
      }
    ] as ScheduleWithTimestamp[];

    const { container } = render(
      <DeparturesAndMap
        routes={allRoutes}
        stop={stop}
        schedules={busSchedules}
        routesWithPolylines={allRoutes}
        alerts={[]}
      />
    );

    await userEvent.click(screen.getByText("BusRoute Headsign 1"));

    [subwayRoute, crRoute, slRoute]
      .flatMap(route => route.polylines)
      .forEach(({ id }) => {
        expect(container.querySelector(`.stop-map_line--${id}`)).toBeNull();
      });

    // Only the polyline for the selected bus route pattern is shown
    expect(
      container.querySelector(`.stop-map_line--${busRoute.polylines[0].id}`)
    ).toBeInTheDocument();
    busRoute.polylines.slice(1).forEach(({ id }) => {
      expect(container.querySelector(`.stop-map_line--${id}`)).toBeNull();
    });

    // vehicles are shown
    expect(
      screen.getByRole("img", {
        name: new RegExp(v1.id)
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: new RegExp(v2.id)
      })
    ).toBeInTheDocument();

    // clicking back button
    await userEvent.click(screen.getByText(`Back to all ${stop.name} routes`));

    // default route shapes shown
    [subwayRoute, crRoute, slRoute]
      .flatMap(route => route.polylines)
      .forEach(({ id }) => {
        expect(
          container.querySelector(`.stop-map_line--${id}`)
        ).toBeInTheDocument();
      });

    // selected bus shape cleared & no bus routes shown

    busRoute.polylines.forEach(({ id }) => {
      expect(container.querySelector(`.stop-map_line--${id}`)).toBeNull();
    });

    // vehicles for selected bus shape cleared
    [v1, v2].forEach(({ id }) => {
      expect(
        screen.queryByRole("img", {
          name: new RegExp(id)
        })
      ).toBeNull();
    });
  });
});
