import { max } from "lodash";
import React, { ReactElement } from "react";
import { LineDiagramStop } from "../../__schedule";
import {
  hasBranchLines,
  isBranchTerminusStop,
  areOnDifferentBranchLines,
  diagramWidth,
  isMergeStop
} from "../line-diagram-helpers";
import Line from "./Line";
import Merges from "./Merge";
import Stop from "./Stop";
import { routeToModeName } from "../../../../helpers/css";
import { LiveDataByStop } from "../__line-diagram";
import VehicleIcons from "../VehicleIcons";
import { getCurrentState } from "../../../store/ScheduleStore";
import { DirectionId } from "../../../../__v3api";
import { isAGreenLineRoute } from "../../../../models/route";
import { BASE_LINE_WIDTH, DiagonalHatchPattern } from "./graphic-helpers";
import { MapMarker } from "../../../../leaflet/components/__mapdata";

interface DiagramProps {
  lineDiagram: LineDiagramStop[];
  liveData: LiveDataByStop | null;
  vehicleMarkers: MapMarker[];
}

const branchingDescription = (lineDiagram: LineDiagramStop[]): string => {
  const mergeStops = lineDiagram.filter(isMergeStop);
  const branchText = mergeStops.map(mergeStop => {
    const mergeStopName = mergeStop.route_stop.name;
    const branchNames = mergeStop.stop_data
      .filter(sd => sd.branch)
      .map(sd => sd.branch);
    return `Use ${mergeStopName} to transfer to trains on ${branchNames.join(
      " or "
    )} branches. `;
  });
  return branchText.join("");
};
const diagramDescription = (
  lineDiagram: LineDiagramStop[],
  direction: DirectionId
): string => {
  const text = `${lineDiagram.length} stops`;
  const {
    direction_destinations: destinations,
    direction_names: names
  } = lineDiagram[0].route_stop.route!;
  if (destinations) {
    return `${text} going ${names[direction]} to ${destinations[direction]}`;
  }
  return text;
};

interface VehicleIconSetProps {
  stop: LineDiagramStop;
  liveData: LiveDataByStop | null;
  vehicleMarkers: MapMarker[];
}

const LiveVehicleIconSet = ({
  stop,
  liveData,
  vehicleMarkers
}: VehicleIconSetProps): ReactElement<HTMLElement> | null => {
  const stopId = stop.route_stop.id;
  if (!liveData || !liveData[stopId] || !vehicleMarkers) return null;

  return (
    <VehicleIcons
      key={`${stopId}-vehicles`}
      stop={stop.route_stop}
      liveData={liveData}
      vehicleMarkers={vehicleMarkers}
    />
  );
};

const Diagram = (props: DiagramProps): ReactElement<HTMLElement> | null => {
  const { lineDiagram, liveData, vehicleMarkers } = props;
  const { selectedDirection } = getCurrentState();
  const width = diagramWidth(
    max(lineDiagram.map(ld => ld.stop_data.length)) || 1
  );

  return (
    <>
      {lineDiagram.map(stop => (
        <LiveVehicleIconSet
          key={stop.route_stop.id}
          stop={stop}
          liveData={liveData}
          vehicleMarkers={vehicleMarkers}
        />
      ))}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="diagram-title diagram-desc"
        className={`line-diagram-svg ${routeToModeName(
          lineDiagram[0].route_stop.route!
        )}`}
        width={`${width + 4}px`}
        height="100%"
        style={{ left: BASE_LINE_WIDTH / 2 }}
      >
        <title id="diagram-title">
          Line diagram for{" "}
          {isAGreenLineRoute(lineDiagram[0].route_stop.route!)
            ? "Green Line"
            : lineDiagram[0].route_stop.route!.name}
        </title>
        <desc id="diagram-desc">
          {diagramDescription(lineDiagram, selectedDirection)}
          {hasBranchLines(lineDiagram) && branchingDescription(lineDiagram)}
        </desc>

        <defs>{DiagonalHatchPattern}</defs>
        {/* If there are multiple branches, draw the lines and curves for those */
        hasBranchLines(lineDiagram) && <Merges lineDiagram={lineDiagram} />}

        {/* Draw lines between stops */
        lineDiagram.map((current, idx, self) => {
          if (self[idx + 1]) {
            if (
              isBranchTerminusStop(current) &&
              areOnDifferentBranchLines(current, self[idx + 1])
            )
              return null; // don't draw a line from a branch end to the main line

            return (
              <Line
                key={`${current.route_stop.id}-${self[idx + 1].route_stop.id}`}
                from={current}
                to={self[idx + 1]}
              />
            );
          }
          return null; // this is the end of the line, nothing to draw a line to
        })}

        {/* Draw circles for each stop */
        lineDiagram.map(stop => (
          <Stop key={stop.route_stop.id} stop={stop} />
        ))}
      </svg>
    </>
  );
};

export default Diagram;
