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
import { isInNextXDays, routeWideAlerts } from "../../models/alert";
import { FetchStatus } from "../../helpers/use-fetch";
import { Alert } from "../../__v3api";

const StopPageRedesign = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  const stopResult = useStop(stopId);
  const routesWithPolylinesResult = useRoutesByStop(stopId);
  const schedulesResult = useSchedulesByStop(stopId);
  const alertsForStopResult = useAlertsByStop(stopId);
  const alertsForRoutesResult = useAlertsByRoute(
    routesWithPolylinesResult.status === FetchStatus.Data
      ? routesWithPolylinesResult.data?.map(r => r.id) || []
      : []
  );

  if (
    [
      stopResult.status,
      routesWithPolylinesResult.status,
      schedulesResult.status
    ].includes(FetchStatus.Error)
  ) {
    return <p>Page could not be loaded. Please try refreshing the page.</p>;
  }

  // Return loading indicator while waiting on data fetch
  if (
    !stopResult.data ||
    !routesWithPolylinesResult.data ||
    !schedulesResult.data ||
    !alertsForRoutesResult.data ||
    !alertsForStopResult.data
  ) {
    return <Loading />;
  }

  const isBannerAlert = ({ effect }: Alert): boolean =>
    ["suspension", "stop_closure", "station_closure", "shuttle"].includes(
      effect
    );

  const routes = routesWithPolylinesResult.data.map(rwp =>
    omit(rwp, "polylines")
  );

  // routeWideAlertsArray are all the alerts that affect the whole route
  // not just specific stops or trips
  const routeWideAlertsArray = routeWideAlerts(alertsForRoutesResult.data);

  const allAlerts = alertsForStopResult.data.concat(routeWideAlertsArray);

  const alertsWithinSevenDays = filter(
    allAlerts,
    alert => isInNextXDays(alert, 7) && isBannerAlert(alert)
  );

  const currentAlerts = filter(allAlerts, alert => isInNextXDays(alert, 0));

  return (
    <article>
      <StopPageHeaderRedesign stop={stopResult.data} routes={routes} />
      <div className="container">
        <Alerts alerts={alertsWithinSevenDays} />
        <DeparturesAndMap
          routes={routes}
          stop={stopResult.data}
          schedules={schedulesResult.data}
          routesWithPolylines={routesWithPolylinesResult.data}
          alerts={currentAlerts}
        />
        <footer>
          <StationInformation stop={stopResult.data} />
        </footer>
      </div>
    </article>
  );
};

export default StopPageRedesign;
