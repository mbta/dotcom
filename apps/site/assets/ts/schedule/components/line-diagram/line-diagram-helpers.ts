import { BranchDirection } from "./__line-diagram";
import { LineDiagramStop, RouteStop, StopId, StopTree } from "../__schedule";
import { BRANCH_SPACING, BASE_LINE_WIDTH } from "./graphics/graphic-helpers";
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

export const isMergeStop = (stop: LineDiagramStop): boolean =>
  stop.stop_data.some(sd => sd.type === "merge"); // always on branch

export const isOnBranchLine = (stop: LineDiagramStop): boolean =>
  stop.stop_data.length > 1 && !isMergeStop(stop); // merge stops show on main line, not branch line

export const hasBranchLines = (lineDiagram: LineDiagramStop[]): boolean =>
  lineDiagram.some(isOnBranchLine);

const isOnBranch = (stop: LineDiagramStop): boolean =>
  isOnBranchLine(stop) || !!stop.route_stop.branch;

export const areOnDifferentBranchLines = (
  from: LineDiagramStop,
  to: LineDiagramStop
): boolean =>
  !isMergeStop(from) &&
  !isMergeStop(to) &&
  from.stop_data.length !== to.stop_data.length &&
  from.route_stop.branch !== to.route_stop.branch;

const isTerminusStop = (stop: LineDiagramStop): boolean =>
  stop.route_stop["is_terminus?"];

export const isBranchTerminusStop = (stop: LineDiagramStop): boolean =>
  isOnBranch(stop) && isTerminusStop(stop);

export const lineDiagramIndexes = (
  lineDiagram: LineDiagramStop[],
  subsetFn: (stop: LineDiagramStop) => boolean
): number[] => {
  const subset = lineDiagram.filter(subsetFn);
  return subset.map(s => lineDiagram.indexOf(s));
};

export const getTreeDirection = (
  lineDiagram: LineDiagramStop[]
): BranchDirection => {
  // determines if tree should fan out or collect branches as we go down the page
  // use the position of the merge stop to find this. assume default of outward
  let direction: BranchDirection = "outward";
  if (lineDiagram.some(isMergeStop)) {
    const firstMergeIndex = lineDiagramIndexes(lineDiagram, isMergeStop)[0];
    const branchTerminiIndices = lineDiagramIndexes(
      lineDiagram,
      isBranchTerminusStop
    );
    // if there are more termini stops before the merge, then presume "inward" direction
    // where 2+ branches converge as you go down the list. and vice versa
    const terminiBeforeMerge = branchTerminiIndices.filter(
      i => i < firstMergeIndex
    );
    const terminiAfterMerge = branchTerminiIndices.filter(
      i => i > firstMergeIndex
    );
    direction =
      terminiBeforeMerge.length > terminiAfterMerge.length
        ? "inward"
        : "outward";
  }

  return direction;
};

// eslint-disable-next-line camelcase
export const isStopOnMainLine = ({ stop_data }: LineDiagramStop): boolean =>
  // eslint-disable-next-line camelcase
  stop_data[0].type === "stop" || stop_data[0].type === "terminus";

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
