import React, { ReactElement } from "react";
import { clickRoutePillAction, Dispatch } from "../state";

const crZone = (
  zoneNumber?: string,
  dispatch?: Dispatch
): ReactElement<HTMLElement> | false => {
  const content = `Zone ${zoneNumber}`;

  let tag = (
    <div className="m-stop-page__header-feature">
      <span className="m-stop-page__icon c-icon__cr-zone">{content}</span>
    </div>
  );

  if (dispatch) {
    tag = (
      <a
        href="#route-card-list"
        onClick={() =>
          dispatch && dispatch(clickRoutePillAction("commuter_rail"))
        }
        className="m-stop-page__header-feature"
      >
        <span className="m-stop-page__icon c-icon__cr-zone">{content}</span>
      </a>
    );
  }

  return !!zoneNumber && zoneNumber.length > 0 && tag;
};

const CommuterRailZoneIcon = ({
  zoneNumber,
  dispatch
}: {
  zoneNumber?: string;
  dispatch?: Dispatch;
}): ReactElement<HTMLElement> => {
  return <>{crZone(zoneNumber, dispatch)}</>;
};

export { CommuterRailZoneIcon as default };
