import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { Facility, Stop } from "../__v3api";
import { FetchState, FetchStatus } from "../helpers/use-fetch";

const fetchData = async (url: string): Promise<Stop> => fetchJsonOrThrow(url);
const fetchFacilityData = async (url: string): Promise<Facility[]> =>
  fetchJsonOrThrow(url);

const useStop = (stopId: string): FetchState<Stop> => {
  const { data, error } = useSWR<Stop>(`/api/stop/${stopId}`, fetchData);
  if (error) {
    return { status: FetchStatus.Error };
  }
  return { status: FetchStatus.Data, data };
};

const useFacilitiesByStop = (stopId: string): FetchState<Facility[]> => {
  const { data, error } = useSWR<Facility[]>(
    `/api/stop/${stopId}/facilities`,
    fetchFacilityData
  );
  if (error) {
    return { status: FetchStatus.Error };
  }
  return { status: FetchStatus.Data, data };
};

export { useStop, useFacilitiesByStop };
