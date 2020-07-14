import { Prediction } from "../../schedule/components/__trips";
import { isSkippedOrCancelled } from "../prediction";

describe("isABusRoute", () => {
  test("returns true if the schedule_relationship is skipped or cancelled", () => {
    const skippedPrediction = {
      schedule_relationship: "skipped"
    } as Prediction;
    const cancelledPrediction = {
      schedule_relationship: "cancelled"
    } as Prediction;

    expect(isSkippedOrCancelled(skippedPrediction)).toBeTruthy();
    expect(isSkippedOrCancelled(cancelledPrediction)).toBeTruthy();
  });

  test("returns false if the schedule_relationship is anything other than skipped or cancelled", () => {
    const addedPrediction = { schedule_relationship: "added" } as Prediction;
    const unscheduledPrediction = {
      schedule_relationship: "unscheduled"
    } as Prediction;
    const noDataPrediction = { schedule_relationship: "no_data" } as Prediction;
    const nullPrediction = { schedule_relationship: null } as Prediction;

    expect(isSkippedOrCancelled(addedPrediction)).toBeFalsy();
    expect(isSkippedOrCancelled(unscheduledPrediction)).toBeFalsy();
    expect(isSkippedOrCancelled(noDataPrediction)).toBeFalsy();
    expect(isSkippedOrCancelled(nullPrediction)).toBeFalsy();
  });

  test("returns false when given null", () => {
    expect(isSkippedOrCancelled(null)).toBeFalsy();
  });
});
