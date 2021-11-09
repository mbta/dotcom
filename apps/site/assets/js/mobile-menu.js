export default function($ = window.jQuery) {

  function setupMobileMenu() {
    const htmlElement = document.getElementsByTagName("html")[0];
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

    menuButton.addEventListener("click", () => {
      $(header).toggleClass('menu-open');
      $(htmlElement).toggleClass('modal-open');
      scrollToTop();
    });
    searchButton.addEventListener("click", () => {
      $(header).toggleClass('search-open');
      $(htmlElement).toggleClass('modal-open');
    });

    veil.addEventListener("click", () => {
      $(header).removeClass('menu-open');
      $(header).removeClass('search-open');
      $(htmlElement).removeClass('modal-open');
      scrollToTop();
    })

    document.body.addEventListener("keydown", (e) => {
      if (e.key == 'Escape') {
        $(header).removeClass('menu-open');
        $(header).removeClass('search-open');
        $(htmlElement).removeClass('modal-open');
        scrollToTop();
      }
    })
  }
  
  document.addEventListener(
    "turbolinks:load",
    () => window.nextTick(setupMobileMenu),
    { passive: true }
  );
}