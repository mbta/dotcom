import { isEqual, isWeekend, parseISO } from "date-fns";
import { map, uniqueId, sortBy, filter, concat, isArray, remove } from "lodash";
import React, { ReactElement } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";
import {
  formatToBostonTime,
  getEarliestTimeString,
  getLatestTimeString
} from "../../helpers/date";
import useHoursOfOperation from "../../hooks/useHoursOfOperation";
import { EnhancedRoute, StopHours } from "../../__v3api";
import pdfLink from "../helpers/hoursOfOperationHelpers";
import { ScheduleNote, SchedulePDF } from "./__schedule";

// Shuttle stops replace some lines during maintanace or shutdowns
// We want these separate stops to appear as one display
const collapseOnParentStop = (
  stopHours: StopHours | StopHours[]
): StopHours | StopHours[] => {
  if (!isArray(stopHours)) {
    return stopHours;
  }

  const returnHours: StopHours[] = [];

  stopHours.forEach(sh => {
    // have we seen a stop with this name
    // array will always be size one
    const exists = remove(
      returnHours,
      rh => rh.parent_stop_id === sh.parent_stop_id
    );

    if (exists.length === 0) {
      returnHours.push(sh);
    } else {
      exists[0].first_departure = getEarliestTimeString(
        sh.first_departure,
        exists[0].first_departure
      );
      exists[0].last_departure = getLatestTimeString(
        sh.last_departure,
        exists[0].last_departure
      );
      returnHours.push(exists[0]);
    }
  });

  return returnHours;
};

const getSchedule = (
  dataArray: StopHours[][] | StopHours[]
): ReactElement<HTMLElement>[] | ReactElement<HTMLElement> => {
  if (dataArray.length === 0) {
    return [];
  }

  const directionZero = collapseOnParentStop(dataArray[0]);
  const directionOne = collapseOnParentStop(dataArray[1]);

  const bothDirectionData = concat(directionZero, directionOne);
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
  const hideScheduleFrequency = route.id === "Orange";

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
          {!hideScheduleFrequency &&
            trainsEveryHTML(scheduleNote?.peak_service)}
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
          {!hideScheduleFrequency &&
            trainsEveryHTML(scheduleNote?.saturday_service)}
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
          {!hideScheduleFrequency &&
            trainsEveryHTML(scheduleNote?.sunday_service)}
          {pdfLink(pdfs[0])}
        </div>
      </ExpandableBlock>
    </>
  );
};

export default RapidTransitHoursOfOperation;
