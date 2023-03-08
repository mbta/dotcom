import React, { ReactElement } from "react";
import { Stop } from "../../__v3api";
import { TypedRoutes } from "./__stop";
import ModeIcons from "./ModeIcons";
import CommuterRailZoneIcon from "./CommuterRailZoneIcon";
import ParkingIcon from "./ParkingIcon";
import StopAccessibilityIcon from "./StopAccessibilityIcon";
import { typedRoutesHasBusRoute } from "../../helpers/routes";

const StopFeatures = ({
  stop,
  typedRoutes
}: {
  stop: Stop;
  typedRoutes: TypedRoutes[];
}): ReactElement<HTMLElement> => {
  return (
    <span className="m-stop-page__header-features-redesign">
      <ModeIcons typedRoutes={typedRoutes} />
      <CommuterRailZoneIcon zoneNumber={stop.zone} />
      <StopAccessibilityIcon
        stop={stop}
        isBusStop={typedRoutesHasBusRoute(typedRoutes)}
      />
      <ParkingIcon stop={stop} />
    </span>
  );
};

export default StopFeatures;
