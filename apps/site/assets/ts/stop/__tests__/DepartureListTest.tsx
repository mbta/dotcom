import { add } from "date-fns";
import React from "react";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { baseRoute } from "./helpers";
import { Stop } from "../../__v3api";
import DepartureList from "../components/DepartureList";
import { render, screen } from "@testing-library/react";
import * as predictionsChannel from "../../hooks/usePredictionsChannel";
import { PredictionWithTimestamp } from "../../models/perdictions";

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

const predictionTime = add(Date.now(), { minutes: 11 });
jest.spyOn(predictionsChannel, "default").mockImplementation(() => {
  return {
    "TestRoute Route": [
      {
        time: new Date("2022-04-27T11:15:00-04:00"),
        trip: schedules[0].trip
      },
      {
        trip: schedules[1].trip,
        time: predictionTime
      }
    ] as PredictionWithTimestamp[]
  };
});

describe("DepartureList", () => {
  it("should render a schedule when no predictions available", () => {
    render(
      <DepartureList
        route={route}
        stop={stop}
        schedules={schedules}
        directionId={0}
      />
    );

    expect(screen.getByText(schedules[2].time.toString())).toBeDefined();
  });

  it("should render a prediction time if available", () => {
    render(
      <DepartureList
        route={route}
        stop={stop}
        schedules={schedules}
        directionId={0}
      />
    );
    expect(screen.getByText(predictionTime.toString())).toBeDefined();
  });

  it("header has link to schedule page variant ", () => {
    render(
      <DepartureList
        route={route}
        stop={stop}
        schedules={schedules}
        directionId={0}
      />
    );
    expect(
      screen.getByRole("link", { name: "View all schedules" })
    ).toHaveAttribute(
      "href",
      "../schedules/TestRoute/line?schedule_direction[direction_id]=0&schedule_direction[variant]=Blue-6-1"
    );
  });
});
