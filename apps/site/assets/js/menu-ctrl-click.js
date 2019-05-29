export default function($ = window.jQuery) {
  $('.desktop-nav-link[data-parent="#desktop-menu"]').click(clickHandler($));
}

// Exported for testing
export function clickHandler($) {
  return function(event) {
    if (event.ctrlKey || event.metaKey) {
      // ctrl for Windows, meta for others
      const $this = $(this),
        href = $(this).attr("href");
      event.preventDefault();
      event.stopPropagation();
      window.open(href, "_blank");
    }
  };
}
