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

const useAlertsByRoute = (routeIds: string[]): FetchState<Alert[]> => {
  const { data, error } = useSWR<Alert[]>(
    `/api/alerts?route_ids=${routeIds.join(",")}`,
    fetchData
  );
  if (error) {
    return { status: FetchStatus.Error };
  }
  return { status: FetchStatus.Data, data };
};

// eslint-disable-next-line import/prefer-default-export
export { useAlertsByStop, useAlertsByRoute };
