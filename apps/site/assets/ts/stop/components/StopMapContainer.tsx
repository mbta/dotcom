import React, { ReactElement } from "react";
import StopMap from "./StopMap";
import { Stop, Route } from "../../__v3api";
import { StopMapData } from "../components/__stop";
import { SelectedStopType, Dispatch } from "../state";

interface Props {
  initialData: StopMapData;
  mapId: string;
  stop: Stop;
  routes: Route[];
  selectedStopId: SelectedStopType;
  dispatch: Dispatch;
}

const StopMapContainer = ({
  initialData,
  mapId,
  stop,
  routes,
  selectedStopId,
  dispatch
}: Props): ReactElement<HTMLElement> => (
  <div className="m-stop-page__hero-map">
    <h3 className="sr-only">Map</h3>
    <div
      id={mapId}
      role="application"
      aria-label="Map with stop"
      className="m-stop-page__hero-map-container"
    >
      <noscript>
        <div className="m-stop-page__hero-map-container">
          <a
            href={`https://maps.google.com/?q=${stop.address}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              className="map-static map-static-img"
              alt={`Map of ${stop.name} and surrounding area`}
              srcSet={initialData.map_srcset}
              sizes="(min-width: 1344px) 1099w,
        (min-width: 1088px) 734w,
        (min-width: 800px) 694w,
        calc(100vw - 1.5rem)"
              src={initialData.map_url}
            />
          </a>
        </div>
      </noscript>

      <StopMap
        mapElementId={mapId}
        dispatch={dispatch}
        selectedStopId={selectedStopId}
        initialData={initialData}
        stop={stop}
        routes={routes}
      />
    </div>
  </div>
);

export default StopMapContainer;
