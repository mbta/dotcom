import React, { ReactElement } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";
import pdfLink from "../helpers/hoursOfOperationHelpers";
import { SchedulePDF } from "./__schedule";

const getGreenLineScheduleLinks = (): ReactElement<HTMLElement> => (
  <>
    <div>
      <a href="/schedules/Green-B/line">B Line Schedule</a>
    </div>
    <div>
      <a href="/schedules/Green-C/line">C Line Schedule</a>
    </div>
    <div>
      <a href="/schedules/Green-D/line">D Line Schedule</a>
    </div>
    <div>
      <a href="/schedules/Green-E/line">E Line Schedule</a>
    </div>
  </>
);

const GreenLineScheduleLinks = ({
  pdfs
}: {
  pdfs: SchedulePDF[];
}): ReactElement<HTMLElement> | null => (
  <>
    <ExpandableBlock
      header={{ text: "Schedules", iconSvgText: null }}
      initiallyExpanded={false}
      id="weekday-hours"
    >
      <div className="m-schedule-page__sidebar-hours">
        {getGreenLineScheduleLinks()}
        {pdfLink(pdfs[0])}
      </div>
    </ExpandableBlock>
  </>
);

export default GreenLineScheduleLinks;
