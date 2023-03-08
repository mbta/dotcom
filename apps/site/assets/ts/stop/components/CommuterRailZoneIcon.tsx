import React, { ReactElement } from "react";
import { Stop } from "../../__v3api";
import { TypedRoutes } from "./__stop";
import ModeIcons from "./ModeIcons";

const crZone = (zoneNumber?: string): ReactElement<HTMLElement> | false =>
  !!zoneNumber &&
  zoneNumber.length > 0 && (
    <div className="m-stop-page__header-feature">
      <span className="m-stop-page__icon c-icon__cr-zone">
        {`Zone ${zoneNumber}`}
      </span>
    </div>
  );

const CommuterRailZoneIcon = ({
  zoneNumber
}: {
  zoneNumber?: string;
}): ReactElement<HTMLElement> => {
  // TODO replace type with actual data type

  return <>{crZone(zoneNumber)}</>;
};

export { CommuterRailZoneIcon as default };
