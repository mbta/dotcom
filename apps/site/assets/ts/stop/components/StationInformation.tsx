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
  const isStation = isStopAStation(stop);
  return (
    <div>
      <h2>{isStation ? "Station Information" : "Stop Information"}</h2>
      <ExternalMapLink
        address={stop.address}
        municipality={stop.municipality}
        name={stop.name}
        latitude={stop.latitude}
        longitude={stop.longitude}
      />
      <div className="station-amenities mt-24">
        {isStation && (
          <>
            <h3 className="hidden-sm-up">Bringing Your Car or Bike</h3>
            <ParkingAmenityCard />
            <BikeStorageAmenityCard />
          </>
        )}
        <h3 className="hidden-sm-up">Getting Around the Station</h3>
        {isStation && (
          <>
            <ElevatorsAmenityCard />
            <EscalatorsAmenityCard />
          </>
        )}
        <AccessibilityAmenityCard />
        <h3 className="hidden-sm-up">Purchasing Fares</h3>
        <FareSalesAmenityCard />
      </div>
    </div>
  );
};

export default StationInformation;
