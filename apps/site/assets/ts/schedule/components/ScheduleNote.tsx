import React, { ReactElement } from "react";
import {
  ScheduleNote as ScheduleNoteType,
  ServiceException
} from "./__schedule";
import scheduleIcon from "../../../static/images/icon-schedule-finder.svg";

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

const alternateNote = (alternateText: string): ReactElement<HTMLElement> => (
  /* eslint-disable react/no-danger */
  <div className="m-schedule-page__schedule-note m-schedule-page__schedule-note--alternate">
    <div dangerouslySetInnerHTML={{ __html: alternateText }} />
  </div> /* eslint-enable react/no-danger */
);

const peakOffPeakTimes = ({
  peakService,
  offpeakService,
  exceptions
}: {
  peakService: string;
  offpeakService: string;
  exceptions: ServiceException[];
}): ReactElement<HTMLElement> => (
  <>
    <div className="m-schedule-page__schedule-note">
      <h4 className="m-schedule-page__service">Weekdays</h4>
      {service(peakService)}
    </div>
    <div className="m-schedule-page__schedule-note">
      <h4 className="m-schedule-page__service">Weekends</h4>
      {offPeak(offpeakService, exceptions)}
      {exceptions.map(exception =>
        service(`${exception.service} ${exception.type}`)
      )}
    </div>
    <div className="m-schedule-page__note-footer">
      Schedules subject to change
    </div>
  </>
);

interface Props {
  scheduleNote: ScheduleNoteType;
  className: string;
}

const ScheduleNote = ({
  scheduleNote: {
    peak_service: peakService,
    offpeak_service: offpeakService,
    exceptions,
    alternate_text: alternateText
  },
  className
}: Props): ReactElement<HTMLElement> => (
  <div className={`m-schedule-page__schedule-notes ${className}`}>
    <h3 className="m-schedule-page__schedule-note-title">
      <div
        className="m-schedule-page__schedule-note-icon"
        dangerouslySetInnerHTML={{ __html: scheduleIcon }} // eslint-disable-line react/no-danger
      />
      Schedule Note
    </h3>
    {alternateText
      ? alternateNote(alternateText)
      : peakOffPeakTimes({ peakService, offpeakService, exceptions })}
  </div>
);

export default ScheduleNote;
