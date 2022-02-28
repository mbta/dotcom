import React, { ReactElement } from "react";
import { hasBranchLines } from "./line-diagram-helpers";
import Diagram from "./graphics/Diagram";
import StopListWithBranches from "./StopListWithBranches";
import { CommonLineDiagramProps } from "./__line-diagram";
import { LineDiagramStop } from "../__schedule";
import useStopPositions, { RefMap } from "./graphics/useStopPositions";
import StopCard from "./StopCard";
import { hasPredictionTime } from "../../../models/prediction";

export const StopRefContext = React.createContext<[RefMap, () => void]>([
  new Map(),
  () => {}
]);

const LineDiagramWithStops = (
  props: CommonLineDiagramProps
): ReactElement<HTMLElement> => {
  const { stops: stops_, handleStopClick, liveData } = props;
  // FIXME
  let stops = stops_;
  const northStation = stops_.find(s => s.route_stop.name === "North Station");
  if (northStation) {
    const fake = (name: string, stopData: LineDiagramStop['stop_data'], addl?: Partial<LineDiagramStop['route_stop']>): LineDiagramStop => {
      const out = { ...northStation };
      out.alerts = [];
      out.route_stop = {
        ...out.route_stop,
        ...(addl || {}),
        name,
        id: name.toLowerCase(),
        zone: null,
      };
      out.stop_data = stopData;

      return out;
    };

    const extraA: LineDiagramStop[] = [
      fake("Test Station C", [
          { "has_disruption?": false, branch: null, type: 'stop' },
      ]),
      fake("Test Station A", [
          { "has_disruption?": false, branch: null, type: 'line' },
          { "has_disruption?": false, branch: 'Green Test Split', type: 'terminus' },
      ]),
      fake("Test Station B", [
          { "has_disruption?": false, branch: null, type: 'merge' },
          { "has_disruption?": false, branch: null, type: 'merge' },
      ]),
    ];
    const extraB: LineDiagramStop[] = [
      fake("Test Station B", [
          { "has_disruption?": false, branch: null, type: 'merge' },
          { "has_disruption?": false, branch: 'Green Test Split', type: 'merge' },
      ], { "is_terminus?": false,} ),
      fake("Test Station A", [
          { "has_disruption?": false, branch: null, type: 'line' },
          { "has_disruption?": false, branch: 'Green Test Split', type: 'terminus' },
      ], { "is_terminus?": true, branch: "Green Test Split", }),
      fake("Test Station C", [
          { "has_disruption?": false, branch: null, type: 'stop' },
      ]),
    ];
    stops = stops_[0].route_stop.name === 'North Station'
      ? [...extraA, ...stops_]
      : [...stops_, ...extraB];
    console.debug({stops});
  }

  // create a ref for each stop - we will use this to track the location of the stop so we can place the line diagram bubbles
  const [stopRefsMap, updateAllStopCoords] = useStopPositions(stops);

  const anyCrowding = Object.values(liveData).some(({ headsigns }): boolean =>
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
        <Diagram lineDiagram={stops} liveData={liveData} />
        {hasBranchLines(stops) ? (
          <StopListWithBranches {...props} stops={stops} />
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
