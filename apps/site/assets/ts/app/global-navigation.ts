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

function toggleMenu(this: Element): void {
  toggleAriaExpanded(this);
}

const TOGGLE_CLASSES = {
  mobile: "m-menu__toggle",
  search: "header-search__toggle",
  desktop: "m-menu--desktop__toggle"
};

const allTogglesSelector: string = Object.values(TOGGLE_CLASSES)
  .map(className => `.${className}`)
  .join(", ");

function closeAllMenus(): void {
  document.querySelectorAll(allTogglesSelector).forEach(el => {
    if (el.getAttribute("aria-expanded") === "true") {
      toggleAriaExpanded(el);
    }
  });
}

// Note: we can't use `scrollIntoView`, Safari doesn't support it as of
// 2022-02-28, and even if it did, the opening/closing animations of the
// accordions makes the behavior janky on other browsers
function makeScrollAccordionToTop(): (target: HTMLElement) => void {
  const menuContent = document.querySelector(
    ".m-menu--mobile .m-menu__content"
  )! as HTMLElement;

  return (target: HTMLElement): void => {
    if (target.getAttribute("aria-expanded") === "true") {
      return;
    }

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

    const targetY = target.offsetTop - targetBB.height / 2 - yOffset;

    menuContent.scrollTo({
      behavior: "smooth",
      left: 0,
      top: targetY
    });
  };
}

export function setHeaderElementPositions(header: HTMLElement): void {
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

  const cover = document.querySelector(".m-menu--cover") as HTMLElement | null;
  if (cover) {
    cover.style.top = bottomPx;
  }
}

export default function setupGlobalNavigation(): void {
  document.addEventListener(
    "turbolinks:load",
    () => {
      const header = document.querySelector(".header--new")!;
      if (!header) return;

      setHeaderElementPositions(header as HTMLElement);
      window.addEventListener("resize", () => {
        setHeaderElementPositions(header as HTMLElement);
      });

      // On mobile, clicking Menu or the Search icon opens a menu
      header
        .querySelectorAll(
          `button.${TOGGLE_CLASSES.mobile}, button.${TOGGLE_CLASSES.search}`
        )
        .forEach(toggle => {
          toggle.addEventListener("click", toggleMenu);
        });

      // Show the modal search veil and disable scrolling when focusing
      // the search input on tablet
      const input = document.getElementById("search-header-desktop__input");
      if (input) {
        input.addEventListener("focus", () => {
          if (isLGDown()) {
            document.documentElement.classList.add("menu-open");
          }
        });
        input.addEventListener("blur", () => {
          document.documentElement.classList.remove("menu-open");
        });
      }

      // removes focus outline in Safari from open accordions
      document
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
          document.querySelector(".m-menu__content")!.scrollTop = 0;
          mobileMenuToggle.innerHTML = "Close";
        } else {
          mobileMenuToggle.innerHTML = "Menu";
        }

        if (header.classList.contains("search-open")) {
          // pass focus to search bar
          (document.querySelector(
            ".m-menu__search #search-header-mobile__input"
          ) as HTMLElement)!.focus();
        }
      });

      // When any navigation menu is expanded,
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

        // adjust theme color
        document
          .querySelector('meta[name="theme-color"]')
          ?.setAttribute("content", aMenuIsExpanded ? "#0b2f4c" : "#165c96");

        // add/remove classes based on which menu is expanded
        // .menu-open on the document body
        // .menu-open or .search-open on the header
        if (aMenuIsExpanded) {
          document.documentElement.classList.add("menu-open");
          disableBodyScroll(header);
          if (observedClassNames.includes(TOGGLE_CLASSES.mobile)) {
            header.classList.add("menu-open");
            disableBodyScroll(document.querySelector(".m-menu__content")!);
          } else if (observedClassNames.includes(TOGGLE_CLASSES.search)) {
            header.classList.add("search-open");
          }
        } else {
          clearAllBodyScrollLocks();
          document.documentElement.classList.remove("menu-open");
          if (observedClassNames.includes(TOGGLE_CLASSES.mobile)) {
            header.classList.remove("menu-open");
          } else if (observedClassNames.includes(TOGGLE_CLASSES.search)) {
            header.classList.remove("search-open");
          }
        }

        // To close the desktop navigation programmatically, normally one could
        // trigger the hide.bs.collapse event, but Bootstrap's collapse plugin
        // was still buggy in v4.0.0-alpha.2, so we'll close it here. if button
        // state indicates menu should be closed, and observed attribute change
        // is on the desktop navigation buttons, we can close the desktop menu.
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

      // Scroll accordion into view on click
      if (
        window.matchMedia("(prefers-reduced-motion: no-preference)").matches
      ) {
        const scrollAccordionToTop = makeScrollAccordionToTop();
        document
          .querySelectorAll(".m-menu--mobile .c-accordion-ui__trigger")
          .forEach(el =>
            el.addEventListener("click", () =>
              scrollAccordionToTop(el as HTMLElement)
            )
          );
      }

      // menu click closes
      const menu_links = document.querySelectorAll(".m-menu__link");
      for (let i = 0; i < menu_links.length; i += 1) {
        menu_links[i].addEventListener("click", closeAllMenus);
      }

      // T logo click closes
      header
        .querySelector(".navbar-logo")
        ?.addEventListener("click", closeAllMenus);

      // Veil click or Esc key closes everything
      document.body.addEventListener("keydown", e => {
        handleNativeEscapeKeyPress(e, closeAllMenus);
      });

      if (header.previousElementSibling?.classList.contains("m-menu--cover"))
        header.previousElementSibling.addEventListener("click", closeAllMenus);
    },
    { passive: true }
  );
}
