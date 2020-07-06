import React, { useEffect, useState, useReducer, ReactElement } from "react";
import { reducer } from "../../../helpers/fetch";
import { Journey, EnhancedJourney, TripInfo } from "../__trips";
import { modeIcon } from "../../../helpers/icon";
import { breakTextAtSlash } from "../../../helpers/text";
import { UserInput } from "../../components/__schedule";
import AccordionRow from "./AccordionRow";

interface TableRowProps {
  input: UserInput;
  journey: Journey | EnhancedJourney;
  isSchoolTrip: boolean;
  anySchoolTrips: boolean;
}

interface AccordionProps {
  input: UserInput;
  journey: Journey | EnhancedJourney;
  contentComponent: () => ReactElement<HTMLElement>;
}

type fetchAction =
  | { type: "FETCH_COMPLETE"; payload: TripInfo }
  | { type: "FETCH_ERROR" }
  | { type: "FETCH_STARTED" };

export const fetchData = (
  tripId: string,
  { route, direction, date, origin }: UserInput,
  dispatch: (action: fetchAction) => void
): Promise<void> => {
  dispatch({ type: "FETCH_STARTED" });
  return (
    window.fetch &&
    window
      .fetch(
        `/schedules/finder_api/trip?id=${tripId}&route=${route}&date=${date}&direction=${direction}&stop=${origin}`
      )
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(json => dispatch({ type: "FETCH_COMPLETE", payload: json }))
      // @ts-ignore
      .catch(() => dispatch({ type: "FETCH_ERROR" }))
  );
};

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
      {modeIcon(journey.route.id)} {breakTextAtSlash(journey.trip.headsign)}
    </td>
  </>
);

export const Accordion = ({
  input,
  journey,
  contentComponent
}: AccordionProps): ReactElement<HTMLElement> => {
  const [expanded, setExpanded] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: false,
    error: false
  });

  const toggle = (): void => setExpanded(!expanded);
  const tripId = journey.trip.id;

  useEffect(
    () => {
      if (expanded && state.data === null && !state.isLoading && !state.error) {
        fetchData(tripId, input, dispatch);
      }
    },
    [tripId, input, expanded, state]
  );

  return (
    <AccordionRow
      state={state}
      journey={journey}
      contentComponent={contentComponent}
      expanded={expanded}
      toggle={toggle}
    />
  );
};

const TableRow = ({
  input,
  journey,
  anySchoolTrips,
  isSchoolTrip
}: TableRowProps): ReactElement<HTMLElement> | null => {
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
      contentComponent={contentComponent}
    />
  );
};

export default TableRow;
