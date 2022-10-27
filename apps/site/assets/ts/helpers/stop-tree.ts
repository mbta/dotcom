import {
  RouteStop,
  StopId,
  StopTree,
  StopTreeEdges,
  StopTreeNode,
  StopTreePath,
  StopTreeSlice
} from "../schedule/components/__schedule";

export const nodeForId = (stopTree: StopTree, id: StopId): StopTreeNode =>
  stopTree.byId[id];
export const edgesForId = (stopTree: StopTree, id: StopId): StopTreeEdges =>
  stopTree.edges[id];
export const startingNodes = (stopTree: StopTree): StopId[] =>
  stopTree.startingNodes;

export const stopIds = (stopTree: StopTree): StopId[] =>
  Object.keys(stopTree.byId);

export const nodeId = (node: StopTreeNode): StopId => node.id;
export const nodeValue = (node: StopTreeNode): RouteStop => node.value;

export const nextEdges = (edges: StopTreeEdges): StopId[] => edges.next;
export const previousEdges = (edges: StopTreeEdges): StopId[] => edges.previous;

export const stopForId = (stopTree: StopTree, id: StopId): RouteStop =>
  nodeValue(nodeForId(stopTree, id));

export const nextStopIds = (stopTree: StopTree, id: StopId): StopId[] =>
  nextEdges(edgesForId(stopTree, id));
export const previousStopIds = (stopTree: StopTree, id: StopId): StopId[] =>
  previousEdges(edgesForId(stopTree, id));

export const isStartNode = (stopTree: StopTree, id: StopId): boolean =>
  startingNodes(stopTree).includes(id);
export const isEndNode = (stopTree: StopTree, id: StopId): boolean =>
  nextStopIds(stopTree, id).length === 0;

export const isMergeNode = (stopTree: StopTree, id: StopId): boolean =>
  previousStopIds(stopTree, id).length > 1;
export const isBranchingNode = (stopTree: StopTree, id: StopId): boolean =>
  nextStopIds(stopTree, id).length > 1;

const appendStopId = (ids: StopTreePath, id: StopId): StopTreePath => [
  id,
  ...ids
];

const pathsFrom = (stopTree: StopTree, id: StopId): StopTreePath[] => {
  if (isEndNode(stopTree, id)) return [[id]];

  return nextStopIds(stopTree, id).flatMap((nextId: StopId) =>
    pathsFrom(stopTree, nextId).map(ids => appendStopId(ids, id))
  );
};

export const paths = (stopTree: StopTree): StopTreePath[] =>
  startingNodes(stopTree).flatMap(id => pathsFrom(stopTree, id));

const pathLength = (stops: StopTreePath): number => stops.length;

export const longestPathLength = (stopTree: StopTree): number =>
  Math.max(...paths(stopTree).map(pathLength));

export const longestPath = (stopTree: StopTree): StopTreePath => {
  const longestLength = longestPathLength(stopTree);
  return paths(stopTree).find(path => pathLength(path) === longestLength) || [];
};
export const longestPathStartingId = (stopTree: StopTree): StopId =>
  longestPath(stopTree)[0];

export const slices = (stopTree: StopTree): StopTreeSlice[] => {
  const len = longestPathLength(stopTree);
  if (len < 1) return [[]];

  const sliceSets: Set<StopId>[] = [...Array(len)].map(() => new Set());

  const recordIdPositionsMovingForward = (id: StopId, index: number): void => {
    sliceSets[index].add(id);
    nextStopIds(stopTree, id).forEach(nextId =>
      recordIdPositionsMovingForward(nextId, index + 1)
    );
  };
  const recordIdPositionsMovingBackward = (id: StopId, index: number): void => {
    sliceSets[index].add(id);
    previousStopIds(stopTree, id).forEach(previousId =>
      recordIdPositionsMovingBackward(previousId, index - 1)
    );
  };
  const recordIdPositions = (id: StopId, index: number): void => {
    recordIdPositionsMovingForward(id, index);
    recordIdPositionsMovingBackward(id, index);
  };

  longestPath(stopTree).forEach(recordIdPositions);

  return sliceSets.map(set => Array.from(set));
};

const sliceSize = (slice: StopTreeSlice): number => slice.length;

export const largestSliceSize = (stopTree: StopTree): number =>
  Math.max(...slices(stopTree).map(sliceSize));

export const sliceForId = (
  stopTree: StopTree,
  id: StopId
): StopTreeSlice | undefined =>
  slices(stopTree).find(slice => slice.includes(id));

export const sliceSizeForId = (
  stopTree: StopTree,
  id: StopId
): number | undefined => {
  const slice = sliceForId(stopTree, id);
  return slice && sliceSize(slice);
};

export const hasBranches = (stopTree: StopTree): boolean =>
  slices(stopTree).some(slice => sliceSize(slice) > 1);

export const newBranchesStartingInSlice = (
  stopTree: StopTree,
  stopId: StopId
): StopId[] =>
  (sliceForId(stopTree, stopId) || []).filter(
    id => id !== stopId && isStartNode(stopTree, id)
  );
