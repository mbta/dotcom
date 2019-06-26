import React, { ReactElement } from "react";
import { Stop, EnhancedRoute } from "../../__v3api";
import StopCard from "../../stop/components/StopCard";

export interface Props {
  stop: Stop;
  routes: EnhancedRoute[];
  distanceFormatted?: string;
}

const MapTooltip = ({
  stop,
  routes,
  distanceFormatted
}: Props): ReactElement<HTMLElement> => (
  <StopCard routes={routes} stop={stop} distanceFormatted={distanceFormatted} />
);

export default MapTooltip;
