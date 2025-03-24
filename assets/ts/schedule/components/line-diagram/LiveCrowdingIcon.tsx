import React from "react";
import { TooltipWrapper, crowdingIcon } from "../../../helpers/icon";
import { crowdingDescriptions } from "../../../models/vehicle";
import { CrowdingType } from "../__schedule";

interface LiveCrowdingIconProps {
  crowding: CrowdingType;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
}

const LiveCrowdingIcon = ({
  crowding,
  tooltipPlacement
}: LiveCrowdingIconProps): JSX.Element => (
  <div className="m-schedule-diagram__prediction-crowding">
    {crowding ? (
      <TooltipWrapper
        tooltipText={`Currently <strong>${crowdingDescriptions(
          crowding
        ).toLowerCase()}</strong>`}
        tooltipOptions={{
          placement: tooltipPlacement || "left",
          animation: false,
          html: true
        }}
      >
        {crowdingIcon(`c-icon__crowding--${crowding}`)}
      </TooltipWrapper>
    ) : (
      crowdingIcon("c-icon__crowding--crowding_unavailable")
    )}
  </div>
);

export default LiveCrowdingIcon;
