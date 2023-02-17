import React, { ReactElement, useEffect } from "react";
import { modeByV3ModeType } from "../../components/ModeFilter";
import { Dispatch } from "../state";
import { Alert, Mode, RouteWithStopsWithDirections, Stop } from "../../__v3api";
import RouteCard from "./RouteCard";
import RouteSidebarPills from "./RouteSidebarPills";
import ModeFilterContainer from "./ModeFilterContainer";
import SidebarTitle from "./SidebarTitle";
import { fetchJsonOrThrow, isFetchFailed } from "../../helpers/fetch-json";
import { isHighSeverityOrHighPriority } from "../../models/alert";
import useSWR from "swr";

interface Props {
  data: RouteWithStopsWithDirections[];
  dispatch: Dispatch;
  selectedStopId: string | null;
  shouldFilterStopCards: boolean;
  selectedStop: Stop | undefined;
  selectedModes: Mode[];
  emptyMessage: ReactElement<HTMLElement>;
}

interface FilterOptions {
  stopId: string | null;
  modes: Mode[];
}

export const fetchAlerts = async (routeId: string): Promise<Alert[]> => {
  const results = await fetchJsonOrThrow<Alert[]>(
    `/api/alerts?route_ids=${routeId}`
  );

  if (isFetchFailed(results)) {
    // 404s here are a known failure mode, see finder_api.ex#get_trip_info
    throw new Error(
      `Failed to fetch Alert information: ${results.status} ${results.statusText}`
    );
  }

  let alerts: Alert[] = [];
  results.filter(isHighSeverityOrHighPriority);
  for (let i = 0; i < results.length; i++) {
    alerts.push(results[i] as Alert);
  }
  return alerts;
};

export const isUndefined = (arg: any): any => {
  if (arg == undefined) {
    return [];
  }
  return arg;
};

//fetchAlerts("Orange").then(function(val) {console.log(val[0] instanceof Alert)});
// export const fetchAlerts = async (
//   routeId: string,
// ): Promise<Alert[]> => {
//   let alerts: Alert[] = [];
//   window.fetch &&
//   window
//     .fetch(`/api/alerts?route_ids=${routeId}`)
//     .then(response => {
//       if (response.ok) return response.json();
//       throw new Error(response.statusText);
//     })
//     .then(result => {
//         for (let alert in result) {
//           alerts.push(JSON.parse(alert) as Alert);
//         }
//     console.log(alerts);

//       return alerts;
//     })
//     console.log(alerts);
//     return alerts;
// };

const filterDataByModes = (
  data: RouteWithStopsWithDirections[],
  { modes }: FilterOptions
): RouteWithStopsWithDirections[] => {
  // if there are no selections or all selections, do not filter
  if (modes.length === 0 || modes.length === 3) {
    return data;
  }
  return data.filter(route =>
    modes.reduce((accumulator: boolean, mode: Mode) => {
      if (accumulator === true) {
        return accumulator;
      }
      return modeByV3ModeType[route.route.type] === mode;
    }, false)
  );
};

const filterDataByStopId = (
  data: RouteWithStopsWithDirections[],
  { stopId }: FilterOptions
): RouteWithStopsWithDirections[] => {
  if (stopId === null) {
    return data;
  }
  return data.reduce(
    (
      accumulator: RouteWithStopsWithDirections[],
      route: RouteWithStopsWithDirections
    ): RouteWithStopsWithDirections[] => {
      // eslint-disable-next-line camelcase
      const stops = route.stops_with_directions.filter(
        // eslint-disable-next-line camelcase
        stop_with_directions => stop_with_directions.stop.id === stopId
      );
      if (stops.length === 0) {
        return accumulator;
      }
      // eslint-disable-next-line camelcase
      return accumulator.concat({ ...route, stops_with_directions: stops });
    },
    []
  );
};

export const filterData = (
  data: RouteWithStopsWithDirections[],
  selectedStopId: string | null,
  selectedModes: Mode[],
  shouldFilter: boolean
): RouteWithStopsWithDirections[] => {
  if (shouldFilter === false) {
    return data;
  }

  const options: FilterOptions = {
    stopId: selectedStopId,
    modes: selectedModes
  };

  return [filterDataByStopId, filterDataByModes].reduce(
    (accumulator, fn) => fn(accumulator, options),
    data
  );
};

const RoutesSidebar = ({
  data,
  dispatch,
  selectedModes,
  selectedStopId,
  selectedStop,
  shouldFilterStopCards,
  emptyMessage
}: Props): ReactElement<HTMLElement> => {
  const filteredData = filterData(
    data,
    selectedStopId,
    selectedModes,
    shouldFilterStopCards
  );

  // const alerts = new Map<String, Alert[]>();

  // useEffect(() => {
  // filteredData.length > 0 ? filteredData.forEach(route => alerts.set(route.route.id, (useSWR<Alert[]>(`/api/alerts?route_ids=${"Orange"}`, fetchAlerts).data))) : [];
  // console.log(alerts);
  // });

  return (
    <div className="m-tnm-sidebar">
      <div className="m-tnm-sidebar__fixed-header">
        <div className="m-tnm-sidebar__fixed-header-inner">
          <ModeFilterContainer
            selectedModes={selectedModes}
            dispatch={dispatch}
          />
          <RouteSidebarPills
            selectedStop={selectedStop}
            showPill={shouldFilterStopCards}
            dispatch={dispatch}
          />
        </div>
      </div>
      <div className="m-tnm-sidebar__inner">
        <SidebarTitle dispatch={dispatch} viewType="Routes" />

        <div className="m-tnm-sidebar__cards">
          {filteredData.length > 0
            ? filteredData.map(route => (
                <RouteCard
                  key={route.route.id}
                  route={route}
                  dispatch={dispatch}
                  alerts={isUndefined(
                    useSWR<Alert[]>(
                      `/api/alerts?route_ids=${"Orange"}`,
                      fetchAlerts
                    ).data
                  )}
                />
              ))
            : emptyMessage}
        </div>
      </div>
    </div>
  );
};
export default RoutesSidebar;
