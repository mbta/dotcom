import React, { ReactElement, useEffect, useState } from "react";
import { filter, omit } from "lodash";
import useStop from "../../hooks/useStop";
import StationInformation from "./StationInformation";
import { useRoutesByStop } from "../../hooks/useRoute";
import StopPageHeaderRedesign from "./StopPageHeaderRedesign";
import Loading from "../../components/Loading";
import Alerts from "../../components/Alerts";
import { Alert, Route } from "../../__v3api";
import { useSchedulesByStop } from "../../hooks/useSchedules";
import { useAlertsByRoute, useAlertsByStop } from "../../hooks/useAlerts";
import DeparturesAndMap from "./DeparturesAndMap";
import { isCurrentAlert, routeWideAlerts } from "../../models/alert";

const StopPageRedesign = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  const [routeIdState, setRouteIdState] = useState<string[]>([]);
  const [routeState, setRouteState] = useState<Route[]>([]);
  const [alertState, setAlertState] = useState<Alert[]>([]);

  const stop = useStop(stopId);
  const routesWithPolylines = useRoutesByStop(stopId);
  // TODO maybe move to the StopDeparturesPage (or keep it here for loading indicator)
  const schedules = useSchedulesByStop(stopId);
  const alerts = useAlertsByStop(stopId);
  const alertsForRoutes = useAlertsByRoute(routeIdState);
  //

  useEffect(() => {
    setRouteState(
      routesWithPolylines
        ? routesWithPolylines.map(rwp => omit(rwp, "polylines"))
        : []
    );
  }, [routesWithPolylines]);

  useEffect(() => {
    setRouteIdState(routeState.map(route => route.id));
  }, [routeState]);

  useEffect(() => {
    // alerts contains all the alerts affecting the stop in question
    const alertsArray = alerts !== undefined ? alerts : [];
    const alertsRouteArray =
      alertsForRoutes !== undefined ? alertsForRoutes : [];
    // routeWideAlertsArray are all the alerts that affect the whole route
    // not just specific stops
    const routeWideAlertsArray = routeWideAlerts(alertsRouteArray);
    // Get only alerts that are current
    const currentAlerts = filter(
      alertsArray.concat(routeWideAlertsArray),
      alert => isCurrentAlert(alert)
    );
    setAlertState(currentAlerts);
  }, [alerts, alertsForRoutes]);

  // Return loading indicator while waiting on data fetch
  if (
    !stop ||
    !routesWithPolylines ||
    !schedules ||
    !alerts ||
    !alertsForRoutes
  ) {
    return <Loading />;
  }

  return (
    <article>
      <StopPageHeaderRedesign stop={stop} routes={routeState} />
      <div className="container">
        <Alerts alerts={alertState} />
        <DeparturesAndMap
          routes={routeState}
          stop={stop}
          schedules={schedules}
          routesWithPolylines={routesWithPolylines}
          alerts={alertState}
        />
        <footer>
          <StationInformation stop={stop} />
        </footer>
      </div>
    </article>
  );
};

export default StopPageRedesign;
