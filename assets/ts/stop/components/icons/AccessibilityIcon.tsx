import React, { ReactElement } from "react";
import { Stop } from "../../../__v3api";
import { accessibleIcon } from "../../../helpers/icon";

const AccessibilityIcon = ({
  stop
}: {
  stop: Stop;
}): ReactElement<HTMLElement> | null => {
  if (stop.accessibility.length === 0) return null;
  return (
    <div className="m-stop-page__access-icon">
      <span className="m-stop-page__icon">
        {accessibleIcon("c-svg__icon-accessible-default")}
      </span>
    </div>
  );
};

export default AccessibilityIcon;
