import React, { ReactElement } from "react";
import renderFa from "../../helpers/render-fa";
import { SchedulePDF } from "../components/__schedule";

const pdfLink = (pdf: SchedulePDF | null): ReactElement<HTMLElement> | null => {
  if (!pdf) {
    return null;
  }
  return (
    <div className="text-base u-pt-16">
      <a
        key={pdf.url}
        href={pdf.url}
        rel="noopener noreferrer"
        className="c-call-to-action"
        target="_blank"
      >
        {`Open full schedule and map PDF`}{" "}
        {renderFa("fa-arrow-up-right-from-square", "")}
      </a>
    </div>
  );
};

export default pdfLink;
