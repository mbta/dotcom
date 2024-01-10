import React from "react";
import { TooltipWrapper, crowdingIcon } from "../../../helpers/icon";
import {
  crowdingDescriptions,
  crCrowdingDescriptions
} from "../../../models/vehicle";
import { CrowdingType } from "../__schedule";

interface LiveCrowdingIconProps {
  crowding: CrowdingType;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
  isCommuterRail?: boolean;
}

const LiveCrowdingIcon = ({
  crowding,
  tooltipPlacement,
  isCommuterRail
}: LiveCrowdingIconProps): JSX.Element => (
  <div className="m-schedule-diagram__prediction-crowding">
    {crowding ? (
      <TooltipWrapper
        tooltipText={
          isCommuterRail
            ? `This train typically has<br /><strong>${crCrowdingDescriptions(
                crowding
              )}</strong>`
            : `Currently <strong>${crowdingDescriptions(
                crowding
              ).toLowerCase()}</strong>`
        }
        tooltipOptions={{
          placement: tooltipPlacement || "left",
          animation: false,
          html: true
        }}
      >
        {crowdingIcon(
          `c-icon__crowding--${crowding} ${
            isCommuterRail ? "c-icon__crowding--commuter-rail" : ""
          }`
        )}
      </TooltipWrapper>
    ) : (
      crowdingIcon("c-icon__crowding--crowding_unavailable")
    )}
  </div>
);

export default LiveCrowdingIcon;
