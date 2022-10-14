import React, { ReactElement } from "react";
import renderFa from "../../helpers/render-fa";
import { SchedulePDF } from "../components/__schedule";

export const pdfLink = (pdf: SchedulePDF): ReactElement<HTMLElement> => (
  <a key={pdf.url} href={pdf.url} rel="noopener noreferrer" target="_blank">
    Open subway schedule PDF {renderFa("fa-arrow-up-right-from-square", "")}
  </a>
);