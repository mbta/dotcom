import { find, toLower } from "lodash";
import React, { ReactElement } from "react";
import ExpandableBlock from "../../../../components/ExpandableBlock";
import {
  isInitialLoading,
  UseProviderStateWithoutInitialLoading
} from "../../../../helpers/use-provider";
import RouteIcon from "../../../../projects/components/RouteIcon";
import { DirectionId } from "../../../../__v3api";
import { SimpleStopMap } from "../../__schedule";
import { EnhancedJourney } from "../../__trips";
import SelectContainer from "../SelectContainer";

const findStopName = (
  stopId: string,
  directionId: DirectionId,
  stops: SimpleStopMap
): string => {
  const stopsInDirection = stops[directionId];
  const stop = find(stopsInDirection, stopData => {
    return stopData.id === stopId;
  });
  if (stop) {
    return stop.name;
  } else {
    return "";
  }
};

const getRouteNameFromJourney = (journey: EnhancedJourney): string => {
  return journey.route.name;
};

const DailyScheduleSubway = ({
  directionId,
  stops,
  stopId,
  routeId
}: {
  directionId: DirectionId;
  stops: SimpleStopMap;
  stopId: string;
  state: string;
  routeId: string;
}): ReactElement | null => {
  const originStopName = findStopName(stopId, directionId, stops);

  console.log(routeId);

  return (
    <div>
      {/* TODO fill with actual data */}
      <div className="u-highlight-gray m-n24">
        <div className="m-24">
          <div className="d-flex pt-10">
            {/* TODO figure out icon sizing */}
            <RouteIcon tag={toLower(routeId)} extraClasses={"me-12"} />
            <div className="fs-18 u-bold">{originStopName}</div>
          </div>
          <div className="fs-12 u-bold pb-10">To Ashmont/Braintree</div>
        </div>
      </div>
      <h3 className="pt-18">Daily Schedule</h3>
      <div className="pt-8">
        <SelectContainer>
          <select className="c-select-custom notranslate">
            {/* TODO add the today tag */}
            <option>Weekday</option>
            <option>Saturday</option>
            <option>Sunday</option>
            <option>Special Service</option>
          </select>
        </SelectContainer>
      </div>
      <div className="d-flex justify-content-space-between pt-8">
        <div
          style={{ maxWidth: "49%" }}
          className="flex-grow-1 u-highlight ps-16 pt-16 pb-16"
        >
          <div className="fs-14">First Train</div>
          <div className="fs-18 u-bold">5:45 am</div>
        </div>
        <div
          style={{ maxWidth: "49%" }}
          className="flex-grow-1 u-highlight ps-16 pt-16 pb-16"
        >
          <div className="fs-14">Last Train</div>
          <div className="fs-18 u-bold">10:45 pm</div>
        </div>
      </div>
      <div className="">
        <ExpandableBlock
          header={{ text: "Train Frequency", iconSvgText: null }}
          initiallyExpanded={false}
          id="train-frequency"
        >
          <div className="m-schedule-page__sidebar-hours">
            {/* TODO get actual content here */}
            Content
          </div>
        </ExpandableBlock>
      </div>
      <div className="d-flex pt-8 fs-18">
        <button className="btn btn-secondary flex-grow-1">
          Plan Your Trip
        </button>
      </div>
    </div>
  );
};

export default DailyScheduleSubway;
