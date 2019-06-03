import React, { ReactElement } from "react";
import {
  ScheduleNote as ScheduleNoteType,
  ServiceException
} from "./__schedule";

const service = (serviceTime: string): ReactElement<HTMLElement> => (
  <p className="m-schedule-page__service-note-time" key={serviceTime}>
    Trains arrive every {serviceTime}
  </p>
);

const offPeak = (
  offpeak: string,
  exceptions: ServiceException[]
): ReactElement<HTMLElement> => {
  const except =
    exceptions.length > 0
      ? `except ${exceptions.map(e => e.type).join(", ")}`
      : "";
  return service(`${offpeak} ${except}`);
};

interface Props {
  scheduleNote: ScheduleNoteType;
}

const ScheduleNote = ({
  scheduleNote: {
    peak_service: peakService,
    offpeak_service: offpeakService,
    exceptions
  }
}: Props): ReactElement<HTMLElement> => (
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

export default ScheduleNote;
