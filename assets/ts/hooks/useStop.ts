import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { Stop } from "../__v3api";
import { FetchState, FetchStatus } from "../helpers/use-fetch";

const fetchData = async (url: string): Promise<Stop> => fetchJsonOrThrow(url);

const useStop = (stopId: string): FetchState<Stop> => {
  const { data, error } = useSWR<Stop>(`/api/stop/${stopId}`, fetchData);
  if (error) {
    return { status: FetchStatus.Error, errorData: error };
  }
  return { status: FetchStatus.Data, data };
};

// eslint-disable-next-line import/prefer-default-export
export { useStop };
