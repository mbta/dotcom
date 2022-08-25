import React, { ReactElement, useState } from "react";
import { get, isEmpty } from "lodash";
import { Route } from "../../../../__v3api";
import Loading from "../../../../components/Loading";
import { caret, modeIcon } from "../../../../helpers/icon";
import {
  timeForCommuterRail,
  trackForCommuterRail,
  statusForCommuterRail
} from "../../../../helpers/prediction-helpers";
import { breakTextAtSlash } from "../../../../helpers/text";
import { isABusRoute, isACommuterRailRoute } from "../../../../models/route";
import { modeBgClass } from "../../../../stop/components/RoutePillList";
import { UserInput } from "../../__schedule";
import { EnhancedJourney, Journey } from "../../__trips";
import LiveCrowdingIcon from "../../line-diagram/LiveCrowdingIcon";
import {
  isInitialLoading,
  UseProviderState,
  UseProviderStateWithoutInitialLoading
} from "../../../../helpers/use-provider";
import TripDetails from "./TripDetails";
import { handleReactEnterKeyPress } from "../../../../helpers/keyboard-events-react";

type State = UseProviderState<EnhancedJourney[]>;
type StateWithoutInitialLoading = UseProviderStateWithoutInitialLoading<
  EnhancedJourney[]
>;

interface Props {
  state: State;
  input: UserInput;
}

interface AccordionProps {
  input: UserInput;
  journey: EnhancedJourney;
  contentComponent: () => ReactElement<HTMLElement>;
}

// Predictions are nil unless they have a time. This helps
// prevent far-future trips from appearing in Upcoming Departures.
const hasPredictions = (journeys: Journey[]): boolean =>
  journeys.filter(journey => journey.realtime.prediction !== null).length > 0;

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
  journey: Journey;
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
        {crowdingInformation(journey as any, trip.id)}
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
  input: UserInput;
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
  input,
  journey,
  contentComponent
}: AccordionProps): ReactElement<HTMLElement> => {
  const [expanded, setExpanded] = useState(false);
  const toggle = (): void => setExpanded(!expanded);

  return (
    <AccordionRow
      input={input}
      journey={journey}
      contentComponent={contentComponent}
      expanded={expanded}
      toggle={toggle}
    />
  );
};

const TableRow = ({
  input,
  journey
}: {
  input: UserInput;
  journey: EnhancedJourney;
}): ReactElement<HTMLElement> | null => {
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

const UpcomingDeparturesHeader = (
  <div className="schedule-table__upcoming-departures-header">
    <h3>Upcoming Departures</h3>
  </div>
);

export const upcomingDeparturesTable = (
  state: StateWithoutInitialLoading,
  input: UserInput
): ReactElement<HTMLElement> => {
  const headerLabel = "Trip Details";
  const { data: journeys } = state;
  const journeysWithTripInfo = journeys as EnhancedJourney[];

  // We use this condition for cosmetic purposes: if there's no crowding information for _any_ of the upcoming departures, we don't want to show a gap/empty column.
  const someCrowdingInfoExists =
    !isEmpty(journeysWithTripInfo) && isABusRoute(journeysWithTripInfo[0].route)
      ? journeysWithTripInfo.some(journey => {
          const { tripInfo } = journey;
          if (!tripInfo) return false;
          const crowding = get(tripInfo, "vehicle.crowding", null);
          return crowding !== null;
        })
      : false;

  return (
    <>
      {UpcomingDeparturesHeader}
      {hasPredictions(journeys) ? (
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
                input={input}
                journey={journey}
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
  input
}: Props): ReactElement<HTMLElement> | null => {
  if (isInitialLoading(state)) {
    return <Loading />;
  }

  return <>{upcomingDeparturesTable(state, input)}</>;
};

export default UpcomingDepartures;
