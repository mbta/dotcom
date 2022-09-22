export default function(
  $ = window.jQuery,
  doc = document,
  navigator = window.navigator
) {
  if ("geolocation" in navigator) {
    doc.addEventListener("turbolinks:before-visit", beforeVisit($), {
      passive: true
    });
    $(document).on(
      "click",
      "[data-geolocation-target]",
      clickHandler($, navigator)
    );
  } else {
    doc.documentElement.className += " geolocation-disabled";
  }
}

function beforeVisit($) {
  return () => {
    $(".loading-indicator, .location-error").addClass("d-none");
  };
}

// These functions are exported for testing
export function clickHandler($, navigator) {
  return event => {
    event.preventDefault();
    const $btn = locationButton($(event.target));
    const $errorEl = $(`#${$btn.data("id")}-geolocation-error`);
    toggleLoadingIndicator($, $btn);
    $errorEl.addClass("d-none");
    navigator.geolocation.getCurrentPosition(
      locationHandler($, $btn, $errorEl),
      locationError($, $btn, $errorEl)
    );
  };
}

export function locationHandler($, $btn, $errorEl) {
  return location => {
    const id = $btn.data("id");
    const field = $btn.data("field");
    $(`#${id}`).trigger("geolocation:complete", location);
  };
}

export function locationError($, $btn, $errorEl) {
  return error => {
    $btn.find(".loading-indicator").addClass("d-none");
    if (
      error.code == error.TIMEOUT ||
      error.code == error.POSITION_UNAVAILABLE
    ) {
      $errorEl.removeClass("d-none");
      $errorEl.html(
        "We couldn't fetch your location &mdash; please wait a minute and try again, or enter your address."
      );
    } else if (error.code == error.PERMISSION_DENIED) {
      $errorEl.removeClass("d-none");
      $errorEl.html(
        "It looks like you haven't granted permission to fetch your location &mdash; to use geolocation, update your browser's settings and try again."
      );
    }
  };
}

function toggleLoadingIndicator($, $btn) {
  const id = $btn.data("id");
  const $indicator = $btn.find(".loading-indicator");
  $indicator.removeClass("d-none");
  $(`#${id}`).on("geolocation:complete", () => {
    $indicator.addClass("d-none");
  });
}

function locationButton($el) {
  var target = $el;
  while (!target.data().geolocationTarget) {
    target = target.parent();
  }
  return target;
}
