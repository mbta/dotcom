import React, { useEffect, useState, useReducer, ReactElement } from "react";
import { reducer } from "../../../helpers/fetch";
import { Journey, TripInfo } from "../__trips";
import { RoutePillSmall } from "./UpcomingDepartures";
import { modeIcon, caret } from "../../../helpers/icon";
import { handleReactEnterKeyPress } from "../../../helpers/keyboard-events";
import { breakTextAtSlash } from "../../../helpers/text";
import { TripDetails } from "./TripDetails";
import { UserInput } from "../ScheduleFinder";

interface Props {
  input: UserInput;
  journey: Journey;
  isSchoolTrip: boolean;
  anySchoolTrips: boolean;
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

const BusTableRow = ({
  input,
  journey,
  isSchoolTrip,
  anySchoolTrips
}: Props): ReactElement<HTMLElement> => {
  const [expanded, setExpanded] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: false,
    error: false
  });

  const toggle = (): void => setExpanded(!expanded);

  useEffect(
    () => {
      if (expanded && state.data === null && !state.isLoading && !state.error) {
        fetchData(journey.trip.id, input, dispatch);
      }
    },
    [journey.trip.id, input, expanded, state]
  );

  return (
    <>
      <tr
        className={
          expanded ? "schedule-table__row-selected" : "schedule-table__row"
        }
        aria-controls={`trip-${journey.trip.id}`}
        aria-expanded={expanded}
        role="button"
        onClick={toggle}
        onKeyPress={e => handleReactEnterKeyPress(e, toggle)}
        tabIndex={0}
      >
        {anySchoolTrips && (
          <td className="schedule-table__td--tiny">
            {isSchoolTrip && <strong>S</strong>}
          </td>
        )}
        <td className="schedule-table__td schedule-table__time">
          {journey.departure.time}
        </td>
        <td className="schedule-table__td">
          <div className="schedule-table__row-route">
            <RoutePillSmall route={journey.route} />
          </div>
          {breakTextAtSlash(journey.trip.headsign)}
        </td>
        <td className="schedule-table__td schedule-table__td--flex-end">
          {caret(
            `c-expandable-block__header-caret${expanded ? "--white" : ""}`,
            expanded
          )}
        </td>
      </tr>
      {expanded && (
        <tr
          id={`trip-${journey.trip.id}`}
          className="schedule-table__subtable-container"
        >
          <td className="schedule-table__subtable-td">
            <TripDetails state={state} fare={false} />
          </td>
        </tr>
      )}
    </>
  );
};

const CrTableRow = ({
  input,
  journey,
  isSchoolTrip,
  anySchoolTrips
}: Props): ReactElement<HTMLElement> => {
  const [expanded, setExpanded] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: false,
    error: false
  });

  const toggle = (): void => setExpanded(!expanded);

  useEffect(
    () => {
      if (expanded && state.data === null && !state.isLoading && !state.error) {
        fetchData(journey.trip.id, input, dispatch);
      }
    },
    [journey.trip.id, input, expanded, state]
  );

  return (
    <>
      <tr
        className={
          expanded ? "schedule-table__row-selected" : "schedule-table__row"
        }
        aria-controls={`trip-${journey.trip.id}`}
        aria-expanded={expanded}
        role="button"
        onClick={toggle}
        onKeyPress={e => handleReactEnterKeyPress(e, toggle)}
        tabIndex={0}
      >
        {anySchoolTrips && (
          <td className="schedule-table__td--tiny">
            {isSchoolTrip && <strong>S</strong>}
          </td>
        )}
        <td className="schedule-table__td">
          <div className="schedule-table__time">{journey.departure.time}</div>
        </td>
        {journey.trip.name && (
          <td className="schedule-table__td schedule-table__tab-num">
            {journey.trip.name}
          </td>
        )}
        <td className="schedule-table__headsign">
          {modeIcon(journey.route.id)} {breakTextAtSlash(journey.trip.headsign)}
        </td>
        <td className="schedule-table__td schedule-table__td--flex-end">
          {caret(
            `c-expandable-block__header-caret${expanded ? "--white" : ""}`,
            expanded
          )}
        </td>
      </tr>
      {expanded && (
        <tr
          id={`trip-${journey.trip.id}`}
          className="schedule-table__subtable-container"
        >
          <td className="schedule-table__subtable-td">
            <TripDetails state={state} fare />
          </td>
        </tr>
      )}
    </>
  );
};

const TableRow = ({
  input,
  journey,
  isSchoolTrip,
  anySchoolTrips
}: Props): ReactElement<HTMLElement> | null => {
  if (journey.route.type === 3)
    return (
      <BusTableRow
        input={input}
        journey={journey}
        isSchoolTrip={isSchoolTrip}
        anySchoolTrips={anySchoolTrips}
      />
    );
  return (
    <CrTableRow
      input={input}
      journey={journey}
      isSchoolTrip={isSchoolTrip}
      anySchoolTrips={anySchoolTrips}
    />
  );
};

export default TableRow;
