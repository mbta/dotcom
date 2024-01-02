import { Dictionary, groupBy } from "lodash";
import { Schedule } from "../__v3api";
import { ScheduleWithTimestamp } from "./schedules";

const schedulesByHeadsign = <T extends Schedule | ScheduleWithTimestamp>(
  schedules: T[] | undefined
): Dictionary<T[]> => {
  return groupBy<T>(schedules, (sch: T) => {
    return sch.trip.headsign;
  });
};

// eslint-disable-next-line import/prefer-default-export
export { schedulesByHeadsign };
