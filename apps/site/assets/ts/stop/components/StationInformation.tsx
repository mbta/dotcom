import React, { ReactElement } from "react";
import { isStopAStation } from "../../helpers/stops";
import { Stop } from "../../__v3api";
import ExternalMapLink from "./ExternalMapLink";

const StationInformation = ({
  stop
}: {
  stop: Stop;
}): ReactElement<HTMLElement> => {
  return (
    <div>
      <h2>
        {isStopAStation(stop) ? "Station Information" : "Stop Information"}
      </h2>
      <ExternalMapLink
        address={stop.address}
        municipality={stop.municipality}
        name={stop.name}
        latitude={stop.latitude}
        longitude={stop.longitude}
      />
      {/* when amenities are actually fetched there are headings specific to certain amenities */}
      {isStopAStation(stop) ? <h3>Bringing Your Car or Bike</h3> : null}
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
