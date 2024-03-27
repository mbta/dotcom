export default function($) {
  $ = $ || window.jQuery;

  // hide the elements
  const hide = firstLoad => {
    if (firstLoad) {
      $(".direction-filter").removeAttr("hidden");
      $(".date-picker-container").attr("hidden", "hidden");
    } else {
      $(".date-picker-container").slideUp("slow", () => {
        $(".date-picker-container").attr("hidden", "hidden");
        $(".direction-filter")
          .hide()
          .removeAttr("hidden")
          .slideDown("fast");
      });
    }
    $(".calendar-cover").attr("hidden", "hidden");
  };

  // show the elements
  const show = () => {
    $(".direction-filter").attr("hidden", "hidden");
    $(".date-picker-container")
      .hide()
      .removeAttr("hidden")
      .slideDown("slow");
    $(".calendar-cover").removeAttr("hidden");
  };

  // event handler for toggling
  const toggleDatePicker = ev => {
    ev.preventDefault();
    const expand = document
      .querySelector(".date-picker-container")
      .hasAttribute("hidden");
    const datePickerEl = document.getElementById("date-filter");
    if (expand) {
      show();
      document.getElementById("date-picker-calendar").focus();
    } else {
      hide(false);
      datePickerEl.focus();
    }
    datePickerEl.setAttribute("aria-expanded", expand);
  };

  // setup toggle behavior
  const setupDatePicker = () => {
    hide(true);
    $(document).on("click", ".date-picker-toggle", toggleDatePicker);
  };

  // when the month is shifted, the page will be reloaded, needs to be shown (or re-initialized)
  const displayOnLoad = () => {
    // don't do anything if the container is not available
    if (!document.getElementById("date-filter")) {
      return;
    }

    // check if the shift variable is in the query string
    if (window.location.search.indexOf("shift=") === -1) {
      // re-initialize the page
      requestAnimationFrame(() => hide(true));
    } else {
      // show onload
      requestAnimationFrame(show);
    }
  };

  // events
  setupDatePicker();
  window.addEventListener("load", displayOnLoad, {
    passive: true
  });
}
