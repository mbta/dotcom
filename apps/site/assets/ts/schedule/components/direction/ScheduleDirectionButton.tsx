import React, { ReactElement, Dispatch } from "react";
import { Action } from "./reducer";

interface Props {
  dispatch: Dispatch<Action>;
}

const ScheduleDirectionButton = ({
  dispatch
}: Props): ReactElement<HTMLElement> => (
  <button
    onClick={() => {
      dispatch({ event: "toggleDirection" });
    }}
  >
    Change Direction
  </button>
);

export default ScheduleDirectionButton;
