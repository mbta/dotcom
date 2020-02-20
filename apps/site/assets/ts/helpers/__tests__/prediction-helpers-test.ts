import { statusForCommuterRail } from "../prediction-helpers";
import { PredictedOrScheduledTime } from "../../__v3api";

describe("statusForCommuterRail", () => {
  test("prefers prediction status if available", () => {
    const data: PredictedOrScheduledTime = {
      delay: 11,
      scheduled_time: ["11:00", " ", "AM"],
      prediction: {
        status: "Held for reasons",
        time: ["11:11", " ", "AM"],
        track: null
      }
    };

    expect(statusForCommuterRail(data)).toEqual("Held for reasons");
  });

  test("indicates a delay if it's 5 minutes or more", () => {
    const onTime: PredictedOrScheduledTime = {
      delay: 4,
      scheduled_time: ["11:00", " ", "AM"],
      prediction: { status: null, time: ["11:04", " ", "AM"], track: null }
    };
    const delayed: PredictedOrScheduledTime = {
      delay: 5,
      scheduled_time: ["11:00", " ", "AM"],
      prediction: { status: null, time: ["11:05", " ", "AM"], track: null }
    };

    expect(statusForCommuterRail(onTime)).toEqual("On time");
    expect(statusForCommuterRail(delayed)).toEqual("Delayed 5 min");
  });

  test("indicates 'on time' as long as there is a scheduled time", () => {
    const data: PredictedOrScheduledTime = {
      delay: 4,
      scheduled_time: ["11:00", " ", "AM"],
      prediction: null
    };

    expect(statusForCommuterRail(data)).toEqual("On time");
  });

  test("returns null if there is no scheduled time to compare to", () => {
    const data: PredictedOrScheduledTime = {
      delay: 4,
      scheduled_time: null,
      prediction: { status: null, time: ["11:11", " ", "AM"], track: null }
    };

    expect(statusForCommuterRail(data)).toBeNull();
  });
});
