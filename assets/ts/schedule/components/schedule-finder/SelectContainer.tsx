import React, { ReactElement, ReactNode } from "react";
import { handleReactEnterKeyPress } from "../../../helpers/keyboard-events-react";
import renderSvg from "../../../helpers/render-svg";
import arrowIcon from "../../../../../priv/static/icon-svg/icon-down-arrow.svg";

interface SelectContainerProps {
  children: ReactNode;
  error?: boolean;
  handleClick?: Function;
}

const SelectContainer = ({
  children,
  error = false,
  handleClick
}: SelectContainerProps): ReactElement<HTMLElement> => (
  <div
    tabIndex={0}
    className={`c-select-custom__container ${error ? "error" : ""}`}
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
    {renderSvg("c-svg__icon c-select-custom__arrow", arrowIcon, true)}
  </div>
);

export default SelectContainer;
