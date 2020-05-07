import React, { ReactElement } from "react";
import { Stop, EnhancedRoute } from "../../__v3api";
import StopCard from "../../stop/components/StopCard";
import { RouteWithDirection } from "../../stop/components/__stop";

export interface Props {
  stop: Stop;
  routesWithDirection?: RouteWithDirection[];
  routes: EnhancedRoute[];
  distanceFormatted?: string;
}

const MapTooltip = ({
  stop,
  routesWithDirection,
  routes,
  distanceFormatted
}: Props): ReactElement<HTMLElement> => (
  <StopCard
    routes={routes}
    routesWithDirection={routesWithDirection}
    stop={stop}
    distanceFormatted={distanceFormatted}
  />
);

export default MapTooltip;
