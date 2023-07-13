import { Facility, Stop } from "../__v3api";
import { FetchState } from "../helpers/use-fetch";
import useFetch from "./useFetch";

const useStop = (stopId: string): FetchState<Stop> => {
  return useFetch<Stop>(`/api/stop/${stopId}`);
};

const useFacilitiesByStop = (stopId: string): FetchState<Facility[]> => {
  return useFetch<Facility[]>(`/api/stop/${stopId}/facilities`);
};

export { useStop, useFacilitiesByStop };
