import { pick } from "lodash";
import { ScheduleWithTimestamp } from "../models/schedules";
import { FetchState } from "../helpers/use-fetch";
import useFetch from "./useFetch";

interface ScheduleData extends Omit<ScheduleWithTimestamp, "time"> {
  time: string;
}

const parse = (schedule: ScheduleData): ScheduleWithTimestamp =>
  ({
    ...pick(schedule, [
      "route",
      "trip",
      "stop",
      "flag?",
      "early_departure?",
      "last_stop?",
      "stop_sequence",
      "pickup_type: number",
      "train_number?: string"
    ]),
    time: new Date(schedule.time),
    arrival_time: schedule.arrival_time
      ? new Date(schedule.arrival_time)
      : null,
    departure_time: schedule.departure_time
      ? new Date(schedule.departure_time)
      : null
  } as ScheduleWithTimestamp);

const useSchedulesByStop = (
  stopId: string
): FetchState<ScheduleWithTimestamp[]> => {
  const { status, data } = useFetch<ScheduleData[]>(
    `/api/stops/${stopId}/schedules?last_stop_departures=false&future_departures=true`
  );
  return { status, data: data?.map(d => parse(d)) };
};
// eslint-disable-next-line import/prefer-default-export
export { useSchedulesByStop };
