import { isEqual, isWeekend, parseISO } from "date-fns";
import { map, uniqueId, sortBy, filter, concat } from "lodash";
import React, { ReactElement } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";
import { formatToBostonTime } from "../../helpers/date";
import useHoursOfOperation from "../../hooks/useHoursOfOperation";
import { EnhancedRoute, StopHours } from "../../__v3api";
import pdfLink from "../helpers/hoursOfOperationHelpers";
import { ScheduleNote, SchedulePDF } from "./__schedule";

const getSchedule = (
  dataArray: StopHours[][] | StopHours[]
): ReactElement<HTMLElement>[] | ReactElement<HTMLElement> => {
  const bothDirectionData = concat(dataArray[0], dataArray[1]);
  const filteredData = filter(
    bothDirectionData,
    (stopData: StopHours) => stopData.is_terminus
  );
  const sortedData = sortBy(
    filteredData,
    (stopData: StopHours) => stopData.stop_name
  );
  const mappedData = map(sortedData, (stopData: StopHours) => {
    const firstDeparture = parseISO(stopData.first_departure);
    const lastDeparture = parseISO(stopData.last_departure);
    if (isEqual(firstDeparture, lastDeparture)) {
      return <></>;
    }
    const timeString = `${formatToBostonTime(
      stopData.first_departure
    )} – ${formatToBostonTime(stopData.last_departure)}`;
    return (
      <div key={uniqueId()} className="fs-18 font-helvetica-neue">
        <span className="pe-16">{stopData.stop_name}</span>
        <span className="font-weight-bold">{timeString}</span>
      </div>
    );
  });

  return mappedData;
};

const regularScheduleHTML = (): JSX.Element => (
  <div className="font-weight-bold fs-14 pb-8">Regular schedule</div>
);

const trainsEveryHTML = (minuteString: string | undefined): JSX.Element => (
  <div className="fs-14 pt-8">{`Trains depart every ${minuteString}`}</div>
);

const RapidTransitHoursOfOperation = ({
  route,
  pdfs,
  scheduleNote
}: {
  route: EnhancedRoute;
  pdfs: SchedulePDF[];
  scheduleNote: ScheduleNote | null;
}): ReactElement<HTMLElement> => {
  const hours = useHoursOfOperation(route.id);
  const isTodayWeekend = isWeekend(new Date());

  return (
    <>
      <ExpandableBlock
        header={{ text: "Weekday Schedule", iconSvgText: null }}
        initiallyExpanded={!isTodayWeekend}
        id="weekday-hours"
      >
        <div className="m-schedule-page__sidebar-hours">
          {regularScheduleHTML()}
          {hours && getSchedule(hours.week)}
          {trainsEveryHTML(scheduleNote?.peak_service)}
          {pdfLink(pdfs[0])}
        </div>
      </ExpandableBlock>
      <ExpandableBlock
        header={{ text: "Weekend Schedule", iconSvgText: null }}
        initiallyExpanded={isTodayWeekend}
        id="weekend-hours"
      >
        <div className="m-schedule-page__sidebar-hours">
          <div className="font-weight-bold fs-18 pb-14 font-helvetica-neue">
            Saturday
          </div>
          {regularScheduleHTML()}
          {hours && getSchedule(hours.saturday)}
          {trainsEveryHTML(scheduleNote?.offpeak_service)}
          <hr
            style={{
              borderBottomWidth: "1px",
              borderBottomColor: "#e9eaed",
              borderBottomStyle: "solid",
              marginBottom: "0rem"
            }}
          />
          <div className="font-weight-bold fs-18 pt-18 pb-14 font-helvetica-neue">
            Sunday
          </div>
          {regularScheduleHTML()}
          {hours && getSchedule(hours.sunday)}
          {trainsEveryHTML(scheduleNote?.offpeak_service)}
          {pdfLink(pdfs[0])}
        </div>
      </ExpandableBlock>
    </>
  );
};

export default RapidTransitHoursOfOperation;
