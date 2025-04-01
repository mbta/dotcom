import React, { ReactElement } from "react";
import { handleReactEnterKeyPress } from "../../../helpers/keyboard-events-react";
import renderSvg from "../../../helpers/render-svg";
import checkIcon from "../../../../../priv/static/icon-svg/icon-checkmark.svg";
import { SimpleStop, SelectedOrigin } from "../__schedule";

interface OriginListItemProps {
  changeOrigin: Function;
  stop: SimpleStop;
  selectedOrigin: SelectedOrigin;
}

const OriginListItem = ({
  changeOrigin,
  stop,
  selectedOrigin
}: OriginListItemProps): ReactElement<HTMLElement> => {
  const isDisabled = stop.is_closed;
  const handleClick = (): void => {
    if (isDisabled) return;
    changeOrigin(stop.id);
  };

  return (
    <div
      tabIndex={0}
      role="button"
      className={`schedule-finder__origin-list-item ${
        stop.id === selectedOrigin ? "active" : ""
      } ${isDisabled ? "disabled" : ""}`}
      onClick={() => {
        handleClick();
      }}
      onKeyUp={e =>
        handleReactEnterKeyPress(e, () => {
          handleClick();
        })
      }
    >
      <div className="schedule-finder__origin-list-leftpad">
        {stop.id === selectedOrigin
          ? renderSvg("schedule-finder__check", checkIcon)
          : ""}{" "}
      </div>
      {stop.name}{" "}
      {stop.zone && (
        <span className="schedule-finder__zone">Zone {stop.zone}</span>
      )}
    </div>
  );
};

export default OriginListItem;
