import React, { ReactElement } from "react";
import { Stop } from "../../__v3api";
import ExternalMapLink from "./ExternalMapLink";

const StationInformation = ({
  stop
}: {
  stop: Stop;
}): ReactElement<HTMLElement> => {
  return (
    <div>
      <div>Station information PLACEHOLDER</div>
      <ExternalMapLink
        address={stop.address}
        municipality={stop.municipality}
        name={stop.name}
        latitude={stop.latitude}
        longitude={stop.longitude}
      />
      {/* when amenities are actually fetched there are headings specific to certain amenities */}
      {stop?.["station?"] ? <h3>Bringing Your Car or Bike</h3> : null}
      <div>Station Status Blocks PLACEHOLDER</div>
      <div className="station-amenities">
        <div className="station-amenity" />
        <div className="station-amenity" />
        <div className="station-amenity" />
        <div className="station-amenity" />
        <div className="station-amenity" />
      </div>
    </div>
  );
};

export default StationInformation;
