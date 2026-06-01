import { ViewHook } from "phoenix_live_view";

interface PageVisibilityHook extends ViewHook {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Send `visibilitychange` events to the parent LiveView
 *
 * 1. add `phx-hook="PageVisibility"` somewhere in the LiveView
 * 2. use `handle_event("visibility_change", %{"state" => state}, socket)` to add code to handle the change. `state` will either be "visible" or "hidden".
 */
const PageVisibility: Partial<PageVisibilityHook> = {
  mounted() {
    this.handlePageVisibility = () => {
      if (this.pushEvent) {
        this.pushEvent("visibility_change", {
          state: document.visibilityState
        });
      }
    };

    document.addEventListener("visibilitychange", this.handlePageVisibility);
    this.handlePageVisibility(); // send current state
  },
  reconnected() {
    this.handlePageVisibility(); // send current state
  },
  destroyed() {
    document.removeEventListener("visibilitychange", this.handlePageVisibility);
  }
};

export default PageVisibility;
