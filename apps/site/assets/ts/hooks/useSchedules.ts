import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { Schedule } from "../__v3api";

const fetchData = async (url: string): Promise<Schedule[]> =>
  fetchJsonOrThrow(url);

const useSchedulesByStop = (stopId: string): Schedule[] | undefined => {
  const { data } = useSWR<Schedule[]>(
    `/api/stops/${stopId}/schedules`,
    fetchData
  );
  return data;
};
// eslint-disable-next-line import/prefer-default-export
export { useSchedulesByStop };
