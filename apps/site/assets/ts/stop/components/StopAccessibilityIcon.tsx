import React, { ReactElement } from "react";
import { Stop } from "../../__v3api";
import { accessibleIcon } from "../../helpers/icon";
import { Dispatch, clickFeaturePillAction } from "../state";

const StopAccessibilityIcon = ({
  stop,
  isBusStop,
  dispatch
}: {
  stop: Stop;
  isBusStop: boolean;
  dispatch?: Dispatch;
}): ReactElement<HTMLElement> | null => {
  const iconContent = (
    <span className="m-stop-page__icon">
      {accessibleIcon("c-svg__icon-accessible-default")}
    </span>
  );

  let iconWrapper = (
    <div className="m-stop-page__access-icon">{iconContent}</div>
  );

  if (dispatch) {
    iconWrapper = (
      <a
        className="m-stop-page__access-icon"
        href="#header-accessibility"
        onClick={() =>
          dispatch && dispatch(clickFeaturePillAction("accessibility"))
        }
      >
        {iconContent}
      </a>
    );
  }

  // NOTE: Bus stops are always considered accessible, see
  // https://app.asana.com/0/1201653980996886/1201894234147725/f
  return isBusStop || stop.accessibility.includes("accessible")
    ? iconWrapper
    : null;
};

export default StopAccessibilityIcon;
