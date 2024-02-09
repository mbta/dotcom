export const isEnter = (key: number | string): boolean =>
  key === "Enter" || key === 13;

export const isEscape = (key: number | string): boolean =>
  key === "Escape" || key === 27;

export const isTab = (key: number | string): boolean =>
  key === "Tab" || key === 9;

// for vanilla JS
export const handleNativeEnterKeyPress = (
  e: KeyboardEvent,
  cb: Function
): void => (isEnter(e.key || e.keyCode) ? cb(e) : () => {});

export const handleNativeEscapeKeyPress = (
  e: KeyboardEvent,
  cb: Function
): void => (isEscape(e.key || e.keyCode) ? cb(e) : () => {});

export const handleNativeTabKeyPress = (e: KeyboardEvent, cb: Function): void =>
  isTab(e.key || e.keyCode) ? cb(e) : () => {};
