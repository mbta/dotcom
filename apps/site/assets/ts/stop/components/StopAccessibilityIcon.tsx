import React, { ReactElement } from "react";
import { Stop } from "../../__v3api";
import { accessibleIcon } from "../../helpers/icon";
import { Dispatch, clickFeaturePillAction } from "../state";

export default (
  { accessibility }: Stop,
  dispatch?: Dispatch
): ReactElement<HTMLElement> | false =>
  accessibility.includes("accessible") && (
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
