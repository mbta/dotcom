import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { Stop } from "../__v3api";

const fetchData = async (url: string): Promise<Stop> => fetchJsonOrThrow(url);

const useStop = (stopId: string): Stop | undefined => {
  const { data } = useSWR<Stop>(`/api/stop/${stopId}`, fetchData);
  return data;
};

export default useStop;
