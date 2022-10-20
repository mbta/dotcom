import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import { map, uniqueId, sortBy, filter } from "lodash";
import React, { ReactElement } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";
import useHoursOfOperation from "../../hooks/useHoursOfOperation";
import useUrlSearchParams from "../../hooks/useUrlSearchParams";
import { EnhancedRoute, StopHours } from "../../__v3api";
import pdfLink from "../helpers/hoursOfOperationHelpers";
import { SchedulePDF } from "./__schedule";

const SCHEDULE_PARAM = "schedule_direction[direction_id]";

const parseOutTime = (dateTimeString: string): string => {
  const dateTime = parseISO(dateTimeString);
  return formatInTimeZone(dateTime, "America/New_York", "h:mmaaa");
};

const getSchedule = (
  dataArray: StopHours[][] | StopHours[],
  currentDirection: number
): ReactElement<HTMLElement>[] | ReactElement<HTMLElement> => {
  const filteredData = filter(
    dataArray[currentDirection],
    (stopData: StopHours) => stopData.is_terminus
  );
  const sortedData = sortBy(
    filteredData,
    (stopData: StopHours) => stopData.stop_name
  );
  const mappedData = map(sortedData, (stopData: StopHours) => (
    <div key={uniqueId()} className="fs-18">
      <span className="pe-16">{stopData.stop_name}</span>
      <span className="font-weight-bold">
        {`${parseOutTime(stopData.first_departure)} - ${parseOutTime(
          stopData.last_departure
        )}`}
      </span>
    </div>
  ));

  return mappedData;
};

const regularScheduleHTML = (): JSX.Element => (
  <div className="font-weight-bold fs-14 pb-8">Regular schedule</div>
);

const trainsEveryHTML = (minuteString: string): JSX.Element => {
  const trainsEvery = `Trains depart every ${minuteString} minutes`;
  return <div className="fs-14 pt-8">{trainsEvery}</div>;
};

const RapidTransitHoursOfOperation = ({
  route,
  pdfs
}: {
  route: EnhancedRoute;
  pdfs: SchedulePDF[];
}): ReactElement<HTMLElement> => {
  const hours = useHoursOfOperation(route.id);
  const urlParams = useUrlSearchParams();

  const currentDirectionParam = urlParams?.get(SCHEDULE_PARAM);
  const currentDirection = currentDirectionParam
    ? Number(currentDirectionParam)
    : 0;

  return (
    <>
      <ExpandableBlock
        header={{ text: "Weekday Schedule", iconSvgText: null }}
        initiallyExpanded={false}
        id="weekday-hours"
      >
        <div className="m-schedule-page__sidebar-hours">
          {regularScheduleHTML()}
          {hours && getSchedule(hours.week, currentDirection)}
          {trainsEveryHTML("8-15")}
          <div className="font-weight-bold fs-14 pb-8 pt-24">
            Rush hour schedule
          </div>
          <div className="font-weight-bold fs-18">7 - 9am | 4 - 6:30pm</div>
          {trainsEveryHTML("6-8")}
          {pdfLink(pdfs[0], route.name)}
        </div>
      </ExpandableBlock>
      <ExpandableBlock
        header={{ text: "Weekend Schedule", iconSvgText: null }}
        initiallyExpanded={false}
        id="weekend-hours"
      >
        <div className="m-schedule-page__sidebar-hours">
          <div className="font-weight-bold fs-18 pb-14">Saturday</div>
          {regularScheduleHTML()}
          {hours && getSchedule(hours.saturday, currentDirection)}
          {trainsEveryHTML("8-15")}
          <hr
            style={{
              borderBottomWidth: "1px",
              borderBottomColor: "#e9eaed",
              borderBottomStyle: "solid",
              marginBottom: "0rem"
            }}
          />
          <div className="font-weight-bold fs-18 pt-18 pb-14">Sunday</div>
          {regularScheduleHTML()}
          {hours && getSchedule(hours.sunday, currentDirection)}
          {trainsEveryHTML("8-15")}
          {pdfLink(pdfs[0], route.name)}
        </div>
      </ExpandableBlock>
    </>
  );
};

export default RapidTransitHoursOfOperation;
