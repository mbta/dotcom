import React, { ReactElement } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";
import { SchedulePDF } from "./__schedule";
import renderSvg from "../../helpers/render-svg";
import pdfIcon from "../../../static/images/icon-pdf-default.svg";
import { Route } from "../../__v3api";
import { isACommuterRailRoute } from "../../models/route";

const link = (pdf: SchedulePDF): ReactElement<HTMLElement> => (
  <a
    key={pdf.url}
    href={pdf.url}
    rel="noopener noreferrer"
    target="_blank"
    className="m-schedule-page__sidebar-pdfs"
  >
    {renderSvg("c-svg__icon-pdf", pdfIcon)}
    {pdf.title}
  </a>
);

interface Props {
  pdfs: SchedulePDF[];
  route: Route;
}

const PDFSchedules = ({
  pdfs,
  route
}: Props): ReactElement<HTMLElement> | null =>
  pdfs.length > 0 ? (
    <ExpandableBlock
      header={{
        text: `PDF Schedules${isACommuterRailRoute(route) ? "" : " and Maps"}`,
        iconSvgText: null
      }}
      initiallyExpanded
      id="pdfs"
    >
      <>{pdfs.map(pdf => link(pdf))}</>
    </ExpandableBlock>
  ) : null;

export default PDFSchedules;
