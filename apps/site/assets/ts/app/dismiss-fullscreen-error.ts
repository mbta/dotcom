import { handleNativeEnterKeyPress } from "../helpers/keyboard-events";

const hideAlert = (containerEl: HTMLElement): void => {
  containerEl.setAttribute("style", "display: none");
};

export default (): void => {
  const dismissEl: HTMLElement | null = document.querySelector(
    ".js-fullscreen-error__dismiss"
  );
  const containerEl: HTMLElement | null = document.querySelector(
    ".js-fullscreen-error"
  );
  if (!dismissEl || !containerEl) {
    return;
  }
  dismissEl.addEventListener("click", () => hideAlert(containerEl));
  dismissEl.addEventListener("keydown", (e: KeyboardEvent) =>
    handleNativeEnterKeyPress(e, () => {
      hideAlert(containerEl);
    })
  );
};
