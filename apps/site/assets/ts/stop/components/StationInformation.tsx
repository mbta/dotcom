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
import {
  alertsByActivity,
  alertsByFacility,
  filterParkingAlerts
} from "../../models/alert";

const StationInformation = ({
  stop,
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

  const elevators = facilitiesByType.get("ELEVATOR")!;
  const escalators = facilitiesByType.get("ESCALATOR")!;

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
            <ParkingAmenityCard
              stop={stop}
              alertsForParking={filterParkingAlerts(alerts)}
            />
            <BikeStorageAmenityCard
              stopName={stop.name}
              bikeStorage={stop.bike_storage}
              alerts={alertsByActivity(alerts, "store_bike")}
            />
          </>
        )}
        {isStation && (
          <>
            <h3 className="hidden-md-up">Getting Around the Station</h3>
            <ElevatorsAmenityCard
              stopName={stop.name}
              alerts={alertsByFacility(
                elevators !== undefined ? elevators : [],
                alerts
              )}
              elevatorFacilities={elevators !== undefined ? elevators : []}
            />
            <EscalatorsAmenityCard
              stopName={stop.name}
              alerts={alertsByFacility(
                escalators !== undefined ? escalators : [],
                alerts
              )}
              escalatorFacilities={escalators !== undefined ? escalators : []}
            />
          </>
        )}
        <AccessibilityAmenityCard
          accessibleFeatures={stop.accessibility}
          stopName={stop.name}
          isStation={isStation}
        />
        {isStation && <h3 className="hidden-md-up">Purchasing Fares</h3>}
        <FareSalesAmenityCard />
      </div>
    </div>
  );
};

export default StationInformation;
