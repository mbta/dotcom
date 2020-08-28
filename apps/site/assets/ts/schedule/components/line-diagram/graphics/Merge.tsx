import { first, last } from "lodash";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { LineDiagramStop } from "../../__schedule";
import {
  getTreeDirection,
  isBranchTerminusStop,
  isMergeStop,
  lineDiagramIndexes,
  isStopOnMainLine
} from "../line-diagram-helpers";
import {
  CoordState,
  StopCoord,
  BASE_LINE_WIDTH,
  MERGE_RADIUS
} from "./graphic-helpers";
import Line from "./Line";

interface MergeGraphicsProps {
  lineDiagram: LineDiagramStop[];
}
const Merges = ({ lineDiagram }: MergeGraphicsProps): ReactElement | null => {
  const branchingOutward = getTreeDirection(lineDiagram) === "outward";
  const mergeIndices = lineDiagramIndexes(lineDiagram, isMergeStop);
  // walk through the diagram to find where all the merges go.
  const stopGaps = mergeIndices.map(i => {
    let from: LineDiagramStop;
    let to: LineDiagramStop;
    if (branchingOutward) {
      from = lineDiagram[i];
      [to] = lineDiagram.slice(i).filter(isStopOnMainLine);
    } else {
      to = lineDiagram[i];
      from = last(lineDiagram.slice(0, i - 1).filter(isStopOnMainLine))!;
    }

    return [from, to];
  });

  const lineDiagramCoords: CoordState = useSelector(
    (state: CoordState) => state
  );
  if (!lineDiagramCoords) return null;

  const mergeBends = stopGaps.map(([from, to]) => {
    // if outward, start with from and construct array of tos
    // if inward, start with to and construct array of froms
    const mergeStop = branchingOutward ? from : to;
    const mergeStopIndex = lineDiagram.indexOf(mergeStop);
    const mergeStopCoords = lineDiagramCoords[mergeStop.route_stop.id];
    if (!mergeStopCoords) return null;

    // usually there's just one terminus to draw the merge to... except for the GL at Kenmore.
    const mergeEnds = mergeStop.stop_data.slice(1).map(({ branch }) => {
      // along the branch might be subsequent stops or prior stops
      const downBranch = (branchingOutward
        ? lineDiagram.slice(mergeStopIndex)
        : lineDiagram.slice(0, mergeStopIndex - 1)
      ).filter(stop => stop.route_stop.branch === branch);
      const nextStopOnBranch = branchingOutward
        ? first(downBranch)
        : last(downBranch);
      const terminusOnBranch = branchingOutward
        ? first(downBranch.filter(isBranchTerminusStop))
        : last(downBranch.filter(isBranchTerminusStop));
      return [nextStopOnBranch, terminusOnBranch];
    });

    return mergeEnds.map(([nextStop, terminus]) => {
      if (!nextStop && !terminus) return null;
      // try the next stop on the branch first. if the branch is collapsed the
      // coordinates will be null as the next stop is hidden, so use terminus
      const nextStopVisible = !!lineDiagramCoords[nextStop!.route_stop.id];
      const nextStopCoords = nextStopVisible
        ? lineDiagramCoords[nextStop!.route_stop.id]
        : lineDiagramCoords[terminus!.route_stop.id];

      const [x, y] = nextStopCoords as StopCoord;
      const [mX, mY] = mergeStopCoords;
      const dx = (Math.abs(mX - x) - MERGE_RADIUS) * -1;
      const dy =
        (Math.abs(mY - y) - MERGE_RADIUS - (branchingOutward ? 60 : 20)) *
        (branchingOutward ? -1 : 1);
      const arc = branchingOutward
        ? `-${MERGE_RADIUS},-${MERGE_RADIUS} 0 0 0 -${MERGE_RADIUS},-${MERGE_RADIUS}`
        : `-${MERGE_RADIUS},${MERGE_RADIUS} 0 0 1 -${MERGE_RADIUS},${MERGE_RADIUS}`;
      const d = `M${x},${y} v${dy} a${arc} h${dx}`;
      return (
        <path
          key={`${mergeStop.route_stop.id}-${terminus!.route_stop.id}-merge`}
          strokeWidth={`${BASE_LINE_WIDTH}px`}
          d={d}
        />
      );
    });
  });

  if (!stopGaps.length && !mergeBends.length) return null;

  return (
    <g className="line-diagram-svg__merge">
      {stopGaps.map(([from, to]) => (
        <Line
          key={`${from.route_stop.id}-${to.route_stop.id}-line`}
          from={from}
          to={to}
        />
      ))}
      {mergeBends}
    </g>
  );
};

export default Merges;
