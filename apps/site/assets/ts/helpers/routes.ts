import { RouteStop } from "../schedule/components/__schedule";
import { RouteWithDirection, TypedRoutes } from "../stop/components/__stop";
import { isABusRoute } from "../models/route";
import { Route } from "../__v3api";

export function isBusRouteStop(stop: RouteStop): boolean {
  return !!stop.route && isABusRoute(stop.route);
}

export function routesWithDirectionsAreAllBusStops(
  routes: RouteWithDirection[]
): boolean {
  return (
    routes.length > 0 &&
    routes.reduce((acc: boolean, r) => isABusRoute(r.route) && acc, true)
  );
}

export function typedRoutesHasBusRoute(routes: TypedRoutes[]): boolean {
  return !!routes.find(r => r.group_name === "bus");
}

export function routesHasBusRoute(routes: Route[]): boolean {
  return !!routes.find(r => isABusRoute(r));
}
