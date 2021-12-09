import { TripPrediction } from "../../schedule/components/__trips";
import { HeadsignWithTimeData } from "../../__v3api";
import { hasPredictionTime, isSkippedOrCancelled } from "../prediction";

describe("isSkippedOrCancelled", () => {
  test("returns true if the schedule_relationship is skipped or cancelled", () => {
    const skippedPrediction = {
      schedule_relationship: "skipped"
    } as TripPrediction;
    const cancelledPrediction = {
      schedule_relationship: "cancelled"
    } as TripPrediction;

    expect(isSkippedOrCancelled(skippedPrediction)).toBeTruthy();
    expect(isSkippedOrCancelled(cancelledPrediction)).toBeTruthy();
  });

  test("returns false if the schedule_relationship is anything other than skipped or cancelled", () => {
    const addedPrediction = {
      schedule_relationship: "added"
    } as TripPrediction;
    const unscheduledPrediction = {
      schedule_relationship: "unscheduled"
    } as TripPrediction;
    const noDataPrediction = {
      schedule_relationship: "no_data"
    } as TripPrediction;
    const nullPrediction = { schedule_relationship: null } as TripPrediction;

    expect(isSkippedOrCancelled(addedPrediction)).toBeFalsy();
    expect(isSkippedOrCancelled(unscheduledPrediction)).toBeFalsy();
    expect(isSkippedOrCancelled(noDataPrediction)).toBeFalsy();
    expect(isSkippedOrCancelled(nullPrediction)).toBeFalsy();
  });

  test("returns false when given null", () => {
    expect(isSkippedOrCancelled(null)).toBeFalsy();
  });
});

test("hasPredictionTime indicates whether the headsign information includes a prediction time", () => {
  const baseInfo = {
    headsign_name: null,
    trip_name: null,
    status: null,
    track: null,
    vehicle_crowding: null,
    scheduled_time: null,
    displayed_time: "5 min",
    delay: 0,
    skipped_or_cancelled: false
  };

  const noTime: HeadsignWithTimeData = {
    ...baseInfo,
    predicted_time: null
  };

  const withTime: HeadsignWithTimeData = {
    ...baseInfo,
    predicted_time: new Date()
  };

  expect(hasPredictionTime(noTime)).toBeFalsy();
  expect(hasPredictionTime(withTime)).toBeTruthy();
});
