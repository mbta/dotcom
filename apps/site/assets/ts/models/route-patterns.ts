import { minBy, sortBy } from "lodash";
import { GroupedRoutePatterns } from "../stop/stop-redesign-loader";

type RoutePatternGroup = GroupedRoutePatterns[keyof GroupedRoutePatterns];
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
