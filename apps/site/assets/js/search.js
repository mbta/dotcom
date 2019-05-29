export default function search($, breakpoints) {
  // focus the search input once the menu is fully expanded
  $(document).on("shown.bs.collapse", "#search", ev => {
    $("[data-input=search]")
      .eq(0)
      .focus();
  });

  document.addEventListener(
    "turbolinks:load",
    () => {
      setupFilterToggleOnMobile($, breakpoints);
    },
    { passive: true }
  );
}

function setupFilterToggleOnMobile($, breakpoints) {
  // submit form every time a checkbox value is changed
  $("[data-facet=search] input[type='checkbox']").change(() => {
    $("[data-form='search-filter']").submit();
  });

  // hide search filter options on mobile
  $("[data-container='search-filter']").addClass("hidden-sm-down");

  // toggle filter options when clicking the header on mobile
  $("[data-heading='search-filter']")
    .addClass("closed")
    .click(ev => {
      // this functionality is only relevent to our smallest breakpoint
      if ($(window).width() > breakpoints.md) {
        return;
      }

      const $header = $(ev.target);
      const $listContainer = $header
        .siblings("[data-container='search-filter']")
        .eq(0);
      if ($listContainer.hasClass("hidden-sm-down")) {
        $listContainer
          .hide()
          .removeClass("hidden-sm-down")
          .slideDown("fast");
        $header.addClass("open").removeClass("closed");
      } else {
        $header.removeClass("open").addClass("closed");
        $listContainer.slideUp("fast", () => {
          $listContainer.addClass("hidden-sm-down").css({ display: "block" });
        });
      }
    });
}
