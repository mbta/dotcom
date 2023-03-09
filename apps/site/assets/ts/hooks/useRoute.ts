import { groupBy, map } from "lodash";
import useSWR from "swr";
import { fetchJsonOrThrow } from "../helpers/fetch-json";
import { RouteWithDirections, TypedRoutes } from "../stop/components/__stop";
import { EnhancedRoute, Route } from "../__v3api";

const fetchData = async (url: string): Promise<Route[]> =>
  fetchJsonOrThrow(url);

const typeToString = (type: number): String => {
  switch (type) {
    case 0:
    case 1: {
      return "subway";
    }
    case 2: {
      return "commuter-rail";
    }
    case 3: {
      return "bus";
    }
    case 4:
    default: {
      return "ferry";
    }
  }
};

const useRoutesByStop = (stopId: string): Route[] | undefined => {
  const { data } = useSWR<Route[]>(`/api/routes/by-stop/${stopId}`, fetchData);
  return data;
};

const useTypedRoutesByStop = (stopId: string): TypedRoutes[] | undefined => {
  const routes = useRoutesByStop(stopId);
  const groupedRoutes = groupBy(routes, route => {
    return typeToString(route.type);
  });

  return map(groupedRoutes, (dictRoutes, key) => {
    return {
      group_name: key,
      routes: map(dictRoutes, r => {
        return {
          route: r as EnhancedRoute,
          directions: []
        } as RouteWithDirections;
      })
    } as TypedRoutes;
  });
};

export { useRoutesByStop, useTypedRoutesByStop };
