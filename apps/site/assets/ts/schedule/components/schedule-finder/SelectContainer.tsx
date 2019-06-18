import React, { ReactElement, ReactNode } from "react";
import { handleReactEnterKeyPress } from "../../../helpers/keyboard-events";
import renderSvg from "../../../helpers/render-svg";
import arrowIcon from "../../../../static/images/icon-down-arrow.svg";

interface SelectContainerProps {
  id: string;
  children: ReactNode;
  error: boolean;
  handleClick?: Function;
}

const SelectContainer = ({
  id,
  children,
  error,
  handleClick
}: SelectContainerProps): ReactElement<HTMLElement> => (
  <div
    id={id}
    tabIndex={0}
    className={`schedule-finder__select-container ${error ? "error" : ""}`}
    role="button"
    onClick={e => {
      if (handleClick) {
        handleClick(e);
      }
    }}
    onKeyUp={e =>
      handleReactEnterKeyPress(e, () => {
        if (handleClick) {
          handleClick(e);
        }
      })
    }
  >
    {children}
    {renderSvg("c-svg__icon schedule-finder__arrow", arrowIcon)}
  </div>
);

export default SelectContainer;
