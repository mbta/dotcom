import React, { ReactElement } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";
import { Holiday } from "./__schedule";

interface Props {
  holidays: Holiday[];
}

const UpcomingHolidays = ({
  holidays
}: Props): ReactElement<HTMLElement> | null =>
  holidays.length > 0 ? (
    <ExpandableBlock
      header={{ text: "Upcoming Holidays", iconSvgText: null }}
      initiallyExpanded={false}
      id="holidays"
    >
      <>
        <ul className="c-unordered-list m-schedule-page__sidebar-list">
          {holidays.map(
            (holiday: Holiday): ReactElement<HTMLElement> => (
              <li key={holiday.date} className="c-unordered-list-item">
                {holiday.name} ({holiday.date})
              </li>
            )
          )}
        </ul>
        <a className="c-call-to-action" href="/holiday">
          View holiday schedules
        </a>
      </>
    </ExpandableBlock>
  ) : null;

export default UpcomingHolidays;
