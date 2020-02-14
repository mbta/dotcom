import React, { ReactElement } from "react";
import { times } from "lodash";
import ExpandableBlock from "../../../components/ExpandableBlock";
import { LineDiagramStop, RouteStop } from "../__schedule";
import { LiveDataByStop } from "./LineDiagram";
import SingleStop from "./SingleStop";

const ExpandableBranch = ({
  branchData,
  onStopClick,
  color,
  willMerge,
  liveDataByStop
}: {
  branchData: LineDiagramStop[];
  onStopClick: (stop: RouteStop) => void;
  color: string;
  willMerge?: boolean;
  liveDataByStop: LiveDataByStop;
}): ReactElement<HTMLElement> => (
  <div
    className={`m-schedule-diagram__expander ${
      willMerge ? "m-schedule-diagram__expander--merging" : ""
    }`}
  >
    <ExpandableBlock
      header={{
        iconSvgText: null,
        text: (
          <div
            className={`m-schedule-diagram__stop ${willMerge &&
              "m-schedule-diagram__stop--merging"}`}
          >
            <div
              className="m-schedule-diagram__lines m-schedule-diagram__lines--collapsed"
              style={{ color: `#${color}` }}
            >
              <>
                {times(branchData[0].stop_data.length - 1, index => (
                  <div key={index} className="m-schedule-diagram__line" />
                ))}
                <div className="m-schedule-diagram__line m-schedule-diagram__line--collapsed">
                  <div className="m-schedule-diagram__collapsed-icon">
                    <svg
                      viewBox="0 0 10 30"
                      preserveAspectRatio="xMidYMin slice"
                      width="100%"
                      height="30px"
                      className="m-schedule-diagram__line-stop"
                    >
                      <circle r="4" cy="10" cx="50%" />
                      <circle r="4" cy="20" cx="50%" />
                      <circle r="4" cy="30" cx="50%" />
                    </svg>
                  </div>
                </div>
              </>
            </div>
            <div className="m-schedule-diagram__content">
              <button
                className="btn btn-link m-schedule-diagram__toggle"
                type="button"
              >
                {branchData.length} stops
              </button>
            </div>
          </div>
        )
      }}
      initiallyExpanded={false}
      preventScroll
      id={`${branchData[0].route_stop.branch}`}
    >
      <>
        {branchData.map(branchStop => (
          <SingleStop
            key={branchStop.route_stop.id}
            stop={branchStop}
            onClick={onStopClick}
            color={color}
            liveData={liveDataByStop[branchStop.route_stop.id]}
          />
        ))}
      </>
    </ExpandableBlock>
  </div>
);

export default ExpandableBranch;
