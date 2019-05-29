import React, { useReducer, ReactElement, useRef, useEffect } from "react";
import TransitNearMeMap from "./leaflet/TransitNearMeMap";
import RoutesSidebar from "./RoutesSidebar";
import StopsSidebar from "./StopsSidebar";
import { Stop, RouteWithStopsWithDirections, Mode } from "../../__v3api";
import { StopWithRoutes } from "./__tnm";
import { MapData } from "../../leaflet/components/__mapdata";
import useInterval from "../../helpers/use-interval";
import {
  reducer,
  initialState,
  SelectedStopType,
  State,
  Dispatch,
  routeSidebarDataAction
} from "../state";
import { QueryParams, paramsToString } from "../../helpers/query";

interface Props {
  mapData: MapData;
  mapId: string;
  query: QueryParams;
  routeSidebarData: RouteWithStopsWithDirections[];
  stopSidebarData: StopWithRoutes[];
}

export const getSelectedStop = (
  stopSidebarData: StopWithRoutes[],
  selectedStopId: SelectedStopType
): Stop | undefined => {
  const stopWithRoute = stopSidebarData.find(
    stopWithRoutes => stopWithRoutes.stop.stop.id === selectedStopId
  );
  return stopWithRoute ? stopWithRoute.stop.stop : undefined;
};

const validateModeFilter = (acc: Mode[], mode: string): Mode[] =>
  mode === "subway" || mode === "bus" || mode === "commuter_rail"
    ? acc.concat([mode])
    : acc;

export const modesFromQuery = (query: QueryParams): Mode[] =>
  query.filter ? query.filter.split(",").reduce(validateModeFilter, []) : [];

export const fetchData = (
  query: QueryParams,
  dispatch: Dispatch
): Promise<void> => {
  if (
    (query.latitude || query["location[latitude]"]) &&
    (query.longitude || query["location[longitude]"]) &&
    window.fetch
  ) {
    return window
      .fetch(
        `/transit-near-me/api${paramsToString(
          query,
          window.encodeURIComponent
        )}`
      )
      .then((response: Response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((routes: RouteWithStopsWithDirections[]) =>
        dispatch(routeSidebarDataAction(routes))
      )
      .catch(() => {});
  }

  return new Promise(resolve => resolve());
};

const emptyMessage = (
  <div className="m-tnm-sidebar__empty">
    {`We're sorry, there are no nearby routes or stops matching your filters and
    location.`}
  </div>
);

const TransitNearMe = ({
  mapData,
  mapId,
  routeSidebarData,
  query,
  stopSidebarData
}: Props): ReactElement<HTMLElement> => {
  const selectedModes = modesFromQuery(query);
  const initialStateWithModes: State = {
    ...initialState,
    selectedModes,
    routeSidebarData,
    shouldFilterStopCards: selectedModes.length > 0
  };
  const [state, dispatch] = useReducer(reducer, initialStateWithModes);
  const mapRef = useRef(null);
  useEffect(
    () => {
      if (mapRef && mapRef.current && mapData.markers.length > 0) {
        // @ts-ignore
        mapRef.current!.scrollIntoView();
      }
    },
    [mapData.markers.length]
  );
  const selectedStop = getSelectedStop(stopSidebarData, state.selectedStopId);

  useInterval(() => fetchData(query, dispatch), 15000);

  return (
    <div className="m-tnm">
      {state.routesView ? (
        <RoutesSidebar
          selectedStop={selectedStop}
          selectedModes={state.selectedModes}
          selectedStopId={state.selectedStopId}
          dispatch={dispatch}
          data={state.routeSidebarData}
          shouldFilterStopCards={state.shouldFilterStopCards}
          emptyMessage={emptyMessage}
        />
      ) : (
        <StopsSidebar
          selectedStop={selectedStop}
          selectedModes={state.selectedModes}
          selectedStopId={state.selectedStopId}
          dispatch={dispatch}
          data={stopSidebarData}
          shouldFilterStopCards={state.shouldFilterStopCards}
          emptyMessage={emptyMessage}
        />
      )}
      <h3 className="sr-only">Map</h3>
      <div
        ref={mapRef}
        id={mapId}
        className="m-tnm__map"
        role="application"
        aria-label="Map with stops"
      >
        <TransitNearMeMap
          selectedStopId={state.selectedStopId}
          dispatch={dispatch}
          initialData={mapData}
          selectedModes={state.selectedModes}
          stopData={stopSidebarData}
          shouldFilterMarkers={state.shouldFilterStopCards}
          shouldCenterMapOnSelectedStop={state.shouldCenterMapOnSelectedStop}
        />
      </div>
    </div>
  );
};

export default TransitNearMe;
