import React, { ReactElement } from "react";

const crZone = (zoneNumber?: string): ReactElement<HTMLElement> | false => {
  return (
    !!zoneNumber &&
    zoneNumber.length > 0 && (
      <div className="m-stop-page__header-feature">
        <span className="m-stop-page__icon c-icon__cr-zone">
          Zone {zoneNumber}
        </span>
      </div>
    )
  );
};

const CommuterRailZoneIcon = ({
  zoneNumber
}: {
  zoneNumber?: string;
}): ReactElement<HTMLElement> => {
  return <>{crZone(zoneNumber)}</>;
};

export { CommuterRailZoneIcon as default };
