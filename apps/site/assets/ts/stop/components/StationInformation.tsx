import React, { ReactElement } from "react";
import { isStopAStation } from "../../helpers/stops";
import { Stop } from "../../__v3api";
import ExternalMapLink from "./ExternalMapLink";
import ParkingAmenityCard from "./amenities/ParkingAmenityCard";
import BikeStorageAmenityCard from "./amenities/BikeStorageAmenityCard";
import ElevatorsAmenityCard from "./amenities/ElevatorsAmenityCard";
import EscalatorsAmenityCard from "./amenities/EscalatorsAmenityCard";
import AccessibilityAmenityCard from "./amenities/AccessibilityAmenityCard";
import FareSalesAmenityCard from "./amenities/FareSalesAmenityCard";

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
      <div className="station-amenities">
        <ParkingAmenityCard />
        <BikeStorageAmenityCard />
        <ElevatorsAmenityCard />
        <EscalatorsAmenityCard />
        <AccessibilityAmenityCard />
        <FareSalesAmenityCard />
      </div>
    </div>
  );
};

export default StationInformation;
