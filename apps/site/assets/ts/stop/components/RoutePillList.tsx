import React, { ReactElement } from "react";
import { Route, BareRoute } from "../../__v3api";
import { TypedRoutes } from "./__stop";
import { breakTextAtSlash } from "../../helpers/text";

interface RoutePillListProps {
  routes: TypedRoutes[];
  showGroupName?: boolean;
}

interface RoutePillProps {
  route: Route;
}

const routeToClass = (name: string): string =>
  name.toLowerCase().replace(" ", "-");

const busName = (name: string): string =>
  name.startsWith("SL") ? "silver-line" : "bus";

const modeNameForBg = ({ name, type }: Route | BareRoute): string => {
  switch (type) {
    case 0:
    case 1:
      return routeToClass(name);
    case 2:
      return "commuter-rail";
    case 4:
      return "ferry";
    default:
      return busName(name);
  }
};

export const modeBgClass = (route: Route | BareRoute): string =>
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
