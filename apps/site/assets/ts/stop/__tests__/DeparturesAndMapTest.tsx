import React from "react";
import DeparturesAndMap from "../components/DeparturesAndMap";
import { Stop } from "../../__v3api";
import { RouteWithPolylines } from "../../hooks/useRoute";
import { baseRoute, routeWithPolylines } from "./helpers";
import * as useRoute from "../../hooks/useRoute";
import { fireEvent, render } from "@testing-library/react";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { add } from "date-fns";

const stop = {
  id: "test-stop",
  name: "Test Stop",
  latitude: 42.3519,
  longitude: 71.0552
} as Stop;
const route = baseRoute("TestRoute", 3);

const schedules = [
  {
    route: route,
    stop: stop,
    trip: { id: "1", headsign: "TestRoute Route", direction_id: 1 },
    time: add(Date.now(), { minutes: 10 })
  },
  {
    route: route,
    stop: stop,
    trip: { id: "2", headsign: "TestRoute Route", direction_id: 0 },
    time: add(Date.now(), { minutes: 15 })
  },
  {
    route: route,
    stop: stop,
    trip: { id: "4", headsign: "TestRoute Route", direction_id: 1 },
    time: add(Date.now(), { minutes: 20 })
  }
] as ScheduleWithTimestamp[];

const testRoutesWithPolylines: RouteWithPolylines[] = [
  routeWithPolylines("SomeBus", 3, 0)
];
jest.spyOn(useRoute, "useRoutesByStop").mockImplementation(() => {
  return testRoutesWithPolylines;
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
    expect(arr).toBeDefined();
  });

  it("opens departure list on click", () => {
    let departuresAndMap = render(
      <DeparturesAndMap
        routes={[route]}
        stop={stop}
        schedules={schedules}
        routesWithPolylines={testRoutesWithPolylines}
        alerts={[]}
      />
    );

    const departuresAndMapContainer = departuresAndMap.container;
    expect(
      departuresAndMapContainer.querySelector(".departure-card__headsign")
    ).toBeDefined();
    expect(
      departuresAndMapContainer.querySelector("departures-container")
    ).toBeNull();
    fireEvent.click(
      departuresAndMapContainer.querySelector(".departure-row-click-test")!
    );
    expect(
      departuresAndMapContainer.querySelector("departures-container")
    ).toBeDefined();
  });

  it("closes departure list on click", () => {
    let departuresAndMap = render(
      <DeparturesAndMap
        routes={[route]}
        stop={stop}
        schedules={schedules}
        routesWithPolylines={testRoutesWithPolylines}
        alerts={[]}
      />
    );

    const departuresAndMapContainer = departuresAndMap.container;
    fireEvent.click(
      departuresAndMapContainer.querySelector(".departure-row-click-test")!
    );
    expect(
      departuresAndMapContainer.querySelector("departures-container")
    ).toBeDefined();
    fireEvent.click(
      departuresAndMapContainer.querySelector(".back-to-routes")!
    );
    expect(
      departuresAndMapContainer.querySelector("departures-container")
    ).toBeNull();
  });
});
