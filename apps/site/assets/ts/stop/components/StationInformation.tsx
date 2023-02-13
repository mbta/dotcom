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
      {stop.address && <ExternalMapLink address={stop.address} />}
      <div>Station Status Blocks PLACEHOLDER</div>
    </div>
  );
};

export default StationInformation;
