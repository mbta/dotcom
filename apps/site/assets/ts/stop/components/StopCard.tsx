import React, { ReactElement } from "react";
import { Stop, EnhancedRoute, DirectionId } from "../../__v3api";
import { RouteWithDirection } from "./__stop";
import { modeIcon } from "../../helpers/icon";
import accessible from "./StopAccessibilityIcon";

const formatMilesToFeet = (miles: number): number => Math.floor(miles * 5280.0);

const routeNameBasedOnDirection = (
  route: EnhancedRoute,
  directionId: DirectionId | null
): string => {
  if (directionId === null) {
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
          // eslint-disable-next-line @typescript-eslint/camelcase
          direction_id: null
        }))
      : routesWithDirection;

  return (
    <div className="c-stop-card">
      {renderDistance(distance, distanceFormatted)}
      <a className="c-stop-card__stop-name" href={`/stops/${stop.id}`}>
        {stop.name}
      </a>
      {accessible(stop)}
      {routesToRender &&
        routesToRender.map(({ route, direction_id: directionId }) => (
          <div
            className="c-stop-card__route"
            key={`suggestedTransferRoute${route.id}`}
          >
            {route.type === 3 && !route.name.startsWith("SL") ? (
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
