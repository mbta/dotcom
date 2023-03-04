import React from "react";
import { createRoot } from "react-dom/client";
import StopPageRedesign from "./components/StopPageRedesign";

const render = (): void => {
  // TODO is there a better way to get this (from the pheonix page perhaps?)
  const urlTokens = window.location.href.split("/");
  const stopId = urlTokens[urlTokens.length - 1];

  const root = createRoot(document.getElementById("react-stop-redesign-root")!);
  root.render(<StopPageRedesign stopId={stopId} />);
};

export const onLoad = (): void => {
  render();
};

export default onLoad;
