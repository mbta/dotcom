import React, { ReactElement } from "react";
import { Stop } from "../../__v3api";
import { parkingIcon } from "../../helpers/icon";
import { clickFeaturePillAction, Dispatch } from "../state";

const ParkingIcon = ({
  stop,
  dispatch
}: {
  stop: Stop;
  dispatch?: Dispatch;
}): ReactElement<HTMLElement> => {
  if (stop.parking_lots.length === 0) {
    return <></>;
  }
  const content = <span className="m-stop-page__icon">{parkingIcon()}</span>;
  if (dispatch) {
    return (
      <a
        className="m-stop-page__header-feature"
        href="#header-parking"
        onClick={() => dispatch && dispatch(clickFeaturePillAction("parking"))}
      >
        {content}
      </a>
    );
  }
  return <div className="m-stop-page__header-feature">{content}</div>;
};

export { ParkingIcon as default };
