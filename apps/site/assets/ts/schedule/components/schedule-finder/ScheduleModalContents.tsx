import React, { ReactElement } from "react";
import { SimpleStop } from "../__schedule";
import { SelectedOrigin, SelectedDirection } from "../ScheduleFinder";
import RoutePill from "./RoutePill";
import StopNameLink from "./StopNameLink";
import { Route } from "../../../__v3api";

interface Props {
  selectedDirection: SelectedDirection;
  selectedOrigin: SelectedOrigin;
  route: Route;
  stops: SimpleStop[];
}

const ScheduleModalContents = ({
  route: {
    id: routeId,
    direction_destinations: directionDestinations,
    direction_names: directionNames,
    name: routeName,
    type: routeType
  },
  selectedDirection,
  selectedOrigin,
  stops
}: Props): ReactElement<HTMLElement> => (
  <>
    <div className="schedule-finder__modal-header">
      <RoutePill id={routeId} type={routeType} name={routeName} />
      <div>
        <div className="h3 u-small-caps" style={{ margin: 0 }}>
          {selectedDirection === null
            ? null
            : directionNames[selectedDirection]}
        </div>
        <h2 className="h2" style={{ margin: 0 }}>
          {selectedDirection === null
            ? null
            : directionDestinations[selectedDirection]}
        </h2>
      </div>
    </div>
    <div>
      from <StopNameLink selectedOrigin={selectedOrigin!} stops={stops} />
    </div>
  </>
);

export default ScheduleModalContents;
