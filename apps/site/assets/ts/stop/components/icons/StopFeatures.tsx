import React, { ReactElement } from "react";
import { Route, Stop } from "../../../__v3api";
import ModeIcons from "./ModeIcons";
import CommuterRailZoneIcon from "./CommuterRailZoneIcon";
import ParkingIcon from "./ParkingIcon";
import AccessibilityIcon from "./AccessibilityIcon";

const StopFeatures = ({
  stop,
  routes
}: {
  stop: Stop;
  routes: Route[];
}): ReactElement<HTMLElement> => {
  return (
    <span className="m-stop-page__header-features mb-6">
      <ModeIcons routes={routes} />
      <CommuterRailZoneIcon zoneNumber={stop.zone} />
      <AccessibilityIcon stop={stop} routes={routes} />
      <ParkingIcon stop={stop} />
    </span>
  );
};

export default StopFeatures;
