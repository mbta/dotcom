import { isArray, last } from "lodash";
import React from "react";
import StopCard from "./StopCard";
import ExpandableBranch from "./ExpandableBranch";
import { CommonLineDiagramProps } from "./__line-diagram";
import { LineDiagramStop } from "../__schedule";
import { lineDiagramIndexes, isOnBranchLine } from "./line-diagram-helpers";

// build branched diagram structure
const buildBranchedLineDiagram = (
  lineDiagram: LineDiagramStop[]
): (LineDiagramStop | LineDiagramStop[])[] => {
  const branchedDiagram: (LineDiagramStop | LineDiagramStop[])[] = [];
  // determine if the diagram will collect branches ("inward")
  // or split into branches ("outward") going down the page
  // const direction = getTreeDirection(lineDiagram);

  // identify where in the list to branch out or in, e.g.
  // [stop, stop, stop, stop, stop, #, stop, stop]
  // # = on an "inward" direction tree, join the branch to the main line
  // [stop, stop, ^, stop, stop, stop, stop, stop]
  // ^ = on an "outward" direction tree, split the branch from the main line
  const toggledStopIndices = lineDiagramIndexes(
    lineDiagram,
    (stop: LineDiagramStop): boolean =>
      isOnBranchLine(stop) && last(stop.stop_data)!.type === "stop"
  );

  // iterate through the list, constructing branches as needed
  // branches will be grouped together, e.g.:
  // [stop, stop, [stop#, stop, stop], stop, stop]
  // # = branch terminus for a tree with "inward" direction
  // [stop, stop, [stop, stop, stop^], stop, stop]
  // ^ = branch terminus for a tree with "outward" direction
  lineDiagram.forEach((ld, i) => {
    if (toggledStopIndices.includes(i)) {
      // either place on branch or initialize new branch
      if (isArray(last(branchedDiagram))) {
        (last(branchedDiagram) as LineDiagramStop[]).push(ld);
      } else {
        branchedDiagram.push([ld]);
      }
    } else {
      branchedDiagram.push(ld);
    }
  });

  return branchedDiagram;
};

export const Branch = (props: CommonLineDiagramProps): React.ReactElement => {
  const { stops, handleStopClick, liveData } = props;
  return (
    <li>
      {stops.length > 2 ? (
        <ExpandableBranch key={`${stops[0].route_stop.id}-branch`} {...props} />
      ) : (
        <ol>
          {stops.map(stop => (
            <StopCard
              key={stop.route_stop.id}
              stop={stop}
              onClick={handleStopClick}
              liveData={liveData ? liveData[stop.route_stop.id] : undefined}
            />
          ))}
        </ol>
      )}
    </li>
  );
};

const StopListWithBranches = (
  props: CommonLineDiagramProps
): React.ReactElement => {
  const { stops, ...other } = props;
  const lineDiagramWithBranches = buildBranchedLineDiagram(stops);
  return (
    <ol>
      {lineDiagramWithBranches.map(stopOrStops => {
        if (isArray(stopOrStops)) {
          return (
            <Branch
              key={stopOrStops[0].route_stop.id}
              stops={stopOrStops}
              {...other}
            />
          );
        }

        // it's a stop, just render it
        return (
          <StopCard
            key={stopOrStops.route_stop.id}
            stop={stopOrStops}
            onClick={props.handleStopClick}
            liveData={
              props.liveData
                ? props.liveData[stopOrStops.route_stop.id]
                : undefined
            }
          />
        );
      })}
    </ol>
  );
};

export default StopListWithBranches;
