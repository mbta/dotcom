import React, { ReactElement } from "react";
import { Stop } from "../../__v3api";
import { clickStopPillAction, Dispatch } from "../state";
import { handleReactEnterKeyPress } from "../../helpers/keyboard-events-react";

interface Props {
  selectedStop: Stop | undefined;
  dispatch: Dispatch;
  showPill: boolean;
}

const RouteSidebarPills = (props: Props): ReactElement<HTMLElement> | null => {
  const { dispatch, selectedStop, showPill } = props;
  const onClickPill = (): void => dispatch(clickStopPillAction());
  return showPill && selectedStop ? (
    <>
      <div className="m-tnm-sidebar__separator" />
      <span
        role="button"
        tabIndex={0}
        className="m-tnm-sidebar__pill"
        onClick={onClickPill}
        onKeyPress={e => handleReactEnterKeyPress(e, onClickPill)}
        aria-label={`Remove filtering by ${selectedStop.name}`}
      >
        <span className="m-tnm-sidebar__pill-name">{selectedStop.name}</span>
        <span className="m-tnm-sidebar__pill-close fa fa-times-circle" />
      </span>
    </>
  ) : null;
};

export default RouteSidebarPills;
