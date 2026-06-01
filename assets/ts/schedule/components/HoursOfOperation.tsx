import React, { ReactElement } from "react";
import { isGreenLine, isRapidTransit } from "../../models/route";
import { EnhancedRoute } from "../../__v3api";
import DefaultHoursOfOperation from "./DefaultHoursOfOperation";
import GreenLineScheduleLinks from "./GreenLineScheduleLinks";
import { SchedulePDF } from "./__schedule";

const HoursOfOperation = ({
  route,
  pdfs,
  hours
}: {
  route: EnhancedRoute;
  pdfs: SchedulePDF[];
  hours: string;
}): ReactElement<HTMLElement> | null => {
  if (isGreenLine(route)) {
    return <GreenLineScheduleLinks pdfs={pdfs} />;
  }
  if (isRapidTransit(route)) {
    return null;
  }
  return <DefaultHoursOfOperation hours={hours} />;
};

export default HoursOfOperation;
