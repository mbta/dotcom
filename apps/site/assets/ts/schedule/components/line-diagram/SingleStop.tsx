import React, { ReactElement } from "react";
import { LineDiagramStop, RouteStop, RouteStopRoute } from "../__schedule";
import {
  alertIcon,
  TooltipWrapper,
  modeIcon,
  parkingIcon,
  accessibleIcon
} from "../../../helpers/icon";
import { Alert, Route } from "../../../__v3api";
import { LiveData } from "./LineDiagram";
import StopPredictions from "./StopPredictions";
import VehicleIcons from "./VehicleIcons";
import MatchHighlight from "../../../components/MatchHighlight";

interface Props {
  stop: LineDiagramStop;
  onClick: (stop: RouteStop) => void;
  color: string;
  liveData?: LiveData;
  searchQuery?: string;
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

const busBackgroundClass = (connection: Route): string =>
  connection.name.startsWith("SL") ? "u-bg--silver-line" : "u-bg--bus";

const connectionName = (connection: Route): string => {
  if (connection.type === 3) {
    return connection.name.startsWith("SL")
      ? `Silver Line ${connection.name}`
      : `Route ${connection.name}`;
  }

  if (connection.type === 2) {
    return "Commuter Rail";
  }

  return connection.name;
};

const StopConnections = (connections: RouteStopRoute[]): JSX.Element => (
  <div className="m-schedule-diagram__connections">
    {connections.map((connectingRoute: Route) => (
      <TooltipWrapper
        key={connectingRoute.id}
        href={`/schedules/${connectingRoute.id}/line`}
        tooltipText={connectionName(connectingRoute)}
        tooltipOptions={{
          placement: "bottom",
          animation: "false"
        }}
      >
        {connectingRoute.type === 3 ? (
          <span
            key={connectingRoute.id}
            className={`c-icon__bus-pill--small m-schedule-diagram__connection ${busBackgroundClass(
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

const MaybeAlert = (alerts: Alert[]): ReactElement<HTMLElement> | null => {
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

const StopFeatures = (routeStop: RouteStop): JSX.Element => (
  <div className="m-schedule-diagram__features">
    {routeStop.stop_features.includes("parking_lot") ? (
      <TooltipWrapper
        tooltipText="Parking"
        tooltipOptions={{ placement: "bottom" }}
      >
        {parkingIcon(
          "c-svg__icon-parking-default m-schedule-diagram__feature-icon"
        )}
      </TooltipWrapper>
    ) : null}
    {routeStop.stop_features.includes("access") ? (
      <TooltipWrapper
        tooltipText="Accessible"
        tooltipOptions={{ placement: "bottom" }}
      >
        {accessibleIcon(
          "c-svg__icon-acessible-default m-schedule-diagram__feature-icon"
        )}
      </TooltipWrapper>
    ) : null}
    {routeStop.zone && routeStop.route && routeStop.route.type === 2 && (
      <span className="c-icon__cr-zone m-schedule-diagram__feature-icon">{`Zone ${
        routeStop.zone
      }`}</span>
    )}
  </div>
);

const StopBranchLabel = (stop: RouteStop): JSX.Element | null =>
  stop["is_terminus?"] && !!stop.branch && !!stop.route ? (
    <div className="u-bold u-small-caps">
      {stop.route.id.startsWith("Green")
        ? `Green Line ${stop.route.id.split("-")[1]}`
        : stop.name}
      {stop.route.type === 2 ? " Line" : " Branch"}
    </div>
  ) : null;

const StopGraphic = (isOrigin = false, isTerminus = false): JSX.Element => (
  <svg
    viewBox="0 10 10 10"
    preserveAspectRatio="xMidYMin slice"
    width="100%"
    height="10px"
    className="m-schedule-diagram__line-stop"
  >
    {/* hardcoded cy position will be shown in IE, otherwise overwritten by CSS */}
    <circle
      r={isTerminus ? "5" : "4"}
      cx="50%"
      cy={isOrigin && isTerminus ? "3px" : "32px"}
    />
  </svg>
);

const SingleStop = ({
  stop,
  onClick,
  color,
  liveData,
  searchQuery
}: Props): ReactElement<HTMLElement> | null => {
  const {
    stop_data: stopData,
    route_stop: routeStop,
    alerts: stopAlerts,
    route_stop: { "is_beginning?": isOrigin, "is_terminus?": isTerminus }
  } = stop;

  const isDestination = !isOrigin && isTerminus;

  let stopClassNames = "m-schedule-diagram__stop";
  if (isOrigin) {
    stopClassNames += " m-schedule-diagram__stop--origin";
  }
  if (isDestination) {
    stopClassNames += " m-schedule-diagram__stop--destination";
  }
  if (isTerminus) {
    stopClassNames += " m-schedule-diagram__stop--terminus";
  }

  let vehicleIcons = <></>;
  if (liveData) {
    vehicleIcons = (
      <VehicleIcons
        routeType={routeStop.route ? routeStop.route.type : null}
        stopName={routeStop.name}
        vehicles={liveData.vehicles}
      />
    );
  }

  return (
    <div className={stopClassNames}>
      <div style={{ color: `#${color}` }} className="m-schedule-diagram__lines">
        {stopData.some(sd => sd.type === "merge") ? (
          <div className="m-schedule-diagram__line m-schedule-diagram__line--stop">
            {StopGraphic()}
            {vehicleIcons}
          </div>
        ) : (
          stopData.map((sd, sdIndex) => (
            <div
              key={`${sd.type}-${sd.branch}`}
              className={`m-schedule-diagram__line m-schedule-diagram__line--${
                sd.type
              }`}
            >
              {sdIndex > 0
                ? sdIndex + 1 === stopData.length &&
                  StopGraphic(isOrigin, sd.type === "terminus")
                : sd.type !== "line" &&
                  StopGraphic(isOrigin, sd.type === "terminus")}

              {sdIndex + 1 === stopData.length && vehicleIcons}
            </div>
          ))
        )}
      </div>

      <div className="m-schedule-diagram__stop-content">
        {StopBranchLabel(routeStop)}
        <div className="m-schedule-diagram__stop-heading">
          <div className="m-schedule-diagram__stop-name">
            <a href={`/stops/${routeStop.id}`}>
              <h4>
                {MaybeAlert(stopAlerts)}
                <MatchHighlight
                  text={routeStop.name}
                  matchQuery={searchQuery}
                />
              </h4>
            </a>
          </div>
          {StopFeatures(routeStop)}
        </div>

        <div className="m-schedule-diagram__stop-details">
          {StopConnections(filteredConnections(routeStop.connections))}
          {!isDestination && liveData && (
            <StopPredictions
              headsigns={liveData.headsigns}
              isCommuterRail={!!routeStop.route && routeStop.route.type === 2}
            />
          )}
        </div>

        {!isDestination && (
          <div className="m-schedule-diagram__footer">
            <button
              className="btn btn-link"
              type="button"
              onClick={() => onClick(routeStop)}
            >
              View schedule
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleStop;
