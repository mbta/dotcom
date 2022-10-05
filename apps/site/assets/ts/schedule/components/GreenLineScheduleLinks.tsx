import React, { ReactElement } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";
import renderFa from "../../helpers/render-fa";
import { SchedulePDF } from "./__schedule";

const pdfLink = (pdf: SchedulePDF): ReactElement<HTMLElement> => (
  <a key={pdf.url} href={pdf.url} rel="noopener noreferrer" target="_blank">
    Open subway schedule PDF {renderFa("fa-arrow-up-right-from-square", "")}
  </a>
);

const getGreenLineScheduleLinks = (): ReactElement<HTMLElement> => {
  return (
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
};

const GreenLineScheduleLinks = ({
  pdfs
}: {
  pdfs: SchedulePDF[];
}): ReactElement<HTMLElement> | null => {
  console.log(pdfs);
  return (
    <>
      <ExpandableBlock
        header={{ text: "Weekday Schedule", iconSvgText: null }}
        initiallyExpanded={false}
        id="weekday-hours"
      >
        <div className="m-schedule-page__sidebar-hours">
          <div className="fs-14 pt-14">Trains every 6-12 minutes</div>
          {getGreenLineScheduleLinks()}
        </div>
      </ExpandableBlock>
      <ExpandableBlock
        header={{ text: "Weekend Schedule", iconSvgText: null }}
        initiallyExpanded={false}
        id="weekend-hours"
      >
        <div className="m-schedule-page__sidebar-hours">
          <div className="font-weight-bold fs-18 pb-14">Saturday</div>
          <div className="fs-14 pt-14">Trains every 6-12 minutes</div>
          {getGreenLineScheduleLinks()}
          <div
            style={{
              borderBottomWidth: "0.5px",
              borderBottomColor: "black",
              borderBottomStyle: "solid"
            }}
            className="pt-18"
          ></div>
          <div className="font-weight-bold fs-18 pt-18 pb-14">Sunday</div>
          {getGreenLineScheduleLinks()}
          {<div className="fs-14 pt-18">{pdfLink(pdfs[0])}</div>}
        </div>
      </ExpandableBlock>
    </>
  );
};

export default GreenLineScheduleLinks;
