import { Socket } from "phoenix";
import { LiveSocket } from "phoenix_live_view";

let csrfToken = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content");

let liveSocket = new LiveSocket("/live", Socket, {
  params: { _csrf_token: csrfToken },
  hooks: { ...Hooks, ...DotcomHooks },
  dom: {
    onBeforeElUpdated(from, to) {
      /*
      By default the open/closed state of a <details> element will not
      be preserved across LiveView rerenders. This creates some surprising
      behavior in the mode selector on the trip planner, where each time you
      change your selected mode, the accordion closes.  
      This code forces the `<details>` tag (what the accordion uses under the
      hood) to remember its open/closed state to avoid that bug. 
      */
      if (from.tagName == "DETAILS") {
        const openState = from.getAttribute("open");
        if (openState == "") {
          to.setAttribute("open", "");
        } else {
          to.removeAttribute("open");
        }
      }
    }
  }
});

// connect if there are any LiveViews on the page
liveSocket.connect();

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket;
