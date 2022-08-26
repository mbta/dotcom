import React, { ReactElement } from "react";
import { handleReactEnterKeyPress } from "../../helpers/keyboard-events-react";
import { clickViewChangeAction, Dispatch } from "../state";

interface Props {
  dispatch: Dispatch;
  viewType: string;
}

const onClickViewChange = (dispatch: Dispatch): void =>
  dispatch(clickViewChangeAction());

const SidebarTitle = ({
  viewType,
  dispatch
}: Props): ReactElement<HTMLElement> => {
  const onClick = (): void => onClickViewChange(dispatch);
  return (
    <div className="col-sm-8 m-tnm-sidebar__header">
      <div className="m-tnm-sidebar__header-title">
        <h2>{`Nearby ${viewType}`}</h2>
        <div
          className="m-tnm-sidebar__view-change"
          role="button"
          tabIndex={0}
          onClick={onClick}
          onKeyPress={e => handleReactEnterKeyPress(e, onClick)}
        >
          Change view
        </div>
      </div>
    </div>
  );
};

export default SidebarTitle;
