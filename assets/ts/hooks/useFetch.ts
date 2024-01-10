import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { FetchState, FetchStatus } from "../helpers/use-fetch";

/**
 * Generic helper function for fetching JSON from a URL. Specify the expected
 * return type as the type parameter, e.g
 * `useFetch<Schedule[]>("/api/schedules/or/something")`
 * @param {string} backendUrl - The path, usually starting with /api/, that our
 * backend will respond with data from.
 * @returns {{ status: FetchStatus, data: T }} An object containing the fetch
 * status, and the returned data.
 */
const useFetch = <T>(backendPath: string): FetchState<T> => {
  const { data, error } = useSWR<T>(
    backendPath,
    async (url: string): Promise<T> => fetchJsonOrThrow(url)
  );
  if (error) {
    return { status: FetchStatus.Error };
  }
  return { status: FetchStatus.Data, data };
};

export default useFetch;
