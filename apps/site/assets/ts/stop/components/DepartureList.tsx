import React, { ReactElement } from "react";
import { concat } from "lodash";
import { Alert, DirectionId, Route, Stop } from "../../__v3api";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { DepartureInfo } from "../../models/departureInfo";
import { mergeIntoDepartureInfo } from "../../helpers/departureInfo";
import usePredictionsChannel from "../../hooks/usePredictionsChannel";
import { routeBgClass } from "../../helpers/css";
import { routeName, routeToModeIcon } from "../../helpers/route-headers";
import renderSvg from "../../helpers/render-svg";
import {
  alertsByStop,
  allRouteAlertsForDirection,
  hasSuspension,
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

const DepartureList = ({
  route,
  stop,
  schedules,
  directionId,
  alerts
}: DepartureListProps): ReactElement<HTMLElement> => {
  const predictionsByHeadsign = usePredictionsChannel(
    route.id,
    stop.id,
    directionId
  );

  let departures: DepartureInfo[] = [];
  const routeAlerts = allRouteAlertsForDirection(
    alerts,
    route.id,
    directionId
  ).filter(alert => {
    return isHighPriorityAlert(alert) && alert.lifecycle === "ongoing";
  });
  const stopAlerts = alertsByStop(alerts, stop.id);
  const allAlerts = concat(routeAlerts, stopAlerts);
  // TODO: handle no predictions or schedules case and predictions only case
  return (
    <>
      {allAlerts.length ? <Alerts alerts={allAlerts} /> : null}
      {schedules.length && !hasSuspension(allAlerts) && (
        <div>
          <div className="stop-departures departure-list-header">
            <div className={`departure-card__route ${routeBgClass(route)}`}>
              <div>
                {renderSvg("c-svg__icon", routeToModeIcon(route), true)}{" "}
                {routeName(route)}
              </div>
              <a
                className="open-schedule"
                href={`../schedules/${route.id}/line?schedule_direction[direction_id]=${directionId}&schedule_direction[variant]=${schedules[0].trip.route_pattern_id}&schedule_finder[direction_id]=${directionId}&schedule_finder[origin]=${stop.id}`}
              >
                View all schedules
              </a>
            </div>
          </div>
          {schedules.map((schs, idx) => {
            const { headsign } = schs.trip;
            const preds = predictionsByHeadsign[headsign]
              ? predictionsByHeadsign[headsign]
              : [];
            departures = mergeIntoDepartureInfo(schedules, preds);
            const prediction = departures[idx]?.prediction;
            const predictionOrSchedule =
              prediction || departures[idx]?.schedule;
            return (
              <div key={`${predictionOrSchedule?.trip.id}`}>
                {predictionOrSchedule?.time.toString()}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default DepartureList;
