import React, { ReactElement } from "react";
import { Route, Stop } from "../../../__v3api";
import { accessibleIcon } from "../../../helpers/icon";
import { some } from "lodash";
import { isABusRoute } from "../../../models/route";

const AccessibilityIcon = ({
  stop,
  routes
}: {
  stop: Stop;
  routes: Route[];
}): ReactElement<HTMLElement> => {
  // NOTE: Bus stops are always considered accessible, see
  // https://app.asana.com/0/1201653980996886/1201894234147725/f
  const isBusStop = some(routes, r => isABusRoute(r));
  if (!isBusStop && !stop.accessibility.includes("accessible")) {
    return <></>;
  }

  return (
    <div className="m-stop-page__access-icon">
      <span className="m-stop-page__icon">
        {accessibleIcon("c-svg__icon-accessible-default")}
      </span>
    </div>
  );
};

export { AccessibilityIcon as default };
