import useSWR from "swr";
import useInterval from "use-interval";
import { useState } from "react";
import { pick } from "lodash";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { ScheduleWithTimestamp } from "../models/schedules";
import { FetchState, FetchStatus } from "../helpers/use-fetch";

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
      "stop_headsign",
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

const fetchData = async (url: string): Promise<ScheduleData[]> =>
  fetchJsonOrThrow(url);

const useSchedulesByStop = (
  stopId: string
): FetchState<ScheduleWithTimestamp[]> => {
  const [updateDate, setUpdateDate] = useState(Date.now());
  useInterval(() => {
    setUpdateDate(Date.now());
  }, 15000);

  const { data, error } = useSWR<ScheduleData[]>(
    `/api/stops/${stopId}/schedules?last_stop_departures=false&future_departures=true`,
    fetchData
  );
  if (error) {
    return { status: FetchStatus.Error };
  }
  const parsedData = data
    ?.map(d => parse(d))
    .filter(d => d.time.getTime() >= updateDate);
  return { status: FetchStatus.Data, data: parsedData };
};
// eslint-disable-next-line import/prefer-default-export
export { useSchedulesByStop };
