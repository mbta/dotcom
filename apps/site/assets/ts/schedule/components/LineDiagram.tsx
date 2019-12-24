import React, { ReactElement, useState } from "react";
import {
  LineDiagramStop,
  RouteStopRoute,
  RoutePatternsByDirection,
  SimpleStopMap,
  RouteStop
} from "./__schedule";
import Modal from "../../components/Modal";
import ScheduleModalContent from "./schedule-finder/ScheduleModalContent";
import {
  alertIcon,
  modeIcon,
  accessibleIcon,
  parkingIcon,
  TooltipWrapper
} from "../../helpers/icon";
import {
  Alert,
  Route,
  DirectionId,
  ServiceWithServiceDate
} from "../../__v3api";

interface Props {
  lineDiagram: LineDiagramStop[];
  route: Route;
  directionId: DirectionId;
  routePatternsByDirection: RoutePatternsByDirection;
  services: ServiceWithServiceDate[];
  ratingEndDate: string;
  stops: SimpleStopMap;
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

const LineDiagram = ({
  lineDiagram,
  route,
  directionId,
  routePatternsByDirection,
  services,
  ratingEndDate,
  stops
}: Props): ReactElement<HTMLElement> | null => {
  const routeType = route.type;
  const [modalState, setModalState] = useState<{
    selectedOrigin: RouteStop;
    modalOpen: boolean;
  }>({
    selectedOrigin: lineDiagram[0].route_stop,
    modalOpen: false
  });

  return (
    <>
      <h3>
        {routeType === 0 || routeType === 1 || routeType === 2
          ? "Stations"
          : "Stops"}
      </h3>
      {lineDiagram.map(
        ({ route_stop: routeStop, alerts: stopAlerts }: LineDiagramStop) => (
          <div key={routeStop.id} className="m-schedule-line-diagram__stop">
            <div
              style={{ color: `#${route.color}` }}
              className="m-schedule-line-diagram__line"
            >
              <svg>
                <g transform="translate(0 -4)">
                  <circle cx="5" cy="5" r="4" strokeWidth="2" />
                </g>
              </svg>
            </div>
            <div className="m-schedule-line-diagram__card">
              <div className="m-schedule-line-diagram__card-left">
                <div className="m-schedule-line-diagram__stop-name">
                  {maybeAlert(stopAlerts)}
                  <a href={`/stops/${routeStop.id}`}>
                    <h4>{routeStop.name}</h4>
                  </a>
                </div>
                <div className="m-schedule-line-diagram__connections">
                  {filteredConnections(routeStop.connections).map(
                    (connectingRoute: Route) => (
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
                            className={`c-icon__bus-pill--small m-schedule-line-diagram__connection ${busBackgroundClass(
                              connectingRoute
                            )}`}
                          >
                            {connectingRoute.name}
                          </span>
                        ) : (
                          <span
                            key={connectingRoute.id}
                            className="m-schedule-line-diagram__connection"
                          >
                            {modeIcon(connectingRoute.id)}
                          </span>
                        )}
                      </TooltipWrapper>
                    )
                  )}
                </div>
              </div>
              <div className="m-schedule-line-diagram__features">
                {routeStop.stop_features.includes("parking_lot") ? (
                  <TooltipWrapper
                    tooltipText="Parking"
                    tooltipOptions={{ placement: "bottom" }}
                  >
                    {parkingIcon(
                      "c-svg__icon-parking-default m-schedule-line-diagram__feature-icon"
                    )}
                  </TooltipWrapper>
                ) : null}
                {routeStop.stop_features.includes("access") ? (
                  <TooltipWrapper
                    tooltipText="Accessible"
                    tooltipOptions={{ placement: "bottom" }}
                  >
                    {accessibleIcon(
                      "c-svg__icon-acessible-default m-schedule-line-diagram__feature-icon"
                    )}
                  </TooltipWrapper>
                ) : null}
                {routeStop.route!.type === 2 && routeStop.zone && (
                  <span className="c-icon__cr-zone m-schedule-line-diagram__feature-icon">{`Zone ${
                    routeStop.zone
                  }`}</span>
                )}
              </div>
            </div>
            <div className="m-schedule-line-diagram__footer">
              <button
                className="btn btn-link"
                type="button"
                onClick={() =>
                  setModalState({
                    selectedOrigin: routeStop,
                    modalOpen: true
                  })
                }
              >
                View schedule
              </button>
            </div>
          </div>
        )
      )}
      <Modal
        openState={modalState.modalOpen}
        closeModal={() => {
          setModalState({
            ...modalState,
            modalOpen: false
          });
        }}
        ariaLabel={{
          label: `Schedules to ${route.direction_names[directionId]}`
        }}
      >
        {() => (
          <ScheduleModalContent
            route={route}
            selectedDirection={directionId}
            selectedOrigin={modalState.selectedOrigin.id}
            services={services}
            ratingEndDate={ratingEndDate}
            stops={stops[directionId]}
            routePatternsByDirection={routePatternsByDirection}
          />
        )}
      </Modal>
    </>
  );
};

export default LineDiagram;
