import useSWR from "swr";
import { sortBy } from "lodash";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { Route } from "../__v3api";
import { FetchState, FetchStatus } from "../helpers/use-fetch";

const fetchData = async (url: string): Promise<Route[]> =>
  fetchJsonOrThrow(url);

const useRoutes = (routeIds: string[]): FetchState<Route[]> => {
  const { data, error } = useSWR<Route[]>(
    routeIds.length ? `/api/routes/${routeIds.join(",")}` : null,
    fetchData
  );
  if (error) {
    return { status: FetchStatus.Error };
  }
  const sortedRoutes = data ? sortBy(data, ["sort_order"]) : data;
  return { status: FetchStatus.Data, data: sortedRoutes };
};
// eslint-disable-next-line import/prefer-default-export
export { useRoutes };
