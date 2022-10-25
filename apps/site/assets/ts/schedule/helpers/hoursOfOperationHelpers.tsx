import React, { ReactElement } from "react";
import renderFa from "../../helpers/render-fa";
import { SchedulePDF } from "../components/__schedule";

const pdfLink = (
  pdf: SchedulePDF,
  routeName: string
): ReactElement<HTMLElement> | null => {
  if (!pdf) {
    return null;
  }
  let vehicleType = "subway";
  if (routeName === "Mattapan") {
    vehicleType = "trolley";
  }
  return (
    <div className="fs-14 pt-16">
      <a
        key={pdf.url}
        href={pdf.url}
        rel="noopener noreferrer"
        className="c-call-to-action"
        target="_blank"
      >
        {`Open ${vehicleType} schedule PDF`}{" "}
        {renderFa("fa-arrow-up-right-from-square", "")}
      </a>
    </div>
  );
};

export default pdfLink;
