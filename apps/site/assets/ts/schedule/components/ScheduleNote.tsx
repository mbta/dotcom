import React, { ReactElement } from "react";
import {
  ScheduleNote as ScheduleNoteType,
  ServiceException
} from "./__schedule";

const service = (service: string): ReactElement<HTMLElement> => (
  <p className="m-schedule-page__service-note-time">
    Trains arrive every {service}
  </p>
);

const offPeak = (
  offpeak: string,
  exceptions: ServiceException[]
): ReactElement<HTMLElement> => {
  const except = exceptions
    ? `except ${exceptions.map(except => except.type).join(", ")}`
    : "";
  return service(`${offpeak} ${except}`);
};

const ScheduleNote = ({
  peak_service: peakService,
  offpeak_service: offpeakService,
  exceptions
}: ScheduleNoteType): ReactElement<HTMLElement> => {
  return (
    <div className="m-schedule-page__schedule-note-container">
      <h3 className="m-schedule-page__schedule-note-title">Schedule Note</h3>
      <div className="m-schedule-page__schedule-note">
        <h4 className="m-schedule-page__service">Peak Service</h4>
        <div className="m-schedule-page__service-subheading">
          Weekdays 6:30AM - 9AM, 3:30PM - 6:30 PM
        </div>
        {service(peakService)}
      </div>
      <div className="m-schedule-page__schedule-note">
        <h4 className="m-schedule-page__service">Off Peak / Weekends</h4>
        {offPeak(offpeakService, exceptions)}
        {exceptions.map(exception =>
          service(`${exception.service} ${exception.type}`)
        )}
      </div>
    </div>
  );
};

export default ScheduleNote;
