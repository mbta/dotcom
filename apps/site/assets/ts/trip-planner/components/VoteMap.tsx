import React, { ReactElement } from "react";
import Map from "../../leaflet/components/Map";
import { MapData } from "../../leaflet/components/__mapdata";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pollingLocations: any[];
}

const exampleMapData: MapData = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  default_center: {
    longitude: -72.05891,
    latitude: 44.360718
  },
  height: 250,
  markers: [],
  polylines: [],
  // eslint-disable-next-line @typescript-eslint/camelcase
  tile_server_url: "https://mbta-map-tiles-dev.s3.amazonaws.com",
  width: 735,
  zoom: 16
};

const VoteMap = ({ pollingLocations }: Props): ReactElement<HTMLElement> => (
  <>
    <h2>I am a map</h2>
    <p>Polling locations TBD: {JSON.stringify(pollingLocations)}</p>
    <div style={{ height: "400px" }}>
      <Map mapData={exampleMapData} />
    </div>
  </>
);

export default VoteMap;
