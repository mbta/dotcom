import React from "react";
import { createRoot } from "react-dom/client";
import IEWarning from "./components/IEWarningBanner";
import { getCookie } from "../../js/cookies";

const render = (): void => {
  const showIEwarning = getCookie("show_ie_warning");
  if (showIEwarning === "false") return;

  const root = createRoot(document.getElementById("ie-warning")!);
  root.render(<IEWarning />);
};

export const browserIsIE = (): boolean => {
  const ua = navigator.userAgent;
  // MSIE is used to detect old browsers and Trident is used to newer ones
  return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
};

export default (): void => {
  if (browserIsIE()) {
    render();
  }
};
