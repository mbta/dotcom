import React, { ReactElement } from "react";
import { hasBranchLines } from "./line-diagram-helpers";
import Diagram from "./graphics/Diagram";
import StopListWithBranches from "./StopListWithBranches";
import { CommonLineDiagramProps } from "./__line-diagram";
import useStopPositions, { RefList } from "./graphics/useStopPositions";
import StopCard from "./StopCard";

export const StopRefContext = React.createContext<[RefList, () => void]>([
  {},
  () => {}
]);

const LineDiagramWithStops = (
  props: CommonLineDiagramProps
): ReactElement<HTMLElement> => {
  const { stops, handleStopClick, liveData } = props;

  // create a ref for each stop - we will use this to track the location of the stop so we can place the line diagram bubbles
  const [stopRefsMap, updateAllStopCoords] = useStopPositions(stops);

  const anyCrowding = Object.values(liveData).some(({ headsigns }): boolean =>
    headsigns
      ? headsigns.some(({ vehicle_crowding }): boolean => !!vehicle_crowding)
      : false
  );

  return (
    <StopRefContext.Provider value={[stopRefsMap, updateAllStopCoords]}>
      <div
        className={`m-schedule-diagram ${
          !anyCrowding ? "u-no-crowding-data" : ""
        }`}
      >
        <Diagram lineDiagram={stops} liveData={liveData} />
        {hasBranchLines(stops) ? (
          <StopListWithBranches {...props} />
        ) : (
          <ol>
            {stops.map(stop => (
              <StopCard
                key={stop.route_stop.id}
                stop={stop}
                onClick={handleStopClick}
                liveData={liveData[stop.route_stop.id]}
              />
            ))}
          </ol>
        )}
      </div>
    </StopRefContext.Provider>
  );
};

export default LineDiagramWithStops;
