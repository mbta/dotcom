import React, { ReactElement } from "react";
import { StopMapData } from "./__stop";
import { SelectedStopType, Dispatch } from "../state";
import Map from "../../leaflet/components/Map";
import MapTooltip from "../../leaflet/components/MapTooltip";
import { EnhancedRoute, Stop } from "../../__v3api";

interface Props {
  initialData: StopMapData;
  mapElementId: string;
  dispatch: Dispatch;
  selectedStopId: SelectedStopType;
  stop: Stop;
  routes: EnhancedRoute[];
}

export default ({
  // eslint-disable-next-line @typescript-eslint/camelcase
  initialData: { map_data: mapData },
  stop,
  routes
}: Props): ReactElement<HTMLElement> => (
  <Map
    mapData={{
      ...mapData,
      zoom: mapData.zoom || 12,
      markers: mapData.markers.map(marker => ({
        ...marker,
        tooltip: <MapTooltip stop={stop} routes={routes} />
      }))
    }}
  />
);
