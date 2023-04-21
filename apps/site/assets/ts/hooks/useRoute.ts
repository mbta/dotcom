import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { Route } from "../__v3api";
import { Polyline } from "../leaflet/components/__mapdata";

export type RoutesWithPolylines = [Route, Polyline[]];

const fetchData = async (url: string): Promise<RoutesWithPolylines[]> =>
  fetchJsonOrThrow(url);

const useRoutesByStop = (stopId: string): RoutesWithPolylines[] | undefined => {
  const { data } = useSWR<RoutesWithPolylines[]>(
    `/api/routes/by-stop/${stopId}`,
    fetchData
  );
  return data;
};
// eslint-disable-next-line import/prefer-default-export
export { useRoutesByStop };
