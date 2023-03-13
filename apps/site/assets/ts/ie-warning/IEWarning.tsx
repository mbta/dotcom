import React from "react";
import ReactDOM from "react-dom";
import IEWarning from "./components/IEWarningBanner";
import { getCookie } from "../../js/cookies";

const render = (): void => {
  const showIEwarning = getCookie("show_ie_warning");

  ReactDOM.render(
    showIEwarning === "false" ? <></> : <IEWarning />,
    document.getElementById("ie-warning")
  );
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
