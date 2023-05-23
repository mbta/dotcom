import React, { ReactElement } from "react";
import { DirectionId, Route, Stop, Trip } from "../../__v3api";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { DepartureInfo } from "../../models/departureInfo";
import { mergeIntoDepartureInfo } from "../../helpers/departureInfo";
import usePredictionsChannel from "../../hooks/usePredictionsChannel";
import { routeBgClass } from "../../helpers/css";
import { routeName, routeToModeIcon } from "../../helpers/route-headers";
import renderSvg from "../../helpers/render-svg";

interface DepartureListProps {
  route: Route;
  stop: Stop;
  schedules: ScheduleWithTimestamp[];
  directionId: DirectionId;
}

const DepartureList = ({
  route,
  stop,
  schedules,
  directionId
}: DepartureListProps): ReactElement<HTMLElement> => {
  const predictionsByHeadsign = usePredictionsChannel(
    route.id,
    stop.id,
    directionId
  );

  let departures: DepartureInfo[] = [];

  const tripForSelectedRoutePattern: Trip | undefined = schedules[0]?.trip;
  // TODO: handle no predictions or schedules case and predictions only case
  return (
    <>
      {tripForSelectedRoutePattern && (
        <>
          <div className="stop-departures departure-list-header">
            <div className={`departure-card__route ${routeBgClass(route)}`}>
              {renderSvg("c-svg__icon", routeToModeIcon(route), true)}{" "}
              {routeName(route)}
              <a
                className="open-schedule"
                href={`../schedules/${route.id}/line?schedule_direction[direction_id]=${directionId}&schedule_direction[variant]=${tripForSelectedRoutePattern.route_pattern_id}`}
              >
                View all schedules
              </a>
            </div>
          </div>
          <h2 className="departure-list__sub-header">
            <div className="departure-list__origin-stop-name">
              {stop.name} to
            </div>
            <div className="departure-list__headsign">
              {tripForSelectedRoutePattern.headsign}
            </div>
          </h2>
        </>
      )}
      {schedules.map((schs, idx) => {
        const { headsign } = schs.trip;
        const preds = predictionsByHeadsign[headsign]
          ? predictionsByHeadsign[headsign]
          : [];
        departures = mergeIntoDepartureInfo(schedules, preds);
        const prediction = departures[idx]?.prediction;
        const predictionOrSchedule = prediction || departures[idx]?.schedule;
        return (
          <div key={`${predictionOrSchedule?.trip.id}`}>
            {predictionOrSchedule?.time.toString()}
          </div>
        );
      })}
    </>
  );
};

export default DepartureList;
