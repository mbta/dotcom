import React from "react";
import ReactDOM from "react-dom";
import StopPageRedesign from "./components/StopPageRedesign";

const render = (): void => {
  const rootEl = document.getElementById("react-stop-redesign-root");
  const stopId = rootEl?.dataset.mbtaStopId;
  if (!stopId) return;
  ReactDOM.render(<StopPageRedesign stopId={stopId} />, rootEl);
};

export const onLoad = (): void => {
  render();
};

export default onLoad;
