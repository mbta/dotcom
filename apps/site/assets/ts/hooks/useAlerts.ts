import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { Alert } from "../__v3api";

const fetchData = async (url: string): Promise<Alert[]> =>
  fetchJsonOrThrow(url);

const useAlertsByStop = (stopId: string): Alert[] | undefined => {
  const { data } = useSWR<Alert[]>(`/api/stops/${stopId}/alerts`, fetchData);
  return data;
};

// eslint-disable-next-line import/prefer-default-export
export { useAlertsByStop };
