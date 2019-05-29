import { KeyboardEvent as ReactKeyboardEvent } from "react";

export const isEnter = (key: number | string): boolean =>
  key === "Enter" || key === 13;

// for vanilla JS
export const handleNativeEnterKeyPress = (
  e: KeyboardEvent,
  cb: Function
): void => (isEnter(e.key || e.keyCode) ? cb(e) : () => {});

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
