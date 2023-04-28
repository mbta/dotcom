import React from "react";
import { render, screen } from "@testing-library/react";
import DepartureTimes, {
  getNextTwoTimes,
  infoToDisplayTime,
  isDelayed
} from "../../components/DepartureTimes";
import { baseRoute } from "../helpers";
import {
  PredictionForStop,
  ScheduleForStop,
  Stop,
  Trip
} from "../../../__v3api";
import { compareAsc, differenceInSeconds } from "date-fns";

const route = baseRoute("TestRoute", 1);
const stop = {} as Stop;
const destinationText = route.direction_destinations[0]!;

describe("(WIP) DepartureTimes", () => {
  it("should display a default", () => {
    render(
      <DepartureTimes
        route={route}
        stop={stop}
        directionId={0}
        schedulesForDirection={[]}
      />
    );
    expect(screen.findByText(destinationText)).toBeDefined();
    expect(
      screen.queryByRole("button", {
        name: `Open upcoming departures to ${destinationText}`
      })
    ).toBeDefined();
  });

  describe("isDelayed", () => {
    it("should return true if there is larger than a 60 second gap between the schedule and prediction", () => {
      const prd1 = {
        id: "p1",
        stop: {} as any,
        route: {} as any,
        trip: { id: "1" } as Trip,
        time: new Date("2022-04-26T11:17:15-04:00"),
        direction_id: 0,
        schedule_relationship: null,
        track: null,
        status: null
      } as PredictionForStop;
      const schedules = [
        {
          stop: {} as any,
          route: {} as any,
          trip: { id: "1" } as Trip,
          time: new Date("2022-04-26T11:15:00-04:00"),
          stop_sequence: 1,
          pickup_type: 1
        }
      ] as ScheduleForStop[];
      expect(isDelayed(prd1, schedules)).toBeTruthy();
    });
  });

  describe("getNextTwoTimes", () => {
    it("should return the next 2 predictions times over schedules", () => {
      const schedules = [
        {
          stop: {} as any,
          route: {} as any,
          trip: { id: "1" } as Trip,
          time: new Date("2022-04-26T11:15:00-04:00"),
          stop_sequence: 1,
          pickup_type: 1
        },
        {
          stop: {} as any,
          route: {} as any,
          trip: { id: "2" } as Trip,
          time: new Date("2022-04-26T11:26:00-04:00"),
          stop_sequence: 1,
          pickup_type: 1
        }
      ] as ScheduleForStop[];
      const predictions = [
        {
          id: "p1",
          time: new Date("2022-04-26T11:15:15-04:00"),
          route: {} as any,
          stop: {} as any,
          trip: { id: "1" } as Trip,
          direction_id: 0,
          schedule_relationship: null,
          track: null,
          status: null
        },
        {
          id: "p2",
          time: new Date("2022-04-26T11:26:15-04:00"),
          route: {} as any,
          stop: {} as any,
          trip: { id: "2" } as Trip,
          direction_id: 0,
          schedule_relationship: null,
          track: null,
          status: null
        }
      ] as PredictionForStop[];

      const [isPrediction, info1, info2] = getNextTwoTimes(
        schedules,
        predictions
      );
      expect(isPrediction).toBeTruthy();
      // The times returned should be the prediction times
      expect(compareAsc(info1!.time, predictions[0].time)).toEqual(0);
      expect(compareAsc(info2!.time, predictions[1].time)).toEqual(0);
    });

    it("should return the prediction and schedule", () => {
      const schedules = [
        {
          stop: {} as any,
          route: {} as any,
          trip: { id: "1" } as Trip,
          time: new Date("2022-04-26T11:15:00-04:00"),
          stop_sequence: 1,
          pickup_type: 1
        },
        {
          stop: {} as any,
          route: {} as any,
          trip: { id: "2" } as Trip,
          time: new Date("2022-04-26T11:26:00-04:00"),
          stop_sequence: 1,
          pickup_type: 1
        }
      ] as ScheduleForStop[];
      const predictions = [
        {
          id: "p1",
          time: new Date("2022-04-26T11:15:15-04:00"),
          route: {} as any,
          stop: {} as any,
          trip: { id: "1" } as Trip,
          direction_id: 0,
          schedule_relationship: null,
          track: null,
          status: null
        }
      ] as PredictionForStop[];
      const [isPrediction, info1, info2] = getNextTwoTimes(
        schedules,
        predictions
      );
      expect(isPrediction).toBeTruthy();
      // return one prediction and one schedule (because there is only one prediction for some reason)
      // The schedule returned should be the next schedule (assuming the prediction isn't cancelled/delayed)
      expect(compareAsc(info1!.time, predictions[0].time)).toEqual(0);
      expect(compareAsc(info2!.time, new Date(schedules[1].time))).toEqual(0);
    });

    it("should return schedules if there are no predictions", () => {
      // assumes function was given no predictions
      // If all predictions are cancelled something else should happen (most likely returning empty or some state indicator)
      const schedules = [
        {
          stop: {} as any,
          route: {} as any,
          trip: { id: "1" } as Trip,
          time: new Date("2022-04-26T11:15:00-04:00"),
          stop_sequence: 1,
          pickup_type: 1
        },
        {
          stop: {} as any,
          route: {} as any,
          trip: { id: "2" } as Trip,
          time: new Date("2022-04-26T11:26:00-04:00"),
          stop_sequence: 1,
          pickup_type: 1
        }
      ] as ScheduleForStop[];
      const [isPrediction, info1, info2] = getNextTwoTimes(schedules, []);
      expect(isPrediction).toBeFalsy();
      // return one prediction and one schedule (because there is only one prediction for some reason)
      // The schedule returned should be the next schedule (assuming the prediction isn't cancelled/delayed)
      expect(compareAsc(info1!.time, new Date(schedules[0].time))).toEqual(0);
      expect(compareAsc(info2!.time, new Date(schedules[1].time))).toEqual(0);
    });

    it("should return only one schedule if there is only one", () => {
      const schedules = [
        {
          stop: {} as any,
          route: {} as any,
          trip: { id: "1" } as Trip,
          time: new Date("2022-04-26T11:15:00-04:00"),
          stop_sequence: 1,
          pickup_type: 1
        }
      ] as ScheduleForStop[];
      const [isPrediction, info1, info2] = getNextTwoTimes(schedules, []);
      expect(isPrediction).toBeFalsy();
      expect(compareAsc(info1!.time, new Date(schedules[0].time))).toEqual(0);
      expect(info2).toBeUndefined();
    });
    it("should return one non cancelled prediction and one cancelled prediction", () => {
      const schedules = [] as ScheduleForStop[];
      const predictions = [
        {
          id: "p1",
          time: new Date("2022-04-26T11:15:15-04:00"),
          route: {} as any,
          stop: {} as any,
          trip: { id: "1" } as Trip,
          direction_id: 0,
          schedule_relationship: "cancelled",
          track: null,
          status: null
        },
        {
          id: "p2",
          time: new Date("2022-04-26T11:16:15-04:00"),
          route: {} as any,
          stop: {} as any,
          trip: { id: "2" } as Trip,
          direction_id: 0,
          schedule_relationship: "cancelled",
          track: null,
          status: null
        },
        {
          id: "p2",
          time: new Date("2022-04-26T11:17:15-04:00"),
          route: {} as any,
          stop: {} as any,
          trip: { id: "2" } as Trip,
          direction_id: 0,
          schedule_relationship: null,
          track: null,
          status: null
        }
      ] as PredictionForStop[];
      const [isPrediction, info1, info2] = getNextTwoTimes(
        schedules,
        predictions
      );
      expect(isPrediction).toBeTruthy();
      expect(compareAsc(info1!.time, predictions[0].time)).toEqual(0);
      expect(info1!.isCancelled).toBeTruthy();
      expect(compareAsc(info2!.time, predictions[2].time)).toEqual(0);
      expect(info2!.isCancelled).toBeFalsy();
    });

    it("should return the prediction and the delayed schedule if a delay was detected", () => {
      const schedules = [
        {
          stop: {} as any,
          route: {} as any,
          trip: { id: "1" } as Trip,
          time: new Date("2022-04-26T11:15:00-04:00"),
          stop_sequence: 1,
          pickup_type: 1
        }
      ] as ScheduleForStop[];
      const predictions = [
        {
          id: "p2",
          time: new Date("2022-04-26T11:17:15-04:00"),
          route: {} as any,
          stop: {} as any,
          trip: { id: "1" } as Trip,
          direction_id: 0,
          schedule_relationship: null,
          track: null,
          status: null
        }
      ] as PredictionForStop[];
      const [isPrediction, info1, info2] = getNextTwoTimes(
        schedules,
        predictions
      );
      console.log(info1);
      expect(isPrediction).toBeTruthy();
      expect(info1!.isDelayed).toBeTruthy();
      expect(info1!.time).toEqual(new Date(schedules[0].time));
      expect(info2!.time).toEqual(predictions[0].time);
    });
  });

  describe("infoToDisplayTime", () => {
    it("should return 2 times in number of minutes remaining because both times are less than an hour out", () => {
      const compareTime = new Date("2022-04-24T11:15:00-04:00");
      const info1 = { time: new Date("2022-04-24T11:35:00-04:00") };
      const info2 = { time: new Date("2022-04-24T11:45:00-04:00") };
      const [displayTime1, displayTime2] = infoToDisplayTime(
        info1,
        info2,
        false,
        compareTime
      );
      const [predictionTime1, predictionTime2] = infoToDisplayTime(
        info1,
        info2,
        true,
        compareTime
      );

      expect(displayTime1.displayString).toEqual("20 min");
      expect(displayTime1.isBolded).toBeTruthy();
      expect(displayTime1.isPrediction).toBeFalsy();

      expect(displayTime2.displayString).toEqual("30 min");
      expect(displayTime2.isBolded).toBeFalsy();

      expect(displayTime1.displayString).toEqual(predictionTime1.displayString);
      expect(displayTime2.displayString).toEqual(predictionTime2.displayString);
      expect(predictionTime1.isPrediction).toBeTruthy();
    });

    it("should return one time in number of minutes remaining because 2nd info time is greater than an hour", () => {
      const compareTime = new Date("2022-04-24T11:15:00-04:00");
      const info1 = { time: new Date("2022-04-24T11:35:00-04:00") };
      const info2 = { time: new Date("2022-04-24T12:45:00-04:00") };
      const [displayTime1, displayTime2] = infoToDisplayTime(
        info1,
        info2,
        false,
        compareTime
      );
      const [predictionTime1, predictionTime2] = infoToDisplayTime(
        info1,
        info2,
        true,
        compareTime
      );

      expect(displayTime2).toBeUndefined();
      expect(displayTime1.displayString).toEqual("20 min");
      expect(displayTime1.isBolded).toBeTruthy();
      expect(displayTime1.isPrediction).toBeFalsy();
      expect(predictionTime1.isPrediction).toBeTruthy();
    });

    it("should return one time in hh:mm aa format because the next time is over an hour away", () => {
      const compareTime = new Date("2022-04-24T11:15:00-04:00");
      const info1 = {
        time: new Date("2022-04-24T12:35:00-04:00"),
        track: "Test Track"
      };
      const info2 = { time: new Date("2022-04-24T12:45:00-04:00") };
      const info3 = { time: new Date("2022-04-25T02:01:00-04:00") };
      const [displayTime1] = infoToDisplayTime(
        info1,
        info2,
        false,
        compareTime
      );
      const [predictionTime1, predictionTime2] = infoToDisplayTime(
        info1,
        info2,
        true,
        compareTime
      );
      const [tomorrowTime1, tomorrowTime2] = infoToDisplayTime(
        info3,
        undefined,
        false,
        compareTime
      );

      expect(displayTime1.displayString).toEqual("12:35 PM");
      expect(displayTime1.isBolded).toBeTruthy();
      expect(displayTime1.isPrediction).toBeFalsy();
      expect(displayTime1.trackName).toEqual("Test Track");
      expect(predictionTime1.isPrediction).toBeTruthy();
      expect(tomorrowTime1.displayString).toEqual("2:01 AM");
      expect(tomorrowTime1.isTomorrow).toBeTruthy();
    });
  });
});
