import React, { ReactElement, Dispatch } from "react";
import renderSVG from "../../../helpers/render-svg";
import icon from "../../../../static/images/icon-change-direction.svg";
import { MenuAction } from "./reducer";

interface Props {
  dispatch: Dispatch<MenuAction>;
}

const ScheduleDirectionButton = ({
  dispatch
}: Props): ReactElement<HTMLElement> => (
  <button
    type="button"
    className="m-schedule-direction__button btn btn-primary"
    onClick={() => {
      dispatch({ type: "toggleDirection" });
    }}
  >
    {renderSVG("m-schedule-direction__icon", icon)}Change Direction
  </button>
);

export default ScheduleDirectionButton;
