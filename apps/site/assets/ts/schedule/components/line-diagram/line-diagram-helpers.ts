import { LineDiagramStop } from "../__schedule";
import { BRANCH_SPACING, BASE_LINE_WIDTH } from "./graphics/graphic-helpers";

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

// eslint-disable-next-line camelcase
export const isStopOnMainLine = ({ stop_data }: LineDiagramStop): boolean =>
  // eslint-disable-next-line camelcase
  stop_data[0].type === "stop" || stop_data[0].type === "terminus";

export const diagramWidth = (maxBranches: number): number =>
  BASE_LINE_WIDTH + maxBranches * BRANCH_SPACING + BASE_LINE_WIDTH;
