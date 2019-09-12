import React, { ReactElement, Dispatch } from "react";
import { Action } from "./reducer";
import renderSVG from "../../../helpers/render-svg";
import icon from "../../../../static/images/icon-change-direction.svg";

interface Props {
  dispatch: Dispatch<Action>;
}

const ScheduleDirectionButton = ({
  dispatch
}: Props): ReactElement<HTMLElement> => (
  <button
    type="button"
    className="m-schedule-direction__button btn btn-primary"
    onClick={() => {
      dispatch({ event: "toggleDirection" });
    }}
  >
    {renderSVG("m-schedule-direction__icon", icon)}Change Direction
  </button>
);

export default ScheduleDirectionButton;
