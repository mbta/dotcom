import React, { useEffect, useState, useReducer, ReactElement } from "react";
import { reducer } from "../../../helpers/fetch";
import { Journey, TripInfo } from "../__trips";
import { modeIcon, caret } from "../../../helpers/icon";
import { handleReactEnterKeyPress } from "../../../helpers/keyboard-events";
import { breakTextAtSlash } from "../../../helpers/text";
import { TripDetails } from "./TripDetails";
import { UserInput } from "../../components/__schedule";

interface TableRowProps {
  input: UserInput;
  journey: Journey;
  isSchoolTrip: boolean;
  anySchoolTrips: boolean;
}

interface AccordionProps {
  input: UserInput;
  journey: Journey;
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
    <span
      className={`c-icon__bus-pill--small schedule-table__scheduled-bus-pill ${backgroundClass}`}
    >
      {name}
    </span>
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
      <td className="schedule-table__td--tiny">
        {isSchoolTrip && <strong>S</strong>}
      </td>
    )}
    <td className="schedule-table__td schedule-table__time">
      {journey.departure.time}
    </td>
    <td className="schedule-table__td">
      {RouteIcon(journey)} {breakTextAtSlash(journey.trip.headsign)}
    </td>
  </>
);

const CrTableRow = ({
  journey
}: {
  journey: Journey;
}): ReactElement<HTMLElement> => (
  <>
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
    <>
      <tr
        className={
          expanded ? "schedule-table__row-selected" : "schedule-table__row"
        }
        aria-controls={`trip-${tripId}`}
        aria-expanded={expanded}
        role="button"
        onClick={toggle}
        onKeyPress={e => handleReactEnterKeyPress(e, toggle)}
        tabIndex={0}
      >
        {contentComponent()}
        <td className="schedule-table__td schedule-table__td--flex-end">
          {caret(
            `c-expandable-block__header-caret${expanded ? "--white" : ""}`,
            expanded
          )}
        </td>
      </tr>
      {expanded && (
        <tr
          id={`trip-${tripId}-expanded`}
          className="schedule-table__subtable-container"
        >
          <td className="schedule-table__subtable-td">
            <TripDetails state={state} showFare={journey.route.type === 2} />
          </td>
        </tr>
      )}
    </>
  );
};

const TableRow = ({
  input,
  journey,
  anySchoolTrips,
  isSchoolTrip
}: TableRowProps): ReactElement<HTMLElement> | null => {
  const contentComponent =
    journey.route.type !== 2
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
