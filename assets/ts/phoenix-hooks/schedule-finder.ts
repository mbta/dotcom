import { ViewHook } from "phoenix_live_view";

export const SFDatePicker: Partial<ViewHook> = {
  mounted() {
    if (this.el) {
      this.el.addEventListener("selectDate", event => {
        /*
         * Send the newly selected date to Dotcom.ScheduleFinderLive
         */
        if (this.pushEvent) {
          this.pushEvent("set_date", {
            date: (<CustomEvent>event).detail
          });
        }
      });
    }
  }
};

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
      this.el.addEventListener("toggle", ({ currentTarget }) => {
        if (currentTarget instanceof HTMLDetailsElement && currentTarget.open) {
          /*
           * the element was toggled open, send the details to
           * Dotcom.ScheduleFinderLive for fetching the trip arrivals
           */
          if (this.pushEvent) {
            this.pushEvent("open_trip", {
              trip,
              stop_sequence,
              schedule_id: currentTarget.id
            });
          }
        }
      });
    }
  }
};
