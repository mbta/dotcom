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
  const current = el.getAttribute("aria-expanded");
  el.setAttribute("aria-expanded", current === "true" ? "false" : "true");
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

  // SUPPORT MULTIPLE HEADERS
  const headers = Array.from(rootElement.querySelectorAll("header"));
  if (headers.length === 0) return;

  // HEADERS THAT CONTAIN SEARCH TOGGLES
  const searchHeaders = headers.filter(h =>
    h.querySelector(TOGGLE_SELECTORS.search)
  );

  // HEADERS THAT CONTAIN MOBILE MENU TOGGLES
  const mobileMenuHeaders = headers.filter(h =>
    h.querySelector(TOGGLE_SELECTORS.mobile)
  );

  // HEADERS WITH DESKTOP MENU TOGGLES
  const desktopHeaders = headers.filter(h =>
    h.querySelector(TOGGLE_SELECTORS.desktop)
  );

  //
  // POSITIONING
  //
  function recomputeAllHeaderPositions(): void {
    headers.forEach(header => setHeaderElementPositions(header, rootElement));
  }

  window.addEventListener("DOMContentLoaded", recomputeAllHeaderPositions);
  window.addEventListener("resize", recomputeAllHeaderPositions);

  //
  // CLICK HANDLERS
  //

  // MOBILE MENU CLICK HANDLERS
  mobileMenuHeaders.forEach(header => {
    header
      .querySelectorAll(`button${TOGGLE_SELECTORS.mobile}`)
      .forEach(toggle => {
        toggle.addEventListener("click", event => {
          event.preventDefault();
          recomputeAllHeaderPositions();
          toggleMenu(event.currentTarget as Element);
        });
      });
  });

  // SEARCH CLICK HANDLERS
  searchHeaders.forEach(header => {
    header
      .querySelectorAll(`button${TOGGLE_SELECTORS.search}`)
      .forEach(toggle => {
        toggle.addEventListener("click", event => {
          event.preventDefault();
          recomputeAllHeaderPositions();
          toggleMenu(event.currentTarget as Element);
        });
      });
  });

  // DESKTOP CLICK HANDLERS
  desktopHeaders.forEach(header => {
    header.querySelectorAll(`a${TOGGLE_SELECTORS.desktop}`).forEach(toggle => {
      toggle.addEventListener("click", event => {
        event.preventDefault();
        toggleMenu(event.currentTarget as Element);
      });
    });
  });

  // removes focus outline in Safari from open accordions
  rootElement
    .querySelectorAll("[data-nav='mobile-content'] .js-focus-on-expand")
    .forEach(openAccordion => {
      openAccordion.addEventListener("focus", undoOutline);
    });

  //
  // MOBILE MENU OBSERVER (handles menu-open, search-open, focus)
  //
  const toggledMobileMenuObserver = new MutationObserver(() => {
    mobileMenuHeaders.forEach(header => {
      const mobileToggle = header.querySelector(
        `button${TOGGLE_SELECTORS.mobile}`
      );

      if (!mobileToggle) return;

      // Toggle Menu text
      if ("navOpen" in header.dataset) {
        const content = header.querySelector(
          "[data-nav='mobile-content']"
        ) as HTMLElement;
        if (content) content.scrollTop = 0;
        mobileToggle.innerHTML = "Close";
      } else {
        mobileToggle.innerHTML = "Menu";
      }
    });

    // Focus search fields
    searchHeaders.forEach(header => {
      if ("searchOpen" in header.dataset) {
        const input = rootElement.querySelector(
          "[data-nav='search'] .aa-Input"
        ) as HTMLElement;
        input?.focus();
      }
    });
  });

  // OBSERVE changes on EVERY header
  headers.forEach(header => {
    toggledMobileMenuObserver.observe(header, {
      attributes: true,
      attributeFilter: ["data-nav-open", "data-search-open"]
    });
  });

  //
  // EXPANDED MENU OBSERVER
  //
  // When any navigation menu is expanded,
  const expandedMenuObserver = new MutationObserver(mutations => {
    const observedNames = mutations.map(
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

      // MOBILE MENU EXPANDING
      if (observedNames.includes(TOGGLE_NAMES.mobile)) {
        mobileMenuHeaders.forEach(header => {
          const content = header.querySelector(
            "[data-nav='mobile-content']"
          ) as HTMLElement;
          if (content) disableBodyScroll(content);
          // eslint-disable-next-line no-param-reassign
          header.dataset.navOpen = "true";
        });
      }

      // SEARCH EXPANDING
      if (observedNames.includes(TOGGLE_NAMES.search)) {
        searchHeaders.forEach(header => {
          // eslint-disable-next-line no-param-reassign
          header.dataset.searchOpen = "true";
          disableBodyScroll(header);
        });
      }
    } else {
      // only do this if no other menu is expanded
      const anyOpen = Array.from(
        rootElement.querySelectorAll(allTogglesSelector)
      ).some(el => el.getAttribute("aria-expanded") === "true");

      if (!anyOpen) {
        clearAllBodyScrollLocks();
        // eslint-disable-next-line no-param-reassign
        delete rootElement.dataset.navOpen;

        mobileMenuHeaders.forEach(header => {
          // eslint-disable-next-line no-param-reassign
          delete header.dataset.navOpen;
        });

        searchHeaders.forEach(header => {
          // eslint-disable-next-line no-param-reassign
          delete header.dataset.searchOpen;
        });
      }
    }

    //
    // DESKTOP: close other desktop menus
    //
    const expandingDesktop =
      aMenuIsBeingExpanded && observedNames.includes(TOGGLE_NAMES.desktop);

    if (expandingDesktop) {
      desktopHeaders.forEach(header => {
        disableBodyScroll(header, { reserveScrollBarGap: true });
      });

      const veil = rootElement.querySelector<HTMLElement>("[data-nav='veil']");
      if (
        veil &&
        !veil.style.paddingRight &&
        rootElement.dataset.navOpen === "true"
      ) {
        const bodyPaddingRight = rootElement.querySelector("body")?.style
          .paddingRight;

        if (bodyPaddingRight) {
          veil.style.width = `calc(100% - ${bodyPaddingRight})`;
        }
      }

      const controls = (mutations[0].target as Element).getAttribute(
        "aria-controls"
      );

      const desktopToggles = Array.from(
        rootElement.querySelectorAll(TOGGLE_SELECTORS.desktop)
      );

      desktopToggles
        .filter(
          (el: Element) =>
            el.getAttribute("aria-controls") !== controls &&
            el.getAttribute("aria-expanded") === "true"
        )
        .forEach(toggleAriaExpanded);
    }
  });

  // Observe aria-expanded on every toggle everywhere
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
  mobileMenuHeaders.forEach(header => {
    const menuContent = header.querySelector("[data-nav='mobile-content']");
    if (!menuContent) return;

    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      menuContent
        ?.querySelectorAll("[data-accordion] h3 > button")
        .forEach(btn => {
          btn.addEventListener("click", event => {
            const el = event.target as HTMLElement;

            if (btn.getAttribute("aria-expanded") === "false") {
              return;
            }

            const expandedDrawerId = el.getAttribute("aria-controls");
            const expandedDrawer = expandedDrawerId
              ? menuContent.querySelector(`#${expandedDrawerId}`)
              : null;

            const targetBB = el.getBoundingClientRect();
            const drawerBB = expandedDrawer?.getBoundingClientRect();

            const yOffset =
              expandedDrawer && drawerBB!.y < targetBB.y ? drawerBB!.height : 0;

            const targetY = el.offsetTop - targetBB.height / 2 - yOffset;

            menuContent.scrollTo({
              behavior: "smooth",
              left: 0,
              top: targetY
            });
          });
        });
    }
  });

  //
  // STANDARD CLOSING
  //
  function closeAllMenus(): void {
    rootElement.querySelectorAll(allTogglesSelector).forEach(el => {
      if (el.getAttribute("aria-expanded") === "true") {
        toggleAriaExpanded(el);
      }
    });
  }

  function closeVeil(): void {
    if (rootElement.dataset.navOpen === "true") {
      // eslint-disable-next-line no-param-reassign
      delete rootElement?.dataset.navOpen;
    }
  }

  function resetPage(): void {
    closeAllMenus();
    closeVeil();
  }

  // Close on link click
  rootElement
    ?.querySelectorAll("[data-nav='link']")
    .forEach(link => link.addEventListener("click", resetPage));

  // Close on logo click
  headers.forEach(header => {
    header
      ?.querySelector("[data-nav='logo']")
      ?.addEventListener("click", resetPage);
  });

  // Close on veil click
  rootElement
    ?.querySelector("[data-nav='veil']")
    ?.addEventListener("click", resetPage);

  // ESC closes all
  rootElement.addEventListener("keydown", e =>
    handleNativeEscapeKeyPress(e, resetPage)
  );

  // autocomplete closes all
  document.addEventListener("autocomplete:selected", closeAllMenus);

  desktopHeaders.forEach(header => {
    header.addEventListener("keydown", e => {
      const activeSection = document.activeElement?.closest(
        "[data-nav='desktop-section']"
      );
      if (!activeSection) return;

      const openSectionId = activeSection.parentElement!.id;

      const activeButton = header.querySelector(
        `${TOGGLE_SELECTORS.desktop}[aria-controls="${openSectionId}"]`
      ) as HTMLButtonElement | null;

      handleNativeEscapeKeyPress(e, () => {
        resetPage();
        if (activeButton) {
          activeButton.focus();
          e.stopPropagation();
        }
      });
    });
  });
}

export default function setupGlobalNavigation(): void {
  window.addEventListener(
    "load",
    () => {
      setup(document.documentElement);
    },
    { passive: true }
  );
}
