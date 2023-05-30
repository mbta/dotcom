import useSWR from "swr";
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
      "pickup_type: number",
      "train_number?: string"
    ]),
    time: new Date(schedule.time)
  } as ScheduleWithTimestamp);

const fetchData = async (url: string): Promise<ScheduleData[]> =>
  fetchJsonOrThrow(url);

const useSchedulesByStop = (
  stopId: string
): FetchState<ScheduleWithTimestamp[]> => {
  const { data, error } = useSWR<ScheduleData[]>(
    `/api/stops/${stopId}/schedules`,
    fetchData
  );
  if (error) {
    return { status: FetchStatus.Error };
  }
  const parsedData = data?.map(d => parse(d));
  return { status: FetchStatus.Data, data: parsedData };
};
// eslint-disable-next-line import/prefer-default-export
export { useSchedulesByStop };
