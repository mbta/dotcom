import {
  isMergeStop,
  isOnBranchLine,
  hasBranchLines,
  areOnDifferentBranchLines,
  isBranchTerminusStop,
  lineDiagramIndexes,
  getTreeDirection,
  isStopOnMainLine,
  diagramWidth,
  branchPosition
} from "../line-diagram-helpers";
import { LineDiagramStop, RouteStop, StopTree } from "../../__schedule";
import outwardLineDiagram from "./lineDiagramData/outward.json"; // not a full line diagram
import { cloneDeep } from "lodash";
const lineDiagramStopsOutward = (outwardLineDiagram as unknown) as LineDiagramStop[];

it("isMergeStop identifies merge", () => {
  expect(isMergeStop(lineDiagramStopsOutward[2])).toBeTruthy();
});

it("isOnBranchLine identifies stop on branch", () => {
  expect(isOnBranchLine(lineDiagramStopsOutward[4])).toBeTruthy();
});

it("hasBranchLines identifies presence of branches", () => {
  expect(hasBranchLines(lineDiagramStopsOutward)).toBeTruthy();
});

it("areOnDifferentBranchLines identifies stops on different branches", () => {
  expect(
    areOnDifferentBranchLines(
      lineDiagramStopsOutward[1],
      lineDiagramStopsOutward[5]
    )
  ).toBeTruthy();
});

it("isBranchTerminusStop identifies end on branch", () => {
  expect(isBranchTerminusStop(lineDiagramStopsOutward[6])).toBeTruthy();
});

it("lineDiagramIndexes returns index locations meeting desired condition", () => {
  expect(
    lineDiagramIndexes(
      lineDiagramStopsOutward,
      stop => stop.route_stop["is_terminus?"]
    )
  ).toEqual([0, 6, 8, 12]);
});

it("getTreeDirection identifies direction of branching", () => {
  const inwardLineDiagram = cloneDeep(lineDiagramStopsOutward).reverse();
  expect(getTreeDirection(lineDiagramStopsOutward)).toBe("outward");
  expect(getTreeDirection(inwardLineDiagram)).toBe("inward");
});

it("isStopOnMainLine identifies stop", () => {
  expect(isStopOnMainLine(lineDiagramStopsOutward[1])).toBeTruthy();
});

it("diagramWidth computes width based on number of branches", () => {
  expect(diagramWidth(3)).toBeLessThan(diagramWidth(4));
});

describe("branchPosition", () => {
  /**
   *          a1 ---> a2
   *                        \
   *                         ˅
   *  b1 ---> b2 ---> b3 ---> m1 ---> m2
   *                                 ˄
   *                                /
   *                  c1 ---> c2
   */
  const stopTree: StopTree = {
    byId: {
      a1: { id: "a1", value: { id: "a1" } as RouteStop },
      a2: { id: "a2", value: { id: "a2", branch: "Green-D" } as RouteStop },
      b1: { id: "b1", value: { id: "b1" } as RouteStop },
      b2: { id: "b2", value: { id: "b2" } as RouteStop },
      b3: { id: "b3", value: { id: "b3" } as RouteStop },
      c1: { id: "c1", value: { id: "c1", branch: "Green-C" } as RouteStop },
      c2: { id: "c2", value: { id: "c2" } as RouteStop },
      m1: { id: "m1", value: { id: "m1" } as RouteStop },
      m2: { id: "m2", value: { id: "m2" } as RouteStop }
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
      m2: { next: [], previous: ["c2", "m1"] }
    },
    startingNodes: ["a1", "b1", "c1"]
  };

  test("returns 1 for stops on the primary path", () => {
    expect(branchPosition(stopTree, "b3")).toEqual(1);
  });

  test("sorts stops on branches bo the branch names", () => {
    expect(branchPosition(stopTree, "a2")).toEqual(3);
    expect(branchPosition(stopTree, "c1")).toEqual(2);
  });
});
