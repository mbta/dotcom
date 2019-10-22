import React, { ReactElement } from "react";
import {
  timeForCommuterRail,
  trackForCommuterRail,
  statusForCommuterRail
} from "../../../helpers/prediction-helpers";
import { modeIcon } from "../../../helpers/icon";
import { modeBgClass } from "../../../stop/components/RoutePillList";
import { Prediction, Route, Schedule } from "../../../__v3api";
import {
  ServiceScheduleByTrip,
  ServiceScheduleInfo,
  StopPrediction
} from "../__schedule";
import { breakTextAtSlash } from "../../../helpers/text";
import { isNull } from "util";
import TripPlannerResults from "../../../trip-plan-results/components/TripPlannerResults";
import { access } from "fs";

interface Props {
  data: ServiceScheduleInfo;
}

const predictionsByTrip = ({
  trip_order,
  by_trip
}: ServiceScheduleInfo): ServiceScheduleInfo => {
  const filtered = trip_order.reduce(
    (obj: ServiceScheduleByTrip, tripId: string) => {
      const trip = by_trip[tripId];
      if (trip.schedules.some(schedule => !isNull(schedule.prediction))) {
        obj.tripId = trip;
      }
      return obj;
    },
    {}
  );

  return { trip_order: trip_order, by_trip: filtered };
};

const hasPredictions = ({ by_trip }: ServiceScheduleInfo): boolean =>
  Object.entries(by_trip).length === 0;

export const RoutePillSmall = ({
  route
}: {
  route: Route;
}): ReactElement<HTMLElement> | null => (
  <div className="schedule-table__row-route-pill m-route-pills">
    <div className={modeBgClass(route)}>{route.name}</div>
  </div>
);
interface TableRowProps {
  prediction: Prediction;
}

const TableRow = ({
  prediction
}: TableRowProps): ReactElement<HTMLElement> | null => {
  if (prediction === null) return null;
  if (prediction.route.type === 2)
    return <CrTableRow prediction={prediction} />;
  return (
    <tr className="schedule-table__row schedule-table__row--stretch">
      <td>
        <div className="schedule-table__row-route">
          <RoutePillSmall route={prediction.route} /> {prediction.headsign}
        </div>
      </td>
      <td className="schedule-table__time u-bold">
        {prediction.prediction.prediction.time}
      </td>
    </tr>
  );
};

const CrTableRow = ({
  prediction
}: TableRowProps): ReactElement<HTMLElement> => {
  const track = trackForCommuterRail(prediction.prediction);
  const trainNumber = prediction.train_number
    ? `Train ${prediction.train_number} · `
    : "";
  const predictedSchedule = prediction.prediction;
  return (
    <tr className="schedule-table__row schedule-table__row--stretch">
      <td className="schedule-table__headsign">
        {modeIcon(prediction.route.id)} {breakTextAtSlash(prediction.headsign)}
      </td>
      <td>
        <div className="schedule-table__time-container">
          {timeForCommuterRail(
            predictedSchedule,
            "schedule-table__time u-bold"
          )}
        </div>
        <div className="u-nowrap text-right">
          {trainNumber}
          {track ? (
            <span className="schedule-table__track">{track} · </span>
          ) : (
            ""
          )}
          {statusForCommuterRail(predictedSchedule)}
        </div>
      </td>
    </tr>
  );
};

export const UpcomingDepartures = ({
  data
}: Props): ReactElement<HTMLElement> | null => {
  const dataWithPredictions = predictionsByTrip(data);

  console.log(dataWithPredictions);

  if (hasPredictions(dataWithPredictions)) {
    return (
      <>
        <h3>Upcoming Departures</h3>
        <table className="schedule-table">
          <thead className="schedule-table__header">
            <tr className="schedule-table__row-header">
              <th>Destinations</th>
            </tr>
          </thead>
          <tbody>
            {dataWithPredictions.trip_order.map((tripId: string) => (
              <TableRow
                key={tripId}
                schedules={dataWithPredictions.by_trip[tripId]}
                isSchoolTrip={isSchoolTrip(
                  routePatternsById,
                  dataWithPredictions.by_trip[tripId].route_pattern_id
                )}
                anySchoolTrips={anySchoolTrips}
              />
            ))}
          </tbody>
        </table>
      </>
    );
  }
  return null;
};

export default UpcomingDepartures;
