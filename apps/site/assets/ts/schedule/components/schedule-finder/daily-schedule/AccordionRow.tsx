import React, { ReactElement } from "react";
import { caret } from "../../../../helpers/icon";
import { handleReactEnterKeyPress } from "../../../../helpers/keyboard-events";
import { isACommuterRailRoute } from "../../../../models/route";
import { Journey, EnhancedJourney } from "../../__trips";
import { State, TripDetails } from "./TripDetails";

interface Props {
  state: State;
  journey: Journey | EnhancedJourney;
  contentComponent: () => ReactElement<HTMLElement>;
  expanded: boolean;
  toggle: () => void;
}

const AccordionRow = ({
  state,
  journey,
  contentComponent,
  expanded,
  toggle
}: Props): ReactElement<HTMLElement> => {
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

export default AccordionRow;
