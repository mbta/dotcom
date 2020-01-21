import React, { ReactElement } from "react";
import { SelectedDirection } from "../ScheduleFinder";
import { HoursOfOperation } from "../__schedule";

const getTimes = (
  hoursOfOperation: HoursOfOperation,
  serviceType: "week" | "saturday" | "sunday",
  selectedDirection: SelectedDirection
): [string, string] => [
  hoursOfOperation[serviceType][selectedDirection!].first_departure,
  hoursOfOperation[serviceType][selectedDirection!].last_departure
];

interface Props {
  hoursOfOperation: HoursOfOperation;
  selectedDirection: SelectedDirection;
}

const FirstLastTimes = ({
  hoursOfOperation,
  selectedDirection
}: Props): ReactElement<HTMLElement> | null => {
  if (selectedDirection === null) {
    return null;
  }

  const timesList = [
    [
      "Monday - Saturday",
      ...getTimes(hoursOfOperation, "week", selectedDirection)
    ],
    ["Sunday", ...getTimes(hoursOfOperation, "sunday", selectedDirection)]
  ];

  return (
    <div className="">
      {timesList.map(([label, firstTime, lastTime]) => (
        <>
          <h4>{label}</h4>
          <div className="first-last-trips">
            <div className="first-last-trips__trip">
              <span className="schedule-finder__first-last-trip-label">
                First Trip
              </span>
              {firstTime}
            </div>
            <div className="first-last-trips__trip">
              <span className="schedule-finder__first-last-trip-label">
                Last Trip
              </span>
              {lastTime}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default FirstLastTimes;
