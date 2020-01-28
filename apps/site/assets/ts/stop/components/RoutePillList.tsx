import React, { ReactElement } from "react";
import { EnhancedRoute, Route } from "../../__v3api";
import { TypedRoutes } from "./__stop";
import { breakTextAtSlash } from "../../helpers/text";
import { routeToCSSClass } from "../../helpers/css";
import { isSilverLine } from "../../helpers/silver-line";

interface RoutePillListProps {
  routes: TypedRoutes[];
  showGroupName?: boolean;
}

interface RoutePillProps {
  route: Route | EnhancedRoute;
}

const busName = (routeId: string): string =>
  isSilverLine(routeId) ? "silver-line" : "bus";

const modeNameForBg = ({ name, type, id }: EnhancedRoute | Route): string => {
  switch (type) {
    case 0:
    case 1:
      return routeToCSSClass(name);
    case 2:
      return "commuter-rail";
    case 4:
      return "ferry";
    default:
      return busName(id);
  }
};

export const modeBgClass = (route: EnhancedRoute | Route): string =>
  `u-bg--${modeNameForBg(route)}`;

const RoutePill = ({ route }: RoutePillProps): ReactElement<HTMLElement> => (
  <a
    href={`/schedules/${route.id}`}
    className={`
      m-stop-page__header-feature
      m-stop-page__header-description
      u-small-caps
      ${modeBgClass(route)}
    `}
  >
    {breakTextAtSlash(route.name)}
  </a>
);

const RoutePillList = ({
  routes,
  showGroupName
}: RoutePillListProps): ReactElement<HTMLElement> => (
  <div className="m-route-pills">
    {routes.map(typedRoute => (
      <div
        key={typedRoute.group_name}
        className={`m-route-pills--${typedRoute.group_name}`}
      >
        {showGroupName && <h4 className="h4">{typedRoute.group_name}</h4>}
        {typedRoute.routes.map(routeWithDirections => (
          <RoutePill
            key={routeWithDirections.route.id}
            route={routeWithDirections.route}
          />
        ))}
      </div>
    ))}
  </div>
);

export default RoutePillList;
