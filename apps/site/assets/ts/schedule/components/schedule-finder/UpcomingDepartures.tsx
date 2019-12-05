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
import { Accordion } from "./TableRow";
import { UserInput } from "../ScheduleFinder";

interface State {
  data: EnhancedJourney[] | null;
  isLoading: boolean;
  error: boolean;
}

interface Props {
  state: State;
  input: UserInput;
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
  input: UserInput;
  journey: EnhancedJourney;
}

const BusTableRow = ({
  journey
}: {
  journey: EnhancedJourney;
}): ReactElement<HTMLElement> | null => {
  const { trip, route, realtime } = journey;
  return (
    <>
      <td className="schedule-table__td schedule-table__td--flex-end">
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
      <td className="schedule-table__time schedule-table__td--flex-end u-bold">
        {realtime.prediction!.time}
      </td>
    </>
  );
};

const CrTableRow = ({
  journey
}: {
  journey: EnhancedJourney;
}): ReactElement<HTMLElement> | null => {
  const { trip, route, realtime } = journey;

  if (realtime.prediction === null) return null;

  const track = trackForCommuterRail(realtime);
  const trainNumber = trip.name ? `Train ${trip.name}` : "";

  return (
    <>
      <td className="schedule-table__headsign">{modeIcon(route.id)}</td>
      <td className="schedule-table__headsign">
        {breakTextAtSlash(trip.headsign)}
        <div>{trainNumber}</div>
      </td>
      <td className="schedule-table__td schedule-table__td--flex-end">
        <div className="schedule-table__time-container">
          {timeForCommuterRail(realtime, "schedule-table__time")}
        </div>
        <div className="u-nowrap text-right u-bold">
          <span className="schedule-table__status">
            {statusForCommuterRail(realtime)}
          </span>

          <span className="schedule-table__track">
            {track ? ` · ${track}` : ""}
          </span>
        </div>
      </td>
    </>
  );
};

const TableRow = ({
  input,
  journey
}: TableRowProps): ReactElement<HTMLElement> | null => {
  const { realtime } = journey;

  if (realtime.prediction === null) return null;

  const contentComponent =
    journey.route.type !== 2
      ? () => <BusTableRow journey={journey} />
      : () => <CrTableRow journey={journey} />;

  return (
    <Accordion
      input={input}
      journey={journey}
      contentComponent={contentComponent}
    />
  );
};

export const UpcomingDepartures = ({
  state,
  input
}: Props): ReactElement<HTMLElement> | null => {
  const { data: journeys, error, isLoading } = state;

  if (error || isLoading) return null;

  if (journeys !== null && hasPredictions(journeys)) {
    return (
      <>
        <h3>Upcoming Departures</h3>
        <table className="schedule-table schedule-table--upcoming">
          <thead className="schedule-table__header">
            <tr className="schedule-table__row-header">
              <th scope="col" className="schedule-table__row-header-label">
                Destinations
              </th>
              <th scope="col" className="schedule-table__th--flex-end">
                Trip Details
              </th>
            </tr>
          </thead>
          <tbody>
            {journeys.map((journey: EnhancedJourney, idx: number) => (
              <TableRow
                journey={journey}
                input={input}
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
