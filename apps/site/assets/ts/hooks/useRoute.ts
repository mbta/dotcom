import { Route } from "../__v3api";
import { Polyline } from "../leaflet/components/__mapdata";
import { FetchState } from "../helpers/use-fetch";
import useFetch from "./useFetch";

export type RouteWithPolylines = Route & { polylines: Polyline[] };

const useRoutesByStop = (stopId: string): FetchState<RouteWithPolylines[]> => {
  return useFetch<RouteWithPolylines[]>(`/api/routes/by-stop/${stopId}`);
};
// eslint-disable-next-line import/prefer-default-export
export { useRoutesByStop };
