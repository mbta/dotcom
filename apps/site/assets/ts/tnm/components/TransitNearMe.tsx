import React, { useReducer, ReactElement, useRef, useEffect } from "react";
import useInterval from "use-interval";
import TransitNearMeMap from "./leaflet/TransitNearMeMap";
import RoutesSidebar from "./RoutesSidebar";
import StopsSidebar from "./StopsSidebar";
import { Stop, Mode, RouteWithStopsWithDirections } from "../../__v3api";
import {
  StopWithRoutes,
  StopsWithDistances,
  RealtimeScheduleData
} from "./__tnm";
import { MapData } from "../../leaflet/components/__mapdata";
import {
  reducer,
  initialState,
  SelectedStopType,
  State,
  Dispatch,
  realtimeScheduleDataAction,
  firstDataLoadedAction
} from "../state";
import { QueryParams } from "../../helpers/query";

interface Props {
  mapData: MapData;
  mapId: string;
  query: QueryParams;
  stopsWithDistances: StopsWithDistances;
  routesWithRealtimeSchedules: RouteWithStopsWithDirections[];
  stopsWithRoutes: StopWithRoutes[];
  selectedStopId?: string | null;
}

export const getSelectedStop = (
  stopsWithRoutes: StopWithRoutes[],
  selectedStopId: SelectedStopType
): Stop | undefined => {
  const stopWithRoute = stopsWithRoutes.find(
    stopWithRoutes => stopWithRoutes.stop.id === selectedStopId
  );
  return stopWithRoute ? stopWithRoute.stop : undefined;
};

const validateModeFilter = (acc: Mode[], mode: string): Mode[] =>
  mode === "subway" || mode === "bus" || mode === "commuter_rail"
    ? acc.concat([mode])
    : acc;

export const modesFromQuery = (query: QueryParams): Mode[] =>
  query.filter ? query.filter.split(",").reduce(validateModeFilter, []) : [];

export const fetchRealtimeSchedules = async (
  stopIds: string[],
  dispatch: Dispatch
): Promise<void> => {
  const responses = await Promise.all(
    stopIds.map(async stopId =>
      window.fetch(`/api/realtime/stops/?stops=${stopId}`)
    )
  );

  const json = await Promise.all(
    responses
      .filter(response => response && response.ok)
      .map(async response => {
        const { payload } = await response.json();
        return payload;
      })
  );

  json.forEach(jsonData => {
    const data = jsonData.filter(
      ({
        predicted_schedules_by_route_pattern: predictedSchedulesByRoutePattern
      }: RealtimeScheduleData) =>
        Object.keys(predictedSchedulesByRoutePattern).length > 0
    );
    dispatch(realtimeScheduleDataAction(data));
  });

  dispatch(firstDataLoadedAction());
};

const emptyMessage = (pendingFirstData: boolean): ReactElement<HTMLElement> => (
  <div className="m-tnm-sidebar__empty">
    {pendingFirstData === true ? (
      <div className="c-spinner__container">
        <div className="c-spinner">Loading...</div>
      </div>
    ) : (
      "We’re sorry, there are no nearby routes or stops matching your filters and location."
    )}
  </div>
);

const TransitNearMe = ({
  mapData,
  mapId,
  query,
  stopsWithDistances,
  routesWithRealtimeSchedules,
  stopsWithRoutes,
  selectedStopId = null
}: Props): ReactElement<HTMLElement> => {
  const selectedModes = modesFromQuery(query);
  const initialStateWithModes: State = {
    ...initialState,
    selectedModes,
    stopsWithDistances,
    shouldFilterStopCards: selectedModes.length > 0,
    routesWithRealtimeSchedules,
    stopsWithRoutes,
    selectedStopId
  };
  const [state, dispatch] = useReducer(reducer, initialStateWithModes);
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef && mapRef.current && mapData.markers.length > 0) {
      /* istanbul ignore next */
      // @ts-ignore
      mapRef.current!.scrollIntoView();
    }
  }, [mapData.markers.length, state.stopsWithRoutes.length]);
  const selectedStop = getSelectedStop(
    state.stopsWithRoutes,
    state.selectedStopId
  );

  /* istanbul ignore next */
  useInterval(
    () =>
      fetchRealtimeSchedules(
        stopsWithDistances.stops.map(stop => stop.id),
        dispatch
      ),
    30000,
    true
  );

  return (
    <div className="m-tnm">
      {state.routesView ? (
        <RoutesSidebar
          selectedStop={selectedStop}
          selectedModes={state.selectedModes}
          selectedStopId={state.selectedStopId}
          dispatch={dispatch}
          data={state.routesWithRealtimeSchedules}
          shouldFilterStopCards={state.shouldFilterStopCards}
          emptyMessage={emptyMessage(state.pendingFirstData)}
        />
      ) : (
        <StopsSidebar
          selectedModes={state.selectedModes}
          selectedStopId={state.selectedStopId}
          dispatch={dispatch}
          data={state.stopsWithRoutes}
          shouldFilterStopCards={state.shouldFilterStopCards}
          emptyMessage={emptyMessage(state.pendingFirstData)}
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
          stopData={state.stopsWithRoutes}
          shouldFilterMarkers={state.shouldFilterStopCards}
          shouldCenterMapOnSelectedStop={state.shouldCenterMapOnSelectedStop}
        />
      </div>
    </div>
  );
};

export default TransitNearMe;
