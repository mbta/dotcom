import {
  isMergeStop,
  isOnBranchLine,
  hasBranchLines,
  areOnDifferentBranchLines,
  isBranchTerminusStop,
  lineDiagramIndexes,
  isStopOnMainLine,
  diagramWidth
} from "../line-diagram-helpers";
import { LineDiagramStop } from "../../__schedule";
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

it("isStopOnMainLine identifies stop", () => {
  expect(isStopOnMainLine(lineDiagramStopsOutward[1])).toBeTruthy();
});

it("diagramWidth computes width based on number of branches", () => {
  expect(diagramWidth(3)).toBeLessThan(diagramWidth(4));
});
