import React, { ReactElement } from "react";
import {
  timeForCommuterRail,
  trackForCommuterRail,
  statusForCommuterRail
} from "../../../helpers/prediction-helpers";
import { modeIcon } from "../../../helpers/icon";
import { modeBgClass } from "../../../stop/components/RoutePillList";
import { Route } from "../../../__v3api";
import { EnhancedJourney } from "../__trips";
import { breakTextAtSlash } from "../../../helpers/text";

interface State {
  data: EnhancedJourney[] | null;
  isLoading: boolean;
  error: boolean;
}

interface Props {
  state: State;
}

// Predictions are nil unless they have a time. This helps
// prevent far-future trips from appearing in Upcoming Departures.
const hasPredictions = (journeys: EnhancedJourney[]): boolean =>
  journeys.filter(journey => journey.realtime.prediction !== null).length > 0;

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
  journey: EnhancedJourney;
}

const TableRow = ({
  journey
}: TableRowProps): ReactElement<HTMLElement> | null => {
  const { trip, route, realtime } = journey;

  if (realtime.prediction === null) return null;

  if (route.type === 2) return <CrTableRow journey={journey} />;

  return (
    <tr className="schedule-table__row schedule-table__row--stretch">
      <td>
        <div className="schedule-table__row-route">
          {route.type === 3 ? (
            <RoutePillSmall route={route} />
          ) : (
            <div className="schedule-table__row-route-pill m-route-pills">
              {modeIcon(route.id)}
            </div>
          )}
          {trip.headsign}
        </div>
      </td>
      <td className="schedule-table__time u-bold">
        {realtime.prediction.time}
      </td>
    </tr>
  );
};

const CrTableRow = ({
  journey
}: TableRowProps): ReactElement<HTMLElement> | null => {
  const { trip, route, realtime } = journey;

  if (realtime.prediction === null) return null;

  const track = trackForCommuterRail(realtime);
  const trainNumber = trip.name ? `Train ${trip.name} · ` : "";

  return (
    <tr className="schedule-table__row schedule-table__row--stretch">
      <td className="schedule-table__headsign">
        {modeIcon(route.id)} {breakTextAtSlash(trip.headsign)}
      </td>
      <td>
        <div className="schedule-table__time-container">
          {timeForCommuterRail(realtime, "schedule-table__time u-bold")}
        </div>
        <div className="u-nowrap text-right">
          {trainNumber}
          {track ? `${track} · ` : ""}
          {statusForCommuterRail(realtime)}
        </div>
      </td>
    </tr>
  );
};

export const UpcomingDepartures = ({
  state
}: Props): ReactElement<HTMLElement> | null => {
  const { data: journeys, error, isLoading } = state;

  if (error || isLoading) return null;

  if (journeys !== null && hasPredictions(journeys)) {
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
            {journeys.map((journey: EnhancedJourney, idx: number) => (
              <TableRow
                journey={journey}
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
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
