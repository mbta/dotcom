import React, { ReactElement } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";
import { pdfLink } from "../helpers/hoursOfOperationHelpers";
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
      header={{ text: "Weekday Schedule", iconSvgText: null }}
      initiallyExpanded={false}
      id="weekday-hours"
    >
      <div className="m-schedule-page__sidebar-hours">
        {getGreenLineScheduleLinks()}
        <div className="fs-14 pt-18 text-decoration-underline">{pdfLink(pdfs[0])}</div>
      </div>
    </ExpandableBlock>
    <ExpandableBlock
      header={{ text: "Weekend Schedule", iconSvgText: null }}
      initiallyExpanded={false}
      id="weekend-hours"
    >
      <div className="m-schedule-page__sidebar-hours">
        {getGreenLineScheduleLinks()}
        <div className="fs-14 pt-18 text-decoration-underline">{pdfLink(pdfs[0])}</div>
      </div>
    </ExpandableBlock>
  </>
);

export default GreenLineScheduleLinks;
