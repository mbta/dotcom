import { minBy, sortBy } from "lodash";
import { DirectionId, Route, RoutePattern } from "../__v3api";
import { Polyline } from "../leaflet/components/__mapdata";

export interface RoutePatternWithPolyline
  extends Omit<RoutePattern, "representative_trip_polyline"> {
  representative_trip_polyline: Polyline;
}
type RoutePatternGroup = Record<
  RoutePattern["headsign"],
  {
    direction_id: DirectionId;
    route_patterns: RoutePatternWithPolyline[];
  }
>;
export type GroupedRoutePatterns = Record<Route["id"], RoutePatternGroup>;

export type RoutePatternGroupEntries = [
  keyof RoutePatternGroup,
  RoutePatternGroup[keyof RoutePatternGroup]
][];

// sort headsigns to reflect the route pattern's sort_order
const sortedGroupedRoutePatterns = (
  groupedByHeadsign: RoutePatternGroup
): RoutePatternGroupEntries =>
  sortBy(
    Object.entries(groupedByHeadsign),
    ([, { route_patterns: routePatterns }]) =>
      minBy(routePatterns, "sort_order")?.sort_order
  );

// eslint-disable-next-line import/prefer-default-export
export { sortedGroupedRoutePatterns };
