import React, { ReactElement } from "react";
import { concat } from "lodash";
import { Alert, DirectionId, Route, Stop, Trip } from "../../__v3api";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { DepartureInfo } from "../../models/departureInfo";
import { mergeIntoDepartureInfo } from "../../helpers/departureInfo";
import usePredictionsChannel from "../../hooks/usePredictionsChannel";
import { routeBgClass } from "../../helpers/css";
import { routeName, routeToModeIcon } from "../../helpers/route-headers";
import renderSvg from "../../helpers/render-svg";
import {
  alertsByRoute,
  alertsByStop,
  allAlertsForDirection,
  hasSuspension,
  isCurrentAlert,
  isHighPriorityAlert
} from "../../models/alert";
import Alerts from "../../components/Alerts";

interface DepartureListProps {
  route: Route;
  stop: Stop;
  schedules: ScheduleWithTimestamp[];
  directionId: DirectionId;
  alerts: Alert[];
}

const displayNoUpcomingTrips = (): JSX.Element => {
  return (
    <div className="c-alert-item--low m-8 d-flex justify-content-center align-items-center pb-40 pt-40">
      No upcoming trips today
    </div>
  );
};

const DepartureList = ({
  route,
  stop,
  schedules,
  directionId,
  alerts
}: DepartureListProps): ReactElement<HTMLElement> => {
  const tripForSelectedRoutePattern: Trip | undefined = schedules[0]?.trip;
  const predictionsByHeadsign = usePredictionsChannel(
    route.id,
    stop.id,
    directionId
  );
  const { headsign } = tripForSelectedRoutePattern;
  const preds = predictionsByHeadsign[headsign]
    ? predictionsByHeadsign[headsign]
    : [];
  const departures: DepartureInfo[] = mergeIntoDepartureInfo(schedules, preds);

  const groupedAlerts = alertsByRoute(alerts);
  const alertsForRoute = groupedAlerts[route.id] || [];

  const routeAlerts = allAlertsForDirection(alertsForRoute, directionId);
  const stopAlerts = alertsByStop(alerts, stop.id);
  const allAlerts = concat(routeAlerts, stopAlerts).filter(alert => {
    return isHighPriorityAlert(alert) && isCurrentAlert(alert);
  });

  // TODO: handle no predictions or schedules case and predictions only case
  return (
    <>
      <div className="stop-departures departure-list-header">
        <div className={`departure-card__route ${routeBgClass(route)}`}>
          <div>
            {renderSvg("c-svg__icon", routeToModeIcon(route), true)}{" "}
            {routeName(route)}
          </div>
          <a
            className="open-schedule"
            href={`../schedules/${route.id}/line?schedule_direction[direction_id]=${directionId}&schedule_direction[variant]=${tripForSelectedRoutePattern?.route_pattern_id}&schedule_finder[direction_id]=${directionId}&schedule_finder[origin]=${stop.id}`}
          >
            View all schedules
          </a>
        </div>
      </div>
      <h2 className="departure-list__sub-header">
        <div className="departure-list__origin-stop-name">{stop.name} to</div>
        <div className="departure-list__headsign">
          {tripForSelectedRoutePattern?.headsign}
        </div>
      </h2>
      {allAlerts.length ? <Alerts alerts={allAlerts} /> : null}
      {schedules.length === 0 && displayNoUpcomingTrips()}
      {tripForSelectedRoutePattern && !hasSuspension(allAlerts) && (
        <>
          {departures.map(({ prediction, schedule }) => {
            const predictionOrSchedule = prediction || schedule;
            return (
              <div key={`${predictionOrSchedule?.trip.id}`}>
                {predictionOrSchedule?.time.toString()}
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default DepartureList;
