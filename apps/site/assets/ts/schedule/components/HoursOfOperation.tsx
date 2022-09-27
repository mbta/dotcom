import { format, parseISO } from "date-fns";
import { map, uniqueId } from "lodash";
import React, { ReactElement, useEffect } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";
import useHoursOfOperation from "../../hooks/useHoursOfOperation";
import { EnhancedRoute } from "../../__v3api";

// const parseOutTime = (dateTimeString: string): string => {
//   const dateTime = parseISO(dateTimeString);
//   return format(dateTime, "h:mmaaa")
//   // return "AAAAAA";

// }

// const getWeekdaySchedule = (hoursOfOperation: any): ReactElement<HTMLElement>[] => {
//   // FIGURE OUT HOW TO REMOVE ARRAY
//   const data = hoursOfOperation[0];
//   const weekDataArray = data.week;

//   const mappedData = map(weekDataArray["0"], (weekData: any) => {
//     return (
//       <div key={uniqueId()} style={{fontSize: "18px"}}>
//         <span style={{paddingRight: "1rem"}}>{weekData.stop_id}</span>
//         <span style={{fontWeight: 700}}>{parseOutTime(weekData.first_departure) + ' - ' + parseOutTime(weekData.last_departure)}</span>
//       </div>
//     )
//   })

//   return mappedData;
// }

const HoursOfOperation = ({
  route
}: {
  route: EnhancedRoute;
}): ReactElement<HTMLElement> | null => {
  // console.log(route)

  const hoursOfOperation = useHoursOfOperation(route.id)

  // console.log(hoursOfOperation)

  return (
    <>
      <ExpandableBlock
        header={{ text: "Weekday Schedule", iconSvgText: null }}
        initiallyExpanded={false}
        id="hours"
      >
        <div
          className="m-schedule-page__sidebar-hours"
          // eslint-disable-next-line react/no-danger
        >
          <div>Trains leave between...</div>
          
        </div>
      </ExpandableBlock>
      <ExpandableBlock
        header={{ text: "Weekend Schedule", iconSvgText: null }}
        initiallyExpanded={false}
        id="hours"
      >
        <div
          className="m-schedule-page__sidebar-hours"
          // eslint-disable-next-line react/no-danger
        >
          Hello WORLD!
        </div>
      </ExpandableBlock>
    </>
  )
}

export default HoursOfOperation;
