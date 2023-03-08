import React, { ReactElement } from "react";
import { features } from "./Header";
import { EnhancedRoute, Stop } from "../../__v3api";
import { RouteWithDirections, TypedRoutes } from "./__stop";
import { parkingIcon, modeIcon } from "../../helpers/icon";
import { isASilverLineRoute } from "../../models/route";

interface BusRoutesAcc {
  bus: RouteWithDirections[];
  silverLine: RouteWithDirections[];
}

const doSplitSilverLine = (
  acc: BusRoutesAcc,
  route: RouteWithDirections
): BusRoutesAcc =>
  isASilverLineRoute(route.route.id)
    ? { ...acc, silverLine: acc.silverLine.concat([route]) }
    : { ...acc, bus: acc.bus.concat([route]) };

const splitSilverLine = (
  routes: RouteWithDirections[]
): RouteWithDirections[] => {
  const acc: BusRoutesAcc = { bus: [], silverLine: [] };
  const { bus, silverLine } = routes.reduce(doSplitSilverLine, acc);
  return bus.slice(0, 1).concat(silverLine.slice(0, 1));
};

const modeIconFeature = ({
  id,
  type
}: EnhancedRoute): ReactElement<HTMLElement> => (
  <div key={type} className="m-stop-page__header-feature">
    <span className="m-stop-page__icon">{modeIcon(id)}</span>
  </div>
);

const iconableRoutesForType = ({
  // eslint-disable-next-line camelcase
  group_name,
  routes
}: TypedRoutes): RouteWithDirections[] => {
  // eslint-disable-next-line camelcase
  if (group_name === "subway") return routes;

  // eslint-disable-next-line camelcase
  if (group_name === "bus") return splitSilverLine(routes);

  return routes.length ? [routes[0]] : [];
};

const iconableRoutes = (typedRoutes: TypedRoutes[]): RouteWithDirections[] =>
  typedRoutes.reduce(
    (acc: RouteWithDirections[], typeAndRoutes: TypedRoutes) =>
      acc.concat(iconableRoutesForType(typeAndRoutes)),
    []
  );

// TODO figure out where this file should live
const ModeIcons = ({
  typedRoutes
}: {
  typedRoutes: TypedRoutes[];
}): ReactElement<HTMLElement> => {
  // TODO replace type with actual data type
  return (
    <>
      {iconableRoutes(typedRoutes).map(({ route }) => modeIconFeature(route))}
    </>
  );
};

export { ModeIcons as default };
