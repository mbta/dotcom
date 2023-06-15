import { PredictionWithTimestamp } from "../../models/perdictions";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { mergeIntoDepartureInfo } from "../departureInfo";

describe("departureInfo", () => {
  describe("mergeIntoDepartureInfo", () => {
    it("should match schedules and predictions", () => {
      const schedules = [
        {
          trip: { id: "1" },
          time: new Date("2022-04-27T11:15:00-04:00"),
          route: { type: 2 }
        },
        {
          trip: { id: "2" },
          time: new Date("2022-04-27T11:18:00-04:00"),
          route: { type: 2 }
        },
        {
          trip: { id: "4" },
          time: new Date("2022-04-27T11:40:00-04:00"),
          route: { type: 2 }
        },
        {
          trip: { id: "5" },
          time: new Date("2022-04-27T12:45:00-04:00"),
          route: { type: 1 }
        }
      ] as ScheduleWithTimestamp[];
      const predictions = [
        {
          time: new Date("2022-04-27T11:15:00-04:00"),
          trip: { id: "1" },
          schedule_relationship: "cancelled",
          route: { type: 2 }
        },
        {
          trip: { id: "2" },
          time: new Date("2022-04-27T11:20:00-04:00"),
          route: { type: 2 }
        },
        {
          trip: { id: "3" },
          time: new Date("2022-04-27T11:45:00-04:00"),
          route: { type: 2 }
        },
        {
          trip: { id: "5" },
          time: new Date("2022-04-27T12:45:00-04:00"),
          route: { type: 1 }
        }
      ] as PredictionWithTimestamp[];

      const departureInfos = mergeIntoDepartureInfo(schedules, predictions);
      expect(departureInfos[0].isCancelled).toBe(true);
      expect(departureInfos[0].prediction?.time).toEqual(predictions[0].time);
      expect(departureInfos[0].schedule?.time).toEqual(schedules[0].time);
      expect(departureInfos[0].isSubway).toBe(false);

      expect(departureInfos[1].isDelayed).toBe(true);
      expect(departureInfos[1].schedule?.time).toEqual(schedules[1].time);
      expect(departureInfos[1].prediction?.time).toEqual(predictions[1].time);

      // Checking sort order
      expect(departureInfos[2].schedule?.time).toEqual(schedules[2].time);
      expect(departureInfos[2].prediction).toBeUndefined();

      expect(departureInfos[3].prediction?.time).toEqual(predictions[2].time);
      expect(departureInfos[3].schedule).toBeUndefined();

      // Checking subway check
      expect(departureInfos[4].isSubway).toBe(true);
    });
  });
});
