import React, { ReactElement, useEffect, useReducer, useState } from "react";
import { reducer } from "../../../../helpers/fetch";
import { caret } from "../../../../helpers/icon";
import { handleReactEnterKeyPress } from "../../../../helpers/keyboard-events-react";
import { isACommuterRailRoute } from "../../../../models/route";
import { UserInput } from "../../__schedule";
import { EnhancedJourney, Journey, TripInfo } from "../../__trips";
import TripDetails, { State } from "./TripDetails";

interface Props {
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

export const AccordionRow = ({
  state,
  journey,
  contentComponent,
  expanded,
  toggle
}: {
  state: State;
  journey: Journey | EnhancedJourney;
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
            <TripDetails state={state} showFare={isCommuterRail} />
          </td>
        </tr>
      )}
    </>
  );
};

const LazyAccordion = ({
  input,
  journey,
  contentComponent
}: Props): ReactElement<HTMLElement> => {
  const [expanded, setExpanded] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: false,
    error: false
  });

  const toggle = (): void => setExpanded(!expanded);
  const tripId = journey.trip.id;

  useEffect(() => {
    if (expanded && state.data === null && !state.isLoading && !state.error) {
      fetchData(tripId, input, dispatch);
    }
  }, [tripId, input, expanded, state]);

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

export default LazyAccordion;
