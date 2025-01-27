import React, { ReactElement } from "react";
import { isStopAStation } from "../../helpers/stops";
import { Alert, Facility, Stop } from "../../__v3api";
import ExternalMapLink from "./ExternalMapLink";
import ParkingAmenityCard from "./amenities/ParkingAmenityCard";
import BikeStorageAmenityCard from "./amenities/BikeStorageAmenityCard";
import AccessibilityAmenityCard from "./amenities/AccessibilityAmenityCard";
import FareSalesAmenityCard from "./amenities/FareSalesAmenityCard";
import StationAmenityCard from "./amenities/StationAmenityCard";
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
  const elevators = facilities.filter(
    ({ attributes }) => attributes.type === "ELEVATOR"
  );
  const escalators = facilities.filter(
    ({ attributes }) => attributes.type === "ESCALATOR"
  );
  const showBikeInfo = isStation || stop.bike_storage.length > 0;
  const showParkingInfo = isStation || stop.parking_lots.length > 0;

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
      <div className="station-amenities u-mt-24">
        {(showBikeInfo || showParkingInfo) && (
          <h3 className="hidden-md-up">Bringing your car or bike</h3>
        )}
        {showParkingInfo && (
          <ParkingAmenityCard
            stop={stop}
            alertsForParking={filterParkingAlerts(alerts)}
          />
        )}
        {showBikeInfo && (
          <BikeStorageAmenityCard
            stopName={stop.name}
            bikeStorage={stop.bike_storage}
            alerts={alertsByActivity(alerts, "store_bike")}
          />
        )}
        {isStation && (
          <>
            <h3 className="hidden-md-up">Getting around the station</h3>
            <StationAmenityCard
              stopName={stop.name}
              alerts={alertsByFacility(elevators, alerts)}
              facilities={elevators}
              facilityType="Elevator"
            />
            <StationAmenityCard
              stopName={stop.name}
              alerts={alertsByFacility(escalators, alerts)}
              facilities={escalators}
              facilityType="Escalator"
            />
          </>
        )}
        <AccessibilityAmenityCard
          accessibleFeatures={stop.accessibility}
          stopName={stop.name}
          isStation={isStation}
        />
        {isStation && <h3 className="hidden-md-up">Purchasing fares</h3>}
        <FareSalesAmenityCard stop={stop} />
      </div>
    </div>
  );
};

export default StationInformation;
