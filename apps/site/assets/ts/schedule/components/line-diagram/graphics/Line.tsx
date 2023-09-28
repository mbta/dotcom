import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import {
  isBranchingNode,
  isEndNode,
  isMergeNode,
  isStartNode,
  longestPath
} from "../../../../helpers/stop-tree";
import { hasAnActiveDiversion } from "../../../../models/alert";
import { Alert } from "../../../../__v3api";
import { StopId, StopTree } from "../../__schedule";
import { branchPosition } from "../line-diagram-helpers";
import {
  BASE_LINE_WIDTH,
  BRANCH_LINE_WIDTH,
  BRANCH_SPACING,
  CoordState,
  StopCoord
} from "./graphic-helpers";

interface Props {
  stopTree: StopTree;
  fromId: StopId;
  toId: StopId;
  alerts: Alert[];
}

const isOnPrimaryBranch = (stopTree: StopTree, stopId: StopId): boolean =>
  longestPath(stopTree).includes(stopId);

const isMiddleBranchStop = (stopTree: StopTree, stopId: StopId): boolean =>
  !isOnPrimaryBranch(stopTree, stopId) &&
  !isStartNode(stopTree, stopId) &&
  !isEndNode(stopTree, stopId) &&
  !isMergeNode(stopTree, stopId) &&
  !isBranchingNode(stopTree, stopId);

const lineProps = (
  stopTree: StopTree,
  fromId: StopId,
  toId: StopId,
  fromCoords: StopCoord,
  toCoords: StopCoord,
  alerts: Alert[]
): React.SVGProps<SVGLineElement> => {
  const x =
    BRANCH_SPACING * (branchPosition(stopTree, fromId) - 1) +
    BASE_LINE_WIDTH +
    1;
  const [, y1] = fromCoords;
  const [, y2] = toCoords;

  const strokeWidth =
    isMiddleBranchStop(stopTree, fromId) && isMiddleBranchStop(stopTree, toId)
      ? BRANCH_LINE_WIDTH
      : BASE_LINE_WIDTH;

  const strokeProp =
    hasAnActiveDiversion(fromId, alerts) && hasAnActiveDiversion(toId, alerts)
      ? { stroke: "url(#diagonalHatch)" }
      : {};

  return {
    key: `${fromId}-${toId}`,
    className: "line-diagram-svg__line",
    strokeWidth: `${strokeWidth}px`,
    x1: `${x}px`,
    x2: `${x}px`,
    y1: `${y1}px`,
    y2: `${y2}px`,
    ...strokeProp
  };
};

const Line = ({
  stopTree,
  fromId,
  toId,
  alerts
}: Props): ReactElement | null => {
  const fromCoords: StopCoord | null = useSelector(
    (state: CoordState) => state[fromId]
  );
  const toCoords: StopCoord | null = useSelector(
    (state: CoordState) => state[toId]
  );
  if (!fromCoords || !toCoords) return null;

  if (isMergeNode(stopTree, toId) && !isOnPrimaryBranch(stopTree, fromId))
    return null;

  return (
    <line
      {...lineProps(stopTree, fromId, toId, fromCoords, toCoords, alerts)}
    />
  );
};

const SimpleLine = ({
  fromId,
  toId,
  alerts
}: Omit<Props, "stopTree">): ReactElement | null => {
  const fromCoords: StopCoord | null = useSelector(
    (state: CoordState) => state[fromId]
  );
  const toCoords: StopCoord | null = useSelector(
    (state: CoordState) => state[toId]
  );
  if (!fromCoords || !toCoords) return null;

  const x = BASE_LINE_WIDTH + 1;
  const [, y1] = fromCoords;
  const [, y2] = toCoords;
  const strokeProp =
    hasAnActiveDiversion(fromId, alerts) && hasAnActiveDiversion(toId, alerts)
      ? { stroke: "url(#diagonalHatch)" }
      : {};
  return (
    <line
      className="line-diagram-svg__line"
      strokeWidth={`${BASE_LINE_WIDTH}px`}
      x1={`${x}px`}
      x2={`${x}px`}
      y1={`${y1}px`}
      y2={`${y2}px`}
      {...strokeProp}
    />
  );
};

export { Line, SimpleLine };
