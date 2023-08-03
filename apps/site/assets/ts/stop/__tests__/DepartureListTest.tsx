import { add } from "date-fns";
import React from "react";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { baseRoute } from "./helpers";
import { Alert, Stop } from "../../__v3api";
import DepartureList from "../components/DepartureList";
import { render, screen } from "@testing-library/react";
import { PredictionWithTimestamp } from "../../models/predictions";
import { mergeIntoDepartureInfo } from "../../helpers/departureInfo";

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
    trip: {
      id: "1",
      headsign: "TestRoute Route",
      direction_id: 1,
      route_pattern_id: "Blue-6-1"
    },
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

const predictions = [
  {
    route: route,
    time: new Date("2022-04-27T11:15:00-04:00"),
    trip: schedules[0].trip
  },
  {
    route: route,
    trip: schedules[1].trip,
    time: add(Date.now(), { minutes: 11 })
  }
] as PredictionWithTimestamp[];

const departures = mergeIntoDepartureInfo(schedules, predictions);

describe("DepartureList", () => {
  it("should render predictions even when no schedules available", () => {
    const { container } = render(
      <DepartureList
        route={route}
        stop={stop}
        departures={mergeIntoDepartureInfo([], predictions)}
        directionId={0}
        headsign={"Cucamonga"}
        alerts={[]}
      />
    );
    expect(screen.queryAllByRole("listitem")).toHaveLength(predictions.length);
    expect(container.querySelector(".c-svg__icon--realtime")).toBeTruthy();
    expect(screen.queryByText("10 min")).toBeTruthy();
  });

  it("should render a schedule when no predictions available", () => {
    render(
      <DepartureList
        route={route}
        stop={stop}
        departures={mergeIntoDepartureInfo(schedules, [])}
        directionId={0}
        headsign={"Atlantis"}
        alerts={[]}
      />
    );

    expect(screen.queryAllByRole("listitem")).toHaveLength(schedules.length);
    expect(screen.queryByText("9 min")).toBeTruthy();
    expect(screen.queryByText("14 min")).toBeTruthy();
    expect(screen.queryByText("19 min")).toBeTruthy();
  });

  it("should render a prediction time if available", () => {
    render(
      <DepartureList
        route={route}
        stop={stop}
        departures={departures}
        directionId={0}
        headsign={"Disney"}
        alerts={[]}
      />
    );

    expect(screen.queryAllByRole("listitem")).toHaveLength(schedules.length);
    expect(screen.queryByText("<1 minute away")).toBeTruthy();
    expect(screen.queryByText("10 min")).toBeTruthy();
    expect(screen.queryByText("19 min")).toBeTruthy();
  });

  it("header has link to schedule page variant ", () => {
    render(
      <DepartureList
        route={route}
        stop={stop}
        departures={departures}
        directionId={0}
        headsign={"Bermuda"}
        alerts={[]}
      />
    );
    expect(
      screen.getByRole("link", { name: "View all schedules" })
    ).toHaveAttribute(
      "href",
      "../schedules/TestRoute/line?schedule_direction[direction_id]=0&schedule_direction[variant]=Blue-6-1&schedule_finder[direction_id]=0&schedule_finder[origin]=test-stop"
    );
  });

  it("renders alert cards", () => {
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
    render(
      <DepartureList
        route={route}
        stop={stop}
        departures={departures}
        directionId={0}
        headsign={"San Fransokyo"}
        alerts={alerts}
      />
    );

    expect(screen.queryByText("Shuttle Service")).toBeDefined();
    expect(screen.queryByText("Detour")).toBeDefined();
    expect(screen.queryByText("Suspension")).toBeDefined();
    expect(screen.queryByText("Delay")).toBeNull();
  });

  it("subheading includes stop + headsign name", () => {
    render(
      <DepartureList
        route={route}
        stop={stop}
        departures={departures}
        directionId={0}
        headsign={"Gotham"}
        alerts={[]}
      />
    );
    expect(
      screen.getByRole("heading", { name: `${stop.name} to Gotham` })
    ).toBeDefined();
  });

  it("should render `No upcoming trips today` if there are no schedules", () => {
    render(
      <DepartureList
        alerts={[]}
        route={route}
        stop={stop}
        departures={[]}
        directionId={0}
        headsign="Riverdale"
      />
    );
    expect(screen.getByText("No upcoming trips today")).toBeDefined();
  });

  it("should display cancelled if the trip has been cancelled", () => {
    const predictions = [
      {
        time: new Date("2022-04-27T11:15:00-04:00"),
        trip: { id: "1" },
        schedule_relationship: "cancelled",
        route: { type: 2 }
      }
    ] as PredictionWithTimestamp[];

    const schedules = [
      {
        trip: { id: "1", headsign: "TestRoute Route" },
        route: { type: 2 }
      }
    ] as ScheduleWithTimestamp[];

    render(
      <DepartureList
        alerts={[]}
        route={route}
        stop={stop}
        departures={mergeIntoDepartureInfo(schedules, predictions)}
        directionId={0}
        headsign="Smallville"
      />
    );
    expect(screen.getByText("Cancelled")).toBeInTheDocument();
  });

  it("should not display cancelled if the trip is a subway trip", () => {
    const predictions = [
      {
        time: new Date("2022-04-27T11:15:00-04:00"),
        route: { type: 0 },
        trip: { id: "1" },
        schedule_relationship: "cancelled"
      },
      {
        time: new Date("2022-04-27T11:25:00-04:00"),
        route: { type: 2 },
        trip: { id: "2" }
      }
    ] as PredictionWithTimestamp[];

    const schedules = [
      {
        trip: { id: "1", headsign: "TestRoute Route" },
        route: { type: 0 }
      },
      {
        trip: { id: "2", headsign: "TestRoute Route" },
        route: { type: 2 }
      }
    ] as ScheduleWithTimestamp[];

    render(
      <DepartureList
        alerts={[]}
        route={route}
        stop={stop}
        departures={mergeIntoDepartureInfo(schedules, predictions)}
        directionId={0}
        headsign="Emerald City"
        targetDate={new Date("2022-04-27T11:00:00-04:00")}
      />
    );
    expect(screen.queryByText("Cancelled")).not.toBeInTheDocument();
    expect(screen.getByText("25 min")).toBeInTheDocument();
  });
});
