import React from "react";
import ReactDOM from "react-dom";
import StopPageRedesign from "./components/StopPageRedesign";

const render = (): void => {
  // TODO is there a better way to get this (from the pheonix page perhaps?)
  const urlTokens = window.location.href.split("/");
  const stopId = urlTokens[urlTokens.length - 1];
  ReactDOM.render(
    <StopPageRedesign stopId={stopId} />,
    document.getElementById("react-stop-redesign-root")
  );
};

export const onLoad = (): void => {
  render();
};

export default onLoad;
