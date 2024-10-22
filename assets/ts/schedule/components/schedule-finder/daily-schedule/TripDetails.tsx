import React, { ReactElement } from "react";
import Loading from "../../../../components/Loading";
import { FetchState, hasData, isLoading } from "../../../../helpers/use-fetch";
import { TripInfo } from "../../__trips";
import CrowdingPill from "../../line-diagram/CrowdingPill";
import TripStop from "./TripStop";

interface Props {
  fetchState: FetchState<TripInfo>;
  showFare: boolean;
}

const TripSummary = ({
  tripInfo,
  showFare
}: {
  tripInfo: TripInfo;
  showFare: boolean;
}): ReactElement<HTMLElement> => (
  <tr className="trip-details-table__summary">
    <td colSpan={3} className="schedule-table__cell">
      <div>
        <span className="trip-details-table__title u-small-caps font-bold">
          Trip length
        </span>
        {tripInfo.times.length} stops, {tripInfo.duration} minutes total
      </div>
      {showFare && (
        <div>
          <span className="trip-details-table__title u-small-caps font-bold">
            Fare
          </span>

          {tripInfo.fare && tripInfo.fare.price}
          <a
            className="trip-details-table__link"
            href={tripInfo.fare.fare_link}
          >
            View fares
          </a>
        </div>
      )}
    </td>
  </tr>
);

const allTimesHaveSchedule = (tripInfo: TripInfo): boolean =>
  tripInfo.times.every(time => !!time.schedule);

const ErrorLoadingTrip = (): ReactElement<HTMLElement> => (
  <p>
    <em>Error loading trip details. Please try again later.</em>
  </p>
);

const TripDetailsTable = ({
  tripInfo,
  showFare
}: {
  tripInfo: TripInfo;
  showFare: boolean;
}): ReactElement<HTMLElement> => {
  const crowding = tripInfo.vehicle ? tripInfo.vehicle.crowding : null;

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
        <TripSummary tripInfo={tripInfo} showFare={showFare} />
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
        {allTimesHaveSchedule(tripInfo) ? (
          tripInfo.times.map((departure, index: number) => (
            <TripStop
              departure={departure}
              index={index}
              showFare={showFare}
              routeType={tripInfo.route_type}
              key={departure.schedule.stop.id}
            />
          ))
        ) : (
          <tr>
            <td>
              <ErrorLoadingTrip />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const TripDetails = ({
  fetchState,
  showFare
}: Props): ReactElement<HTMLElement> => {
  if (hasData(fetchState) && !!fetchState.data) {
    return <TripDetailsTable tripInfo={fetchState.data} showFare={showFare} />;
  }

  if (isLoading(fetchState)) {
    return <Loading />;
  }

  return <ErrorLoadingTrip />;
};

export default TripDetails;
