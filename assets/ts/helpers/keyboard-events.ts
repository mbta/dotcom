export const isEscape = (key: number | string): boolean =>
  key === "Escape" || key === 27;

// for vanilla JS
export const handleNativeEscapeKeyPress = (
  e: KeyboardEvent,
  cb: Function
): void => (isEscape(e.key || e.keyCode) ? cb(e) : () => {});
