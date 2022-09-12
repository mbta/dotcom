import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { LineDiagramStop } from "../../__schedule";
import {
  areOnDifferentBranchLines,
  isMergeStop,
  isBranchTerminusStop
} from "../line-diagram-helpers";
import {
  StopCoord,
  CoordState,
  BRANCH_LINE_WIDTH,
  BASE_LINE_WIDTH,
  BRANCH_SPACING
} from "./graphic-helpers";

interface PathGraphicsProps {
  from: LineDiagramStop;
  to: LineDiagramStop;
  shuttle?: boolean;
}
const Line = ({
  from,
  to,
  shuttle
}: PathGraphicsProps): ReactElement | null => {
  const fromCoords: StopCoord | null = useSelector(
    (state: CoordState) => state[from.route_stop.id]
  );
  const toCoords: StopCoord | null = useSelector(
    (state: CoordState) => state[to.route_stop.id]
  );
  if (!fromCoords || !toCoords) return null;
  if (isMergeStop(to) && from.stop_data.length === to.stop_data.length) {
    return null;
  }

  const [x1, y1] = fromCoords;
  const y2 = toCoords[1];

  if (isMergeStop(from) && !areOnDifferentBranchLines(from, to)) {
    // just draw one line.
    const lineProps: React.SVGProps<SVGLineElement> = {
      key: `${from.route_stop.id}-${to.route_stop.id}`
    };
    lineProps.strokeWidth = `${BASE_LINE_WIDTH}px`;
    lineProps.x1 = `${x1}px`;
    lineProps.x2 = lineProps.x1;
    lineProps.y1 = `${y1}px`;
    lineProps.y2 = `${y2}px`;
    if (
      shuttle ||
      (from.stop_data.some(sd => sd["has_disruption?"]) &&
        to.stop_data.some(sd => sd["has_disruption?"]))
    ) {
      lineProps.stroke = "url(#diagonalHatch)";
    }
    return <line className="line-diagram-svg__line" {...lineProps} />;
  }

  // otherwise let's just show all the lines...
  return (
    <>
      {from.stop_data.map((branchLine, branchIndex) => {
        const lineProps: React.SVGProps<SVGLineElement> = {
          key: `${from.route_stop.id}-${to.route_stop.id}-${branchLine.type}-${branchIndex}`
        };
        lineProps.strokeWidth = `${
          branchIndex >= 1 &&
          !(isBranchTerminusStop(from) || isBranchTerminusStop(to)) &&
          (branchLine.type === "stop" ||
            to.stop_data[branchIndex].type === "stop")
            ? BRANCH_LINE_WIDTH
            : BASE_LINE_WIDTH
        }px`;
        lineProps.x1 = `${BRANCH_SPACING * branchIndex +
          BASE_LINE_WIDTH +
          1}px`;
        lineProps.x2 = lineProps.x1;
        lineProps.y1 = `${y1}px`;
        lineProps.y2 = `${y2}px`;
        if (shuttle || branchLine["has_disruption?"]) {
          lineProps.stroke = "url(#diagonalHatch)";
        }
        return <line className="line-diagram-svg__line" {...lineProps} />;
      })}
    </>
  );
};

export default Line;
