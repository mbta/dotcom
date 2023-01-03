import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import {
  isBranchingNode,
  isMergeNode,
  longestPath,
  nextStopIds,
  previousStopIds
} from "../../../../helpers/stop-tree";
import { hasAnActiveDiversion } from "../../../../models/alert";
import { Alert } from "../../../../__v3api";
import { StopId, StopTree } from "../../__schedule";
import {
  BASE_LINE_WIDTH,
  CoordState,
  MERGE_RADIUS,
  StopCoord
} from "./graphic-helpers";
import Line from "./Line";

interface Props {
  stopTree: StopTree;
  alerts: Alert[];
}

// [fromStopId, toStopId]
type StopGap = [StopId, StopId];

const notOnPrimaryPath = (primaryPath: StopId[]) => (stopId: StopId): boolean =>
  !primaryPath.includes(stopId);

const mergeStopGaps = (
  stopTree: StopTree,
  primaryPath: StopId[]
): StopGap[] => {
  const mergeStops: StopId[] = primaryPath.filter(id =>
    isMergeNode(stopTree, id)
  );
  return mergeStops.flatMap(toStopId => {
    const fromStopIds: StopId[] = previousStopIds(stopTree, toStopId).filter(
      notOnPrimaryPath(primaryPath)
    );
    return fromStopIds.map(fromStopId => [fromStopId, toStopId] as StopGap);
  });
};

const branchingStopGaps = (
  stopTree: StopTree,
  primaryPath: StopId[]
): StopGap[] => {
  const branchingStops: StopId[] = primaryPath.filter(id =>
    isBranchingNode(stopTree, id)
  );
  return branchingStops.flatMap(fromStopId => {
    const toStopIds: StopId[] = nextStopIds(stopTree, fromStopId).filter(
      notOnPrimaryPath(primaryPath)
    );
    return toStopIds.map(toStopId => [fromStopId, toStopId] as StopGap);
  });
};

const stopsToStart = (stopTree: StopTree, stopId: StopId): StopId[] => [
  ...previousStopIds(stopTree, stopId).flatMap(previousId =>
    stopsToStart(stopTree, previousId)
  ),
  stopId
];
const mergeBends = (
  stopTree: StopTree,
  coords: CoordState,
  mergeGaps: StopGap[],
  alerts: Alert[]
): (JSX.Element | null)[] =>
  mergeGaps.map(([lastStopOnBranch, trunkStop]) => {
    console.log(lastStopOnBranch);
    const trunkStopCoords: StopCoord | null = coords[trunkStop];
    if (!trunkStopCoords) return null;

    const branchStopIds = stopsToStart(stopTree, lastStopOnBranch);
    const startingStopId: StopId = branchStopIds[0];

    // Try the last stop on the branch first. If the branch is collapsed, the
    // coordinates will be null as the last stop is hidden, so use terminus.
    const branchStopCoords: StopCoord | null =
      coords[lastStopOnBranch] || coords[startingStopId];
    if (!branchStopCoords) return null;

    const [trunkX, trunkY] = trunkStopCoords;
    const [branchX, branchY] = branchStopCoords;
    const dx = (Math.abs(trunkX - branchX) - MERGE_RADIUS) * -1;
    const dy = (Math.abs(trunkY - branchY) - MERGE_RADIUS - 20) * 1;
    const arc = `-${MERGE_RADIUS},${MERGE_RADIUS} 0 0 1 -${MERGE_RADIUS},${MERGE_RADIUS}`;
    const strokeProp = hasAnActiveDiversion(lastStopOnBranch, alerts)
      ? { stroke: "url(#diagonalHatch)" }
      : {};
    const pathProps: React.SVGProps<SVGPathElement> = {
      key: `${startingStopId}-${trunkStop}-merge`,
      strokeWidth: `${BASE_LINE_WIDTH}px`,
      d: `M${branchX},${branchY} v${dy} a${arc} h${dx}`,
      ...strokeProp
    };
    return <path {...pathProps} />;
  });

const stopsToTerminus = (stopTree: StopTree, stopId: StopId): StopId[] => [
  stopId,
  ...nextStopIds(stopTree, stopId).flatMap(nextId =>
    stopsToTerminus(stopTree, nextId)
  )
];
const branchingBends = (
  stopTree: StopTree,
  coords: CoordState,
  branchingGaps: StopGap[],
  alerts: Alert[]
): (JSX.Element | null)[] =>
  branchingGaps.map(([trunkStop, firstStopOnBranch]) => {
    const trunkStopCoords: StopCoord | null = coords[trunkStop];
    if (!trunkStopCoords) return null;

    const branchStopIds = stopsToTerminus(stopTree, firstStopOnBranch);
    const terminusStopId: StopId = branchStopIds[branchStopIds.length - 1];

    // Try the next stop on the branch first. If the branch is collapsed, the
    // coordinates will be null as the next stop is hidden, so use terminus.
    const branchStopCoords: StopCoord | null =
      coords[firstStopOnBranch] || coords[terminusStopId];
    if (!branchStopCoords) return null;

    const [trunkX, trunkY] = trunkStopCoords;
    const [branchX, branchY] = branchStopCoords;
    const dx = (Math.abs(trunkX - branchX) - MERGE_RADIUS) * -1;
    const dy = (Math.abs(trunkY - branchY) - MERGE_RADIUS - 60) * -1;
    const arc = `-${MERGE_RADIUS},-${MERGE_RADIUS} 0 0 0 -${MERGE_RADIUS},-${MERGE_RADIUS}`;
    const strokeProp = hasAnActiveDiversion(firstStopOnBranch, alerts)
      ? { stroke: "url(#diagonalHatch)" }
      : {};
    const pathProps: React.SVGProps<SVGPathElement> = {
      key: `${trunkStop}-${terminusStopId}-branch`,
      strokeWidth: `${BASE_LINE_WIDTH}px`,
      d: `M${branchX},${branchY} v${dy} a${arc} h${dx}`,
      ...strokeProp
    };

    return <path {...pathProps} />;
  });

const Merges = ({
  stopTree,
  alerts
}: Props): ReactElement<HTMLElement> | null => {
  const coords: CoordState = useSelector((state: CoordState) => state);
  if (!coords) return null;

  const primaryPath = longestPath(stopTree);
  const mergeGaps: StopGap[] = mergeStopGaps(stopTree, primaryPath);
  const branchingGaps: StopGap[] = branchingStopGaps(stopTree, primaryPath);
  const stopGaps: StopGap[] = mergeGaps.concat(branchingGaps);
  const bends = mergeBends(stopTree, coords, mergeGaps, alerts).concat(
    branchingBends(stopTree, coords, branchingGaps, alerts)
  );

  if (!stopGaps.length && !bends.length) return null;

  return (
    <g className="line-diagram-svg__merge">
      {stopGaps.map(
        ([fromId, toId]) =>
          fromId &&
          toId && (
            <Line
              key={`${fromId}-${toId}-line`}
              stopTree={stopTree}
              fromId={fromId}
              toId={toId}
              alerts={alerts}
            />
          )
      )}
      {bends}
    </g>
  );
};

export default Merges;
