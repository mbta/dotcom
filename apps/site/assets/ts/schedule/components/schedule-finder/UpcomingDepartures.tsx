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
import { UserInput } from "../../components/__schedule";
import liveClockSvg from "../../../../static/images/icon-live-clock.svg";

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

// Sometimes using the route.id from the journey is desired over the route.id
// from input (e.g. so we can get trips for "Green-D" instead of "Green")
const getAdjustedInput = (
  input: UserInput,
  journey: EnhancedJourney
): UserInput => ({ ...input, ...{ route: journey.route.id } });

export const RoutePillSmall = ({
  route
}: {
  route: Route;
}): ReactElement<HTMLElement> | null => (
  <span className="schedule-table__route-pill m-route-pills">
    <span className={`c-icon__bus-pill--small ${modeBgClass(route)}`}>
      {route.name}
    </span>
  </span>
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
      <td className="schedule-table__cell schedule-table__cell--headsign">
        {route.type === 3 ? (
          <RoutePillSmall route={route} />
        ) : (
          <span className="schedule-table__row-route-pill m-route-pills">
            {modeIcon(route.id)}
          </span>
        )}
        {trip.headsign}
      </td>
      <td className="schedule-table__cell schedule-table__cell--time u-nowrap u-bold text-right">
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

  const status = statusForCommuterRail(realtime);
  const track = trackForCommuterRail(realtime);
  const trainNumber = trip.name ? `Train ${trip.name}` : null;

  const statusWithTrain = [trainNumber, status].filter(x => x).join(" · ");

  return (
    <>
      <td className="schedule-table__cell schedule-table__cell--headsign">
        {modeIcon(route.id)} {breakTextAtSlash(trip.headsign)}
      </td>
      <td className="schedule-table__cell text-right">
        {timeForCommuterRail(
          realtime,
          "u-tabular-nums u-nowrap schedule-table__times"
        )}
        <div className="u-nowrap">
          {statusWithTrain}
          {track && (
            <span className="schedule-table__track">{` · ${track}`}</span>
          )}
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
      input={getAdjustedInput(input, journey)}
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
        <div className="schedule-table__upcoming-departures-header">
          <h3>Upcoming Departures</h3>
          <span className="schedule-table__live-clock" aria-hidden>
            <span className="icon-realtime animate notranslate">
              <span
                className="c-svg__icon-live-clock"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: liveClockSvg }}
              />
              <span className="icon-realtime-text">live</span>
            </span>
          </span>
        </div>
        <table className="schedule-table schedule-table--upcoming">
          <thead className="schedule-table__header">
            <tr className="schedule-table__row-header">
              <th scope="col" className="schedule-table__cell">
                Destinations
              </th>
              <th scope="col" colSpan={2} className="schedule-table__cell">
                Trip Details
              </th>
            </tr>
          </thead>
          <tbody>
            {journeys.map((journey: EnhancedJourney, idx: number) => (
              <TableRow
                journey={journey}
                input={getAdjustedInput(input, journey)}
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
