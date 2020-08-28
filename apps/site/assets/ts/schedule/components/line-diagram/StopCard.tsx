import React, { ReactElement, useContext } from "react";
import { LineDiagramStop, RouteStop } from "../__schedule";
import { isACommuterRailRoute, isAGreenLineRoute } from "../../../models/route";
import { LiveData } from "./__line-diagram";
import { isMergeStop, diagramWidth } from "./line-diagram-helpers";
import StopConnections from "./StopConnections";
import StopPredictions from "./StopPredictions";
import { alertIcon } from "../../../helpers/icon";
import { isHighSeverityOrHighPriority } from "../../../models/alert";
import { Alert, Route } from "../../../__v3api";
import MatchHighlight from "../../../components/MatchHighlight";
import StopFeatures from "./StopFeatures";
import { StopRefContext } from "./LineDiagramWithStops";

interface StopCardProps {
  stop: LineDiagramStop;
  onClick: (stop: RouteStop) => void;
  liveData?: LiveData;
  searchQuery?: string;
}

const hasBranchLabel = (stop: LineDiagramStop): boolean =>
  stop.route_stop["is_terminus?"] &&
  !!stop.route_stop.branch &&
  !!stop.route_stop.route;

const lineName = ({ name, route: routeStopRoute }: RouteStop): string => {
  const route = routeStopRoute as Route;
  const title = isAGreenLineRoute(route)
    ? `Green Line ${route.id.split("-")[1]}`
    : name;
  const lineOrBranch = isACommuterRailRoute(route) ? "Line" : "Branch";
  return `${title} ${lineOrBranch}`;
};

const MaybeAlert = (alerts: Alert[]): JSX.Element | null => {
  const highPriorityAlerts = alerts.filter(isHighSeverityOrHighPriority);
  if (highPriorityAlerts.length === 0) return null;
  return (
    <>
      {alertIcon("c-svg__icon-alerts-triangle")}
      <span className="sr-only">Service alert or delay</span>
      &nbsp;
    </>
  );
};

const StopCard = (props: StopCardProps): ReactElement<HTMLElement> => {
  const { stop, onClick, liveData, searchQuery } = props;
  const {
    stop_data: stopData,
    route_stop: routeStop,
    alerts: stopAlerts,
    route_stop: { "is_beginning?": isOrigin, "is_terminus?": isTerminus }
  } = stop;

  const isDestination = !isOrigin && isTerminus;
  const width = isMergeStop(stop)
    ? diagramWidth(1)
    : diagramWidth(stopData.length);
  const refs = useContext(StopRefContext)[0];

  return (
    <li
      className="m-schedule-diagram__stop"
      style={{ paddingLeft: searchQuery ? "0.5rem" : `${width}px` }}
    >
      <section className="m-schedule-diagram__content">
        {hasBranchLabel(stop) && (
          <div className="u-bold u-small-caps">{lineName(routeStop)}</div>
        )}
        <header
          className="m-schedule-diagram__stop-heading"
          ref={refs[routeStop.id]}
        >
          <h4 className="m-schedule-diagram__stop-link">
            <a href={`/stops/${routeStop.id}`}>
              {MaybeAlert(stopAlerts)}
              <MatchHighlight text={routeStop.name} matchQuery={searchQuery} />
            </a>
          </h4>
          {StopFeatures(routeStop)}
        </header>

        <div className="m-schedule-diagram__stop-details">
          {StopConnections(routeStop.connections)}
          {!isDestination && liveData && (
            <StopPredictions
              headsigns={liveData.headsigns}
              isCommuterRail={
                !!routeStop.route && isACommuterRailRoute(routeStop.route)
              }
            />
          )}
        </div>

        <footer className="m-schedule-diagram__footer">
          <button
            className="btn btn-link"
            type="button"
            onClick={() => onClick(routeStop)}
          >
            View schedule
          </button>
        </footer>
      </section>
    </li>
  );
};

export default StopCard;
