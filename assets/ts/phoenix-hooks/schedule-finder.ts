/* eslint-disable import/prefer-default-export */
import { ViewHook } from "phoenix_live_view";

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
