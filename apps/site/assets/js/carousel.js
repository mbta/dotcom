export default function($) {
  $ = $ || window.jQuery;

  function setupCarousel() {
    $(".carousel").each((_index, carousel) => {
      $(carousel)
        .on("click", ".carousel-item", activateCarouselItem)
        .on("keydown", ".carousel-item", ev => {
          if (ev.keyCode === 13 || ev.keyCode === 32) {
            activateCarouselItem(ev);
          }
        })
        .find(".carousel-item:first-child")
        .click();
    });
  }

  function activateCarouselItem(ev) {
    ev.preventDefault();
    const $item = $(ev.currentTarget);
    const $target = $(ev.delegateTarget.getAttribute("data-target"));
    $target.html($item.children().clone());
  }

  document.addEventListener(
    "turbolinks:load",
    () => window.nextTick(setupCarousel),
    { passive: true }
  );
}
