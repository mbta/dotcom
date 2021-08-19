import React, { ReactElement } from "react";
import { hasBranchLines } from "./line-diagram-helpers";
import Diagram from "./graphics/Diagram";
import StopListWithBranches from "./StopListWithBranches";
import { LiveDataByStop } from "./__line-diagram";
import { LineDiagramStop, RouteStop } from "../__schedule";
import useStopPositions, { RefList } from "./graphics/useStopPositions";
import StopCard from "./StopCard";
import { hasPredictionTime } from "../../../models/prediction";
import { MapMarker } from "../../../leaflet/components/__mapdata";

interface Props {
  stops: LineDiagramStop[];
  handleStopClick: (stop: RouteStop) => void;
  liveData: LiveDataByStop;
  vehicleMarkers: MapMarker[];
}

export const StopRefContext = React.createContext<[RefList, () => void]>([
  {},
  () => {}
]);

const LineDiagramWithStops = (props: Props): ReactElement<HTMLElement> => {
  const { stops, handleStopClick, liveData, vehicleMarkers } = props;

  // create a ref for each stop - we will use this to track the location of the stop so we can place the line diagram bubbles
  const [stopRefsMap, updateAllStopCoords] = useStopPositions(stops);

  const anyCrowding = Object.values(liveData).some(
    ({ headsigns }): boolean =>
      headsigns
        ? headsigns
            .filter(hasPredictionTime)
            .some(
              ({ time_data_with_crowding_list: timeData }): boolean =>
                !!timeData[0].crowding
            )
        : false
  );

  return (
    <StopRefContext.Provider value={[stopRefsMap, updateAllStopCoords]}>
      <div
        className={`m-schedule-diagram ${
          !anyCrowding ? "u-no-crowding-data" : ""
        }`}
      >
        <Diagram
          lineDiagram={stops}
          liveData={liveData}
          vehicleMarkers={vehicleMarkers}
        />
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
