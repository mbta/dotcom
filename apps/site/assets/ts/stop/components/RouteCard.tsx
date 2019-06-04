import React, { ReactElement } from "react";
import { Direction as DirectionType, Route, Stop } from "../../__v3api";
import Direction from "../../components/Direction";
import { isSilverLine } from "../../helpers/silver-line";

interface Props {
  route: Route;
  directions: DirectionType[];
  stop: Stop;
}

const routeBgColor = (route: Route): string => {
  if (route.type === 2) return "commuter-rail";
  if (route.type === 4) return "ferry";
  if (route.id === "Red" || route.id === "Mattapan") return "red-line";
  if (route.id === "Orange") return "orange-line";
  if (route.id === "Blue") return "blue-line";
  if (route.id.startsWith("Green-")) return "green-line";
  if (isSilverLine(route.id)) return "silver-line";
  if (route.type === 3) return "bus";
  return "unknown";
};

const routeBgClass = (route: Route): string => `u-bg--${routeBgColor(route)}`;

const busClass = (route: Route): string =>
  route.type === 3 && !isSilverLine(route.id) ? "bus-route-sign" : "";

const routeHeader = (route: Route): string =>
  isSilverLine(route.id) ? `Silver Line ${route.name}` : route.name;

const Header = ({ route }: { route: Route }): ReactElement<HTMLElement> => (
  <a
    href={`/schedules/${route.id}`}
    className={`h3 m-tnm-sidebar__route-name ${routeBgClass(route)}`}
  >
    <span className={busClass(route)}>{routeHeader(route)}</span>
  </a>
);

const RouteCard = ({
  route,
  directions,
  stop
}: Props): ReactElement<HTMLElement> => (
  <div className="m-stop-page__departures-route">
    <Header route={route} />
    {directions.length === 0 && (
      <div className="m-stop-page__no-departures">
        <div>No departures within 24 hours</div>
        <div>
          <a href={`/schedules/${route.id}`} className="c-call-to-action">
            View {route.name} schedules
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
