import { minBy, sortBy } from "lodash";
import {
  GroupedRoutePatterns,
  RoutePatternWithPolyline
} from "../stop/stop-redesign-loader";
import { DepartureInfo } from "./departureInfo";

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

const isNoncanonicalAndNoDepartures = (
  routePatterns: RoutePatternWithPolyline[],
  departures: DepartureInfo[]
): boolean => {
  const isNonCanonical = !routePatterns.find(rp => !!rp.canonical);
  return isNonCanonical && departures.length === 0;
};

// eslint-disable-next-line import/prefer-default-export
export { sortedGroupedRoutePatterns, isNoncanonicalAndNoDepartures };
