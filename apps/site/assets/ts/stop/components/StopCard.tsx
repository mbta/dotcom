import React, { ReactElement } from "react";
import { Stop, EnhancedRoute, DirectionId } from "../../__v3api";
import { RouteWithDirection } from "./__stop";
import { modeIcon, parkingIcon } from "../../helpers/icon";
import { isABusRoute } from "../../models/route";
import accessible from "./StopAccessibilityIcon";
import { routesWithDirectionsAreAllBusStops } from "../../helpers/routes";

const formatMilesToFeet = (miles: number): number => Math.floor(miles * 5280.0);

const routeNameBasedOnDirection = (
  route: EnhancedRoute,
  directionId: DirectionId | null
): string => {
  if (directionId === null || route.type !== 3) {
    return route.long_name;
  }

  const destination = route.direction_destinations[directionId];
  return destination === null ? route.long_name : destination;
};

interface Props {
  stop: Stop;
  routesWithDirection?: RouteWithDirection[];
  routes?: EnhancedRoute[];
  distance?: number;
  distanceFormatted?: string;
}

const renderDistance = (
  distance: number | undefined,
  distanceFormatted: string | undefined
): ReactElement<HTMLElement> | null => {
  if (distance) {
    return (
      <span className="c-stop-card__distance">
        {formatMilesToFeet(distance)} ft
      </span>
    );
  }
  if (distanceFormatted) {
    return <span className="c-stop-card__distance">{distanceFormatted}</span>;
  }
  return null;
};

const StopCard = ({
  stop,
  distance,
  distanceFormatted,
  routesWithDirection = [],
  routes = []
}: Props): ReactElement<HTMLElement> => {
  const routesToRender =
    routesWithDirection.length === 0 && routes.length > 0
      ? routes.map(route => ({
          route,
          // eslint-disable-next-line camelcase
          direction_id: null
        }))
      : routesWithDirection;

  const allAreBusStops = routesWithDirectionsAreAllBusStops(routesToRender);

  return (
    <div className="c-stop-card">
      {renderDistance(distance, distanceFormatted)}
      <a className="c-stop-card__stop-name" href={`/stops/${stop.id}`}>
        {stop.name}
      </a>
      <div className="c-stop-card__icon-container">
        {accessible(stop, allAreBusStops)}
        {stop.parking_lots.length > 0 ? (
          <span className="c-stop-page__icon">
            {parkingIcon("c-svg__icon-parking-default u-color-gray-light")}
          </span>
        ) : null}
      </div>
      {routesToRender &&
        routesToRender.map(({ route, direction_id: directionId }) => (
          <div
            className="c-stop-card__route"
            key={`suggestedTransferRoute${route.id}`}
          >
            {isABusRoute(route) && !route.name.startsWith("SL") ? (
              <div className="c-stop-card__bus-pill u-bg--bus u-small-class">
                {route.name}
              </div>
            ) : (
              modeIcon(route.id)
            )}
            <a
              href={`/schedules/${route.id}${
                directionId !== null ? `?direction_id=${directionId}` : ""
              }`}
              className="c-stop-card__route-link"
            >
              {routeNameBasedOnDirection(route, directionId)}
            </a>
          </div>
        ))}
    </div>
  );
};

export default StopCard;
