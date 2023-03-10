import React, { ReactElement } from "react";
import { Stop } from "../../__v3api";
import { parkingIcon } from "../../helpers/icon";

const ParkingIcon = ({ stop }: { stop: Stop }): ReactElement<HTMLElement> => {
  if (stop.parking_lots.length === 0) {
    return <></>;
  }
  return (
    <div className="m-stop-page__header-feature">
      <span className="m-stop-page__icon">{parkingIcon()}</span>
    </div>
  );
};

export { ParkingIcon as default };
