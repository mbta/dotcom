import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { FetchState, FetchStatus } from "../helpers/use-fetch";

/**
 * Generic helper function for fetching JSON from a URL. Specify the expected
 * return type as the type parameter, e.g
 * `useFetch<Schedule[]>("/api/schedules/or/something")`
 * @param {string | null} backendUrl - The path, usually starting with /api/,
 * that our backend will respond with data from. If this value is null, useSWR's
 * behavior will in effect disable the fetch, and the returned data will simply
 * be undefined.
 * @returns {FetchState<T>} An object containing the fetch status, and
 * (optionally) the fetched data.
 */
const useFetch = <T>(backendPath: string | null): FetchState<T> => {
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
