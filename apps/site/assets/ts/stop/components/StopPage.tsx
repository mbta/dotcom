import React, { ReactElement, useReducer } from "react";
import useInterval from "use-interval";
import StopMapContainer from "./StopMapContainer";
import { StopPageData, StopMapData, TypedRoutes } from "./__stop";
import { EnhancedRoute } from "../../__v3api";
import StopPageHeader from "./StopPageHeader";
import { reducer, initialState, Dispatch, updateRoutesAction } from "../state";
import { Alert } from "../../components/Alerts";
import AlertsTab from "./AlertsTab";
import Sidebar from "./Sidebar";
import LocationBlock from "./LocationBlock";
import Departures from "./Departures";
import SuggestedTransfers from "./SuggestedTransfers";
import { isHighSeverityOrHighPriority } from "../../models/alert";

interface Props {
  stopPageData: StopPageData;
  mapData: StopMapData;
  mapId: string;
}

export const fetchData = (stopId: string, dispatch: Dispatch): Promise<void> =>
  window.fetch &&
  window
    .fetch(`/stops/api?id=${stopId}`)
    .then((response: Response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((routes: TypedRoutes[]) => dispatch(updateRoutesAction(routes)))
    .catch(() => {});

export default ({
  stopPageData,
  mapData,
  mapId
}: Props): ReactElement<HTMLElement> => {
  const {
    stop,
    street_view_url: streetViewUrl,
    routes,
    // eslint-disable-next-line camelcase
    routes_with_direction: routesWithDirection,
    // eslint-disable-next-line camelcase
    retail_locations: retailLocations,
    // eslint-disable-next-line camelcase
    suggested_transfers: suggestedTransfers,
    alerts,
    alerts_tab: alertsTab,
    routes_and_alerts: routesAndAlerts,
    tab
  } = stopPageData;

  const [state, dispatch] = useReducer(reducer, initialState(tab, routes));

  useInterval(() => {
    // temporarily disabled while we debug CPU issues
    // fetchData(stop.id, dispatch);
  }, 15000);

  const highPriorityAlerts = alerts.filter(isHighSeverityOrHighPriority);

  return (
    <>
      <StopPageHeader
        stopPageData={stopPageData}
        dispatch={dispatch}
        selectedTab={state.selectedTab}
      />
      {state.selectedTab === "alerts" ? (
        <AlertsTab alertsTab={alertsTab} />
      ) : (
        <>
          <div className="m-stop-page__info-container">
            <div className="m-stop-page__info">
              {highPriorityAlerts.length > 0 ? (
                <div className="page-section">
                  <ul className="c-alert-group">
                    {highPriorityAlerts.map(alert => (
                      <Alert key={alert.id} alert={alert} />
                    ))}
                  </ul>
                </div>
              ) : null}
              <h2>Station Information</h2>
              <p>See upcoming departures, maps, and other features at this 
              location.</p>
            </div>
          </div>
          <div className="m-stop-page__hero">
            <StopMapContainer
              initialData={mapData}
              mapId={mapId}
              stop={stop}
              routes={routes.reduce(
                (
                  accumulator: EnhancedRoute[],
                  groupedRoutes: TypedRoutes
                ): EnhancedRoute[] =>
                  accumulator.concat(
                    groupedRoutes.routes.map(typedRoute => typedRoute.route)
                  ),
                []
              )}
              routesWithDirection={routesWithDirection}
            />
            <div className="m-stop-page__hero-photo" />
          </div>
          <div className="container">
            <div className="page-section">
              <div className="row">
                <div className="col-12 col-sm-10 col-sm-offset-1 col-lg-7 col-lg-offset-0">
                  <LocationBlock
                    stop={stop}
                    routes={routes}
                    streetViewUrl={streetViewUrl}
                  />
                  <Departures
                    routes={state.routes}
                    routesAndAlerts={routesAndAlerts}
                    stop={stop}
                    selectedModes={state.selectedModes}
                    dispatch={dispatch}
                  />
                  <SuggestedTransfers suggestedTransfers={suggestedTransfers} />
                </div>
                <div className="col-12 col-sm-10 col-sm-offset-1 col-lg-4 col-lg-offset-1">
                  <Sidebar
                    dispatch={dispatch}
                    expandedBlocks={state.expandedBlocks}
                    focusedBlock={state.focusedBlock}
                    stop={stop}
                    routes={routes}
                    retailLocations={retailLocations}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
