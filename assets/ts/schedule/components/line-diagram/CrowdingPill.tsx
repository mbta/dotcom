import React from "react";
import { CrowdingType } from "../__schedule";
import { crowdingIcon } from "../../../helpers/icon";
import { crowdingDescriptions } from "../../../models/vehicle";

const CrowdingPill = ({
  crowding
}: {
  crowding: CrowdingType;
}): JSX.Element | null => {
  if (!crowding) return null;

  return (
    <div
      className={`u-small-caps font-bold c-crowding-pill c-crowding-pill--${crowding}`}
    >
      {crowdingIcon(`c-icon__crowding--${crowding}`)}
      <span className="c-crowding-pill__label">
        {crowdingDescriptions(crowding)}
      </span>
    </div>
  );
};

export default CrowdingPill;
