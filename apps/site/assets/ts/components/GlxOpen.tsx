import React, { ReactElement, useState, useEffect } from "react";
import renderSvg from "../helpers/render-svg";
import glxLogo from "../../static/images/glx-logo.svg";

export const getIsGlxOpen = (stationId: string): boolean => {
  if (!document) return false;

  const glxStationsOpen = document.querySelector(".glx-stations-open");

  if (
    glxStationsOpen instanceof HTMLElement &&
    glxStationsOpen.dataset.stations
  ) {
    return glxStationsOpen.dataset.stations.split(",").indexOf(stationId) > 0;
  }
  return false;
};

const glxLogoElement = (): JSX.Element => renderSvg("glx-logo", glxLogo);

const GlxOpen = ({
  stationPage = false,
  stopId
}: {
  stationPage: boolean;
  stopId: string;
}): ReactElement<HTMLElement> | null => {
  const [isGlxOpen, setIsGlxOpen] = useState(false);
  useEffect(() => {
    setIsGlxOpen(getIsGlxOpen(stopId));
  }, [stopId]);
  let textContent;

  if (stationPage) {
    textContent = "STATION NOW OPEN";
  } else {
    textContent = "STATION OPEN";
  }

  if (isGlxOpen) {
    return (
      <div className="glx-open-container">
        {glxLogoElement()}
        <span className="glx-open-message">{textContent}</span>
      </div>
    );
  }

  return null;
};

export default GlxOpen;
