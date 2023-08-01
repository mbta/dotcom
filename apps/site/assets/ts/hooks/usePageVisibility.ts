/* eslint-disable import/prefer-default-export */
import { useState, useLayoutEffect } from "react";

/** returns true if the page is visible
 * returns false if the page is hidden
 */
export const usePageVisibility = (): boolean => {
  const [hidden, setHidden] = useState<boolean>(false);
  const callback = (): void => {
    setHidden(document.hidden);
  };
  useLayoutEffect(() => {
    document.addEventListener("visibilitychange", callback);
    return () => {
      document.removeEventListener("visibilitychange", callback);
    };
  }, []);
  return !hidden;
};
