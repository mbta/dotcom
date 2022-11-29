import {
  isBranchingNode,
  isEndNode,
  isMergeNode,
  isStartNode,
  longestPath,
  nextStopIds,
  previousStopIds,
  sliceForId,
  stopForId
} from "../../../helpers/stop-tree";
import { RouteStop, StopId, StopTree } from "../__schedule";
import { BRANCH_SPACING, BASE_LINE_WIDTH } from "./graphics/graphic-helpers";

export const diagramWidth = (maxBranches: number): number =>
  BASE_LINE_WIDTH + maxBranches * BRANCH_SPACING + BASE_LINE_WIDTH;

const isOnPrimaryPath = (stopTree: StopTree, stopId: StopId): boolean =>
  longestPath(stopTree).includes(stopId);

const stopBeforeMerging = (
  stopTree: StopTree,
  stopId: StopId
): StopId | undefined => {
  if (isEndNode(stopTree, stopId)) return undefined;
  // Making an assumption that branches never branch again
  const nextId = nextStopIds(stopTree, stopId)[0];
  if (isMergeNode(stopTree, nextId)) return stopId;
  return stopBeforeMerging(stopTree, nextId);
};

const stopAfterBranchingOff = (
  stopTree: StopTree,
  stopId: StopId
): StopId | undefined => {
  if (isStartNode(stopTree, stopId)) return undefined;
  // Making an assumption that branches never branch again
  const previousId = previousStopIds(stopTree, stopId)[0];
  if (isBranchingNode(stopTree, previousId)) return stopId;
  return stopAfterBranchingOff(stopTree, previousId);
};

const byBranch = (stopTree: StopTree) => (
  stopA: StopId,
  stopB: StopId
): number => {
  if (isOnPrimaryPath(stopTree, stopA)) return -1;
  if (isOnPrimaryPath(stopTree, stopB)) return +1;

  const routeA: RouteStop = stopForId(stopTree, stopA);
  const routeB: RouteStop = stopForId(stopTree, stopB);

  return (routeA.branch || "") < (routeB.branch || "") ? -1 : +1;
};

const slicePosition = (stopTree: StopTree, stopId: StopId): number => {
  const slice = sliceForId(stopTree, stopId)?.sort(byBranch(stopTree));
  return (slice?.findIndex(id => id === stopId) || 0) + 1;
};

const stopAdjacentToMerge = (
  stopTree: StopTree,
  stopId: StopId
): StopId | undefined =>
  stopBeforeMerging(stopTree, stopId) ||
  stopAfterBranchingOff(stopTree, stopId);

export const branchPosition = (stopTree: StopTree, stopId: StopId): number => {
  if (isOnPrimaryPath(stopTree, stopId)) return 1;

  const stop = stopAdjacentToMerge(stopTree, stopId);
  return stop ? slicePosition(stopTree, stop) : 1;
};
