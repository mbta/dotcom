import React, { ReactElement, useState } from "react";
import {
  LineDiagramStop,
  RouteStopRoute,
  RoutePatternsByDirection,
  SimpleStopMap,
  RouteStop,
  ServiceInSelector
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
import { Alert, Route, DirectionId } from "../../__v3api";

interface Props {
  lineDiagram: LineDiagramStop[];
  route: Route;
  directionId: DirectionId;
  routePatternsByDirection: RoutePatternsByDirection;
  services: ServiceInSelector[];
  ratingEndDate: string;
  stops: SimpleStopMap;
  today: string;
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

const StopBranchLabel = (stop: RouteStop): JSX.Element | null =>
  stop["is_terminus?"] && !!stop.branch && !!stop.route ? (
    <strong className="u-small-caps">
      {stop.route.id.startsWith("Green")
        ? `Green Line ${stop.route.id.split("-")[1]}`
        : stop.name}
      {stop.route.type === 2 ? " Line" : " Branch"}
    </strong>
  ) : null;

const getMergeStops = (lineDiagram: LineDiagramStop[]): LineDiagramStop[] =>
  lineDiagram.filter(
    ({ stop_data: stopData }: LineDiagramStop) =>
      stopData.some(sd => sd.type === "merge") && stopData.length > 1
  );

const getTreeDirection = (
  lineDiagram: LineDiagramStop[]
): "outward" | "inward" => {
  // determines if tree should fan out or collect branches as we go down the page
  // use the position of the merge stop to find this. assume default of outward
  const mergeStops = getMergeStops(lineDiagram);
  let direction: "outward" | "inward" = "outward";
  if (mergeStops) {
    const mergeIndices = mergeStops.map((ms: LineDiagramStop) =>
      lineDiagram.indexOf(ms)
    );
    const branchTerminiIndices = lineDiagram
      .filter(
        (lds: LineDiagramStop) =>
          lds.route_stop["is_terminus?"] && lds.stop_data.length > 1
      )
      .map((lds: LineDiagramStop) => lineDiagram.indexOf(lds));

    direction = branchTerminiIndices.some(i => mergeIndices[0] > i)
      ? "inward"
      : "outward";
  }

  return direction;
};

const LineDiagram = ({
  lineDiagram,
  route,
  directionId,
  routePatternsByDirection,
  services,
  ratingEndDate,
  stops,
  today
}: Props): ReactElement<HTMLElement> | null => {
  const routeType = route.type;
  const [modalState, setModalState] = useState<{
    selectedOrigin: RouteStop;
    modalOpen: boolean;
  }>({
    selectedOrigin: lineDiagram[0].route_stop,
    modalOpen: false
  });

  const treeDirection = getTreeDirection(lineDiagram);

  // identify the stops immediately before merge branches,
  // where 2+ branches are about to merge.
  const mergeStopIndices = getMergeStops(lineDiagram).map(
    (ms: LineDiagramStop) => lineDiagram.indexOf(ms)
  );
  const mergingStopIndices =
    treeDirection === "inward"
      ? mergeStopIndices.map(i => i - 1)
      : mergeStopIndices.map(i => i + 1);

  return (
    <>
      <h3>
        {routeType === 0 || routeType === 1 || routeType === 2
          ? "Stations"
          : "Stops"}
      </h3>
      <div
        className={`m-schedule-diagram m-schedule-diagram--${treeDirection}`}
      >
        {lineDiagram.map(
          (
            {
              stop_data: stopData,
              route_stop: routeStop,
              alerts: stopAlerts
            }: LineDiagramStop,
            ldIndex
          ) => (
            <div key={routeStop.id} className="m-schedule-diagram__stop">
              <div
                style={{ color: `#${route.color}` }}
                className={`m-schedule-diagram__lines ${
                  mergingStopIndices.includes(ldIndex)
                    ? "m-schedule-diagram__lines--merging"
                    : ""
                }`}
              >
                {mergeStopIndices.includes(ldIndex) ? (
                  <div className="m-schedule-diagram__line m-schedule-diagram__line--stop">
                    <svg
                      viewBox="0 10 10 10"
                      height="10"
                      className="m-schedule-diagram__line-stop"
                    >
                      <circle r="4" cx="50%" />
                    </svg>
                  </div>
                ) : (
                  stopData.map((sd, sdIndex) => (
                    <div
                      key={`${routeStop.id}-${sd.type}-${sd.branch}`}
                      className={`m-schedule-diagram__line m-schedule-diagram__line--${
                        sd.type
                      }`}
                    >
                      {sd.type !== "line" && (
                        <svg
                          viewBox="0 10 10 10"
                          height="10"
                          className="m-schedule-diagram__line-stop"
                        >
                          {mergingStopIndices.includes(ldIndex) &&
                            sdIndex > 0 && (
                              <path
                                className="m-schedule-diagram__line-bend"
                                d={`M5,10 v-10 h${-20 * sdIndex}`}
                              />
                            )}
                          {sdIndex + 1 === stopData.length && (
                            <circle r="4" cx="50%" />
                          )}
                        </svg>
                      )}
                    </div>
                  ))
                )}
              </div>
              <div className="m-schedule-diagram__content">
                <div className="m-schedule-diagram__card">
                  <div className="m-schedule-diagram__card-left">
                    <div className="m-schedule-diagram__stop-name">
                      {StopBranchLabel(routeStop)}
                      <a href={`/stops/${routeStop.id}`}>
                        <h4>
                          {maybeAlert(stopAlerts)} {routeStop.name}
                        </h4>
                      </a>
                    </div>
                    <div className="m-schedule-diagram__connections">
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
                        )
                      )}
                    </div>
                  </div>
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
                    {routeStop.route!.type === 2 && routeStop.zone && (
                      <span className="c-icon__cr-zone m-schedule-diagram__feature-icon">{`Zone ${
                        routeStop.zone
                      }`}</span>
                    )}
                  </div>
                </div>
                <div className="m-schedule-diagram__footer">
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
          )
        )}
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
            today={today}
          />
        )}
      </Modal>
    </>
  );
};

export default LineDiagram;
