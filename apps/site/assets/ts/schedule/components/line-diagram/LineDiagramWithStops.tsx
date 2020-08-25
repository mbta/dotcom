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

  return (
    <StopRefContext.Provider value={[stopRefsMap, updateAllStopCoords]}>
      <ol className="m-schedule-diagram">
        <Diagram lineDiagram={stops} liveData={liveData} />
        {hasBranchLines(stops) ? (
          <StopListWithBranches
            stops={stops}
            handleStopClick={handleStopClick}
            liveData={liveData}
          />
        ) : (
          stops.map(stop => (
            <StopCard
              key={stop.route_stop.id}
              stop={stop}
              onClick={handleStopClick}
              liveData={liveData[stop.route_stop.id]}
            />
          ))
        )}
      </ol>
    </StopRefContext.Provider>
  );
};

export default LineDiagramWithStops;
