import { isDate, isSaturday, isSunday, parseISO } from "date-fns";
import { min } from "lodash";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { formatToBostonTime } from "../../helpers/date";
import useHoursOfOperation from "../../hooks/useHoursOfOperation";
import { EnhancedRoute, StopHours, TransitHours } from "../../__v3api";
import { ScheduleNote } from "./__schedule";

const trainsEveryHTML = (minuteString: string | undefined): JSX.Element => (
  <div className="fs-14 u-pt-8">{`Trains depart every ${minuteString}`}</div>
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
        <div className="fs-14 u-pt-8">{`Peak Service: Trains depart every ${scheduleNote.peak_service}`}</div>
        <div className="fs-14 u-pt-8">{`Off-Peak Service: Trains depart every ${scheduleNote.offpeak_service}`}</div>
      </>
    );
  }
  return trainsEveryHTML(scheduleNote.peak_service);
};

const getFirstTrainTime = (
  dataArray: StopHours[] | undefined,
  property: "first_departure" | "last_departure"
): string | undefined => {
  const departureTimes = (dataArray || [])
    .filter(d => d[property])
    .map(d => parseISO(d[property]));
  const firstDeparture = min(departureTimes);
  return firstDeparture && isDate(firstDeparture)
    ? formatToBostonTime(firstDeparture)
    : undefined;
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
  const dispatch = useDispatch();

  const openModal = (): void => {
    dispatch({
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: "origin"
      }
    });
  };

  const todaysHours = getHoursForDate(hours, date);
  const earliestTrain = getFirstTrainTime(todaysHours, "first_departure");
  const latestTrain = getFirstTrainTime(todaysHours, "last_departure");

  const todaysScheduleNoteHtml = getScheduleNoteForDate(scheduleNote, date);

  return (
    <>
      <div className="u-bg-primary-light-contrast u-p-16 u-mt-16">
        <h3 style={{ marginTop: "0rem" }}>Today&#39;s Service</h3>
        <br />
        {earliestTrain && latestTrain && (
          <>
            <div className="fs-16">First & last trains</div>
            <div className="fs-18">
              <b>{earliestTrain}</b> | <b>{latestTrain}</b>
            </div>
          </>
        )}
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
