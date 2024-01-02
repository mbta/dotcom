import React, { ReactElement } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";

const DefaultHoursOfOperation = ({
  hours
}: {
  hours: string;
}): ReactElement<HTMLElement> | null =>
  hours ? (
    <ExpandableBlock
      header={{ text: "Hours of Operation", iconSvgText: null }}
      initiallyExpanded={false}
      id="hours"
    >
      <div
        className="m-schedule-page__sidebar-hours"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: hours }}
      />
    </ExpandableBlock>
  ) : null;

export default DefaultHoursOfOperation;
