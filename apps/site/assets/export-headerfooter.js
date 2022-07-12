import { setup } from "./ts/app/global-navigation.ts";


function setupDotcomChrome(rootElement) {
  if (!rootElement) return;

  setup(rootElement);

  // Remove event listeners from header search button, then hide
  const searchButton = rootElement.querySelector(".header-search__toggle");
  const blankButton = searchButton.cloneNode(true);
  blankButton.style.opacity = "0";
  searchButton.replaceWith(blankButton);
}
