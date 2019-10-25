import React, { ReactElement } from "react";
import { LineDiagramStop, RouteStopRoute } from "./__schedule";
import {
  alertIcon,
  modeIcon,
  accessibleIcon,
  parkingIcon
} from "../../helpers/icon";
import { Alert, Route } from "../../__v3api";

interface Props {
  lineDiagram: LineDiagramStop[];
}

const filteredConnections = (
  connections: RouteStopRoute[]
): RouteStopRoute[] => {
  const firstCRIndex = connections.findIndex(
    connection => connection.type === 2
  );
  const firstFerryIndex = connections.findIndex(
    connection => connection.type === 4
  );

  return connections.filter(
    (connection, index) =>
      (connection.type !== 2 && connection.type !== 4) ||
      (connection.type === 2 && index === firstCRIndex) ||
      (connection.type === 4 && index === firstFerryIndex)
  );
};

const maybeAlert = (alerts: Alert[]): ReactElement<HTMLElement> | null => {
  const highPriorityAlerts = alerts.filter(alert => alert.priority === "high");
  if (highPriorityAlerts.length === 0) return null;
  return (
    <>
      {alertIcon("c-svg__icon-alerts-triangle")}
      <span className="sr-only">Service alert or delay</span>
      &nbsp;
    </>
  );
};

const busBackgroundClass = (connection: Route): string =>
  connection.name.startsWith("SL") ? "u-bg--silver-line" : "u-bg--bus";

const LineDiagram = ({
  lineDiagram
}: Props): ReactElement<HTMLElement> | null => {
  const routeType = lineDiagram[0].route_stop.route!.type;

  return(
    <>
      <h3>
        {routeType === 0 || routeType === 1 || routeType === 2 ?
          "Stations" :
          "Stops"
        }
      </h3>
      {lineDiagram.map(
        ({ route_stop: routeStop, alerts: stopAlerts }: LineDiagramStop) => (
          <div key={routeStop.id} className="m-schedule-line-diagram__stop">
            <div className="m-schedule-line-diagram__card-left">
              <div className="m-schedule-line-diagram__stop-name">
                {maybeAlert(stopAlerts)}
                <a href={`/stops/${routeStop.id}`}><h4>{routeStop.name}</h4></a>
              </div>
              <div className="m-schedule-line-diagram__connections">
                {filteredConnections(routeStop.connections).map((route: Route) =>
                  route.type === 3 ? (
                    <a href={`/schedules/${route.id}/line`}>
                      <span
                        key={route.id}
                        className={`c-icon__bus-pill--small m-schedule-line-diagram__connection ${busBackgroundClass(
                          route
                        )}`}
                      >
                        {route.name}
                      </span>
                    </a>
                  ) : (
                    <a href={`/schedules/${route.id}/line`}>
                      <span
                        key={route.id}
                        className="m-schedule-line-diagram__connection"
                      >
                        {modeIcon(route.id)}
                      </span>
                    </a>
                  )
                )}
              </div>
            </div>
            <div>
              <div className="m-schedule-line-diagram__features">
                {routeStop.stop_features.includes("parking_lot")
                  ? parkingIcon(
                      "c-svg__icon-parking-default m-schedule-line-diagram__feature-icon"
                    )
                  : null}
                {routeStop.stop_features.includes("access")
                  ? accessibleIcon(
                      "c-svg__icon-acessible-default m-schedule-line-diagram__feature-icon"
                    )
                  : null}
                {routeStop.route!.type === 2 && routeStop.zone && (
                  <span className="c-icon__cr-zone m-schedule-line-diagram__feature-icon">{`Zone ${
                    routeStop.zone
                  }`}</span>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </>
  )
}

export default LineDiagram;
