import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { Alert } from "../__v3api";
import { FetchState, FetchStatus } from "../helpers/use-fetch";

const fetchData = async (url: string): Promise<Alert[]> =>
  fetchJsonOrThrow(url);

const useAlertsByStop = (stopId: string): FetchState<Alert[]> => {
  const { data, error } = useSWR<Alert[]>(
    `/api/stops/${stopId}/alerts`,
    fetchData
  );
  if (error) {
    return { status: FetchStatus.Error };
  }
  return { status: FetchStatus.Data, data };
};

const useAlertsByRoute = (routeId: string | string[]): FetchState<Alert[]> => {
  const route_id_array = Array.isArray(routeId) ? routeId : [routeId];
  const { data, error } = useSWR<Alert[]>(
    route_id_array.length === 0
      ? null
      : `/api/alerts?route_ids=${route_id_array.join(",")}`,
    fetchData
  );

  if (error) {
    return { status: FetchStatus.Error };
  }
  if (route_id_array.length === 0) {
    // no alerts to return if there were no route ids passed
    // don't return the value of data directly because it will be undefined
    return { status: FetchStatus.Data, data: [] };
  }
  return { status: FetchStatus.Data, data };
};

const useAlertsByStopAmenities = (stopId: string): FetchState<Alert[]> => {
  const { data, error } = useSWR<Alert[]>(
    `/api/alerts?filter[stop]=${stopId}&filter[activity]=ALL`,
    fetchData
  );
  if (error) {
    return { status: FetchStatus.Error };
  }
  return { status: FetchStatus.Data, data };
};

// eslint-disable-next-line import/prefer-default-export
export { useAlertsByStop, useAlertsByRoute, useAlertsByStopAmenities };
