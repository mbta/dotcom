// Sourced from https://gist.github.com/alekseyg/d2261e42a9b5335a8ce0774b4d92f129 with small
// modifications. Fixes being unable to dismiss tooltips on iOS devices.

export default function($) {
  $ = $ || window.jQuery;
  const selector = '[data-toggle="tooltip"]';

  const wasTapped = element => {
    const touchStart = element.data("lastTouchStart");
    const touchEnd = element.data("lastTouchEnd");
    return (
      touchStart &&
      touchEnd &&
      touchEnd.timeStamp - touchStart.timeStamp <= 500 && // duration
      Math.abs(touchEnd.pageX - touchStart.pageX) <= 10 && // deltaX
      Math.abs(touchEnd.pageY - touchStart.pageY) <= 10 // deltaY
    );
  };

  const wasTouchedRecently = element => {
    const lastTouch =
      element.data("lastTouchEnd") || element.data("lastTouchStart");
    return lastTouch && new Date() - lastTouch.timeStamp <= 550;
  };

  const hideTooltip = element => {
    window.setTimeout(() => {
      element.tooltip("hide");
    }, 10);
  };

  const initTooltip = () => {
    $(selector).each(function(i, el) {
      $(el).tooltip({ container: $(el).parent() });
    });

    $(document).on("touchstart", selector, function(e) {
      $(this).data("lastTouchStart", e.originalEvent);
    });
    $(document).on("touchend", selector, function(e) {
      e.stopPropagation();
      const $this = $(this);
      $this.data("lastTouchEnd", e.originalEvent);

      if (wasTapped($this)) {
        $this.tooltip("toggle");
      }
    });
    $(document).on("mouseenter", selector, function(e) {
      const $this = $(this);
      if (wasTouchedRecently($this)) {
        return;
      }
      // Calling "show" again changes the tooltip ID and the aria-describedby field,
      // which messes with tooltip persistence, so we prevent the call if a tooltip
      // for the trigger already exists, which we can find if the "aria-describedby"
      // field is not empty
      if ($this.attr("aria-describedby")) {
        return;
      }
      $this.tooltip("show");
    });
    $(document).on("mouseleave", selector, function(e) {
      const $this = $(this);
      if (wasTouchedRecently($this)) {
        return;
      }
      // Prevent tooltip from closing when mousing over the tooltip itself
      if (
        typeof e?.relatedTarget?.className === "string" &&
        e.relatedTarget.className.includes("tooltip")
      ) {
        const $tooltip = $(`#${$this.attr("aria-describedby")}`);
        // The tooltip trigger's listener doesn't cover the tooltip, so we need a new listener
        // to close the tooltip when the mouse leaves the tooltip
        if (!$tooltip.data("listener")) {
          $tooltip.on("mouseleave", event => {
            if (
              $(event.relatedTarget).data("original-title") ===
              $this.data("original-title")
            ) {
              return;
            }
            hideTooltip($this);
          });
          $tooltip.data("listener", true);
        }
        return;
      }
      hideTooltip($this);
    });
    $(document).on("focus", selector, function(e) {
      const $this = $(this);
      if (wasTouchedRecently($this)) {
        return;
      }
      $this.tooltip("show");
    });
    $(document).on("focusout", selector, function(e) {
      const $this = $(this);
      if (wasTouchedRecently($this)) {
        return;
      }

      hideTooltip($this);
    });

    $(document).on("touchend", "body", () => {
      hideTooltip($('[data-toggle="tooltip"]'));
    });
  };

  function clearTooltips() {
    $(selector).tooltip("dispose");
    $(".tooltip").remove();
  }

  document.addEventListener("DOMContentLoaded", clearTooltips, {
    passive: true
  });
  window.addEventListener("load", initTooltip, { passive: true });
}
