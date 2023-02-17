/* eslint-disable react/prefer-stateless-function */
import React, { ReactElement } from "react";
import StopCard from "../../components/StopCard";
import {
  Direction,
  StopWithDirections,
  RouteWithStopsWithDirections,
  Alert
} from "../../__v3api";
import { Dispatch } from "../state";
import { directionIsEmpty } from "../../components/Direction";
import { modeByV3ModeType } from "../../components/ModeFilter";
import RouteCardHeader from "../../components/RouteCardHeader";
import { isABusRoute } from "../../models/route";
import useSWR from "swr";
import { isHighSeverityOrHighPriority } from "../../models/alert";
import { fetchJsonOrThrow, isFetchFailed } from "../../helpers/fetch-json";

interface Props {
  route: RouteWithStopsWithDirections;
  dispatch: Dispatch;
}

const everyDirectionIsEmpty = (directions: Direction[]): boolean =>
  directions.every(directionIsEmpty);

export const fetchAlerts = async (routeId: string): Promise<Alert[]> => {
  const results = await fetchJsonOrThrow<Alert[]>(
    `/api/alerts?route_ids=${routeId}`
  );
  if (isFetchFailed(results)) {
    throw new Error(
      `Failed to fetch Alert information: ${results.status} ${results.statusText}`
    );
  }

  let alerts: Alert[] = [];
  alerts = results.filter(isHighSeverityOrHighPriority) as Alert[];
  return alerts;
};

export const isDefined = (arg: any): Alert[] => {
  return arg !== undefined ? arg : [];
};

const routeIsEmpty = (route: RouteWithStopsWithDirections): boolean =>
  route.stops_with_directions.every(stop =>
    everyDirectionIsEmpty(stop.directions)
  );

const filterStops = (
  route: RouteWithStopsWithDirections
): StopWithDirections[] => {
  // show the closest two stops for bus, in order to display both inbound and outbound stops

  const count = isABusRoute(route.route) ? 2 : 1;
  return route.stops_with_directions.slice(0, count);
};

const RouteCard = ({
  route,
  dispatch
}: Props): ReactElement<HTMLElement> | null => {
  const mode = modeByV3ModeType[route.route.type];

  if (routeIsEmpty(route)) {
    return null;
  }

  return (
    <div className="m-tnm-sidebar__route" data-mode={mode}>
      <RouteCardHeader
        route={route.route}
        alerts={isDefined(
          useSWR<Alert[]>(`${route.route.id}`, fetchAlerts).data
        )}
      />
      {filterStops(route).map(
        stopWithDirections =>
          !everyDirectionIsEmpty(stopWithDirections.directions) && (
            <StopCard
              key={stopWithDirections.stop.id}
              stop={stopWithDirections.stop}
              distance={stopWithDirections.distance}
              directions={stopWithDirections.directions}
              route={route.route}
              dispatch={dispatch}
            />
          )
      )}
    </div>
  );
};

export default RouteCard;
