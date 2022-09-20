import React, { ReactElement, useContext } from "react";
import renderSVG from "../../../helpers/render-svg";
import icon from "../../../../static/images/icon-change-direction.svg";
import { StateContext, Actions } from "../../page/state";

const ScheduleDirectionButton = (): ReactElement<HTMLElement> => {
  const { dispatch } = useContext(StateContext);

  return (
    <button
      type="button"
      className="m-schedule-direction__button btn btn-primary"
      onClick={() => {
        dispatch(Actions.toggleDirection());
      }}
    >
      {renderSVG("m-schedule-direction__icon", icon)}Change Direction
    </button>
  );
};

export default ScheduleDirectionButton;
