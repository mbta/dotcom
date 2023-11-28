// Responses handled here:
// - "menu-open" or "search-open" added as class to header
// - "menu-open" added as class to body
// - update aria-expanded to indicate menu state
// - update text of menu toggle button
// - reset scroll on menu content when menu is opened
// - menu can be closed by pressing esc key or veil-click

import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
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

function toggleMenu(el: Element): void {
  toggleAriaExpanded(el);
}

const TOGGLE_NAMES = {
  mobile: "toggle-mobile-nav",
  search: "toggle-nav-search",
  desktop: "toggle-desktop-nav"
};

const TOGGLE_SELECTORS = Object.fromEntries(
  Object.entries(TOGGLE_NAMES).map(([key, name]) => [key, `[data-nav=${name}]`])
);

const allTogglesSelector: string = Object.values(TOGGLE_SELECTORS).join(", ");

export function setHeaderElementPositions(
  header: HTMLElement,
  rootElement: HTMLElement
): void {
  if (!header || !rootElement) return;

  const { bottom, height } = header.getBoundingClientRect();
  const bottomPx = `${bottom}px`;
  const heightPx = `${height}px`;

  header.querySelectorAll("[data-nav='desktop-section']").forEach(el => {
    // eslint-disable-next-line no-param-reassign
    (el as HTMLElement).style.top = heightPx;
  });

  const content = header.querySelector(
    "[data-nav='mobile-content']"
  ) as HTMLElement | null;
  if (content) {
    content.style.top = bottomPx;
  }

  const cover = rootElement.querySelector(
    "[data-nav='veil']"
  ) as HTMLElement | null;
  if (cover) {
    cover.style.top = bottomPx;
  }
}

export function setup(rootElement: HTMLElement): void {
  // This clears any existing  body locks on page loading
  clearAllBodyScrollLocks();
  if (!rootElement) return;

  const header: HTMLElement = rootElement.querySelector("header")!;
  if (!header) return;

  window.addEventListener("DOMContentLoaded", () => {
    setHeaderElementPositions(header, rootElement);
  });
  window.addEventListener("resize", () => {
    setHeaderElementPositions(header, rootElement);
  });

  // On mobile, clicking Menu or the Search icon opens a menu
  header
    .querySelectorAll(
      `button${TOGGLE_SELECTORS.mobile}, button${TOGGLE_SELECTORS.search}`
    )
    .forEach(toggle => {
      toggle.addEventListener("click", event => {
        event.preventDefault(); // don't navigate the <a>
        setHeaderElementPositions(header, rootElement);
        toggleMenu(event.currentTarget as Element);
      });
    });

  // On desktop, clicking a menu item opens the submenu
  header.querySelectorAll(`a${TOGGLE_SELECTORS.desktop}`).forEach(toggle => {
    toggle.addEventListener("click", event => {
      event.preventDefault(); // don't navigate the <a>
      toggleMenu(event.currentTarget as Element);
    });
  });

  // removes focus outline in Safari from open accordions
  rootElement
    .querySelectorAll("[data-nav='mobile-content'] .js-focus-on-expand")
    .forEach(openAccordion => {
      openAccordion.addEventListener("focus", undoOutline);
    });

  // On mobile, when a menu is opened/closed,
  const toggledMobileMenuObserver = new MutationObserver(() => {
    const mobileMenuToggle = header.querySelector(
      `button${TOGGLE_SELECTORS.mobile}`
    )!;

    // Update Menu button text
    if ("navOpen" in header.dataset) {
      // eslint-disable-next-line no-param-reassign
      rootElement.querySelector("[data-nav='mobile-content']")!.scrollTop = 0;
      mobileMenuToggle.innerHTML = "Close";
    } else {
      mobileMenuToggle.innerHTML = "Menu";
    }

    if ("searchOpen" in header.dataset) {
      // pass focus to search bar
      (rootElement.querySelector(
        "[data-nav='search'] #input"
      ) as HTMLElement)!.focus();
    }
  });

  // When any navigation menu is expanded,
  const expandedMenuObserver = new MutationObserver(mutations => {
    const observedDataAttributes = mutations.map(
      m => (m.target as HTMLElement).dataset.nav || ""
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

    // add/remove data attributes based on which menu is expanded
    // nav-open on the document body
    // nav-open or search-open on the header
    if (aMenuIsBeingExpanded) {
      // eslint-disable-next-line no-param-reassign
      rootElement.dataset.navOpen = "true";
      if (observedDataAttributes.includes(TOGGLE_NAMES.mobile)) {
        // eslint-disable-next-line no-param-reassign
        header.dataset.navOpen = "true";
        disableBodyScroll(
          rootElement.querySelector("[data-nav='mobile-content']")!
        );
      } else if (observedDataAttributes.includes(TOGGLE_NAMES.search)) {
        // eslint-disable-next-line no-param-reassign
        header.dataset.searchOpen = "true";
        disableBodyScroll(header);
      }
    } else {
      // only do this if no other menu is expanded
      const anyOpen = Array.from(
        rootElement.querySelectorAll(allTogglesSelector)
      ).find(el => el.getAttribute("aria-expanded") === "true");

      if (!anyOpen) {
        clearAllBodyScrollLocks();
        // eslint-disable-next-line no-param-reassign
        delete rootElement.dataset.navOpen;
        if (observedDataAttributes.includes(TOGGLE_NAMES.mobile)) {
          // eslint-disable-next-line no-param-reassign
          delete header.dataset.navOpen;
        } else if (observedDataAttributes.includes(TOGGLE_NAMES.search)) {
          // eslint-disable-next-line no-param-reassign
          delete header.dataset.searchOpen;
        }
      }
    }

    // Close the other desktop tabs programmatically
    if (
      aMenuIsBeingExpanded &&
      observedDataAttributes.includes(TOGGLE_NAMES.desktop)
    ) {
      // Disable scrolling the page, but accomodate any visible scrollbars in
      // order to avoid horizontal shift in the layout when scrolling becomes
      // disabled. This additionally requires adjusting the width of the veil,
      // to maintain a pleasing appearance.
      disableBodyScroll(header, { reserveScrollBarGap: true });
      const cover = rootElement.querySelector<HTMLElement>("[data-nav='veil']");
      if (
        cover &&
        !cover.style.paddingRight &&
        rootElement.dataset.navOpen === "true"
      ) {
        const body = rootElement.querySelector("body");
        // this was added by { reserveScrollBarGap: true }
        const paddingRight = body?.style.paddingRight;
        if (paddingRight && paddingRight !== "") {
          // add same 'padding' for veil by substracting from width
          cover.style.width = `calc(100% - ${paddingRight})`;
        }
      }

      const thisMenu = mutations.map(({ target }) =>
        (target as Element).getAttribute("aria-controls")
      )[0];
      // close OTHER menus
      Array.from(rootElement.querySelectorAll(`${TOGGLE_SELECTORS.desktop}`))
        .filter(
          (el: Element) =>
            el.getAttribute("aria-controls") !== thisMenu &&
            el.getAttribute("aria-expanded") === "true"
        )
        .forEach(toggleAriaExpanded);
    }
  });

  // monitor the header for attribute changes
  toggledMobileMenuObserver.observe(header, {
    attributes: true,
    attributeFilter: ["data-nav-open", "data-search-open"]
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
    "[data-nav='mobile-content']"
  )! as HTMLElement;
  if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    menuContent
      .querySelectorAll("[data-accordion] h3 > button")
      .forEach(target =>
        target.addEventListener(
          "click",
          event => {
            const el = event.target as HTMLElement;
            if (target.getAttribute("aria-expanded") === "false") {
              return;
            }

            const expandedDrawerId = el.getAttribute("aria-controls");
            const expandedDrawer = menuContent.querySelector(
              `#${expandedDrawerId}`
            );

            const targetBB = el.getBoundingClientRect();

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

            const targetY = el.offsetTop - targetBB.height / 2 - yOffset;

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
  const menu_links = rootElement.querySelectorAll("[data-nav='link']");
  for (let i = 0; i < menu_links.length; i += 1) {
    menu_links[i].addEventListener("click", closeAllMenus);
  }

  // T logo click closes
  header
    .querySelector("[data-nav='logo']")
    ?.addEventListener("click", closeAllMenus);

  // Veil click or Esc key closes everything
  rootElement.addEventListener("keydown", e => {
    handleNativeEscapeKeyPress(e, closeAllMenus);
  });

  rootElement
    .querySelector("[data-nav='veil']")
    ?.addEventListener("click", closeAllMenus);

  // Closes veil before navigating to search result
  document.addEventListener("autocomplete:selected", closeAllMenus);
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
