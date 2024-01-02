import { RouteStop, StopTree } from "../../schedule/components/__schedule";
import {
  edgesForId,
  hasBranches,
  isBranchingNode,
  isEndNode,
  isMergeNode,
  isStartNode,
  largestSliceSize,
  longestPath,
  longestPathLength,
  longestPathStartingId,
  newBranchesStartingInSlice,
  nextEdges,
  nextStopIds,
  nodeForId,
  nodeId,
  nodeValue,
  paths,
  previousEdges,
  previousStopIds,
  sliceForId,
  slices,
  sliceSizeForId,
  startingNodes,
  stopForId,
  stopIds,
  isEmptyTree
} from "../stop-tree";

const routeStopA: RouteStop = { id: "a" } as RouteStop;
const routeStopB: RouteStop = { id: "b" } as RouteStop;
const routeStopC: RouteStop = { id: "c" } as RouteStop;

/**
 *  a ---> b ---> c
 */
const simpleStopTree: StopTree = {
  byId: {
    a: { id: "a", value: routeStopA },
    b: { id: "b", value: routeStopB },
    c: { id: "c", value: routeStopC }
  },
  edges: {
    a: { next: ["b"], previous: [] },
    b: { next: ["c"], previous: ["a"] },
    c: { next: [], previous: ["b"] }
  },
  startingNodes: ["a"]
};

/**
 *          a1 ---> a2                          x1 ---> x2
 *                        \                    ˄
 *                         ˅                  /
 *  b1 ---> b2 ---> b3 ---> m1 ---> m2 ---> m3
 *                                 ˄          \
 *                                /            ˅
 *                  c1 ---> c2                  y1
 */
const branchingStopTree: StopTree = {
  byId: {
    a1: { id: "a1", value: { id: "a1" } as RouteStop },
    a2: { id: "a2", value: { id: "a2" } as RouteStop },
    b1: { id: "b1", value: { id: "b1" } as RouteStop },
    b2: { id: "b2", value: { id: "b2" } as RouteStop },
    b3: { id: "b3", value: { id: "b3" } as RouteStop },
    c1: { id: "c1", value: { id: "c1" } as RouteStop },
    c2: { id: "c2", value: { id: "c2" } as RouteStop },
    m1: { id: "m1", value: { id: "m1" } as RouteStop },
    m2: { id: "m2", value: { id: "m2" } as RouteStop },
    m3: { id: "m3", value: { id: "m3" } as RouteStop },
    x1: { id: "x1", value: { id: "x1" } as RouteStop },
    x2: { id: "x2", value: { id: "x2" } as RouteStop },
    y1: { id: "y1", value: { id: "y1" } as RouteStop }
  },
  edges: {
    a1: { next: ["a2"], previous: [] },
    a2: { next: ["m1"], previous: ["a1"] },
    b1: { next: ["b2"], previous: [] },
    b2: { next: ["b3"], previous: ["b1"] },
    b3: { next: ["m1"], previous: ["b2"] },
    c1: { next: ["c2"], previous: [] },
    c2: { next: ["m2"], previous: ["c1"] },
    m1: { next: ["m2"], previous: ["a2", "b3"] },
    m2: { next: ["m3"], previous: ["c2", "m1"] },
    m3: { next: ["x1", "y1"], previous: ["m2"] },
    x1: { next: ["x2"], previous: ["m3"] },
    x2: { next: [], previous: ["x1"] },
    y1: { next: [], previous: ["m3"] }
  },
  startingNodes: ["a1", "b1", "c1"]
};

const emptyStopTree: StopTree = {
  byId: {},
  edges: {},
  startingNodes: []
};

describe("nodeForId", () => {
  test("returns the node for the given id", () => {
    expect(nodeForId(simpleStopTree, "a")).toEqual({
      id: "a",
      value: routeStopA
    });
  });
});

describe("edgesForId", () => {
  test("returns the edges for the given ID", () => {
    expect(edgesForId(simpleStopTree, "b")).toEqual({
      next: ["c"],
      previous: ["a"]
    });
  });
});

describe("startingNodes", () => {
  test("returns the starting nodes for this StopTree", () => {
    expect(startingNodes(simpleStopTree)).toEqual(["a"]);
  });
});

describe("stopIds", () => {
  test("returns all stop IDs contained within the tree", () => {
    expect(stopIds(simpleStopTree)).toEqual(["a", "b", "c"]);
  });
});

describe("nextEdges", () => {
  test("returns the next edges", () => {
    expect(nextEdges({ next: ["c"], previous: ["a"] })).toEqual(["c"]);
  });
});

describe("previousEdges", () => {
  test("returns the next edges", () => {
    expect(previousEdges({ next: ["c"], previous: ["a"] })).toEqual(["a"]);
  });
});

describe("nodeId", () => {
  test("returns the node's ID", () => {
    expect(nodeId({ id: "a", value: routeStopA })).toEqual("a");
  });
});

describe("nodeValue", () => {
  test("returns the node's value", () => {
    expect(nodeValue({ id: "a", value: routeStopA })).toEqual(routeStopA);
  });
});

describe("stopForId", () => {
  test("returns the route stop for a given stop ID", () => {
    expect(stopForId(simpleStopTree, "a")).toEqual(routeStopA);
  });
});

describe("nextStopIds", () => {
  test("returns the next stop IDs for a given stop ID", () => {
    expect(nextStopIds(simpleStopTree, "b")).toEqual(["c"]);
  });
});

describe("previousStopIds", () => {
  test("returns the next stop IDs for a given stop ID", () => {
    expect(previousStopIds(simpleStopTree, "b")).toEqual(["a"]);
  });
});

describe("isStartNode", () => {
  test("returns whether or not this is the start node in a given path", () => {
    expect(isStartNode(simpleStopTree, "a")).toBeTruthy();
    expect(isStartNode(simpleStopTree, "c")).toBeFalsy();
  });
});

describe("isEndNode", () => {
  test("returns whether or not this is the end node in a given path", () => {
    expect(isEndNode(simpleStopTree, "c")).toBeTruthy();
    expect(isEndNode(simpleStopTree, "a")).toBeFalsy();
  });
});

describe("isMergeNode", () => {
  test("returns whether or not this stop is where multiple branches merge", () => {
    expect(isMergeNode(branchingStopTree, "m1")).toBeTruthy();
    expect(isMergeNode(branchingStopTree, "m3")).toBeFalsy();
  });
});

describe("isBranchingNode", () => {
  test("returns whether or not this stop is where multiple branches merge", () => {
    expect(isBranchingNode(branchingStopTree, "m3")).toBeTruthy();
    expect(isBranchingNode(branchingStopTree, "m1")).toBeFalsy();
  });
});

describe("paths", () => {
  test("returns every possible path through the tree", () => {
    expect(paths(branchingStopTree)).toEqual([
      ["a1", "a2", "m1", "m2", "m3", "x1", "x2"],
      ["a1", "a2", "m1", "m2", "m3", "y1"],
      ["b1", "b2", "b3", "m1", "m2", "m3", "x1", "x2"],
      ["b1", "b2", "b3", "m1", "m2", "m3", "y1"],
      ["c1", "c2", "m2", "m3", "x1", "x2"],
      ["c1", "c2", "m2", "m3", "y1"]
    ]);
  });
});

describe("longestPathLength", () => {
  test("returns the length of the longest path through the tree", () => {
    expect(longestPathLength(branchingStopTree)).toEqual(8);
  });
});

describe("longestPath", () => {
  test("returns the path with the longest length", () => {
    expect(longestPath(branchingStopTree)).toEqual([
      "b1",
      "b2",
      "b3",
      "m1",
      "m2",
      "m3",
      "x1",
      "x2"
    ]);
  });
});

describe("longestPathStartingId", () => {
  test("returns the starting StopId of the longest path", () => {
    expect(longestPathStartingId(branchingStopTree)).toEqual("b1");
  });
});

describe("slices", () => {
  test("returns an array of slices through the tree, where each slice is an array of StopIds", () => {
    expect(slices(branchingStopTree)).toEqual([
      ["b1"],
      ["b2", "a1"],
      ["b3", "a2", "c1"],
      ["m1", "c2"],
      ["m2"],
      ["m3"],
      ["x1", "y1"],
      ["x2"]
    ]);
  });
});

describe("largestSliceSize", () => {
  test("returns the size of the largest slice through the tree", () => {
    expect(largestSliceSize(branchingStopTree)).toEqual(3);
  });
});

describe("sliceForId", () => {
  test("returns the slice of the tree the given Stop ID is found in", () => {
    expect(sliceForId(branchingStopTree, "c2")).toEqual(["m1", "c2"]);
  });
});

describe("sliceSizeForId", () => {
  test("returns the size of theh slice of the tree the given Stop ID is found in", () => {
    expect(sliceSizeForId(branchingStopTree, "c2")).toEqual(2);
  });
});

describe("hasBranches", () => {
  test("returns whether or not the tree contains branches at either end", () => {
    expect(hasBranches(branchingStopTree)).toBeTruthy();
    expect(hasBranches(simpleStopTree)).toBeFalsy();
  });
});

describe("newBranchesStartingInSlice", () => {
  test("returns the stop ID for any incoming branches starting in the same slice as the given stop ID", () => {
    expect(newBranchesStartingInSlice(branchingStopTree, "b1")).toEqual([]);
    expect(newBranchesStartingInSlice(branchingStopTree, "b2")).toEqual(["a1"]);
    expect(newBranchesStartingInSlice(branchingStopTree, "b3")).toEqual(["c1"]);
  });
});

describe("isEmptyTree", () => {
  test("returns true for stop trees with empty data", () => {
    expect(isEmptyTree(emptyStopTree)).toBe(true);
    expect(isEmptyTree({ ...simpleStopTree, edges: {} })).toBe(true);
    expect(isEmptyTree({ ...simpleStopTree, byId: {} })).toBe(true);
    expect(isEmptyTree({ ...simpleStopTree, startingNodes: [] })).toBe(true);
  });

  test("returns false when tree has complete data", () => {
    expect(isEmptyTree(simpleStopTree)).toBe(false);
    expect(isEmptyTree(branchingStopTree)).toBe(false);
  });
});
