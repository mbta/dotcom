import React, { ReactElement } from "react";
import { filter, omit } from "lodash";
import { useStop, useFacilitiesByStop } from "../../hooks/useStop";
import StationInformation from "./StationInformation";
import { useRoutesByStop } from "../../hooks/useRoute";
import StopPageHeaderRedesign from "./StopPageHeaderRedesign";
import Loading from "../../components/Loading";
import Alerts from "../../components/Alerts";
import { useAlertsByRoute, useAlertsByStop } from "../../hooks/useAlerts";
import DeparturesAndMap from "./DeparturesAndMap";
import {
  isGlobalBannerAlert,
  routeWideAlerts,
  isInNextXDays,
  isAmenityAlert
} from "../../models/alert";
import { FetchStatus } from "../../helpers/use-fetch";
import { Alert } from "../../__v3api";

const StopPageRedesign = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  const stopResult = useStop(stopId);
  const routesWithPolylinesResult = useRoutesByStop(stopId);
  const alertsForStopResult = useAlertsByStop(stopId);
  const facilities = useFacilitiesByStop(stopId);
  const alertsForRoutesResult = useAlertsByRoute(
    routesWithPolylinesResult.status === FetchStatus.Data
      ? routesWithPolylinesResult.data?.map(r => r.id) || []
      : []
  );

  if (
    [
      stopResult.status,
      routesWithPolylinesResult.status,
      facilities.status
    ].includes(FetchStatus.Error)
  ) {
    return <p>Page could not be loaded. Please try refreshing the page.</p>;
  }

  // Return loading indicator while waiting on data fetch
  if (
    !stopResult.data ||
    !routesWithPolylinesResult.data ||
    !alertsForRoutesResult.data ||
    !alertsForStopResult.data ||
    !facilities.data
  ) {
    return <Loading />;
  }

  const isStopPageAlert = ({ effect }: Alert): boolean =>
    ["suspension", "stop_closure", "station_closure", "shuttle"].includes(
      effect
    );

  const routes = routesWithPolylinesResult.data.map(rwp =>
    omit(rwp, "polylines")
  );

  // routeWideAlertsArray are all the alerts that affect the whole route
  // not just specific stops or trips
  const routeWideAlertsArray = routeWideAlerts(alertsForRoutesResult.data);

  const allAlerts = filter(
    alertsForStopResult.data.concat(routeWideAlertsArray),
    alert => !isAmenityAlert(alert)
  );

  const alertsForAmenities = filter(alertsForStopResult.data, alert =>
    isAmenityAlert(alert)
  );

  const alertsWithinSevenDays = filter(
    allAlerts,
    alert => isInNextXDays(alert, 7) && isStopPageAlert(alert)
  );

  const currentAlerts = filter(allAlerts, alert => isInNextXDays(alert, 0));

  return (
    <article>
      <StopPageHeaderRedesign stop={stopResult.data} routes={routes} />
      <div className="container">
        <Alerts
          alerts={alertsWithinSevenDays.filter(
            alert => !isGlobalBannerAlert(alert)
          )}
        />
        <DeparturesAndMap
          routes={routes}
          stop={stopResult.data}
          routesWithPolylines={routesWithPolylinesResult.data}
          alerts={currentAlerts}
        />
        <footer>
          <StationInformation
            stop={stopResult.data}
            facilities={facilities.data}
            alerts={alertsForAmenities}
          />
        </footer>
      </div>
    </article>
  );
};

export default StopPageRedesign;
