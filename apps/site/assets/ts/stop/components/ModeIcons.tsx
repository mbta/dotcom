import React, { ReactElement } from "react";
import { EnhancedRoute } from "../../__v3api";
import { RouteWithDirections, TypedRoutes } from "./__stop";
import { modeIcon } from "../../helpers/icon";
import { isASilverLineRoute } from "../../models/route";
import { clickRoutePillAction, Dispatch } from "../state";
import { modeByV3ModeType } from "../../components/ModeFilter";

interface BusRoutesAcc {
  bus: RouteWithDirections[];
  silverLine: RouteWithDirections[];
}

const subwayModeIds = [
  "Blue",
  "Green",
  "Green-B",
  "Green-C",
  "Green-D",
  "Green-E",
  "Mattapan",
  "Orange",
  "Red"
];

const modeType = (modeId: string): string => {
  if (modeId.startsWith("CR-")) return "CR";

  if (subwayModeIds.includes(modeId)) return modeId;

  return "Bus";
};

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

const modeIconFeature = (
  { id, type }: EnhancedRoute,
  dispatch?: Dispatch
): ReactElement<HTMLElement> => {
  const content = <span className="m-stop-page__icon">{modeIcon(id)}</span>;

  return dispatch ? (
    <a
      href="#route-card-list"
      onClick={() =>
        dispatch && dispatch(clickRoutePillAction(modeByV3ModeType[type]))
      }
      key={modeType(id)}
      className="m-stop-page__header-feature"
    >
      {content}
    </a>
  ) : (
    <div key={type} className="m-stop-page__header-feature">
      {content}
    </div>
  );
};

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
  typedRoutes,
  dispatch
}: {
  typedRoutes: TypedRoutes[];
  dispatch?: Dispatch;
}): ReactElement<HTMLElement> => {
  return (
    <>
      {iconableRoutes(typedRoutes).map(({ route }) =>
        modeIconFeature(route, dispatch)
      )}
    </>
  );
};

export { ModeIcons as default };
