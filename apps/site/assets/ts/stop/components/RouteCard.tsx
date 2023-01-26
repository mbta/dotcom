import React, { ReactElement } from "react";
import {
  Direction as DirectionType,
  EnhancedRoute,
  Stop,
  Alert
} from "../../__v3api";
import Direction from "../../components/Direction";
import RouteCardHeader from "../../components/RouteCardHeader";
import { alertIcon } from "../../helpers/icon";
import { effectNameForAlert } from "../../components/Alerts";
import {
  isHighSeverityOrHighPriority,
  isDiversion,
  alertsByStop,
  uniqueByEffect
} from "../../models/alert";

interface Props {
  route: EnhancedRoute;
  directions: DirectionType[];
  stop: Stop;
  alerts: Alert[];
}

const RouteCard = ({
  route,
  directions,
  stop,
  alerts
}: Props): ReactElement<HTMLElement> => (
  <div className="m-stop-page__departures-route">
    <RouteCardHeader
      route={route}
      alerts={alerts.filter(isHighSeverityOrHighPriority)}
    />
    {alertsByStop(alerts.filter(isDiversion), stop.id)
      .filter(uniqueByEffect)
      .map(alert => (
        <a
          key={alert.id}
          className="m-stop-page__departures-alert"
          href={`/schedules/${route.id}/alerts`}
        >
          {alertIcon("c-svg__icon-alerts-triangle")}
          {effectNameForAlert(alert)}
        </a>
      ))}
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
      />
    ))}
  </div>
);

export default RouteCard;
