import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { Route } from "../__v3api";
import { Polyline } from "../leaflet/components/__mapdata";

export type RouteWithPolylines = Route & { polylines: Polyline[] };

const fetchData = async (url: string): Promise<RouteWithPolylines[]> =>
  fetchJsonOrThrow(url);

const useRoutesByStop = (stopId: string): RouteWithPolylines[] | undefined => {
  const { data } = useSWR<RouteWithPolylines[]>(
    `/api/routes/by-stop/${stopId}`,
    fetchData
  );
  return data;
};
// eslint-disable-next-line import/prefer-default-export
export { useRoutesByStop };
