import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { Route, RoutePattern } from "../__v3api";
import { Polyline } from "../leaflet/components/__mapdata";
import { FetchState, FetchStatus } from "../helpers/use-fetch";

export type RouteWithPolylines = Route & { polylines: Polyline[] };

const fetchData = async (url: string): Promise<RouteWithPolylines[]> =>
  fetchJsonOrThrow(url);

const useRoutesByStop = (stopId: string): FetchState<RouteWithPolylines[]> => {
  const { data, error } = useSWR<RouteWithPolylines[]>(
    `/api/routes/by-stop/${stopId}`,
    fetchData
  );
  if (error) {
    return { status: FetchStatus.Error };
  }
  return { status: FetchStatus.Data, data };
};

const useRoutePatternsByStop = (stopId: string): FetchState<RoutePattern[]> => {
  const { data, error } = useSWR<RoutePattern[]>(
    `/api/routes/route-pattern/by-stop/${stopId}`,
    fetchData
  );
  if (error) {
    return { status: FetchStatus.Error };
  }
  return { status: FetchStatus.Data, data };
};

// eslint-disable-next-line import/prefer-default-export
export { useRoutesByStop, useRoutePatternsByStop };
