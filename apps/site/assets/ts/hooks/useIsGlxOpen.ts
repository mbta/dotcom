import { useState, useEffect } from "react";

const getIsGlxOpen = (stationId: string): boolean => {
  if (!document) return false;

  const glxStationsOpen = document.querySelector(".glx-stations-open");

  if (
    glxStationsOpen instanceof HTMLElement &&
    glxStationsOpen.dataset.stations
  ) {
    return glxStationsOpen.dataset.stations.includes(stationId);
  }
  return false;
};

const useIsGlxOpen = (stopId: string): GlxOpenStatus => {
  const [isGlxOpen, setIsGlxOpen] = useState(false);
  useEffect(() => {
    setIsGlxOpen(getIsGlxOpen(stopId));
  }, [stopId]);

  return isGlxOpen;
};

export default useIsGlxOpen;
