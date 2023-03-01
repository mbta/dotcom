import React, { ReactElement } from "react";
import { Stop } from "../../__v3api";
import ExternalMapLink from "./ExternalMapLink";

const StationInformation = ({
  stop
}: {
  stop: Stop;
}): ReactElement<HTMLElement> => {
  return (
    <div>
      <div>Station information PLACEHOLDER</div>
      {
        <ExternalMapLink
          address={stop.address}
          municipality={stop.municipality}
          name={stop.name}
          latitude={stop.latitude}
          longitude={stop.longitude}
        />
      }
      <div>Station Status Blocks PLACEHOLDER</div>
    </div>
  );
};

export default StationInformation;
