import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { Alert } from "../__v3api";

const fetchData = async (url: string): Promise<Alert[]> =>
  fetchJsonOrThrow(url);

const useAlertsByStop = (stopId: string): Alert[] | undefined => {
  const { data } = useSWR<Alert[]>(`/api/stops/${stopId}/alerts`, fetchData);
  return data;
};

const useAlertsByRoute = (routeId: string | string[]): Alert[] | undefined => {
  let route_id_array = Array.isArray(routeId) ? routeId : [routeId];
  const { data } = useSWR<Alert[]>(
    `/api/alerts?route_ids=${route_id_array.join(",")}`,
    fetchData
  );
  return data;
};

// eslint-disable-next-line import/prefer-default-export
export { useAlertsByStop, useAlertsByRoute };
