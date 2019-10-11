import React, { ReactElement } from "react";
import { LineDiagramStop, StopData } from "./__schedule";
import { modeIcon, accessibleIcon, parkingIcon } from "../../helpers/icon";
import { Alert, Route } from "../../__v3api";

interface Props {
  lineDiagram: LineDiagramStop[];
}

const maybeTerminus = (stopData: StopData[]): StopData | undefined =>
  stopData.find((stop: StopData) => stop.type === "terminus");

const LineDiagram = ({
  lineDiagram
}: Props): ReactElement<HTMLElement> | null => (
  <>
    {lineDiagram.map(
      ({
        route_stop: routeStop,
        stop_data: stopData,
        alerts: stopAlerts
      }: LineDiagramStop) => (
        <div key={routeStop.id} className="m-schedule-line-diagram__stop">
          <div className="m-schedule-line-diagram__card-left">
            <div className="m-schedule-line-diagram__stop-name">
              {routeStop.name}
            </div>
            <div>
              {maybeTerminus(stopData) && maybeTerminus(stopData)!.branch}
            </div>
            <div className="m-schedule-line-diagram__connections">
              {routeStop.connections.map((route: Route) =>
                route.type === 3 && !route.name.startsWith("SL") ? (
                  <span
                    key={route.id}
                    className="c-icon__bus-pill m-schedule-line-diagram__connection u-bg--bus"
                  >
                    {route.name}
                  </span>
                ) : (
                  <span key={route.id}>{modeIcon(route.id)}</span>
                )
              )}
            </div>
          </div>
          <div>
            <div className="m-schedule-line-diagram__features">
              {routeStop.stop_features.includes("parking_lot")
                ? parkingIcon("c-svg__icon-parking-default")
                : null}
              {routeStop.stop_features.includes("access")
                ? accessibleIcon("c-svg__icon-acessible-default")
                : null}
              {routeStop.zone && (
                <span className="c-icon__cr-zone">{`Zone ${
                  routeStop.zone
                }`}</span>
              )}
            </div>
            <div>
              {stopData.map((stop: StopData) => (
                <div>
                  {stop.branch ? `${stop.branch}, ` : ""}
                  {stop.type}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    )}
  </>
);

export default LineDiagram;
