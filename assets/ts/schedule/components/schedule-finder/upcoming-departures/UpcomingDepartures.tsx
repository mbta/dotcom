import React, { ReactElement, useState } from "react";
import { get, isEmpty } from "lodash";
import { DirectionId, Route } from "../../../../__v3api";
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
import { EnhancedJourney, Journey, TripInfo } from "../../__trips";
import LiveCrowdingIcon from "../../line-diagram/LiveCrowdingIcon";
import {
  isInitialLoading,
  useProvider,
  UseProviderStateWithoutInitialLoading
} from "../../../../helpers/use-provider";
import TripDetails from "./TripDetails";
import { handleReactEnterKeyPress } from "../../../../helpers/keyboard-events-react";
import { useAwaitInterval } from "../../../../helpers/use-await-interval";
import {
  fetchJson,
  fetchJsonOrThrow,
  isFetchFailed
} from "../../../../helpers/fetch-json";

type StateWithoutInitialLoading = UseProviderStateWithoutInitialLoading<
  EnhancedJourney[]
>;

interface Props {
  routeId: string;
  selectedOrigin: string;
  selectedDirection: DirectionId;
  today: string;
}

interface AccordionProps {
  journey: EnhancedJourney;
  contentComponent: () => ReactElement<HTMLElement>;
}

// exported for testing
export const fetchData = async (
  routeId: string,
  selectedOrigin: string,
  selectedDirection: DirectionId,
  date: string
): Promise<EnhancedJourney[]> => {
  const departures = await fetchJsonOrThrow<Journey[]>(
    `/schedules/finder_api/departures?id=${routeId}&stop=${selectedOrigin}&direction=${selectedDirection}`
  );

  const enhanced = await Promise.all(
    departures.map(async departure => {
      const res = await fetchJson<TripInfo>(
        `/schedules/finder_api/trip?id=${departure.trip.id}&route=${routeId}&date=${date}&direction=${selectedDirection}&stop=${selectedOrigin}`
      );

      if (isFetchFailed(res)) {
        // 404s here are a known failure mode, see finder_api.ex#get_trip_info
        if (res.status !== 404) {
          throw new Error(
            `Failed to fetch trip information: ${res.status} ${res.statusText}`
          );
        }

        return { ...departure, tripInfo: null };
      }

      return { ...departure, tripInfo: res };
    })
  );

  return enhanced;
};

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
      <td className="schedule-table__cell schedule-table__cell--time u-nowrap font-bold text-right">
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
  journey
}: {
  journey: EnhancedJourney;
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
        <span className="icon-realtime-text">live</span>
      </span>
    </span>
  </div>
);

export const upcomingDeparturesTable = (
  state: StateWithoutInitialLoading
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
                journey={journey}
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="callout text-center font-bold">
          There are currently no realtime departures available.
        </div>
      )}
    </>
  );
};

export const UpcomingDepartures = ({
  routeId,
  selectedOrigin,
  selectedDirection,
  today
}: Props): ReactElement<HTMLElement> | null => {
  const [state, updateData] = useProvider(fetchData, [
    routeId,
    selectedOrigin,
    selectedDirection,
    today
  ]);
  useAwaitInterval(updateData, 10000);

  if (isInitialLoading(state)) {
    return <Loading />;
  }

  return <>{upcomingDeparturesTable(state)}</>;
};

export default UpcomingDepartures;
