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
import { useAlertsByStopAmenities } from "../../hooks/useAlerts";

const StationInformation = ({
  stop
}: {
  stop: Stop;
}): ReactElement<HTMLElement> => {
  const alertsForAmenities = useAlertsByStopAmenities(stop.id);
  console.log(alertsForAmenities);
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
      <div className="station-amenities mt-24">
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
