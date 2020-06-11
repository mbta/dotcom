import React from "react";
import { CrowdingType } from "../../components/__schedule";
import { crowdingIcon } from "../../../helpers/icon";

const crowdingDescriptions = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  not_crowded: "Not crowded",
  // eslint-disable-next-line @typescript-eslint/camelcase
  some_crowding: "Some crowding",
  crowded: "Crowded"
};

const CrowdingPill = ({
  crowding
}: {
  crowding: CrowdingType;
}): JSX.Element | null => {
  if (!crowding) return null;

  return (
    <div
      className={`u-small-caps u-bold c-crowding-pill c-crowding-pill--${crowding}`}
    >
      {crowdingIcon(`c-icon__crowding--${crowding}`)}
      <span className="c-crowding-pill__label">
        {crowdingDescriptions[crowding]}
      </span>
    </div>
  );
};

export default CrowdingPill;
