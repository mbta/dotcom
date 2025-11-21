import { ViewHook } from "phoenix_live_view";

export const SFRouteRingColor: Partial<ViewHook> = {
  mounted() {
    if (this.el) {
      const computedStyle = window.getComputedStyle(this.el);
      const baseColor = computedStyle.backgroundColor;
      this.el.style.setProperty(
        "--tw-ring-color",
        `color-mix(in oklab, ${baseColor}, black 20%)`
      );
    }
  }
};

export const SFTripRow: Partial<ViewHook> = {
  mounted() {
    if (this.el) {
      const { trip, stop_sequence } = this.el.dataset;
      this.el.addEventListener("toggle", event => {
        if (this.el.open) {
          /* the element was toggled open */
          this.pushEvent("open_trip", {
            trip,
            stop_sequence,
            schedule_id: this.el.id
          });
        } else {
          /* the element was toggled closed */
        }
      });
    }
  }
};
