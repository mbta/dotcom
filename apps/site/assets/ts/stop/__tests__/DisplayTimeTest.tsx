import React from "react";
import DisplayTime from "../components/DisplayTime";
import { render, screen } from "@testing-library/react";
import { PredictionWithTimestamp } from "../../models/perdictions";
import { DepartureInfo } from "../../models/departureInfo";
import { ScheduleWithTimestamp } from "../../models/schedules";

const schedule = {} as ScheduleWithTimestamp;
const prediction = {} as PredictionWithTimestamp;
const departureWithoutPrediction: DepartureInfo = { schedule };
const departureWithPrediction: DepartureInfo = { prediction, schedule };

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
      render(
        <DisplayTime
          departure={{ schedule: { time: dateNow } as ScheduleWithTimestamp }}
          isCR={false}
        />
      );
      expect(screen.queryByText("Tomorrow")).toBeFalsy();

      const dateTomorrow = new Date(dateNow);
      dateTomorrow.setDate(dateTomorrow.getDate() + 1);
      render(
        <DisplayTime
          departure={{
            schedule: { time: dateTomorrow } as ScheduleWithTimestamp
          }}
          isCR={false}
        />
      );
      expect(screen.queryByText("Tomorrow")).toBeTruthy();
    });
    it("with track name", () => {
      render(
        <DisplayTime
          departure={{ prediction: { track: "9" } as PredictionWithTimestamp }}
          isCR={true}
        />
      );
      expect(screen.queryByText("Track 9")).toBeTruthy();
    });
    it("using schedule time as backup", () => {
      const scheduledDateTime = new Date("2023-06-01T09:24:00");
      const withSchedule: DepartureInfo = {
        schedule: { time: scheduledDateTime } as ScheduleWithTimestamp
      };
      const predictedDateTime = new Date("2023-06-01T09:27:00");
      const withScheduleAndPrediction: DepartureInfo = {
        schedule,
        prediction: { time: predictedDateTime } as PredictionWithTimestamp
      };

      render(<DisplayTime departure={withScheduleAndPrediction} isCR={true} />);
      expect(screen.queryByText("9:27 AM")).toBeTruthy();
      expect(screen.queryByText("9:24 AM")).toBeFalsy();
      render(<DisplayTime departure={withSchedule} isCR={true} />);
      expect(screen.queryByText("9:24 AM")).toBeTruthy();
    });
  });
  describe("shows delayed", () => {
    it("predictions with scheduled time with strikethrough (<1 hour away)", () => {
      const nowTime = new Date("2023-06-01T09:10:00");
      const departure: DepartureInfo = {
        isDelayed: true,
        schedule: { ...schedule, time: new Date("2023-06-01T09:13:00") },
        prediction: { ...prediction, time: new Date("2023-06-01T09:19:00") }
      };
      render(
        <DisplayTime departure={departure} isCR={false} targetDate={nowTime} />
      );
      expect(screen.queryByText("9 min")).toBeTruthy();
      expect(screen.findByText("Delayed 9:19 AM")).toBeTruthy();
      expect(screen.getByText("9:13 AM")).toHaveClass("strikethrough");
    });
    it("predictions with scheduled time with strikethrough (<1 hour away) (CR)", () => {
      const nowTime = new Date("2023-06-01T09:10:00");
      const departure: DepartureInfo = {
        isDelayed: true,
        schedule: { ...schedule, time: new Date("2023-06-01T09:13:00") },
        prediction: { ...prediction, time: new Date("2023-06-01T09:19:00") }
      };
      render(
        <DisplayTime departure={departure} isCR={true} targetDate={nowTime} />
      );
      expect(screen.queryByText("9 min")).toBeFalsy();
      expect(screen.queryByText("Delayed")).toBeFalsy();
      expect(screen.getByText("9:13 AM")).toHaveClass("strikethrough");
      expect(screen.getByText("9:19 AM")).not.toHaveClass("strikethrough");
    });
    it("predictions with scheduled time with strikethrough (1+ hour away)", () => {
      const nowTime = new Date("2023-06-01T09:10:00");
      const departure: DepartureInfo = {
        isDelayed: true,
        schedule: { ...schedule, time: new Date("2023-06-01T11:38:00") },
        prediction: { ...prediction, time: new Date("2023-06-01T11:43:00") }
      };
      render(
        <DisplayTime departure={departure} isCR={false} targetDate={nowTime} />
      );
      expect(screen.findByText("Delayed 11:43 AM")).toBeTruthy();
      expect(screen.getByText("11:38 AM")).toHaveClass("strikethrough");
    });
  });
});
