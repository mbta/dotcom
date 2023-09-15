import React, { ReactElement, useState } from "react";
import { Dictionary, concat, filter, omit } from "lodash";
import { useStop, useFacilitiesByStop } from "../../hooks/useStop";
import StationInformation from "./StationInformation";
import { useRoutePatternsByStop, useRoutesByStop } from "../../hooks/useRoute";
import StopPageHeaderRedesign from "./StopPageHeaderRedesign";
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
      <p className="c-fullscreen-error__heading u-bold">
        Live information could not be loaded.
      </p>
      <p>Please refresh the page to try again.</p>
    </div>
  </div>
);
const StopPageRedesign = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  const [hasPredictionError, setPredictionError] = useState(false);
  const stopResult = useStop(stopId);
  const routesWithPolylinesResult = useRoutesByStop(stopId);
  const routePatterns = useRoutePatternsByStop(stopId);

  //create Map with route_id => [headsign for direction 0, headsign for direction 1] this will be passed to DepartureCard
  //in departure card
  let activeHeadsign = new Map<string, [string, string]>();

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

  const routes = routesWithPolylinesResult.data.map(rwp =>
    omit(rwp, "polylines")
  );

  const allRouteWideAlerts = routeWideAlerts(alertsForRoutesResult.data);
  const allAlerts = concat(alertsForStopResult.data, allRouteWideAlerts);
  const allAmenityAlerts = filter(allAlerts, a => isAmenityAlert(a));
  const allStopPageAlerts = filter(allAlerts, a => isStopPageAlert(a));

  const alertsWithinSevenDays = filter(allStopPageAlerts, alert =>
    isInNextXDays(alert, 7)
  );

  return (
    <article>
      <StopPageHeaderRedesign stop={stopResult.data} routes={routes} />
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
          routesWithPolylines={routesWithPolylinesResult.data}
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

export default StopPageRedesign;
