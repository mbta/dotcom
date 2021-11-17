// Responses handled here:
// - "menu-open" or "search-open" added as class to header
// - HTML body prevented from scrolling
// - update aria-expanded to indicate menu state
// - update text of menu toggle button
// - pass focus from toggle button to first accordion item
// - reset scroll on menu content when menu is closed
// - menu can be closed by pressing esc key or veil-click

export default function($ = window.jQuery) {

  function setupMobileMenu() {
    const htmlElement = document.documentElement;
    const menuButton = document.querySelector("button.m-menu__toggle");
    const searchButton = document.querySelector("button.header-search__toggle");
    const veil = document.querySelector(".m-menu__cover");
    const header = document.querySelector("header.header");
    const menu = document.querySelector(".m-menu__content");

    const scrollToTop = () => {
      window.setTimeout(() => {
        menu.scrollTop = 0;
      }, 200);
    }

    const closeMenus = () => {
      menuButton.ariaExpanded = "false"
      searchButton.ariaExpanded = "false"
      menuButton.innerHTML = 'Menu'
      $(header).removeClass('menu-open');
      $(header).removeClass('search-open');
      $(htmlElement).removeClass('modal-open');
      scrollToTop();
    }
    
    // Menu / search button is a toggle
    menuButton.addEventListener("click", () => {
      $(header).toggleClass('menu-open');
      // Class prevents body scrolling
      $(htmlElement).toggleClass('modal-open');

      const expanded = menuButton.getAttribute("aria-expanded") == 'true';
      menuButton.setAttribute("aria-expanded", !expanded);
      menuButton.innerHTML = expanded ? 'Menu' : 'Close';
      // Pass focus
      if (!expanded) {
        const firstAccordion = document.querySelector(".accordion")
        firstAccordion.focus();
      }
      scrollToTop();
    });
    searchButton.addEventListener("click", () => {
      $(header).toggleClass('search-open');
      $(htmlElement).toggleClass('modal-open');

      const expanded = searchButton.getAttribute("aria-expanded") == 'true';
      searchButton.setAttribute("aria-expanded", !expanded);
      // Pass focus
      if (!expanded) {
        const searchBar = document.querySelector(".m-menu__search #search-homepage__input")
        searchBar.focus();
      }
    });

    // Veil click closes
    veil.addEventListener("click", () => {
      closeMenus();
    })

    // Esc key closes
    document.body.addEventListener("keydown", (e) => {
      handleNativeEscapeKeyPress(e, closeMenus);
    })
  }
  
  document.addEventListener(
    "turbolinks:load",
    () => window.nextTick(setupMobileMenu),
    { passive: true }
  );
}