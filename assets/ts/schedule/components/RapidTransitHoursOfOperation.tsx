import { isSaturday, isSunday, parseISO } from "date-fns";
import { map, min } from "lodash";
import React, { ReactElement } from "react";
import { formatToBostonTime } from "../../helpers/date";
import useHoursOfOperation from "../../hooks/useHoursOfOperation";
import { EnhancedRoute, StopHours, TransitHours } from "../../__v3api";
import { ScheduleNote } from "./__schedule";
import { storeHandler } from "../store/ScheduleStore";

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
  }
  if (isSunday(date)) {
    return trainsEveryHTML(scheduleNote.sunday_service);
  }
  if (scheduleNote.offpeak_service && scheduleNote.peak_service) {
    return (
      <>
        <div className="fs-14 pt-8">{`Peak Service: Trains depart every ${scheduleNote.peak_service}`}</div>
        <div className="fs-14 pt-8">{`Off-Peak Service: Trains depart every ${scheduleNote.offpeak_service}`}</div>
      </>
    );
  }
  return trainsEveryHTML(scheduleNote.peak_service);
};

const getEarliestTrain = (dataArray: StopHours[] | undefined): string => {
  if (!dataArray || dataArray.length === 0) {
    return "";
  }

  const firstDepartureTimes = map(dataArray, d => parseISO(d.first_departure));
  const firstDeparture = min(firstDepartureTimes);
  return firstDeparture ? formatToBostonTime(firstDeparture) : "";
};

const getLatestTrain = (dataArray: StopHours[] | undefined): string => {
  // get the earliest last departure
  if (!dataArray || dataArray.length === 0) {
    return "";
  }

  const lastDepartureTimes = map(dataArray, d => parseISO(d.last_departure));
  const lastDeparture = min(lastDepartureTimes);
  return lastDeparture ? formatToBostonTime(lastDeparture) : "";
};

const getHoursForDate = (
  hours: TransitHours | null,
  date: Date
): [StopHours, StopHours] | [] => {
  if (!hours) {
    return [];
  }

  if (isSaturday(date)) {
    return hours.saturday;
  }
  if (isSunday(date)) {
    return hours.sunday;
  }
  return hours.week;
};

const RapidTransitHoursOfOperation = ({
  route,
  scheduleNote,
  date = new Date()
}: {
  route: EnhancedRoute;
  scheduleNote: ScheduleNote | null;
  date?: Date;
}): ReactElement<HTMLElement> => {
  const hours = useHoursOfOperation(route.id) as TransitHours | null;

  const openModal = (): void => {
    storeHandler({
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: "origin"
      }
    });
  };

  const todaysHours = getHoursForDate(hours, date);
  const earliestTrain = getEarliestTrain(todaysHours);
  const latestTrain = getLatestTrain(todaysHours);

  const todaysScheduleNoteHtml = getScheduleNoteForDate(scheduleNote, date);

  return (
    <>
      <div className="u-bg-primary-light-contrast p-16 mt-16">
        <h3 style={{ marginTop: "0rem" }}>Today&#39;s Service</h3>
        <br />
        <div className="fs-16">First & last trains</div>
        <div className="fs-18">
          <b>{earliestTrain}</b> | <b>{latestTrain}</b>
        </div>
        <br />
        {todaysScheduleNoteHtml}
        <br />
        <div>
          <button
            className="btn btn-link text-decoration-underline"
            style={{ padding: "0rem" }}
            type="button"
            onClick={openModal}
          >
            Find departures from your stop
          </button>
        </div>
      </div>
    </>
  );
};

export default RapidTransitHoursOfOperation;
