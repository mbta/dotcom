import { isDelayed, statusForCommuterRail } from "../prediction-helpers";
import { PredictedOrScheduledTime, Trip } from "../../__v3api";
import { PredictionWithTimestamp } from "../../models/perdictions";
import { ScheduleWithTimestamp } from "../../models/schedules";

describe("statusForCommuterRail", () => {
  test("prefers prediction status if available", () => {
    const data: PredictedOrScheduledTime = {
      delay: 11,
      scheduled_time: ["11:00", " ", "AM"],
      prediction: {
        status: "Held for reasons",
        time: ["11:11", " ", "AM"],
        track: null,
        schedule_relationship: null
      }
    };

    expect(statusForCommuterRail(data)).toEqual("Held for reasons");
  });

  test("indicates a delay if it's 5 minutes or more", () => {
    const onTime: PredictedOrScheduledTime = {
      delay: 4,
      scheduled_time: ["11:00", " ", "AM"],
      prediction: {
        status: null,
        time: ["11:04", " ", "AM"],
        track: null,
        schedule_relationship: null
      }
    };
    const delayed: PredictedOrScheduledTime = {
      delay: 5,
      scheduled_time: ["11:00", " ", "AM"],
      prediction: {
        status: null,
        time: ["11:05", " ", "AM"],
        track: null,
        schedule_relationship: null
      }
    };

    expect(statusForCommuterRail(onTime)).toEqual("On time");
    expect(statusForCommuterRail(delayed)).toEqual("Delayed 5 min");
  });

  test("indicates if stop is skipped or trip is canceled", () => {
    const skipped: PredictedOrScheduledTime = {
      delay: 0,
      scheduled_time: ["11:00", " ", "AM"],
      prediction: {
        status: null,
        time: ["11:00", " ", "AM"],
        track: null,
        schedule_relationship: "skipped"
      }
    };
    const canceled: PredictedOrScheduledTime = {
      delay: 0,
      scheduled_time: ["11:00", " ", "AM"],
      prediction: {
        status: null,
        time: ["11:00", " ", "AM"],
        track: null,
        schedule_relationship: "cancelled"
      }
    };

    expect(statusForCommuterRail(skipped)).toEqual("Canceled");
    expect(statusForCommuterRail(canceled)).toEqual("Canceled");
  });

  test("indicates 'on time' for other predictions", () => {
    const data: PredictedOrScheduledTime = {
      delay: 0,
      scheduled_time: ["11:00", " ", "AM"],
      prediction: {
        status: null,
        time: ["11:00", " ", "AM"],
        track: null,
        schedule_relationship: null
      }
    };

    expect(statusForCommuterRail(data)).toEqual("On time");
  });

  test("indicates 'scheduled' as long as there is a scheduled time", () => {
    const data: PredictedOrScheduledTime = {
      delay: 4,
      scheduled_time: ["11:00", " ", "AM"],
      prediction: null
    };

    expect(statusForCommuterRail(data)).toEqual("Scheduled");
  });

  test("returns null if there is no scheduled time to compare to", () => {
    const data: PredictedOrScheduledTime = {
      delay: 4,
      scheduled_time: null,
      prediction: {
        status: null,
        time: ["11:11", " ", "AM"],
        track: null,
        schedule_relationship: null
      }
    };

    expect(statusForCommuterRail(data)).toBeNull();
  });
});

describe("isDelayed", () => {
  it("should return true if the prediction is more than 60 seconds after the schedule", () => {
    const prd1 = {
      trip: { id: "1" } as Trip,
      time: new Date("2022-04-26T11:17:15-04:00")
    } as PredictionWithTimestamp;
    const schedule = {
      trip: { id: "1" } as Trip,
      time: new Date("2022-04-26T11:15:00-04:00")
    } as ScheduleWithTimestamp;
    expect(isDelayed(prd1, schedule)).toBeTruthy();
  });

  it("should return false if the prediction is less than 60 seconds after the schedule", () => {
    const prd1 = {
      trip: { id: "2" } as Trip,
      time: new Date("2022-04-26T11:15:45-04:00")
    } as PredictionWithTimestamp;
    const schedule = {
      trip: { id: "2" } as Trip,
      time: new Date("2022-04-26-11:15:00-04:00")
    } as ScheduleWithTimestamp;
    expect(isDelayed(prd1, schedule)).toBeFalsy();
  });

  it("should return false if the prediction is 60 seconds before the schedule", () => {
    const prd1 = {
      trip: { id: "1" } as Trip,
      time: new Date("2022-04-26T11:13:45-04:00")
    } as PredictionWithTimestamp;
    const schedule = {
      trip: { id: "1" } as Trip,
      time: new Date("2022-04-26-11:15:00-04:00")
    } as ScheduleWithTimestamp;
    expect(isDelayed(prd1, schedule)).toBeFalsy();
  });
});
