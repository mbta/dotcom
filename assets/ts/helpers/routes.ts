import { RouteStop } from "../schedule/components/__schedule";
import { isABusRoute } from "../models/route";

// eslint-disable-next-line import/prefer-default-export
export function isBusRouteStop(stop: RouteStop): boolean {
  return !!stop.route && isABusRoute(stop.route);
}
