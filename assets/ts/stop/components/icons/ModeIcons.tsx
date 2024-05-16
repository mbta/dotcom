import React, { ReactElement } from "react";
import { uniqBy } from "lodash";
import { Route } from "../../../__v3api";
import { modeIcon } from "../../../helpers/icon";
import {
  isACommuterRailRoute,
  isASilverLineRoute,
  isFerryRoute,
  isSubwayRoute
} from "../../../models/route";

const modeType = (route: Route): string => {
  if (isACommuterRailRoute(route)) return "CR";

  if (isSubwayRoute(route)) return route.id;

  if (isFerryRoute(route)) return "Ferry";

  if (isASilverLineRoute(route)) return "SL";

  return "Bus";
};

const modeIconFeature = (route: Route): ReactElement<HTMLElement> => {
  const content = (
    <span className="m-stop-page__icon">{modeIcon(route.id)}</span>
  );

  return (
    <div key={modeType(route)} className="m-stop-page__header-feature">
      {content}
    </div>
  );
};

const ModeIcons = ({
  routes
}: {
  routes: Route[];
}): ReactElement<HTMLElement> => {
  const routeMap = routes.map(route => modeIconFeature(route));
  const uniqRouteMap = uniqBy(routeMap, r => {
    return r.key;
  });
  return <>{uniqRouteMap}</>;
};

export default ModeIcons;
