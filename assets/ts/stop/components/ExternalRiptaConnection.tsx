import React, { ReactElement } from "react";
import PillLink from "./PillLink";
import { Stop } from "../../__v3api";

// Hard code the known stops
const riptaStopIDs = [
  "place-NEC-1851",
  "place-NEC-1891",
  "place-NEC-1768",
  "place-NEC-1659"
];

// used to display the external link to the ripta website
const containsRIPTARoute = (stop: Stop): boolean => {
  return riptaStopIDs.includes(stop.id);
};

const ExternalRiptaConnection = ({
  stop
}: {
  stop: Stop;
}): ReactElement<HTMLElement> => {
  if (containsRIPTARoute(stop)) {
    return (
      <div className="u-mt-16 m-external-connections">
        <div className="u-small-caps font-bold">EXTERNAL CONNECTIONS</div>
        <div className="m-route-pills">
          <PillLink
            displayText="RIPTA"
            linkURL="https://www.ripta.com/"
            backgroundColor="gray"
            externalLink
          />
        </div>
      </div>
    );
  }

  return <></>;
};

export default ExternalRiptaConnection;
