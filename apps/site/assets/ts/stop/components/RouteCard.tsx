import React, { ReactElement } from "react";
import { Direction as DirectionType, EnhancedRoute, Stop } from "../../__v3api";
import Direction from "../../components/Direction";
import { isSilverLine } from "../../helpers/silver-line";
import { isABusRoute } from "../../models/route";
import { alertIcon } from "../../helpers/icon";

interface Props {
  route: EnhancedRoute;
  directions: DirectionType[];
  stop: Stop;
  hasAlert?: boolean;
}

const routeBgColor = (route: EnhancedRoute): string => {
  if (route.type === 2) return "commuter-rail";
  if (route.type === 4) return "ferry";
  if (route.id === "Red" || route.id === "Mattapan") return "red-line";
  if (route.id === "Orange") return "orange-line";
  if (route.id === "Blue") return "blue-line";
  if (route.id.startsWith("Green-")) return "green-line";
  if (isSilverLine(route.id)) return "silver-line";
  if (isABusRoute(route)) return "bus";
  return "unknown";
};

const routeBgClass = (route: EnhancedRoute): string =>
  `u-bg--${routeBgColor(route)}`;

const busClass = (route: EnhancedRoute): string =>
  isABusRoute(route) && !isSilverLine(route.id) ? "bus-route-sign" : "";

const routeHeader = (route: EnhancedRoute): string =>
  isSilverLine(route.id) ? `Silver Line ${route.name}` : route.name;

const Header = ({
  route,
  hasAlert
}: {
  route: EnhancedRoute;
  hasAlert?: boolean;
}): ReactElement<HTMLElement> => (
  <div
    className={`c-link-block h3 m-tnm-sidebar__route-name ${routeBgClass(
      route
    )}`}
  >
    <a className="c-link-block__outer-link" href={`/schedules/${route.id}`} />
    <div className="c-link-block__inner">
      <span className={busClass(route)}>{routeHeader(route)}</span>
      {hasAlert && (
        <a
          className="c-link-block__inner-link"
          href={`/schedules/${route.id}/alerts`}
          title="alert"
        >
          {alertIcon("c-svg__icon-alerts-triangle m-tnm-sidebar__route-alert")}
        </a>
      )}
    </div>
  </div>
);

const RouteCard = ({
  route,
  hasAlert,
  directions,
  stop
}: Props): ReactElement<HTMLElement> => (
  <div className="m-stop-page__departures-route">
    <Header route={route} hasAlert={hasAlert} />
    {directions.length === 0 && (
      <div className="m-stop-page__no-departures">
        <div>No departures within 24 hours</div>
        <div>
          <a href={`/schedules/${route.id}`} className="c-call-to-action">
            View {route.name} schedule
          </a>
        </div>
      </div>
    )}

    {directions.map(direction => (
      <Direction
        key={`${route.id}-${direction.direction_id}`}
        direction={direction}
        route={route}
        stopId={stop.id}
      />
    ))}
  </div>
);

export default RouteCard;
