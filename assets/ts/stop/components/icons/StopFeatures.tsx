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
    <span className="m-stop-page__header-features u-mb-6">
      <ModeIcons
        routes={routes.filter(
          route => route.description !== "rail_replacement_bus"
        )}
      />
      <CommuterRailZoneIcon zoneNumber={stop.zone} />
      <AccessibilityIcon stop={stop} />
      <ParkingIcon stop={stop} />
    </span>
  );
};

export default StopFeatures;
