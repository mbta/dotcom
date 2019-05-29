import React, { ReactElement } from "react";
import { Stop, Route } from "../../__v3api";
import StopCard from "../../stop/components/StopCard";

export interface Props {
  stop: Stop;
  routes: Route[];
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
