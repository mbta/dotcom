import React from "react";
import AmenityCard, {
  AmenityImage,
  AmenityLink,
  AmenityModal
} from "./AmenityCard";
import { bikeIcon } from "../../../helpers/icon";
import { Alert, BikeStorageType } from "../../../__v3api";
import Alerts from "../../../components/Alerts";
import Badge from "../../../components/Badge";

const availabilityMessage = (
  pedal: boolean,
  covered: boolean,
  outdoor: boolean
): string => {
  if (pedal) {
    return "Secured parking is available but requires Charlie Card registration in advance.";
  }
  if (covered && outdoor) {
    return "Covered and outdoor bike racks are available.";
  }
  if (covered) return "Covered bike racks are available.";
  if (outdoor) return "Outdoor bike racks are available.";
  return "This station does not have bike storage.";
};

const BikeStorageAmenityCard = ({
  stopName,
  bikeStorage,
  alerts
}: {
  stopName: string;
  bikeStorage: BikeStorageType[];
  alerts: Alert[];
}): JSX.Element => {
  const hasBikeFacilityAlert = alerts.length > 0;
  const hasBikeStorage = bikeStorage.length > 0;
  // inferred from gtfs_creator: these 3 Bike storage facility types
  const hasPedalAndPark = bikeStorage.includes("bike_storage_cage");
  const hasOutdoorRack = bikeStorage.includes("bike_storage_rack");
  const hasEnclosedRack = bikeStorage.includes("bike_storage_rack_covered");

  const cardBadge = (): React.ReactNode => {
    if (hasBikeFacilityAlert) {
      return <Badge text="Temporarily closed" />;
    }
    if (!hasBikeStorage) {
      return <Badge text="Not available" bgClass="u-bg--gray-lighter" />;
    }
    return null;
  };

  return (
    <AmenityCard
      headerText="Bike Storage"
      icon={bikeIcon("c-svg__icon u-flex-align-self-end")}
      badge={cardBadge()}
      modalContent={
        hasBikeStorage && (
          <AmenityModal headerText={`Bike Storage at ${stopName}`}>
            {hasBikeFacilityAlert && <Alerts alerts={alerts} />}
            <h2 className="text-2xl">Facility Information</h2>
            {hasPedalAndPark && (
              <AmenityImage
                className="u-mt-8 u-mb-1"
                src="https://cdn.mbta.com/sites/default/files/styles/max_2600x2600/public/media/2020-07/bike-parking-back-bay.jpg"
                altText="MBTA Pedal and Park bike storage"
              />
            )}
            <ul>
              {hasPedalAndPark && (
                <li>
                  Free Pedal and Park secured parking (requires{" "}
                  <a href="/fares/charliecard-and-charlieticket-online-services">
                    CharlieCard{" "}
                  </a>
                  registration in advance)
                </li>
              )}
              {hasEnclosedRack && <li>Covered bike racks</li>}
              {hasOutdoorRack && <li>Outdoor bike racks</li>}
            </ul>
            {hasPedalAndPark && (
              <AmenityLink
                url="https://bc.mbta.com/riding_the_t/bikes/register/Default.asp"
                text="Register your CharlieCard for bike parking"
              />
            )}
            <AmenityLink
              url="/bikes/bike-parking"
              text="Learn more about bike parking at the T"
            />
          </AmenityModal>
        )
      }
    >
      {hasBikeFacilityAlert
        ? "Learn more about bike storage at this station."
        : availabilityMessage(hasPedalAndPark, hasEnclosedRack, hasOutdoorRack)}
    </AmenityCard>
  );
};

export default BikeStorageAmenityCard;
