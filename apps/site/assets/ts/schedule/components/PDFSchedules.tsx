import React, { ReactElement } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";
import { SchedulePDF } from "./__schedule";
import renderSvg from "../../helpers/render-svg";
import pdfIcon from "../../../static/images/icon-pdf-default.svg";

const link = (pdf: SchedulePDF): ReactElement<HTMLElement> => (
  <a
    key={pdf.url}
    href={pdf.url}
    rel="noopener noreferrer"
    target="_blank"
    data-turbolinks="false"
    className="m-schedule-page__sidebar-pdfs"
  >
    {renderSvg("c-svg__icon-pdf", pdfIcon)}
    {pdf.title}
  </a>
);

interface Props {
  pdfs: SchedulePDF[];
}

const PDFSchedules = ({ pdfs }: Props): ReactElement<HTMLElement> | null =>
  pdfs.length > 0 ? (
    <ExpandableBlock
      header={{ text: "PDF Schedules and Maps", iconSvgText: null }}
      initiallyExpanded
      id="pdfs"
    >
      <>{pdfs.map(pdf => link(pdf))}</>
    </ExpandableBlock>
  ) : null;

export default PDFSchedules;
