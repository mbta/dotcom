import { isDelayed } from "../prediction-helpers";
import { Trip } from "../../__v3api";
import { PredictionWithTimestamp } from "../../models/predictions";
import { ScheduleWithTimestamp } from "../../models/schedules";

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
