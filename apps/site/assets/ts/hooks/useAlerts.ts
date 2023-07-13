import { Alert } from "../__v3api";
import { FetchState } from "../helpers/use-fetch";
import useFetch from "./useFetch";

const useAlertsByStop = (stopId: string): FetchState<Alert[]> => {
  return useFetch<Alert[]>(`/api/stops/${stopId}/alerts`);
};

const useAlertsByRoute = (routeIds: string[]): FetchState<Alert[]> => {
  return useFetch<Alert[]>(`/api/alerts?route_ids=${routeIds.join(",")}`);
};

// eslint-disable-next-line import/prefer-default-export
export { useAlertsByStop, useAlertsByRoute };
