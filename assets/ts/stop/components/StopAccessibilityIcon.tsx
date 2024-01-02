import React, { ReactElement } from "react";
import { Stop } from "../../__v3api";
import { accessibleIcon } from "../../helpers/icon";
import { Dispatch, clickFeaturePillAction } from "../state";

const StopAccessibilityIcon = (
  { accessibility }: Stop,
  isBusStop: boolean,
  dispatch?: Dispatch
): ReactElement<HTMLElement> | false =>
  // NOTE: Bus stops are always considered accessible, see
  // https://app.asana.com/0/1201653980996886/1201894234147725/f
  (isBusStop || accessibility.includes("accessible")) && (
    <a
      className="m-stop-page__access-icon"
      href="#header-accessibility"
      onClick={() =>
        dispatch && dispatch(clickFeaturePillAction("accessibility"))
      }
    >
      <span className="m-stop-page__icon">
        {accessibleIcon("c-svg__icon-accessible-default")}
      </span>
    </a>
  );

export default StopAccessibilityIcon;
