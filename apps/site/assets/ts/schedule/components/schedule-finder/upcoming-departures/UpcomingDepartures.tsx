import React, { ReactElement, useState } from "react";
import { get, isEmpty, join } from "lodash";
import { Route, Trip } from "../../../../__v3api";
import Loading from "../../../../components/Loading";
import { caret, modeIcon } from "../../../../helpers/icon";
import liveClockSvg from "../../../../../static/images/icon-live-clock.svg";
import {
  timeForCommuterRail,
  trackForCommuterRail,
  statusForCommuterRail
} from "../../../../helpers/prediction-helpers";
import { breakTextAtSlash } from "../../../../helpers/text";
import { isABusRoute, isACommuterRailRoute } from "../../../../models/route";
import { modeBgClass } from "../../../../stop/components/RoutePillList";
import { EnhancedJourney, Journey } from "../../__trips";
import LiveCrowdingIcon from "../../line-diagram/LiveCrowdingIcon";
import {
  isInitialLoading,
  UseProviderState,
  UseProviderStateWithoutInitialLoading
} from "../../../../helpers/use-provider";
import TripDetails from "./TripDetails";
import { handleReactEnterKeyPress } from "../../../../helpers/keyboard-events-react";
import { Prediction } from "../../../../hooks/usePredictions";

type State = UseProviderState<EnhancedJourney[]>;
type StateWithoutInitialLoading = UseProviderStateWithoutInitialLoading<
  EnhancedJourney[]
>;

interface Props {
  state: State;
  predictions: Prediction[];
}

interface AccordionProps {
  journey: EnhancedJourney;
  contentComponent: () => ReactElement<HTMLElement>;
}

const predictionsForTrip = (
  predictions: Prediction[],
  trip: Trip
): Prediction[] =>
  predictions.filter(prediction => prediction.tripId === trip.id);

// Predictions are nil unless they have a time. This helps
// prevent far-future trips from appearing in Upcoming Departures.
const hasPredictions = (
  journeys: Journey[],
  predictions: Prediction[]
): boolean =>
  journeys.some(journey =>
    predictions.some(prediction => prediction.tripId === journey.trip.id)
  );

const RoutePillSmall = ({
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

export const crowdingInformation = (
  journey: EnhancedJourney,
  tripId: string
): ReactElement<HTMLElement> | null => {
  const { tripInfo } = journey;
  if (tripInfo?.vehicle) {
    const showCrowding =
      tripInfo.vehicle.crowding && tripInfo.vehicle.trip_id === tripId;

    return (
      <LiveCrowdingIcon
        crowding={showCrowding ? tripInfo.vehicle.crowding : null}
      />
    );
  }

  return null;
};

export const BusTableRow = ({
  journey
}: {
  journey: EnhancedJourney;
}): ReactElement<HTMLElement> | null => {
  const { trip, route, realtime } = journey;

  return (
    <>
      <td className="schedule-table__cell schedule-table__cell--headsign">
        {isABusRoute(route) ? (
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
        {crowdingInformation(journey, trip.id)}
      </td>
    </>
  );
};

export const CrTableRow = ({
  journey
}: {
  journey: Journey;
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

const AccordionRow = ({
  journey,
  contentComponent,
  expanded,
  toggle
}: {
  journey: EnhancedJourney;
  contentComponent: () => ReactElement<HTMLElement>;
  expanded: boolean;
  toggle: () => void;
}): ReactElement<HTMLElement> => {
  const tripId = journey.trip.id;
  const isCommuterRail = isACommuterRailRoute(journey.route);

  return (
    <>
      <tr
        className={
          expanded ? "schedule-table__row--expanded" : "schedule-table__row"
        }
        aria-controls={`trip-${tripId}`}
        aria-expanded={expanded}
        role="button"
        onClick={toggle}
        onKeyPress={e => handleReactEnterKeyPress(e, toggle)}
        tabIndex={0}
      >
        {contentComponent()}
        <td className="schedule-table__cell schedule-table__cell--tiny">
          {expanded
            ? caret("c-expandable-block__header-caret--white", expanded)
            : caret("c-expandable-block__header-caret", expanded)}
        </td>
      </tr>
      {expanded && (
        <tr id={`trip-${tripId}-expanded`}>
          <td
            colSpan={isCommuterRail ? 4 : 3}
            className="schedule-table__cell schedule-table__cell--expanded"
          >
            <TripDetails
              showFare={isCommuterRail}
              tripInfo={journey.tripInfo}
            />
          </td>
        </tr>
      )}
    </>
  );
};

const Accordion = ({
  journey,
  contentComponent
}: AccordionProps): ReactElement<HTMLElement> => {
  const [expanded, setExpanded] = useState(false);
  const toggle = (): void => setExpanded(!expanded);

  return (
    <AccordionRow
      journey={journey}
      contentComponent={contentComponent}
      expanded={expanded}
      toggle={toggle}
    />
  );
};

const TableRow = ({
  journey,
  predictions
}: {
  journey: EnhancedJourney;
  predictions: Prediction[];
}): ReactElement<HTMLElement> | null => {
  const { realtime } = journey;

  if (realtime.prediction === null) return null;

  const contentComponent =
    journey.route.type !== 2
      ? () => <BusTableRow journey={journey} />
      : () => <CrTableRow journey={journey} />;

  return <Accordion journey={journey} contentComponent={contentComponent} />;
};

const UpcomingDeparturesHeader = (
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
);

export const upcomingDeparturesTable = (
  state: StateWithoutInitialLoading,
  predictions: Prediction[]
): ReactElement<HTMLElement> => {
  const headerLabel = "Trip Details";
  const { data: journeys } = state;

  // We use this condition for cosmetic purposes: if there's no crowding information for _any_ of the upcoming departures, we don't want to show a gap/empty column.
  const someCrowdingInfoExists =
    !isEmpty(journeys) && isABusRoute(journeys[0].route)
      ? journeys.some(journey => {
          const { tripInfo } = journey;
          if (!tripInfo) return false;
          const crowding = get(tripInfo, "vehicle.crowding", null);
          return crowding !== null;
        })
      : false;

  return (
    <>
      {UpcomingDeparturesHeader}
      {hasPredictions(journeys, predictions) ? (
        <table
          className={`schedule-table schedule-table--upcoming ${
            !someCrowdingInfoExists ? "u-no-crowding-data" : ""
          }`}
        >
          <thead className="schedule-table__header">
            <tr className="schedule-table__row-header">
              <th scope="col" className="schedule-table__cell">
                Destinations
              </th>
              <th scope="col" colSpan={2} className="schedule-table__cell">
                {someCrowdingInfoExists ? (
                  <span className="trip-details-table__title">
                    {headerLabel}
                  </span>
                ) : (
                  headerLabel
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {journeys.map((journey, idx: number) => (
              <TableRow
                journey={journey}
                predictions={predictionsForTrip(predictions, journey.trip)}
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="callout text-center u-bold">
          There are currently no realtime departures available.
        </div>
      )}
    </>
  );
};

export const UpcomingDepartures = ({
  state,
  predictions
}: Props): ReactElement<HTMLElement> | null => {
  if (isInitialLoading(state)) {
    return <Loading />;
  }

  return <>{upcomingDeparturesTable(state, predictions)}</>;
};

export default UpcomingDepartures;
