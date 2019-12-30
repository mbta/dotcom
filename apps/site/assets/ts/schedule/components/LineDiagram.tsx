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

const isTerminusStop = (lineDiagramStop: LineDiagramStop): boolean =>
  lineDiagramStop.route_stop["is_terminus?"];

const isBeginningStop = (lineDiagramStop: LineDiagramStop): boolean =>
  lineDiagramStop.route_stop["is_beginning?"];

const isMergeStop = (lineDiagramStop: LineDiagramStop): boolean =>
  lineDiagramStop.stop_data.some(sd => sd.type === "merge");

const isOnBranch = (lineDiagramStop: LineDiagramStop): boolean =>
  !!lineDiagramStop.route_stop.branch || isMergeStop(lineDiagramStop);

const isOnPrimaryBranch = (lineDiagramStop: LineDiagramStop): boolean =>
  isOnBranch(lineDiagramStop) && lineDiagramStop.stop_data.length === 1;

const isOnSecondaryBranch = (lineDiagramStop: LineDiagramStop): boolean =>
  isOnBranch(lineDiagramStop) && !isOnPrimaryBranch(lineDiagramStop);

const branchName = (lineDiagramStop: LineDiagramStop): JSX.Element | null => {
  if (isOnBranch(lineDiagramStop) && isTerminusStop(lineDiagramStop)) {
    return (
      <strong className="u-small-caps">
        {lineDiagramStop.route_stop.name}
        {lineDiagramStop.route_stop.route!.type === 2 ? " Line" : " Branch"}
      </strong>
    );
  }

  return null;
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

  const isBranchEnd = (index: number): boolean =>
    index === lineDiagram.length - 1 ||
    index ===
      lineDiagram.lastIndexOf(
        lineDiagram.filter(isOnSecondaryBranch)[
          lineDiagram.filter(isOnSecondaryBranch).length - 1
        ]
      ) ||
    (index > 0 &&
      lineDiagram
        .filter(l => isTerminusStop(l) && !isBeginningStop(l))
        .includes(lineDiagram[index]));

  const isBranchStart = (index: number): boolean =>
    index === 0 ||
    index === lineDiagram.indexOf(lineDiagram.filter(isOnSecondaryBranch)[0]) ||
    (index > 0 &&
      lineDiagram
        .filter(isTerminusStop)
        .filter(isBeginningStop)
        .includes(lineDiagram[index]));

  return (
    <>
      <h3>
        {routeType === 0 || routeType === 1 || routeType === 2
          ? "Stations"
          : "Stops"}
      </h3>
      <div
        className={`m-schedule-diagram m-schedule-diagram${
          lineDiagram.some(isOnBranch) ? "--with-branches" : ""
        }`}
      >
        {lineDiagram.map((lineDiagramStop: LineDiagramStop, index: number) => {
          const { route_stop: routeStop, alerts: stopAlerts } = lineDiagramStop;

          return (
            <div
              key={routeStop.id}
              className={`m-schedule-diagram__stop 
                ${
                  isOnSecondaryBranch(lineDiagramStop)
                    ? "m-schedule-diagram__stop--branch"
                    : ""
                }
                ${
                  isBranchEnd(index)
                    ? "m-schedule-diagram__stop--branch-end"
                    : ""
                }
                ${
                  isBranchStart(index)
                    ? "m-schedule-diagram__stop--branch-start"
                    : ""
                }
              `}
            >
              <div
                style={{ color: `#${route.color}` }}
                className="m-schedule-diagram__lines"
              >
                <div className="m-schedule-diagram__line">
                  {!isOnSecondaryBranch(lineDiagramStop) && (
                    <svg>
                      <circle
                        r="4"
                        cx="5"
                        cy={isBranchStart(index) ? "2" : "26"}
                      />
                    </svg>
                  )}
                </div>

                {isOnSecondaryBranch(lineDiagramStop) && (
                  <div className="m-schedule-diagram__line m-schedule-diagram__line--branch">
                    <svg>
                      {isMergeStop(lineDiagramStop) && (
                        <path
                          d={`
                            M-10,${isBranchStart(index) ? "-30" : "100"}
                            h 15 
                            v ${isBranchStart(index) ? "36" : "-76"}
                          `}
                        />
                      )}
                      <circle
                        r="4"
                        cx="5"
                        cy={isBranchStart(index) ? "2" : "26"}
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="m-schedule-line-diagram__content">
                <div className="m-schedule-line-diagram__card">
                  <div className="m-schedule-line-diagram__card-left">
                    <div className="m-schedule-line-diagram__stop-name">
                      {branchName(lineDiagramStop)}
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
            </div>
          );
        })}
      </div>
      <Modal
        openState={modalState.modalOpen}
        closeModal={() => {
          setModalState({ ...modalState, modalOpen: false });
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
