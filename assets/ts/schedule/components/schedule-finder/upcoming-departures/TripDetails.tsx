import React, { ReactElement } from "react";
import {
  TripDeparture,
  TripDepartureWithPrediction,
  TripInfo
} from "../../__trips";
import CrowdingPill from "../../line-diagram/CrowdingPill";
import TripStop from "./TripStop";

interface Props {
  tripInfo: TripInfo | null;
  showFare: boolean;
}

const hasAPrediction = (
  departure: TripDeparture
): departure is TripDepartureWithPrediction =>
  departure.prediction !== null &&
  departure.prediction.schedule_relationship !== "skipped";

const departuresWithPredictions = (
  departures: TripDeparture[]
): TripDepartureWithPrediction[] => departures.filter(hasAPrediction);

const TripSummary = ({
  tripInfo
}: {
  tripInfo: TripInfo;
}): ReactElement<HTMLElement> => (
  <tr className="trip-details-table__summary">
    <td colSpan={3} className="schedule-table__cell">
      <div>
        <span className="trip-details-table__title u-small-caps font-bold">
          Trip length
        </span>
        {departuresWithPredictions(tripInfo.times).length} stops,{" "}
        {tripInfo.duration} minutes total
      </div>
      <div>
        <span className="trip-details-table__title u-small-caps font-bold">
          Fare
        </span>

        {tripInfo.fare && tripInfo.fare.price}
        <a className="trip-details-table__link" href={tripInfo.fare.fare_link}>
          View fares
        </a>
      </div>
    </td>
  </tr>
);

const TripDetails = ({
  tripInfo,
  showFare
}: Props): ReactElement<HTMLElement> | null => {
  if (!tripInfo) return null;

  const crowding = tripInfo.vehicle?.crowding || null;

  return (
    <table className="trip-details-table">
      <thead>
        {crowding && (
          <tr>
            <th>
              <CrowdingPill crowding={crowding} />
            </th>
          </tr>
        )}
        <TripSummary tripInfo={tripInfo} />
        <tr>
          <th scope="col" className="schedule-table__cell">
            Stops
          </th>
          {showFare && (
            <th
              scope="col"
              className="schedule-table__cell schedule-table__cell--right-adjusted"
            >
              Fare
            </th>
          )}
          <th
            scope="col"
            className="schedule-table__cell schedule-table__cell--right-adjusted"
          >
            Arrival
          </th>
        </tr>
      </thead>
      <tbody>
        {departuresWithPredictions(tripInfo.times).map(
          (departure, index: number) => (
            <TripStop
              departure={departure}
              index={index}
              showFare={showFare}
              routeType={tripInfo.route_type}
              key={
                (departure.prediction.stop && departure.prediction.stop.id) ||
                departure.schedule.stop.id
              }
            />
          )
        )}
      </tbody>
    </table>
  );
};

export default TripDetails;
