// Responses handled here:
// - "menu-open" or "search-open" added as class to header
// - "menu-open" added as class to body
// - update aria-expanded to indicate menu state
// - update text of menu toggle button
// - reset scroll on menu content when menu is opened
// - menu can be closed by pressing esc key or veil-click

import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { handleNativeEscapeKeyPress } from "../helpers/keyboard-events";
import { isLGDown } from "../helpers/media-breakpoints";

function undoOutline(this: HTMLElement): void {
  this.style.outline = "none";
}

function toggleAriaExpanded(el: Element): void {
  el.setAttribute(
    "aria-expanded",
    el.getAttribute("aria-expanded") === "true" ? "false" : "true"
  );
}

function toggleMenu(el: Element): void {
  toggleAriaExpanded(el);
}

const TOGGLE_CLASSES = {
  mobile: "m-menu__toggle",
  search: "header-search__toggle",
  desktop: "m-menu--desktop__toggle"
};

const allTogglesSelector: string = Object.values(TOGGLE_CLASSES)
  .map(className => `.${className}`)
  .join(", ");

export function setHeaderElementPositions(
  header: HTMLElement,
  rootElement: HTMLElement
): void {
  if (!header || !rootElement) return;

  const { bottom, height } = header.getBoundingClientRect();
  const bottomPx = `${bottom}px`;
  const heightPx = `${height}px`;

  header.querySelectorAll(".m-menu--desktop__menu").forEach(el => {
    // eslint-disable-next-line no-param-reassign
    (el as HTMLElement).style.top = heightPx;
  });

  const content = header.querySelector(
    ".m-menu--mobile .m-menu__content"
  ) as HTMLElement | null;
  if (content) {
    content.style.top = bottomPx;
  }

  const cover = rootElement.querySelector(
    ".m-menu--cover"
  ) as HTMLElement | null;
  if (cover) {
    cover.style.top = bottomPx;
  }
}

export function setup(rootElement: HTMLElement): void {
  if (!rootElement) return;
  rootElement.classList.add("js");

  const header: HTMLElement = rootElement.querySelector(".header--new")!;
  if (!header) return;

  setHeaderElementPositions(header, rootElement);
  window.addEventListener("resize", () => {
    setHeaderElementPositions(header, rootElement);
  });

  // On mobile, clicking Menu or the Search icon opens a menu
  header
    .querySelectorAll(
      `button.${TOGGLE_CLASSES.mobile}, button.${TOGGLE_CLASSES.search}`
    )
    .forEach(toggle => {
      toggle.addEventListener("click", event => {
        event.preventDefault(); // don't navigate the <a>
        toggleMenu(event.currentTarget as Element);
      });
    });

  // On desktop, clicking a menu item opens the submenu
  header.querySelectorAll(`a.${TOGGLE_CLASSES.desktop}`).forEach(toggle => {
    toggle.addEventListener("click", event => {
      event.preventDefault(); // don't navigate the <a>
      toggleMenu(event.currentTarget as Element);
    });
  });

  // Show the modal search veil and disable scrolling when focusing
  // the search input on tablet
  const input = rootElement.querySelector("#search-header-desktop__input");
  if (input) {
    input.addEventListener("focus", () => {
      if (isLGDown()) {
        rootElement.classList.add("menu-open");
      }
    });
    input.addEventListener("blur", () => {
      rootElement.classList.remove("menu-open");
    });
  }

  // removes focus outline in Safari from open accordions
  rootElement
    .querySelectorAll(".m-menu__content .js-focus-on-expand")
    .forEach(openAccordion => {
      openAccordion.addEventListener("focus", undoOutline);
    });

  // On mobile, when a menu is opened/closed,
  const toggledMobileMenuObserver = new MutationObserver(() => {
    const mobileMenuToggle = header.querySelector(
      `button.${TOGGLE_CLASSES.mobile}`
    )!;

    // Update Menu button text
    if (header.classList.contains("menu-open")) {
      // eslint-disable-next-line no-param-reassign
      rootElement.querySelector(".m-menu__content")!.scrollTop = 0;
      mobileMenuToggle.innerHTML = "Close";
    } else {
      mobileMenuToggle.innerHTML = "Menu";
    }

    if (header.classList.contains("search-open")) {
      // pass focus to search bar
      (rootElement.querySelector(
        ".m-menu__search #search-header-mobile__input"
      ) as HTMLElement)!.focus();
    }
  });

  // When any navigation menu is expanded,
  const expandedMenuObserver = new MutationObserver(mutations => {
    const observedClassNames = mutations.flatMap(m =>
      Array.from((m.target as Element).classList)
    );

    const aMenuIsBeingExpanded: boolean =
      mutations.find(
        ({ oldValue, target }) =>
          (target as Element).getAttribute("aria-expanded") === "true" &&
          oldValue !== "true"
      ) !== undefined;

    // adjust theme color
    rootElement
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", aMenuIsBeingExpanded ? "#0b2f4c" : "#165c96");

    // add/remove classes based on which menu is expanded
    // .menu-open on the document body
    // .menu-open or .search-open on the header
    if (aMenuIsBeingExpanded) {
      rootElement.classList.add("menu-open");
      disableBodyScroll(header);
      if (observedClassNames.includes(TOGGLE_CLASSES.mobile)) {
        header.classList.add("menu-open");
        disableBodyScroll(rootElement.querySelector(".m-menu__content")!);
      } else if (observedClassNames.includes(TOGGLE_CLASSES.search)) {
        header.classList.add("search-open");
      }
    } else {
      // only do this if no other menu is expanded
      const anyOpen = Array.from(
        rootElement.querySelectorAll(allTogglesSelector)
      ).find(el => el.getAttribute("aria-expanded") === "true");

      if (!anyOpen) {
        clearAllBodyScrollLocks();
        rootElement.classList.remove("menu-open");
        if (observedClassNames.includes(TOGGLE_CLASSES.mobile)) {
          header.classList.remove("menu-open");
        } else if (observedClassNames.includes(TOGGLE_CLASSES.search)) {
          header.classList.remove("search-open");
        }
      }
    }

    // Close the other desktop tabs programmatically
    if (
      aMenuIsBeingExpanded &&
      observedClassNames.includes(TOGGLE_CLASSES.desktop)
    ) {
      const thisMenu = mutations.map(({ target }) =>
        (target as Element).getAttribute("aria-controls")
      )[0];
      // close OTHER menus
      Array.from(rootElement.querySelectorAll(`.${TOGGLE_CLASSES.desktop}`))
        .filter(
          (el: Element) =>
            el.getAttribute("aria-controls") !== thisMenu &&
            el.getAttribute("aria-expanded") === "true"
        )
        .forEach(toggleAriaExpanded);
    }
  });

  // monitor the header for classList changes
  toggledMobileMenuObserver.observe(header, {
    attributes: true,
    attributeFilter: ["class"]
  });

  // monitor all the menu toggles for aria-expanded changes
  rootElement.querySelectorAll(allTogglesSelector).forEach(el => {
    expandedMenuObserver.observe(el, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["aria-expanded"]
    });
  });

  // Scroll accordion into view on click
  // Note: we can't use `scrollIntoView`, Safari doesn't support it as of
  // 2022-02-28, and even if it did, the opening/closing animations of the
  // accordions makes the behavior janky on other browsers
  const menuContent = rootElement.querySelector(
    ".m-menu--mobile .m-menu__content"
  )! as HTMLElement;
  if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    rootElement
      .querySelectorAll(".m-menu--mobile .c-accordion-ui__trigger")
      .forEach(target =>
        target.addEventListener(
          "click",
          () => {
            // if (target.getAttribute("aria-expanded") === "true") {
            //   // return;
            // }

            const expandedDrawer = menuContent.querySelector(
              ".c-accordion-ui__target[aria-expanded='true']"
            );

            const targetBB = target.getBoundingClientRect();

            const yOffset = (() => {
              if (expandedDrawer) {
                const bb = expandedDrawer.getBoundingClientRect();
                if (bb.y < targetBB.y) {
                  return bb.height;
                }

                return 0;
              }

              return 0;
            })();

            const targetY =
              (target as HTMLElement).offsetTop - targetBB.height / 2 - yOffset;

            menuContent.scrollTo({
              behavior: "smooth",
              left: 0,
              top: targetY
            });
          },
          false
        )
      );
  }

  function closeAllMenus(): void {
    rootElement.querySelectorAll(allTogglesSelector).forEach(el => {
      if (el.getAttribute("aria-expanded") === "true") {
        toggleAriaExpanded(el);
      }
    });
  }

  // menu click closes
  const menu_links = rootElement.querySelectorAll(".m-menu__link");
  for (let i = 0; i < menu_links.length; i += 1) {
    menu_links[i].addEventListener("click", closeAllMenus);
  }

  // T logo click closes
  header
    .querySelector(".navbar-logo")
    ?.addEventListener("click", closeAllMenus);

  // Veil click or Esc key closes everything
  rootElement.addEventListener("keydown", e => {
    handleNativeEscapeKeyPress(e, closeAllMenus);
  });

  if (header.previousElementSibling?.classList.contains("m-menu--cover"))
    header.previousElementSibling.addEventListener("click", closeAllMenus);

  const transitDiv = rootElement.querySelector("#Transit-accordion");
  if (transitDiv) {
    transitDiv.getElementsByTagName("button")[0].click();
  }
}

export default function setupGlobalNavigation(): void {
  document.addEventListener(
    "turbolinks:load",
    () => {
      setup(document.documentElement);
    },
    { passive: true }
  );
}
