import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { Route } from "../__v3api";

const fetchData = async (url: string): Promise<Route[]> =>
  fetchJsonOrThrow(url);

const useRoutesByStop = (stopId: string): Route[] | undefined => {
  const { data } = useSWR<Route[]>(`/api/routes/by-stop/${stopId}`, fetchData);
  return data;
};

export { useRoutesByStop };
