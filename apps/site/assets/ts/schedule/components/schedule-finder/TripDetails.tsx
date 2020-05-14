import React, { ReactElement } from "react";
import TripStop from "./TripStop";
import { TripInfo } from "../__trips";
import Loading from "../../../components/Loading";

export interface State {
  data: TripInfo | null;
  isLoading: boolean;
  error: boolean;
}

interface Props {
  state: State;
  showFare: boolean;
}

const TripSummary = ({
  tripInfo
}: {
  tripInfo: TripInfo;
}): ReactElement<HTMLElement> => (
  <tr className="trip-details-table__summary">
    <td colSpan={3} className="schedule-table__cell">
      <div>
        <span className="trip-details-table__title u-small-caps u-bold">
          Trip length
        </span>
        {tripInfo.times.length} stops, {tripInfo.duration} minutes total
      </div>
      <div>
        <span className="trip-details-table__title u-small-caps u-bold">
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

const allTimesHaveSchedule = (tripInfo: TripInfo): boolean =>
  tripInfo.times.every(time => !!time.schedule);

export const TripDetails = ({
  state,
  showFare
}: Props): ReactElement<HTMLElement> | null => {
  const { data: tripInfo, error, isLoading } = state;

  if (isLoading) {
    return <Loading />;
  }

  const errorLoadingTrip = (
    <p>
      <em>Error loading trip details. Please try again later.</em>
    </p>
  );

  if (error) {
    return errorLoadingTrip;
  }

  if (!tripInfo) return null;

  return (
    <table className="trip-details-table">
      <thead>
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
        {allTimesHaveSchedule(tripInfo)
          ? tripInfo.times.map((departure, index: number) => (
              <TripStop
                departure={departure}
                index={index}
                showFare={showFare}
                routeType={tripInfo.route_type}
                key={departure.schedule.stop.id}
              />
            ))
          : errorLoadingTrip}
      </tbody>
    </table>
  );
};
