import React from "react";
import ReactDOM from "react-dom";
import VoteMap from "./components/VoteMap";

const render = (): void => {
  const voteMapDataEl = document.getElementById("js-vote-data");
  if (!voteMapDataEl) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const voteMapData = JSON.parse(voteMapDataEl.innerHTML) as any;
  ReactDOM.render(
    <VoteMap pollingLocations={voteMapData.polling_locations} />,
    document.getElementById("react-vote-root")
  );
};

export const onLoad = (): void => {
  render();
};

export default onLoad;
