import { useEffect, useState } from "react";
import { isSMDown } from "./media-breakpoints";

// eslint-disable-next-line import/prefer-default-export
export const useSMDown = (): boolean => {
  const [isSmallBreakpoint, setIsSmallBreakpoint] = useState(isSMDown());
  useEffect(() => {
    const handleResize = (): void => {
      setIsSmallBreakpoint(isSMDown());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isSmallBreakpoint;
};
