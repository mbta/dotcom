import React, { ReactElement } from "react";

interface Props {
  dispatch: Function;
}

const ScheduleDirectionButton = ({
  dispatch
}: Props): ReactElement<HTMLElement> => <button>Change Direction</button>;

export default ScheduleDirectionButton;
