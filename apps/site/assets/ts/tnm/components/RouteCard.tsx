/* eslint-disable react/prefer-stateless-function */
import React, { ReactElement } from "react";
import StopCard from "../../components/StopCard";
import {
  Direction,
  StopWithDirections,
  RouteWithStopsWithDirections
} from "../../__v3api";
import { Dispatch } from "../state";
import { directionIsEmpty } from "../../components/Direction";
import { modeByV3ModeType } from "../../components/ModeFilter";
import { alertIcon } from "../../helpers/icon";

interface Props {
  route: RouteWithStopsWithDirections;
  dispatch: Dispatch;
}

const everyDirectionIsEmpty = (directions: Direction[]): boolean =>
  directions.every(directionIsEmpty);

const routeIsEmpty = (route: RouteWithStopsWithDirections): boolean =>
  route.stops_with_directions.every(stop =>
    everyDirectionIsEmpty(stop.directions)
  );

const filterStops = (
  route: RouteWithStopsWithDirections
): StopWithDirections[] => {
  // show the closest two stops for bus, in order to display both inbound and outbound stops

  const count = route.route.type === 3 ? 2 : 1;
  return route.stops_with_directions.slice(0, count);
};

export const isSilverLine = ({
  route
}: RouteWithStopsWithDirections): boolean => {
  const mapSet: { [routeId: string]: boolean } = {
    "741": true,
    "742": true,
    "743": true,
    "746": true,
    "749": true,
    "751": true
  };

  return mapSet[route.id] || false;
};

export const routeBgColor = (route: RouteWithStopsWithDirections): string => {
  if (route.route.type === 2) return "commuter-rail";
  if (route.route.type === 4) return "ferry";
  if (route.route.id === "Red" || route.route.id === "Mattapan")
    return "red-line";
  if (route.route.id === "Orange") return "orange-line";
  if (route.route.id === "Blue") return "blue-line";
  if (route.route.id.startsWith("Green-")) return "green-line";
  if (isSilverLine(route)) return "silver-line";
  if (route.route.type === 3) return "bus";
  return "unknown";
};

export const busClass = (route: RouteWithStopsWithDirections): string =>
  route.route.type === 3 && !isSilverLine(route) ? "bus-route-sign" : "";

const RouteCard = ({
  route,
  dispatch
}: Props): ReactElement<HTMLElement> | null => {
  const mode = modeByV3ModeType[route.route.type];
  const bgClass = `u-bg--${routeBgColor(route)}`;

  if (routeIsEmpty(route)) {
    return null;
  }

  return (
    <div className="m-tnm-sidebar__route" data-mode={mode}>
      <a
        href={`/schedules/${route.route.id}`}
        className={`h3 m-tnm-sidebar__route-name ${bgClass}`}
      >
        <span className={busClass(route)}>{route.route.header}</span>
        {route.route.alert_count
          ? alertIcon("m-tnm-sidebar__route-alert")
          : null}
      </a>
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
