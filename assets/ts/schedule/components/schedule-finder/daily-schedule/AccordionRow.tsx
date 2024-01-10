import React, { ReactElement, ReactNode } from "react";
import { caret } from "../../../../helpers/icon";
import { handleReactEnterKeyPress } from "../../../../helpers/keyboard-events-react";

interface Props {
  id: string;
  colSpan: number;
  contentComponent: () => ReactElement<HTMLElement>;
  expanded: boolean;
  toggle: () => void;
  children: ReactNode;
}

const AccordionRow = ({
  id,
  colSpan,
  contentComponent,
  expanded,
  toggle,
  children
}: Props): ReactElement<HTMLElement> => (
  <>
    <tr
      className={
        expanded ? "schedule-table__row--expanded" : "schedule-table__row"
      }
      aria-controls={id}
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
      <tr id={`${id}-expanded`}>
        <td
          colSpan={colSpan}
          className="schedule-table__cell schedule-table__cell--expanded"
        >
          {children}
        </td>
      </tr>
    )}
  </>
);

export default AccordionRow;
