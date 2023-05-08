import useSWR from "swr";
import { pick } from "lodash";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { ScheduleWithTimestamp } from "../models/schedules";

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
    time: new Date(schedule.time)
  } as ScheduleWithTimestamp);

const fetchData = async (url: string): Promise<ScheduleData[]> =>
  fetchJsonOrThrow(url);

const useSchedulesByStop = (
  stopId: string
): ScheduleWithTimestamp[] | undefined => {
  const { data } = useSWR<ScheduleData[]>(
    `/api/stops/${stopId}/schedules`,
    fetchData
  );
  const parsedData = data?.map(d => parse(d));
  return parsedData;
};
// eslint-disable-next-line import/prefer-default-export
export { useSchedulesByStop };
