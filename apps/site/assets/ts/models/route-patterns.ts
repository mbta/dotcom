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
): RoutePatternGroupEntries => {
  return Object.entries(groupedByHeadsign).sort((entryA, entryB) => {
    const [orderA, orderB] = [
      entryA,
      entryB
    ].map(([, { route_patterns: routePatterns }]) =>
      Math.min(...routePatterns.map(rp => rp.sort_order))
    );
    return orderA - orderB;
  });
};

const isNoncanonicalAndNoDepartures = (
  routePatterns: RoutePatternWithPolyline[],
  departures: DepartureInfo[]
): boolean => {
  const isNonCanonical = !routePatterns.find(rp => !!rp.canonical);
  return isNonCanonical && departures.length === 0;
};

// eslint-disable-next-line import/prefer-default-export
export { sortedGroupedRoutePatterns, isNoncanonicalAndNoDepartures };
