import { KeyboardEvent as ReactKeyboardEvent } from "react";

// for React
export const handleReactEnterKeyPress = (
  e: ReactKeyboardEvent,
  onClick: Function
): void => {
  if (e.key === "Enter") {
    onClick();
  }
};

export const handleReactExitKeyPress = (
  e: ReactKeyboardEvent,
  onClick: Function
): void => {
  if (e.key === "Escape") {
    onClick();
  }
};
