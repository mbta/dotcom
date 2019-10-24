import React, { ReactElement, useReducer, useEffect } from "react";
import { SelectedDirection, SelectedOrigin } from "../ScheduleFinder";
import { Route, RouteType, ServiceWithServiceDate } from "../../../__v3api";
import { SimpleStop, RoutePatternsByDirection } from "../__schedule";
import isSilverLine from "../../../helpers/silver-line";
import ServiceSelector from "./ServiceSelector";
import { breakTextAtSlash } from "../../../helpers/text";

const stopInfo = (
  selectedOrigin: string,
  stops: SimpleStop[]
): SimpleStop | undefined => stops.find(({ id }) => id === selectedOrigin);

const stopNameLink = (
  selectedOrigin: string,
  stops: SimpleStop[]
): ReactElement<HTMLElement> | null => {
  const stop = stopInfo(selectedOrigin, stops);
  return <a href={`/stops/${stop!.id}`}>{stop!.name}</a>;
};

const routePill = (
  id: string,
  type: RouteType,
  name: string
): ReactElement<HTMLElement> | null =>
  type === 3 ? (
    <div className="m-route-pills">
      <div
        className={`h1 schedule-finder__modal-route-pill u-bg--${
          isSilverLine(id) ? "silver-line" : "bus"
        }`}
      >
        {name}
      </div>
    </div>
  ) : null;

interface Props {
  route: Route;
  selectedDirection: SelectedDirection;
  selectedOrigin: SelectedOrigin;
  services: ServiceWithServiceDate[];
  stops: SimpleStop[];
  routePatternsByDirection: RoutePatternsByDirection;
}

const ScheduleModalContent = ({
  route: {
    id: routeId,
    type: routeType,
    name: routeName,
    direction_names: directionNames,
    direction_destinations: directionDestinations
  },
  selectedDirection,
  selectedOrigin,
  services,
  stops,
  routePatternsByDirection
}: Props): ReactElement<HTMLElement> | null => {
  if (selectedOrigin === null || selectedDirection === null) {
    return null;
  }
  const destination = directionDestinations[selectedDirection];
  return (
    <>
      <div className="schedule-finder__modal-header">
        {routePill(routeId, routeType, routeName)}
        <div>
          <div className="h3 u-small-caps" style={{ margin: 0 }}>
            {" "}
            {directionNames[selectedDirection]}
          </div>
          <h2 className="h2" style={{ margin: 0 }}>
            {breakTextAtSlash(destination)}
          </h2>
        </div>
      </div>
      <div>from {stopNameLink(selectedOrigin, stops)}</div>
      <ServiceSelector
        stopId={selectedOrigin}
        services={services}
        routeId={routeId}
        directionId={selectedDirection}
        routePatterns={routePatternsByDirection[selectedDirection]}
      />
    </>
  );
};

export default ScheduleModalContent;
