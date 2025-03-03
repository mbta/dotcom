import React, { useEffect, useState, ReactElement } from "react";
import { modeIcon } from "../../../../helpers/icon";
import { breakTextAtSlash } from "../../../../helpers/text";
import useFetch, { isNotStarted } from "../../../../helpers/use-fetch";
import { isACommuterRailRoute } from "../../../../models/route";
import { UserInput } from "../../__schedule";
import { Journey, TripInfo } from "../../__trips";
import AccordionRow from "./AccordionRow";
import TripDetails from "./TripDetails";

interface TableRowProps {
  input: UserInput;
  journey: Journey;
  isSchoolTrip: boolean;
  anySchoolTrips: boolean;
}

interface AccordionProps {
  input: UserInput;
  journey: Journey;
  anySchoolTrips: boolean;
  contentComponent: () => ReactElement<HTMLElement>;
}

// Exported solely for testing
export const fetchTripInfo = (
  tripId: string,
  { route, direction, date, origin }: UserInput
): (() => Promise<Response>) => () =>
  window.fetch &&
  window.fetch(
    `/schedules/finder_api/trip?id=${tripId}&route=${route}&date=${date}&direction=${direction}&stop=${origin}`
  );

// Exported solely for testing
export const parseResults = (json: JSON): TripInfo =>
  (json as unknown) as TripInfo;

const RouteIcon = ({
  route: { type, name, id }
}: Journey): ReactElement<HTMLElement> | undefined => {
  if (type !== 3) {
    return modeIcon(id);
  }

  const backgroundClass = name.startsWith("SL")
    ? "u-bg--silver-line"
    : "u-bg--bus";
  return (
    <span className={`c-icon__bus-pill--small ${backgroundClass}`}>{name}</span>
  );
};

const BusTableRow = ({
  journey,
  anySchoolTrips,
  isSchoolTrip
}: {
  journey: Journey;
  anySchoolTrips: boolean;
  isSchoolTrip: boolean;
}): ReactElement<HTMLElement> => (
  <>
    {anySchoolTrips && (
      <td className="schedule-table__cell schedule-table__cell--tiny">
        {isSchoolTrip && <strong>S</strong>}
      </td>
    )}
    <td className="schedule-table__cell schedule-table__cell--time u-nowrap u-tabular-nums">
      {journey.departure.time}
    </td>
    <td className="schedule-table__cell schedule-table__cell--headsign">
      <span className="schedule-table__route-pill m-route-pills">
        {RouteIcon(journey)}
      </span>
      {breakTextAtSlash(journey.trip.headsign)}
    </td>
  </>
);

const CrTableRow = ({
  journey
}: {
  journey: Journey;
}): ReactElement<HTMLElement> => (
  <>
    <td className="schedule-table__cell schedule-table__cell--time u-nowrap u-tabular-nums">
      {journey.departure.time}
    </td>
    {journey.trip.name && (
      <td className="schedule-table__cell u-tabular-nums">
        {journey.trip.name}
      </td>
    )}
    <td className="schedule-table__cell schedule-table__cell--headsign">
      {modeIcon(journey.route.id)} {breakTextAtSlash(journey?.departure?.schedule?.stop_headsign || journey.trip.headsign)}
    </td>
  </>
);

const Accordion = ({
  input,
  journey,
  anySchoolTrips,
  contentComponent
}: AccordionProps): ReactElement<HTMLElement> => {
  const [expanded, setExpanded] = useState(false);
  const [fetchState, fetch] = useFetch<TripInfo>();

  const toggle = (): void => setExpanded(!expanded);
  const tripId = journey.trip.id;

  useEffect(() => {
    if (expanded && isNotStarted(fetchState)) {
      fetch({
        fetcher: fetchTripInfo(tripId, input),
        parser: parseResults
      });
    }
  }, [tripId, input, expanded, fetchState, fetch]);

  const isCommuterRail = isACommuterRailRoute(journey.route);

  return (
    <AccordionRow
      id={`trip-${tripId}`}
      colSpan={isCommuterRail || anySchoolTrips ? 4 : 3}
      contentComponent={contentComponent}
      expanded={expanded}
      toggle={toggle}
    >
      <TripDetails fetchState={fetchState} showFare={isCommuterRail} />
    </AccordionRow>
  );
};

const TableRow = ({
  input,
  journey,
  anySchoolTrips,
  isSchoolTrip
}: TableRowProps): ReactElement<HTMLElement> | null => {
  console.log(journey);
  const contentComponent =
    journey.route.type !== 2 &&
    journey.route.description !== "rail_replacement_bus"
      ? () => (
          <BusTableRow
            journey={journey}
            anySchoolTrips={anySchoolTrips}
            isSchoolTrip={isSchoolTrip}
          />
        )
      : () => <CrTableRow journey={journey} />;

  return (
    <Accordion
      input={input}
      journey={journey}
      anySchoolTrips={anySchoolTrips}
      contentComponent={contentComponent}
    />
  );
};

export default TableRow;
