import React from "react";
import { sortBy } from "lodash";
import { TooltipWrapper, modeIcon } from "../../../helpers/icon";
import { isABusRoute, isACommuterRailRoute } from "../../../models/route";
import { routeBgClass } from "../../../helpers/css";
import { Route } from "../../../__v3api";

const filteredConnections = (connections: Route[]): Route[] => {
  const firstCRIndex = connections.findIndex(
    connection => connection.type === 2
  );
  const firstFerryIndex = connections.findIndex(
    connection => connection.type === 4
  );

  // show only 1 CR or Ferry icon
  const consolidated = connections.filter(
    (connection, index) =>
      (connection.type !== 2 && connection.type !== 4) ||
      (connection.type === 2 && index === firstCRIndex) ||
      (connection.type === 4 && index === firstFerryIndex)
  );

  // sort by type (CR or Ferry icon first), then sort_order
  return sortBy(consolidated, [
    ({ type }) => ([2, 4].includes(type) ? -1 : 0),
    "sort_order"
  ]);
};

const connectionName = (connection: Route): string => {
  if (isABusRoute(connection)) {
    return connection.name.startsWith("SL")
      ? `Silver Line ${connection.name}`
      : `Route ${connection.name}`;
  }

  if (isACommuterRailRoute(connection)) {
    return "Commuter Rail";
  }

  return connection.name;
};

const StopConnections = ({
  connections
}: {
  connections: Route[];
}): JSX.Element => (
  <div className="m-schedule-diagram__connections">
    {filteredConnections(connections).map((connectingRoute: Route) => (
      <TooltipWrapper
        key={connectingRoute.id}
        href={`/schedules/${connectingRoute.id}/line`}
        tooltipText={connectionName(connectingRoute)}
        tooltipOptions={{
          placement: "bottom",
          animation: false
        }}
      >
        {isABusRoute(connectingRoute) ? (
          <span
            key={connectingRoute.id}
            className={`c-icon__bus-pill--small m-schedule-diagram__connection ${routeBgClass(
              connectingRoute
            )}`}
          >
            {connectingRoute.name}
          </span>
        ) : (
          <span
            key={connectingRoute.id}
            className="m-schedule-diagram__connection"
          >
            {modeIcon(connectingRoute.id)}
          </span>
        )}
      </TooltipWrapper>
    ))}
  </div>
);

export { filteredConnections, StopConnections as default };
