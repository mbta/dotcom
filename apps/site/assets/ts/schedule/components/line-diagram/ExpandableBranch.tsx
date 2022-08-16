import { max, times } from "lodash";
import React, { ReactElement, useState, useContext } from "react";
import ExpandableBlock from "../../../components/ExpandableBlock";
import { LineDiagramStop } from "../__schedule";
import { CommonLineDiagramProps } from "./__line-diagram";
import { StopRefContext } from "./LineDiagramWithStops";
import { diagramWidth } from "./line-diagram-helpers";
import {
  CIRC_DIAMETER,
  CIRC_RADIUS,
  BRANCH_LINE_WIDTH
} from "./graphics/graphic-helpers";
import { routeToModeName } from "../../../helpers/css";
import StopCard from "./StopCard";

const BranchToggle = (
  stops: LineDiagramStop[],
  isExpanded: boolean
): JSX.Element => {
  const maxBranches = max(stops.map(ld => ld.stop_data.length - 1)) || 1;
  const width = diagramWidth(maxBranches) + 2;
  return (
    <div className="m-schedule-diagram__expander-header">
      <div style={{ width }}>
        {!isExpanded && (
          <svg
            className={`line-diagram-svg__toggle ${routeToModeName(
              stops[0].route_stop.route!
            )}`}
            width={width}
            height="100%"
          >
            <g
              transform={`translate(${maxBranches * BRANCH_LINE_WIDTH - 1}, 1)`}
            >
              <rect width={CIRC_DIAMETER * 2} height="42" rx={CIRC_DIAMETER} />
              {times(3, i => (
                <circle
                  key={i}
                  cx={CIRC_DIAMETER}
                  cy={10 * (i + 1) + 1}
                  r={CIRC_RADIUS}
                />
              ))}
            </g>
          </svg>
        )}
      </div>
      <button className="btn btn-link m-schedule-diagram__toggle" type="button">
        {stops.length} stops
      </button>
    </div>
  );
};

const ExpandableBranch = (
  props: CommonLineDiagramProps
): ReactElement<HTMLElement> => {
  const { stops, handleStopClick, liveData } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const updateAllStopCoords = useContext(StopRefContext)[1];

  // reset all the coordinates.
  React.useEffect(() => {
    updateAllStopCoords();
  }, [isExpanded, updateAllStopCoords]);

  return (
    <div className="m-schedule-diagram__expander">
      <ExpandableBlock
        header={{
          iconSvgText: null,
          text: BranchToggle(stops, isExpanded)
        }}
        initiallyExpanded={isExpanded}
        notifyExpanded={(blockIsExpanded: boolean) => {
          setIsExpanded(blockIsExpanded);
        }}
        preventScroll
        id={`${stops[0].route_stop.branch}`}
      >
        <>
          {stops.map(stop => (
            <StopCard
              key={stop.route_stop.id}
              stop={stop}
              onClick={handleStopClick}
              liveData={liveData ? liveData[stop.route_stop.id] : undefined}
            />
          ))}
        </>
      </ExpandableBlock>
    </div>
  );
};

export default ExpandableBranch;
