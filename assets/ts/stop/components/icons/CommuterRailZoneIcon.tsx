import React, { ReactElement } from "react";

const CommuterRailZoneIcon = ({
  zoneNumber
}: {
  zoneNumber?: string;
}): ReactElement<HTMLElement> => {
  if (!zoneNumber || zoneNumber.length === 0) {
    return <></>;
  }

  return (
    <div className="m-stop-page__header-feature u-mt-n5">
      <span className="m-stop-page__icon c-icon__cr-zone">
        Zone {zoneNumber}
      </span>
    </div>
  );
};

export default CommuterRailZoneIcon;
