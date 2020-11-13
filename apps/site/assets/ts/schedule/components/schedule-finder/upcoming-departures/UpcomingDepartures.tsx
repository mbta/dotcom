import React, { ReactElement, useEffect, useReducer, useState } from "react";
import { get, isEmpty } from "lodash";
import { Route } from "../../../../__v3api";
import Loading from "../../../../components/Loading";
import { reducer } from "../../../../helpers/fetch";
import { modeIcon } from "../../../../helpers/icon";
import {
  timeForCommuterRail,
  trackForCommuterRail,
  statusForCommuterRail
} from "../../../../helpers/prediction-helpers";
import { breakTextAtSlash } from "../../../../helpers/text";
import { isABusRoute } from "../../../../models/route";
import liveClockSvg from "../../../../../static/images/icon-live-clock.svg";
import { modeBgClass } from "../../../../stop/components/RoutePillList";
import { UserInput } from "../../__schedule";
import { EnhancedJourney } from "../../__trips";
import LazyAccordion, { AccordionRow } from "./LazyAccordion";
import LiveCrowdingIcon from "../../line-diagram/LiveCrowdingIcon";

interface State {
  data: EnhancedJourney[] | null;
  isLoading: boolean;
  error: boolean;
}

interface Props {
  state: State;
  input: UserInput;
}

interface AccordionProps {
  state: State;
  journey: EnhancedJourney;
  contentComponent: () => ReactElement<HTMLElement>;
}

type FetchAction =
  | { type: "FETCH_COMPLETE"; payload: EnhancedJourney[] }
  | { type: "FETCH_ERROR" }
  | { type: "FETCH_STARTED" };

// Predictions are nil unless they have a time. This helps
// prevent far-future trips from appearing in Upcoming Departures.
const hasPredictions = (journeys: EnhancedJourney[]): boolean =>
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
  if (tripInfo) {
    // Only display the crowding information if the trip ID of the vehicle matches the trip ID of the prediction being displayed.
    const showCrowding =
      !!tripInfo.vehicle &&
      !!tripInfo.vehicle.crowding &&
      tripInfo.vehicle.trip_id === tripId;

    return (
      <LiveCrowdingIcon
        crowding={showCrowding ? tripInfo!.vehicle!.crowding! : null}
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
  state,
  input,
  journey
}: {
  state: State;
  input: UserInput;
  journey: EnhancedJourney;
}): ReactElement<HTMLElement> | null => {
  const { realtime } = journey;

  if (realtime.prediction === null) return null;

  const contentComponent =
    journey.route.type !== 2
      ? () => <BusTableRow journey={journey} />
      : () => <CrTableRow journey={journey} />;

  if (isABusRoute(journey.route)) {
    return (
      <Accordion
        state={state}
        journey={journey}
        contentComponent={contentComponent}
      />
    );
  }

  return (
    <LazyAccordion
      input={input}
      journey={journey}
      contentComponent={contentComponent}
    />
  );
};

const Accordion = ({
  state,
  journey,
  contentComponent
}: AccordionProps): ReactElement<HTMLElement> => {
  const adjustedState = {
    data: journey.tripInfo,
    isLoading: state.isLoading,
    error: state.error
  };

  const [expanded, setExpanded] = useState(false);
  const toggle = (): void => setExpanded(!expanded);

  return (
    <AccordionRow
      state={adjustedState}
      journey={journey}
      contentComponent={contentComponent}
      expanded={expanded}
      toggle={toggle}
    />
  );
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

export const fetchData = async (
  input: UserInput,
  journeys: EnhancedJourney[],
  dispatch: (action: FetchAction) => void
): Promise<EnhancedJourney[]> => {
  const { route, origin, direction, date } = input;

  dispatch({ type: "FETCH_STARTED" });

  return Promise.all(
    journeys
      .filter(journey => journey.realtime.prediction !== null)
      .map(async journey => {
        // Sometimes using the route.id from the journey is desired over the route.id
        // from input (e.g. so we can get trips for "Green-D" instead of "Green")
        const adjustedRoute = journey.route.id;

        const tripId = journey.trip.id;

        const tripInfo = await await fetch(
          `/schedules/finder_api/trip?id=${tripId}&route=${adjustedRoute ||
            route}&date=${date}&direction=${direction}&stop=${origin}`
        )
          .then(res => res.json())
          .catch(() => {
            dispatch({ type: "FETCH_ERROR" });
          });

        return { ...journey, tripInfo };
      })
  );
};

export const upcomingDeparturesTable = (
  journeysWithTripInfo: EnhancedJourney[],
  state: State,
  input: UserInput
): ReactElement<HTMLElement> => {
  const headerLabel = "Trip Details";

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
      {journeysWithTripInfo !== null && hasPredictions(journeysWithTripInfo) ? (
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
            {journeysWithTripInfo.map(
              (journey: EnhancedJourney, idx: number) => (
                <TableRow
                  state={state}
                  input={input}
                  journey={journey}
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                />
              )
            )}
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
  state: stateFromProps,
  input
}: Props): ReactElement<HTMLElement> | null => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: false,
    error: false
  });

  const { error, isLoading } = stateFromProps;

  useEffect(
    () => {
      if (
        stateFromProps.data !== null &&
        !stateFromProps.isLoading &&
        !stateFromProps.error &&
        (state.data === null && !state.isLoading && !state.error)
      ) {
        const journeys = stateFromProps.data;

        const { route, origin, direction, date } = input;

        if (
          journeys.length > 0 &&
          isABusRoute(journeys[0].route) &&
          (route !== undefined &&
            origin !== undefined &&
            direction !== undefined &&
            date !== undefined)
        ) {
          fetchData(input, journeys, dispatch)
            .then((retrievedJourneysWithTripInfo: EnhancedJourney[]) => {
              const filteredJourneysWithTripInfo = retrievedJourneysWithTripInfo.filter(
                journey => journey.tripInfo !== null
              );

              dispatch({
                type: "FETCH_COMPLETE",
                payload: filteredJourneysWithTripInfo
              });
            })
            .catch(() => dispatch({ type: "FETCH_ERROR" }));
        } else {
          dispatch({
            type: "FETCH_COMPLETE",
            payload: journeys
          });
        }
      }
    },
    // including 'input' will call 'fetch' again so it should not be included
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      state.data,
      state.error,
      state.isLoading,
      stateFromProps.data,
      stateFromProps.error,
      stateFromProps.isLoading
    ]
  );

  if (error || isLoading || state.error) return null;

  if (state.isLoading) return <Loading />;

  const journeysWithTripInfo = state.data;

  return <>{upcomingDeparturesTable(journeysWithTripInfo, state, input)}</>;
};

export default UpcomingDepartures;
