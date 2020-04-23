import React, { ReactElement } from "react";
import { handleReactEnterKeyPress } from "../../../helpers/keyboard-events";
import renderSvg from "../../../helpers/render-svg";
import checkIcon from "../../../../static/images/icon-checkmark.svg";
import { SimpleStop } from "../__schedule";

interface StopSearchListItemProps {
  changeStop: (stopId: string) => void;
  stop: SimpleStop;
  isSelected: boolean;
  isDisabled: boolean;
}

const StopSearchListItem = ({
  changeStop,
  stop,
  isSelected,
  isDisabled
}: StopSearchListItemProps): ReactElement<HTMLElement> => {
  const handleClick = (): void => {
    if (isDisabled) return;
    changeStop(stop.id);
  };

  return (
    <div
      tabIndex={0}
      role="button"
      className={`stop-search__stop u-bold ${isSelected ? "active" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
      onClick={() => {
        handleClick();
      }}
      onKeyUp={e =>
        handleReactEnterKeyPress(e, () => {
          handleClick();
        })
      }
    >
      {isSelected && renderSvg("schedule-finder__check", checkIcon)}
      {stop.name}{" "}
      {stop.zone && (
        <span className="schedule-finder__zone">Zone {stop.zone}</span>
      )}
    </div>
  );
};

export default StopSearchListItem;
