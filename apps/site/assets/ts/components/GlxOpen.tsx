import React, { ReactElement } from "react";
import useIsGlxOpen from "../hooks/useIsGlxOpen";
import renderSvg from "../helpers/render-svg";
import glxLogo from "../../static/images/glx-logo.svg";

const glxLogoElement = (pageType: string): JSX.Element | null => {
  if (pageType === "schedule-finder") return null;

  return renderSvg("glx-logo", glxLogo);
};

const GlxOpen = ({
  pageType,
  stopId
}: {
  pageType: "station-page" | "schedule-finder" | "line-diagram";
  stopId: string;
}): ReactElement<HTMLElement> | null => {
  const isGlxOpen = useIsGlxOpen(stopId)[0];
  let textContent;

  if (pageType === "station-page") {
    textContent = "STATION NOW OPEN";
  } else {
    textContent = "NOW OPEN";
  }

  if (isGlxOpen) {
    return (
      <div className="glx-open-container">
        {glxLogoElement(pageType)}
        <span className="glx-open-message">{textContent}</span>
      </div>
    );
  }

  return null;
};

export default GlxOpen;
