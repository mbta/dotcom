import React, { ReactElement } from "react";
import { StopMapData, RouteWithDirection } from "./__stop";
import Map from "../../leaflet/components/Map";
import MapTooltip from "../../leaflet/components/MapTooltip";
import { EnhancedRoute, Stop } from "../../__v3api";

interface Props {
  initialData: StopMapData;
  stop: Stop;
  routesWithDirection?: RouteWithDirection[];
  routes: EnhancedRoute[];
}

const StopMap = ({
  // eslint-disable-next-line camelcase
  initialData: { map_data: mapData },
  stop,
  routes,
  routesWithDirection
}: Props): ReactElement<HTMLElement> => (
  <Map
    mapData={{
      ...mapData,
      zoom: mapData.zoom || 12,
      markers: mapData.markers.map(marker => ({
        ...marker,
        tooltip: (
          <MapTooltip
            stop={stop}
            routes={routes}
            routesWithDirection={routesWithDirection}
          />
        )
      }))
    }}
  />
);

export default StopMap;
