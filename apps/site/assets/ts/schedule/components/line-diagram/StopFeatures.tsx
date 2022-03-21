import React from "react";
import { RouteStop } from "../__schedule";
import {
  TooltipWrapper,
  parkingIcon,
  accessibleIcon
} from "../../../helpers/icon";
import { isACommuterRailRoute } from "../../../models/route";
import { isBusRouteStop } from "../../../helpers/routes";

const StopFeatures = (routeStop: RouteStop): JSX.Element => (
  <div className="m-schedule-diagram__features">
    {routeStop.stop_features.includes("parking_lot") ? (
      <TooltipWrapper
        tooltipText="Parking"
        tooltipOptions={{ placement: "bottom" }}
      >
        {parkingIcon(
          "c-svg__icon-parking-default m-schedule-diagram__feature-icon"
        )}
      </TooltipWrapper>
    ) : null}
    {// NOTE: Bus routes are always considered accessible, see
    // https://app.asana.com/0/1201653980996886/1201894234147725/f
    isBusRouteStop(routeStop) || routeStop.stop_features.includes("access") ? (
      <TooltipWrapper
        tooltipText="Accessible"
        tooltipOptions={{ placement: "bottom" }}
      >
        {accessibleIcon(
          "c-svg__icon-acessible-default m-schedule-diagram__feature-icon"
        )}
      </TooltipWrapper>
    ) : null}
    {routeStop.zone &&
      routeStop.route &&
      isACommuterRailRoute(routeStop.route) && (
        <span className="c-icon__cr-zone m-schedule-diagram__feature-icon">{`Zone ${routeStop.zone}`}</span>
      )}
  </div>
);

export default StopFeatures;
