import React, { ReactElement } from "react";
import { filter, omit } from "lodash";
import useStop from "../../hooks/useStop";
import StationInformation from "./StationInformation";
import { useRoutesByStop } from "../../hooks/useRoute";
import StopPageHeaderRedesign from "./StopPageHeaderRedesign";
import Loading from "../../components/Loading";
import Alerts from "../../components/Alerts";
import { useSchedulesByStop } from "../../hooks/useSchedules";
import { useAlertsByRoute, useAlertsByStop } from "../../hooks/useAlerts";
import DeparturesAndMap from "./DeparturesAndMap";
import { isCurrentAlert, routeWideAlerts } from "../../models/alert";

const StopPageRedesign = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  const stop = useStop(stopId);
  const routesWithPolylines = useRoutesByStop(stopId);

  const routes = routesWithPolylines
    ? routesWithPolylines.map(rwp => omit(rwp, "polylines"))
    : [];
  const routeIds = routes.map(r => r.id);

  // TODO maybe move to the StopDeparturesPage (or keep it here for loading indicator)
  const schedules = useSchedulesByStop(stopId);
  const alertsForStop = useAlertsByStop(stopId);
  const alertsForRoutes = useAlertsByRoute(routeIds);
  //

  const alertsStopArray = alertsForStop !== undefined ? alertsForStop : [];
  const alertsRouteArray = alertsForRoutes !== undefined ? alertsForRoutes : [];
  // routeWideAlertsArray are all the alerts that affect the whole route
  // not just specific stops or trips
  const routeWideAlertsArray = routeWideAlerts(alertsRouteArray);
  // Get only alerts that are current
  const currentAlerts = filter(
    alertsStopArray.concat(routeWideAlertsArray),
    alert => isCurrentAlert(alert)
  );

  // Return loading indicator while waiting on data fetch
  if (!stop || !routesWithPolylines || !schedules) {
    return <Loading />;
  }

  return (
    <article>
      <StopPageHeaderRedesign stop={stop} routes={routes} />
      <div className="container">
        <Alerts alerts={currentAlerts} />
        <DeparturesAndMap
          routes={routes}
          stop={stop}
          schedules={schedules}
          routesWithPolylines={routesWithPolylines}
          alerts={currentAlerts}
        />
        <footer>
          <StationInformation stop={stop} />
        </footer>
      </div>
    </article>
  );
};

export default StopPageRedesign;
