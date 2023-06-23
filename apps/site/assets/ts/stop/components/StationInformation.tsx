import React, { ReactElement } from "react";
import { isStopAStation } from "../../helpers/stops";
import { Alert, Facility, Stop } from "../../__v3api";
import ExternalMapLink from "./ExternalMapLink";
import ParkingAmenityCard from "./amenities/ParkingAmenityCard";
import BikeStorageAmenityCard from "./amenities/BikeStorageAmenityCard";
import ElevatorsAmenityCard from "./amenities/ElevatorsAmenityCard";
import EscalatorsAmenityCard from "./amenities/EscalatorsAmenityCard";
import AccessibilityAmenityCard from "./amenities/AccessibilityAmenityCard";
import FareSalesAmenityCard from "./amenities/FareSalesAmenityCard";

const StationInformation = ({
  stop,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  alerts,
  facilities
}: {
  stop: Stop;
  alerts: Alert[];
  facilities: Facility[];
}): ReactElement<HTMLElement> => {
  const isStation = isStopAStation(stop);

  const facilitiesByType = new Map<string, Facility[]>();

  facilities.forEach((facility: Facility) => {
    const { type } = facility.attributes;
    if (facilitiesByType.has(type)) {
      facilitiesByType.get(type)?.push(facility);
    } else {
      facilitiesByType.set(type, [facility]);
    }
  });

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
            <h3 className="hidden-md-up">Bringing Your Car or Bike</h3>
            <ParkingAmenityCard />
            <BikeStorageAmenityCard />
          </>
        )}
        {isStation && (
          <>
            <h3 className="hidden-md-up">Getting Around the Station</h3>
            <ElevatorsAmenityCard />
            <EscalatorsAmenityCard />
          </>
        )}
        <AccessibilityAmenityCard />
        {isStation && <h3 className="hidden-md-up">Purchasing Fares</h3>}
        <FareSalesAmenityCard />
      </div>
    </div>
  );
};

export default StationInformation;
