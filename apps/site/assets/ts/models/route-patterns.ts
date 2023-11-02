import { GroupedRoutePatterns } from "../stop/stop-redesign-loader";

type RoutePatternGroup = GroupedRoutePatterns[keyof GroupedRoutePatterns];
type RoutePatternGroupEntries = [
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

// eslint-disable-next-line import/prefer-default-export
export { sortedGroupedRoutePatterns };
