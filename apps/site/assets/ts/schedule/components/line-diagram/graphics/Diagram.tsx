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

interface DiagramProps {
  lineDiagram: LineDiagramStop[];
  liveData: LiveDataByStop | undefined;
  overrideStyle?: "shuttle" | "commuter-rail";
  overridePlacement?: number;
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
  liveData: LiveDataByStop | undefined;
}

const LiveVehicleIconSet = ({
  stop,
  liveData
}: VehicleIconSetProps): ReactElement<HTMLElement> | null => {
  const stopId = stop.route_stop.id;
  if (!liveData || !liveData[stopId]) return null;
  // Hide vehicles arriving to the origin from 'off the line'
  const vehicleData = stop.route_stop["is_beginning?"]
    ? liveData[stopId].vehicles.filter(vehicle => vehicle.status === "stopped")
    : liveData[stopId].vehicles;

  return (
    <VehicleIcons
      key={`${stopId}-vehicles`}
      stop={stop.route_stop}
      vehicles={vehicleData}
    />
  );
};

const Diagram = (props: DiagramProps): ReactElement<HTMLElement> | null => {
  const { lineDiagram, liveData, overrideStyle, overridePlacement } = props;
  const { selectedDirection } = getCurrentState();
  const width = diagramWidth(
    max(lineDiagram.map(ld => ld.stop_data.length)) || 1
  );

  const extraClassName =
    overrideStyle === "commuter-rail"
      ? "commuter-rail"
      : routeToModeName(lineDiagram[0].route_stop.route!);

  return (
    <>
      {lineDiagram.map(stop => (
        <LiveVehicleIconSet
          key={stop.route_stop.id}
          stop={stop}
          liveData={liveData}
        />
      ))}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="diagram-title diagram-desc"
        className={`line-diagram-svg ${extraClassName}`}
        width={`${width + 4}px`}
        height="100%"
        style={{
          left:
            BASE_LINE_WIDTH / 2 +
            /* istanbul ignore next */ (overridePlacement ?? 0)
        }}
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

        <defs>{DiagonalHatchPattern(overrideStyle)}</defs>
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
                shuttle={overrideStyle === "shuttle"}
              />
            );
          }
          return null; // this is the end of the line, nothing to draw a line to
        })}

        {/* Draw circles for each stop */
        lineDiagram.map(stop => (
          <Stop
            key={stop.route_stop.id}
            stop={stop}
            shuttle={overrideStyle === "shuttle"}
          />
        ))}
      </svg>
    </>
  );
};

export default Diagram;
