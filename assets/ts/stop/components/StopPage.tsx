import React, { ReactElement, useState } from "react";
import { concat } from "lodash";
import { useLoaderData } from "react-router-dom";
import { useStop } from "../../hooks/useStop";
import { useRoutes } from "../../hooks/useRoute";
import Loading from "../../components/Loading";
import { useAlertsByRoute, useAlertsByStop } from "../../hooks/useAlerts";
import DeparturesAndMap from "./DeparturesAndMap";
import { isTripSpecific, routeWideAlerts } from "../../models/alert";
import { FetchStatus } from "../../helpers/use-fetch";
import { Alert } from "../../__v3api";
import { GroupedRoutePatterns } from "../../models/route-patterns";

const isDeparturesAndMapAlertEffect = ({ effect }: Alert): boolean =>
  [
    "detour",
    "shuttle",
    "station_closure",
    "stop_closure",
    "stop_moved",
    "suspension"
  ].includes(effect);

const isDeparturesAndMapAlert = (alert: Alert): boolean =>
  isDeparturesAndMapAlertEffect(alert) && !isTripSpecific(alert);

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
  const routes = routesResult.data || [];
  const alertsForRoutesResult = useAlertsByRoute(routes.map(r => r.id));

  if ([stopResult.status, routesResult.status].includes(FetchStatus.Error)) {
    const errorMessage = [stopResult.errorData, routesResult.errorData]
      .filter(error => error !== undefined)
      .join(" ");
    throw new Error(errorMessage);
  }

  // Return loading indicator while waiting on data fetch
  if (
    !stopResult.data ||
    !alertsForRoutesResult.data ||
    !alertsForStopResult.data
  ) {
    return <Loading />;
  }

  const allRouteWideAlerts = routeWideAlerts(alertsForRoutesResult.data);
  const allAlerts = concat(alertsForStopResult.data, allRouteWideAlerts);
  const departuresAndMapAlerts = allAlerts.filter(isDeparturesAndMapAlert);

  return (
    <article>
      {hasPredictionError && FullwidthErrorMessage()}
      <div className="container">
        <DeparturesAndMap
          routes={routes}
          stop={stopResult.data}
          alerts={departuresAndMapAlerts}
          setPredictionError={setPredictionError}
        />
      </div>
    </article>
  );
};

//
// alerts banners should be the specific alert types, and only ongoing or upcoming in 7 days

export default StopPage;
