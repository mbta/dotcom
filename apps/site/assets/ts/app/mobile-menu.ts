// Responses handled here:
// - "menu-open" or "search-open" added as class to header
// - "menu-open" added as class to body
// - update aria-expanded to indicate menu state
// - update text of menu toggle button
// - reset scroll on menu content when menu is opened
// - menu can be closed by pressing esc key or veil-click

import { handleNativeEscapeKeyPress } from "../helpers/keyboard-events";

function undoOutline(this: HTMLElement): void {
  this.style.outline = "none";
}

function toggleAriaExpanded(el: Element): void {
  el.setAttribute(
    "aria-expanded",
    el.getAttribute("aria-expanded") === "true" ? "false" : "true"
  );
}

function toggleMenu(this: Element): void {
  toggleAriaExpanded(this);
}

const TOGGLE_CLASSES = {
  mobile: "m-menu__toggle",
  search: "header-search__toggle",
  desktop: "m-menu--desktop__toggle"
};

const allTogglesSelector = Object.values(TOGGLE_CLASSES)
  .map(className => `.${className}`)
  .join(", ");

function closeAllMenus(): void {
  document.querySelectorAll(allTogglesSelector).forEach(el => {
    if (el.getAttribute("aria-expanded") === "true") {
      toggleAriaExpanded(el);
    }
  });
}

export default function setupGlobalNavigation(): void {
  document.addEventListener(
    "turbolinks:load",
    () => {
      const header = document.querySelector(".header--new")!;
      if (!header) return;
      const mobileMenuToggle = header.querySelector(
        `button.${TOGGLE_CLASSES.mobile}`
      )!;

      header
        .querySelectorAll(
          `button.${TOGGLE_CLASSES.mobile}, button.${TOGGLE_CLASSES.search}`
        )
        .forEach(toggle => {
          toggle.addEventListener("click", toggleMenu);
        });

      // removes focus outline in Safari from open accordions
      document
        .querySelectorAll(".m-menu__content .js-focus-on-expand")
        .forEach(openAccordion => {
          openAccordion.addEventListener("focus", undoOutline);
        });

      const toggledMobileMenuObserver = new MutationObserver(([{ target }]) => {
        const headerEl = target as Element;
        if (headerEl.classList.contains("menu-open")) {
          document.querySelector(".m-menu__content")!.scrollTop = 0;
          mobileMenuToggle.innerHTML = "Close";
        } else {
          mobileMenuToggle.innerHTML = "Menu";
        }

        if (headerEl.classList.contains("search-open")) {
          // pass focus to search bar
          (document.querySelector(
            ".m-menu__search #search-header-mobile__input"
          ) as HTMLElement)!.focus();
        }
      });

      const expandedMenuObserver = new MutationObserver(mutations => {
        const observedClassNames = mutations.flatMap(m =>
          Array.from((m.target as Element).classList)
        );

        const aMenuIsExpanded: boolean =
          mutations.find(
            ({ oldValue, target }) =>
              (target as Element).getAttribute("aria-expanded") === "true" &&
              oldValue !== "true"
          ) !== undefined;

        // add/remove classes to header and document
        if (aMenuIsExpanded) {
          document.documentElement.classList.add("menu-open");
          if (observedClassNames.includes(TOGGLE_CLASSES.mobile)) {
            header.classList.add("menu-open");
          } else if (observedClassNames.includes(TOGGLE_CLASSES.search)) {
            header.classList.add("search-open");
          }
        } else {
          document.documentElement.classList.remove("menu-open");
          if (observedClassNames.includes(TOGGLE_CLASSES.mobile)) {
            header.classList.remove("menu-open");
          } else if (observedClassNames.includes(TOGGLE_CLASSES.search)) {
            header.classList.remove("search-open");
          }
        }

        // if button state indicates menu should be closed, and observed
        // attribute change is on the desktop navigation buttons, we get to
        // manually close the menu here
        if (
          !aMenuIsExpanded &&
          observedClassNames.includes(TOGGLE_CLASSES.desktop)
        ) {
          // find affected buttons
          mutations
            .map(({ target }) => target as Element)
            .filter(
              ({ classList }) =>
                classList.contains("m-menu--desktop__toggle") &&
                !classList.contains("collapsed")
            )
            .forEach(btn => {
              btn.classList.add("collapsed");
              const targetMenu = document.querySelector(
                btn.getAttribute("data-target")!
              );
              targetMenu?.classList.remove("in");
              targetMenu?.classList.replace("collapse", "collapsing");
              targetMenu?.setAttribute("style", "height: 0px;");
              // FIXME - desktop menu closing animation isn't working
              // setTimeout(() => {
              //   targetMenu?.classList.replace("collapsing", "collapse");
              // }, 350);
            });
        }
      });

      // monitor the header for classList changes
      toggledMobileMenuObserver.observe(header, {
        attributes: true,
        attributeFilter: ["class"]
      });

      // monitor all the menu toggles for aria-expanded changes
      document.querySelectorAll(allTogglesSelector).forEach(el => {
        expandedMenuObserver.observe(el, {
          attributes: true,
          attributeOldValue: true,
          attributeFilter: ["aria-expanded"]
        });
      });

      // menu click closes
      const menu_links = document.querySelectorAll(".m-menu__link");
      for (let i = 0; i < menu_links.length; i += 1) {
        menu_links[i].addEventListener("click", closeAllMenus);
      }

      // Veil click or Esc key closes everything
      document.body.addEventListener("keydown", e => {
        handleNativeEscapeKeyPress(e, closeAllMenus);
      });

      if (header.previousElementSibling?.classList.contains("c-modal__cover"))
        header.previousElementSibling.addEventListener("click", closeAllMenus);
    },
    { passive: true }
  );
}
