import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { ScheduleForStop } from "../__v3api";
import { pick } from "lodash";

interface ScheduleData extends Omit<ScheduleForStop, "time"> {
  time: string;
}

export const parse = (schedule: ScheduleData): ScheduleForStop =>
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
  } as ScheduleForStop);

const fetchData = async (url: string): Promise<ScheduleForStop[]> =>
  fetchJsonOrThrow(url);

const useSchedulesByStop = (stopId: string): ScheduleForStop[] | undefined => {
  const { data } = useSWR<ScheduleForStop[]>(
    `/api/stops/${stopId}/schedules`,
    fetchData
  );
  return data;
};
// eslint-disable-next-line import/prefer-default-export
export { useSchedulesByStop };
