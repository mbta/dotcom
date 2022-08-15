import { setup } from "./ts/app/global-navigation";
import setupAccordion from "./ts/ui/accordion";

import "./css/export-headerfooter.scss";

declare global {
  interface Window {
    setupDotcomChrome: Function;
  }
}

window.setupDotcomChrome = function(rootElement: HTMLElement) {
  if (!rootElement) return;

  setupAccordion(rootElement);
  setup(rootElement);

  // Remove event listeners from header search button, then hide
  const searchButton = rootElement.querySelector("[data-nav='toggle-nav-search']");
  if (searchButton) {
    const blankButton = searchButton?.cloneNode(true) as HTMLElement;
    blankButton.style.opacity = "0";
    searchButton?.replaceWith(blankButton);
  }
}
