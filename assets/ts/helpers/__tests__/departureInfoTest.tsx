import { render, screen } from "@testing-library/react";
import { add } from "date-fns";
import React from "react";
import { DepartureInfo } from "../../models/departureInfo";
import { PredictionWithTimestamp } from "../../models/predictions";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { baseRoute, customStop } from "../../stop/__tests__/helpers";
import {
  COMMUTER_RAIL,
  SUBWAY,
  departureInfoToTime,
  departuresListFromInfos,
  isAtDestination,
  mergeIntoDepartureInfo
} from "../departureInfo";

describe("departureInfo", () => {
  describe("departureInfoToTime", () => {
    const predictionTime = new Date("2022-04-27T11:15:00-04:00");
    const scheduleTime = new Date("2025-04-27T11:15:00-04:00");
    const departureInfo = {
      prediction: { time: predictionTime } as PredictionWithTimestamp,
      schedule: { time: scheduleTime } as ScheduleWithTimestamp
    } as DepartureInfo;
    test("should prefer prediction time", () => {
      const time = departureInfoToTime(departureInfo);
      expect(time).toEqual(predictionTime);
    });
    test("should use schedule time otherwise", () => {
      const time = departureInfoToTime({
        ...departureInfo,
        prediction: undefined
      });
      expect(time).toEqual(scheduleTime);
    });
    test("should return undefined if neither exist", () => {
      const time = departureInfoToTime({
        ...departureInfo,
        prediction: undefined,
        schedule: undefined
      });
      expect(time).toEqual(undefined);
    });
  });

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
      expect(departureInfos[0].routeMode).toBe(COMMUTER_RAIL);

      expect(departureInfos[1].isDelayed).toBe(true);
      expect(departureInfos[1].schedule?.time).toEqual(schedules[1].time);
      expect(departureInfos[1].prediction?.time).toEqual(predictions[1].time);

      // Checking sort order
      expect(departureInfos[2].schedule?.time).toEqual(schedules[2].time);
      expect(departureInfos[2].prediction).toBeUndefined();

      expect(departureInfos[3].prediction?.time).toEqual(predictions[2].time);
      expect(departureInfos[3].schedule).toBeUndefined();

      // Checking subway check
      expect(departureInfos[4].routeMode).toBe(SUBWAY);
    });
  });

  describe("isAtDestination", () => {
    it("should return true if at destination else false", () => {
      const route = baseRoute("Blue", 2);
      route.direction_destinations = [
        "Wonderland Station",
        "Inbound Destination"
      ];
      expect(isAtDestination("Wonderland", route, 0)).toBe(true);
      expect(isAtDestination("Airport", route, 0)).toBe(false);
    });
  });

  describe("departuresListFromInfos", () => {
    it("can handle no departures", () => {
      render(<ul>{departuresListFromInfos([], false, false)}</ul>);

      // no <li> created
      expect(screen.queryByRole("listitem")).toBeNull();
    });

    it("can wrap items in custom element", () => {
      const schedules = [
        {
          route: baseRoute("749", 3),
          trip: { id: "1", direction_id: 0, headsign: "Way 0" }
        },
        {
          route: baseRoute("749", 3),
          trip: { id: "2", direction_id: 1, headsign: "Way 1" }
        }
      ] as ScheduleWithTimestamp[];
      const departures = mergeIntoDepartureInfo(schedules, []);
      render(
        <ul>
          {departuresListFromInfos(
            departures,
            false,
            false,
            undefined,
            undefined,
            false,
            ({ children }) => (
              <b data-testid="child">{children}</b>
            )
          )}
        </ul>
      );

      expect(screen.queryAllByTestId("child")).toHaveLength(departures.length);
    });

    it("can truncate list", () => {
      const schedules = Array.from(
        { length: 15 },
        (x, i) =>
          ({
            route: baseRoute("10", 3),
            trip: { id: `${i}`, direction_id: 0, headsign: `Way ${i}` }
          } as ScheduleWithTimestamp)
      );
      const departures = mergeIntoDepartureInfo(schedules, []);
      const customLength = 4;
      render(
        <ul>
          {departuresListFromInfos(
            departures,
            false,
            false,
            undefined,
            customLength
          )}
        </ul>
      );

      expect(screen.queryAllByRole("listitem")).not.toHaveLength(
        schedules.length
      );
      expect(screen.queryAllByRole("listitem")).toHaveLength(customLength);
    });
  });
});
