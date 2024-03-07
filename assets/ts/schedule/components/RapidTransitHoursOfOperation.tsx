import { isEqual, isSaturday, isSunday, parseISO } from "date-fns";
import { map, uniqueId, sortBy, filter, concat, min } from "lodash";
import React, { ReactElement } from "react";
import { formatToBostonTime } from "../../helpers/date";
import useHoursOfOperation from "../../hooks/useHoursOfOperation";
import { EnhancedRoute, StopHours, TransitHours } from "../../__v3api";
import { ScheduleNote, SchedulePDF } from "./__schedule";

const getSchedule = (
  dataArray: StopHours[][] | StopHours[]
): ReactElement<HTMLElement>[] | ReactElement<HTMLElement> => {
  if (dataArray.length === 0) {
    return [];
  }
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

const getScheduleNoteForDate = (
  scheduleNote: ScheduleNote | null,
  date: Date
): JSX.Element => {
  if (!scheduleNote) {
    return <></>;
  }
  if (isSaturday(date)) {
    return trainsEveryHTML(scheduleNote.saturday_service);
  } else if (isSunday(date)) {
    return trainsEveryHTML(scheduleNote.sunday_service);
  } else if (scheduleNote.offpeak_service && scheduleNote.peak_service) {
    return (
      <>
        <div className="fs-14 pt-8">{`Peak Service: Trains depart every ${scheduleNote.peak_service}`}</div>
        <div className="fs-14 pt-8">{`Off-Peak Servie: Trains depart every ${scheduleNote.offpeak_service}`}</div>
      </>
    );
  }
  return trainsEveryHTML(scheduleNote.peak_service);
};

const getEarliestTrain = (dataArray: StopHours[] | undefined) => {
  if (!dataArray || dataArray.length === 0) {
    return "";
  }

  const firstDepartureTimes = map(dataArray, d => parseISO(d.first_departure));
  const firstDeparture = min(firstDepartureTimes);
  return firstDeparture ? formatToBostonTime(firstDeparture) : "";
};

const getLatestTrain = (dataArray: StopHours[] | undefined) => {
  // get the earliest last departure
  if (!dataArray || dataArray.length === 0) {
    return "";
  }

  const lastDepartureTimes = map(dataArray, d => parseISO(d.last_departure));
  const lastDeparture = min(lastDepartureTimes);
  return lastDeparture ? formatToBostonTime(lastDeparture) : "";
};

const getHoursForDate = (hours: TransitHours | null, date: Date) => {
  if (!hours) {
    return [];
  }

  if (isSaturday(date)) {
    return hours.saturday;
  } else if (isSunday(date)) {
    return hours.sunday;
  }
  return hours.week;
};

const RapidTransitHoursOfOperation = ({
  route,
  pdfs,
  scheduleNote,
  date = new Date()
}: {
  route: EnhancedRoute;
  pdfs: SchedulePDF[];
  scheduleNote: ScheduleNote | null;
  date: Date;
}): ReactElement<HTMLElement> => {
  const hours = useHoursOfOperation(route.id) as TransitHours | null;

  const todaysHours = getHoursForDate(hours, date);
  const earliestTrain = getEarliestTrain(todaysHours);
  const latestTrain = getLatestTrain(todaysHours);

  const todaysScheduleNoteHtml = getScheduleNoteForDate(scheduleNote, date);

  return (
    <>
      <div className="u-bg-primary-light-contrast p-16 mt-16">
        <h3 style={{ marginTop: "0rem" }}>Today's Service</h3>
        <br />
        <div className="fs-16">First & last trains</div>
        <div className="fs-18">
          <b>{earliestTrain}</b> | <b>{latestTrain}</b>
        </div>
        <br />
        {todaysScheduleNoteHtml}
        <br />
        <div>
          <a
            key={"key"}
            href={"?schedule_finder%5Bdirection_id%5D=0"}
            rel="noopener noreferrer"
            className="c-call-to-action"
          >
            Find departures from your stop
          </a>
        </div>
      </div>
    </>
  );
};

export default RapidTransitHoursOfOperation;
