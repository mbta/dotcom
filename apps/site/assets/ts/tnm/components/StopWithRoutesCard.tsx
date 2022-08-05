import React, { ReactElement } from "react";
import { Mode, EnhancedRoute, Stop } from "../../__v3api";
import { RouteGroup } from "./__tnm";
import { Dispatch } from "../state";
import ModeIcon from "./ModeIcon";
import { useSMDown } from "../../helpers/media-breakpoints-react";
import { buttonProps } from "../../components/StopCard";

export const renderRoutesLabel = (
  routes: EnhancedRoute[],
  type: Mode
): ReactElement<HTMLElement> =>
  type === "commuter_rail" ? (
    <a href={routes[0].href}>Commuter Rail</a>
  ) : (
    <span>
      {type === "bus" ? "Bus: " : null}
      {routes.map((route, i: number) => (
        <React.Fragment key={route.id}>
          <a href={route.href}>{route.name}</a>
          {i !== routes.length - 1 ? ", " : ""}
        </React.Fragment>
      ))}
    </span>
  );

export const renderRoutes = (
  routes: EnhancedRoute[],
  type: Mode
): ReactElement<HTMLElement> => (
  <div key={type} className="m-tnm-sidebar__stop-card-description">
    <span className="m-tnm-sidebar__stop-route-name">
      <ModeIcon type={type} />
      {renderRoutesLabel(routes, type)}
    </span>
  </div>
);

interface Props {
  stop: Stop;
  routes: RouteGroup[];
  dispatch: Dispatch;
  distance: string;
}

const StopWithRoutesCard = ({
  stop,
  routes,
  distance,
  dispatch
}: Props): ReactElement<HTMLElement> => {
  const isSmallBreakpoint = useSMDown();
  const containerProps = !isSmallBreakpoint
    ? buttonProps(dispatch, stop.id)
    : {};

  return (
    <div className="m-tnm-sidebar__stop-card" {...containerProps}>
      <div className="m-tnm-sidebar__stop-card-header">
        <a className="m-tnm-sidebar__stop-card-name" href={stop.href}>
          {stop.name}
        </a>
        <div className="m-tnm-sidebar__stop-distance">{distance}</div>
      </div>
      {routes.map(
        ({ group_name: groupName, routes: routesForStop }: RouteGroup) =>
          renderRoutes(routesForStop, groupName)
      )}
    </div>
  );
};

export default StopWithRoutesCard;
