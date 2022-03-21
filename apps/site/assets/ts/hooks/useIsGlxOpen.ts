import { useState, useEffect } from "react";

type GlxOpenStatus = [boolean, string | null]; // [status, Date string if true status]

const getIsGlxOpen = (stationId: string): GlxOpenStatus => {
  if (!document) return [false, null];
  const glxStationsOpen: HTMLElement | null = document.querySelector(
    ".glx-stations-open"
  );
  if (!glxStationsOpen) return [false, null];
  const { stations, opening } = glxStationsOpen.dataset;
  const isStationOpen = stations ? stations.includes(stationId) : false;
  const stationOpenDate = isStationOpen && opening ? opening : null;
  return [isStationOpen, stationOpenDate];
};

const useIsGlxOpen = (stopId: string): GlxOpenStatus => {
  const [[isGlxOpen, glxOpenDate], setIsGlxOpen] = useState<GlxOpenStatus>([
    false,
    null
  ]);
  useEffect(() => {
    setIsGlxOpen(getIsGlxOpen(stopId));
  }, [stopId]);

  return [isGlxOpen, glxOpenDate];
};

export default useIsGlxOpen;
