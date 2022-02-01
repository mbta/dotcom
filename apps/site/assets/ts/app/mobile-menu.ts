// Responses handled here:
// - "menu-open" or "search-open" added as class to header
// - HTML body prevented from scrolling
// - update aria-expanded to indicate menu state
// - update text of menu toggle button
// - reset scroll on menu content when menu is opened
// - menu can be closed by pressing esc key or veil-click

import { handleNativeEscapeKeyPress } from "../helpers/keyboard-events";

const setupMobileMenu = (): void => {
  const header: HTMLElement = document.querySelector("header.header")!;
  const menuButton: HTMLButtonElement = header.querySelector(
    "button.m-menu__toggle"
  )!;
  const searchButton: HTMLButtonElement = header.querySelector(
    "button.header-search__toggle"
  )!;

  // will toggle with nav menu or search bar, with an optional argument to force either open or closed.
  const toggleMenu = (
    section: "menu" | "search",
    dir?: "close" | "open"
  ): void => {
    const toggleButton: HTMLButtonElement =
      section === "menu" ? menuButton : searchButton;

    if (
      toggleButton.getAttribute("aria-expanded") === "true" ||
      dir === "close"
    ) {
      // close it
      document.documentElement.classList.remove("modal-open");
      header.classList.remove(`${section}-open`);
      toggleButton.ariaExpanded = "false";
      if (section === "menu") {
        toggleButton.innerHTML = "Menu";
      }
    } else {
      // open it
      document.documentElement.classList.add("modal-open");
      header.querySelector(".m-menu__content")!.scrollTop = 0;
      header.classList.add(`${section}-open`);
      toggleButton.ariaExpanded = "true";
      if (section === "menu") {
        toggleButton.innerHTML = "Close";
      } else {
        // pass focus to search bar
        const searchBar: HTMLElement = header.querySelector(
          ".m-menu__search #search-header-mobile__input"
        )!;
        searchBar.focus();
      }
    }
  };

  const closeMenu = (): void => {
    toggleMenu("menu", "close");
    toggleMenu("search", "close");
  };

  // Menu button toggles menu
  menuButton.addEventListener("click", () => {
    toggleMenu("menu");
  });

  // Search button toggles search bar
  searchButton.addEventListener("click", () => {
    toggleMenu("search");
  });

  // Veil click closes
  document
    .querySelector(".m-menu__cover")!
    .addEventListener("click", closeMenu);

  // menu click closes
  const menu_links = document.querySelectorAll(".m-menu__link");
  for (let i = 0; i < menu_links.length; i += 1) {
    menu_links[i].addEventListener("click", closeMenu);
  }

  // Esc key closes
  document.body.addEventListener("keydown", e => {
    handleNativeEscapeKeyPress(e, closeMenu);
  });

  // removes focus outline in Safari from open accordions
  document
    .querySelectorAll(".m-menu__content .js-focus-on-expand")
    .forEach(acc => {
      acc.addEventListener("focus", function undoOutline(this: HTMLElement) {
        this.style.outline = "none";
      });
    });
};

export default (): void => {
  document.addEventListener(
    "turbolinks:load",
    () => {
      if (document.querySelector("button.m-menu__toggle")) {
        setupMobileMenu();
      }
    },
    { passive: true }
  );
};
