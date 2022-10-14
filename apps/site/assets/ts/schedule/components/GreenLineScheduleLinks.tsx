import React, { ReactElement } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";
import renderFa from "../../helpers/render-fa";
import { SchedulePDF } from "./__schedule";

const pdfLink = (pdf: SchedulePDF): ReactElement<HTMLElement> => (
  <a key={pdf.url} href={pdf.url} rel="noopener noreferrer" target="_blank">
    Open subway schedule PDF {renderFa("fa-arrow-up-right-from-square", "")}
  </a>
);

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
