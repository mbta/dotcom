import "bootstrap/dist/js/umd/util";
import "bootstrap/dist/js/umd/collapse";
import "bootstrap/dist/js/umd/tooltip";
import collapse from "./js/collapse";
import { setup } from "./ts/app/global-navigation.ts";

collapse();
setup();

document.body.classList.add("js");

// Remove event listeners from header search button, then hide
const searchButton = document.querySelector(".header-search__toggle");
const blankButton = searchButton.cloneNode(true);
blankButton.style.opacity = "0";
searchButton.replaceWith(blankButton);
