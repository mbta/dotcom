import React from "react";
import DisplayTime from "../components/DisplayTime";
import { render, screen } from "@testing-library/react";
import { PredictionWithTimestamp } from "../../models/perdictions";
import { DepartureInfo } from "../../models/departureInfo";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { Route, Trip } from "../../__v3api";

const schedule = { time: new Date() } as ScheduleWithTimestamp;
const prediction = {} as PredictionWithTimestamp;
const departureWithoutPrediction: DepartureInfo = {
  schedule,
  route: {} as Route,
  trip: {} as Trip
};
const departureWithPrediction: DepartureInfo = Object.assign(
  {},
  departureWithoutPrediction,
  { prediction }
);

describe("DisplayTime", () => {
  it("shows predictions with realtime icon", () => {
    const { container } = render(
      <DisplayTime departure={departureWithPrediction} isCR={false} />
    );
    expect(container.querySelector(".c-svg__icon--realtime")).toBeTruthy();

    const { container: containerNoPrediction } = render(
      <DisplayTime departure={departureWithoutPrediction} isCR={false} />
    );
    expect(
      containerNoPrediction.querySelector(".c-svg__icon--realtime")
    ).toBeFalsy();
  });

  describe("shows times", () => {
    it("with tomorrow indication", () => {
      const dateNow = new Date();
      render(<DisplayTime departure={departureWithPrediction} isCR={false} />);
      expect(screen.queryByText("Tomorrow")).toBeFalsy();

      const dateTomorrow = new Date(dateNow);
      dateTomorrow.setDate(dateTomorrow.getDate() + 1);
      render(
        <DisplayTime
          departure={
            {
              ...departureWithPrediction,
              schedule: {
                ...departureWithPrediction.schedule,
                time: dateTomorrow
              }
            } as DepartureInfo
          }
          isCR={false}
        />
      );
      expect(screen.queryByText("Tomorrow")).toBeTruthy();
    });
    it("with track name", () => {
      render(
        <DisplayTime
          departure={
            {
              ...departureWithPrediction,
              prediction: { ...departureWithPrediction.prediction, track: "9" }
            } as DepartureInfo
          }
          isCR={true}
        />
      );
      expect(screen.queryByText("Track 9")).toBeTruthy();
    });
    it("using schedule time as backup", () => {
      const scheduledDateTime = new Date("2023-06-01T09:24:00-04:00");
      const withSchedule: DepartureInfo = {
        schedule: { time: scheduledDateTime } as ScheduleWithTimestamp
      } as DepartureInfo;
      const predictedDateTime = new Date("2023-06-01T09:27:00-04:00");
      const withScheduleAndPrediction = {
        ...withSchedule,
        prediction: { time: predictedDateTime }
      } as DepartureInfo;
      render(<DisplayTime departure={withScheduleAndPrediction} isCR={true} />);
      expect(screen.queryByText("9:27 AM")).toBeTruthy();
      expect(screen.queryByText("9:24 AM")).toBeFalsy();
      render(<DisplayTime departure={withSchedule} isCR={true} />);
      expect(screen.queryByText("9:24 AM")).toBeTruthy();
    });
  });
  describe("shows delayed", () => {
    it("predictions with scheduled time with strikethrough (<1 hour away)", () => {
      const nowTime = new Date("2023-06-01T09:10:00-04:00");
      const departure = {
        isDelayed: true,
        schedule: { ...schedule, time: new Date("2023-06-01T09:13:00-04:00") },
        prediction: {
          ...prediction,
          time: new Date("2023-06-01T09:19:00-04:00")
        }
      } as DepartureInfo;
      render(
        <DisplayTime departure={departure} isCR={false} targetDate={nowTime} />
      );
      expect(screen.queryByText("9 min")).toBeTruthy();
      expect(screen.findByText("Delayed 9:19 AM")).toBeTruthy();
      expect(screen.getByText("9:13 AM")).toHaveClass("strikethrough");
    });
    it("predictions only (<1 hour away) (subway)", () => {
      const nowTime = new Date("2023-06-01T09:10:00-04:00");
      const departure = {
        isDelayed: true,
        schedule: { ...schedule, time: new Date("2023-06-01T09:13:00-04:00") },
        prediction: {
          ...prediction,
          time: new Date("2023-06-01T09:19:00-04:00")
        },
        routeMode: "subway"
      } as DepartureInfo;
      render(
        <DisplayTime departure={departure} isCR={false} targetDate={nowTime} />
      );
      expect(screen.queryByText("9 min")).toBeTruthy();
      expect(screen.queryByText("9:13 AM")).toBeNull();
    });
    it("predictions with scheduled time with strikethrough (<1 hour away) (CR)", () => {
      const nowTime = new Date("2023-06-01T09:10:00-04:00");
      const departure = {
        isDelayed: true,
        schedule: { ...schedule, time: new Date("2023-06-01T09:13:00-04:00") },
        prediction: {
          ...prediction,
          time: new Date("2023-06-01T09:19:00-04:00")
        },
        routeMode: "commuter_rail"
      } as DepartureInfo;
      render(
        <DisplayTime departure={departure} isCR={true} targetDate={nowTime} />
      );
      expect(screen.queryByText("9 min")).toBeFalsy();
      expect(screen.queryByText("Delayed")).toBeTruthy();
      expect(screen.getByText("9:13 AM")).toHaveClass("strikethrough");
      expect(screen.getByText("9:19 AM")).not.toHaveClass("strikethrough");
    });
    it("predictions with scheduled time with strikethrough (1+ hour away)", () => {
      const nowTime = new Date("2023-06-01T09:10:00-04:00");
      const departure = {
        isDelayed: true,
        schedule: { ...schedule, time: new Date("2023-06-01T11:38:00-04:00") },
        prediction: {
          ...prediction,
          time: new Date("2023-06-01T11:43:00-04:00")
        }
      } as DepartureInfo;
      render(
        <DisplayTime departure={departure} isCR={false} targetDate={nowTime} />
      );
      expect(screen.findByText("Delayed 11:43 AM")).toBeTruthy();
      expect(screen.getByText("11:38 AM")).toHaveClass("strikethrough");
    });
    it("(for subway) shows only predicted time (1+ hour away)", () => {
      const nowTime = new Date("2023-06-01T09:10:00-04:00");
      const departure = {
        isDelayed: true,
        schedule: { ...schedule, time: new Date("2023-06-01T11:38:00-04:00") },
        prediction: {
          ...prediction,
          time: new Date("2023-06-01T11:43:00-04:00")
        },
        routeMode: "subway"
      } as DepartureInfo;
      render(
        <DisplayTime departure={departure} isCR={false} targetDate={nowTime} />
      );
      expect(screen.getByText("11:43 AM")).toBeDefined();
      expect(screen.queryByText("11:38 AM")).toBeNull();
    });
  });
});
