import React, { ReactElement } from "react";
import { isGreenLine, isRapidTransit } from "../../models/route";
import { EnhancedRoute } from "../../__v3api";
import DefaultHoursOfOperation from "./DefaultHoursOfOperation";
import GreenLineScheduleLinks from "./GreenLineScheduleLinks";
import RapidTransitHoursOfOperation from "./RapidTransitHoursOfOperation";
import { SchedulePDF, ScheduleNote } from "./__schedule";

const HoursOfOperation = ({
  route,
  pdfs,
  hours,
  scheduleNote
}: {
  route: EnhancedRoute;
  pdfs: SchedulePDF[];
  hours: string;
  scheduleNote: ScheduleNote | null;
}): ReactElement<HTMLElement> | null => {
  if (isGreenLine(route)) {
    return <GreenLineScheduleLinks pdfs={pdfs} />;
  }
  if (isRapidTransit(route)) {
    return (
      <RapidTransitHoursOfOperation route={route} scheduleNote={scheduleNote} />
    );
  }
  return <DefaultHoursOfOperation hours={hours} />;
};

export default HoursOfOperation;
