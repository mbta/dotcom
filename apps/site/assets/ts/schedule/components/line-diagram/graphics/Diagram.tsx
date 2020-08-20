import { max } from "lodash";
import React, { ReactElement } from "react";
import { LineDiagramStop } from "../../__schedule";
import {
  hasBranchLines,
  isBranchTerminusStop,
  areOnDifferentBranchLines,
  diagramWidth
} from "../line-diagram-helpers";
import Line from "./Line";
import Merges from "./Merge";
import Stop from "./Stop";
import { routeToModeName } from "../../../../helpers/css";
import { LiveDataByStop } from "../__line-diagram";
import VehicleIcons from "../VehicleIcons";

interface DiagramProps {
  lineDiagram: LineDiagramStop[];
  liveData: LiveDataByStop | null;
}

const Diagram = (props: DiagramProps): ReactElement<HTMLElement> | null => {
  const { lineDiagram, liveData } = props;
  const width = diagramWidth(
    max(lineDiagram.map(ld => ld.stop_data.length)) || 1
  );

  const vehicleIcons = liveData
    ? // eslint-disable-next-line @typescript-eslint/camelcase
      lineDiagram.map(({ route_stop: stop }, index) => {
        if (!liveData[stop.id]) return null;
        // Hide vehicles arriving to the origin from 'off the line'
        const vehicleData =
          index === 0
            ? liveData[stop.id].vehicles.filter(
                vehicle => vehicle.status === "stopped"
              )
            : liveData[stop.id].vehicles;

        return (
          <VehicleIcons
            key={`${stop.id}-vehicles`}
            stop={stop}
            vehicles={vehicleData}
          />
        );
      })
    : null;

  return (
    <>
      {vehicleIcons}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`line-diagram-svg ${routeToModeName(
          lineDiagram[0].route_stop.route!
        )}`}
        width={`${width + 4}px`}
        height="100%"
      >
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
