import React, { ReactElement, useState } from "react";
import { concat, filter } from "lodash";
import { useLoaderData } from "react-router-dom";
import { useStop, useFacilitiesByStop } from "../../hooks/useStop";
import StationInformation from "./StationInformation";
import { useRoutes } from "../../hooks/useRoute";
import StopPageHeader from "./StopPageHeader";
import Loading from "../../components/Loading";
import Alerts from "../../components/Alerts";
import { useAlertsByRoute, useAlertsByStop } from "../../hooks/useAlerts";
import DeparturesAndMap from "./DeparturesAndMap";
import {
  isGlobalBannerAlert,
  routeWideAlerts,
  isInNextXDays,
  isAmenityAlert,
  hasDetour
} from "../../models/alert";
import { FetchStatus } from "../../helpers/use-fetch";
import { Alert } from "../../__v3api";
import { GroupedRoutePatterns } from "../../models/route-patterns";

const isStopPageAlert = ({ effect }: Alert): boolean =>
  [
    "suspension",
    "stop_closure",
    "station_closure",
    "shuttle",
    "detour",
    "stop_moved"
  ].includes(effect);

const FullwidthErrorMessage = (): JSX.Element => (
  <div className="c-fullscreen-error__container">
    <div className="container">
      <p className="c-fullscreen-error__heading font-bold">
        Live information could not be loaded.
      </p>
      <p>Please refresh the page to try again.</p>
    </div>
  </div>
);
const StopPage = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  const [hasPredictionError, setPredictionError] = useState(false);
  const stopResult = useStop(stopId);
  const groupedRoutePatterns = useLoaderData() as GroupedRoutePatterns;
  const routesResult = useRoutes(Object.keys(groupedRoutePatterns || []));
  const alertsForStopResult = useAlertsByStop(stopId);
  const facilities = useFacilitiesByStop(stopId);
  const routes = routesResult.data || [];
  const alertsForRoutesResult = useAlertsByRoute(routes.map(r => r.id));

  if (
    [stopResult.status, routesResult.status, facilities.status].includes(
      FetchStatus.Error
    )
  ) {
    const errorMessage = [
      stopResult.errorData,
      routesResult.errorData,
      facilities.errorData
    ]
      .filter(error => error !== undefined)
      .join(" ");
    throw new Error(errorMessage);
  }

  // Return loading indicator while waiting on data fetch
  if (
    !stopResult.data ||
    !alertsForRoutesResult.data ||
    !alertsForStopResult.data ||
    !facilities.data
  ) {
    return <Loading />;
  }

  const allRouteWideAlerts = routeWideAlerts(alertsForRoutesResult.data);
  const allAlerts = concat(alertsForStopResult.data, allRouteWideAlerts);
  const allAmenityAlerts = filter(allAlerts, a => isAmenityAlert(a));
  const allStopPageAlerts = filter(allAlerts, a => isStopPageAlert(a));

  const alertsWithinSevenDays = filter(allStopPageAlerts, alert =>
    isInNextXDays(alert, 7)
  );

  return (
    <article>
      <StopPageHeader stop={stopResult.data} routes={routes} />
      {hasPredictionError && FullwidthErrorMessage()}
      <div className="container">
        <Alerts
          alerts={alertsWithinSevenDays.filter(
            alert => !isGlobalBannerAlert(alert) && !hasDetour([alert])
          )}
        />
        <DeparturesAndMap
          routes={routes}
          stop={stopResult.data}
          alerts={allStopPageAlerts}
          setPredictionError={setPredictionError}
        />
        <footer>
          <StationInformation
            stop={stopResult.data}
            facilities={facilities.data}
            alerts={allAmenityAlerts}
          />
        </footer>
      </div>
    </article>
  );
};

//
// alerts banners should be the specific alert types, and only ongoing or upcoming in 7 days

export default StopPage;
