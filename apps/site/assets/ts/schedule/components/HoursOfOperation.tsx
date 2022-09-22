import React, { ReactElement, useEffect } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";
import useHoursOfOperation from "../../hooks/useHoursOfOperation";
import { EnhancedRoute } from "../../__v3api";

const HoursOfOperation = ({
  route
}: {
  route: EnhancedRoute;
}): ReactElement<HTMLElement> | null => {
  console.log(route)

  const hoursOfOperation = useHoursOfOperation(route.id)

  console.log(hoursOfOperation)

  return (
    <ExpandableBlock
      header={{ text: "Hours of Operation", iconSvgText: null }}
      initiallyExpanded={false}
      id="hours"
    >
      <div
        className="m-schedule-page__sidebar-hours"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: "<div>HELLO WORLD</div>" }}
      />
    </ExpandableBlock>
  )
}

export default HoursOfOperation;
