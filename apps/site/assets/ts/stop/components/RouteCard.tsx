import React, { ReactElement } from "react";
import { Direction as DirectionType, EnhancedRoute, Stop } from "../../__v3api";
import Direction from "../../components/Direction";
import RouteCardHeader from "../../components/RouteCardHeader";

interface Props {
  route: EnhancedRoute;
  directions: DirectionType[];
  stop: Stop;
  hasAlert?: boolean;
}

const RouteCard = ({
  route,
  hasAlert,
  directions,
  stop
}: Props): ReactElement<HTMLElement> => (
  <div className="m-stop-page__departures-route">
    <RouteCardHeader route={route} hasAlert={hasAlert} />
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
