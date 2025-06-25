/* eslint-disable */
import "bootstrap/dist/js/umd/collapse";
import "bootstrap/dist/js/umd/dropdown";
import "bootstrap/dist/js/umd/modal";
import "bootstrap/dist/js/umd/tooltip";
import { Hooks } from "mbta_metro";
import setupChannels from "../ts/app/channels";
import setupGlobalNavigation from "../ts/app/global-navigation";
import DotcomHooks from "../ts/phoenix-hooks/index.ts";
import initializeSentry from "../ts/sentry";
import { accordionInit } from "../ts/ui/accordion";
import "../vendor/accessible-date-picker";
import "../vendor/fixedsticky";
import { onload as alertItemLoad } from "./alert-item";
import * as globalSearch from "./algolia-global-search";
import collapse from "./collapse";
import datePicker from "./date-picker";
import eventPageSetup from "./event-page-setup";
import fixedsticky from "./fixedsticky";
import fullstory from "./fullstory";
import googleAnalytics from "./google-analytics";
import googleTranslate from "./google-translate";
import inputFocus from "./input-focus";
import juxtapose from "./juxtapose";
import modal from "./modal";
import photoGallery from "./photo-gallery";
import pslPageSetup from "./psl-page-setup.js";
import scrollTo from "./scroll-to";
import search from "./search";
import stickyTooltip from "./sticky-tooltip";
import submitOnEvents from "./submit-on-events";
import supportForm from "./support-form";
import tabbedNav from "./tabbed-nav.js";
import * as TimeControls from "./time-controls/time-controls";
import timetableScroll from "./timetable-scroll";
import timetableStick from "./timetable-stick";
import timetableStyle from "./timetable-style";
import toggleBtn from "./toggle-on-click";
import translateAnalytics from "./translate-analytics.js";
import previousEventsButton from "./view-previous-events";

import mobileAppBanner from "./mobile-app-banner.js";

// Establish Phoenix Socket and LiveView configuration.
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

initializeSentry();

document.body.className = document.body.className.replace("no-js", "js");

window.addEventListener("DOMContentLoaded", () => {
  document.body.className = document.body.className.replace("no-js", "js");
});

// Doesn't work with ProvidePlugin due to window.zepto dep
window.autocomplete = autocomplete;

// Polyfills
window.nextTick = function nextTick(f) {
  window.setTimeout(f, 0);
};

if ("outerHTML" in SVGElement.prototype) {
  Object.defineProperty(SVGElement.prototype, "outerHTML", {
    get() {
      const container = document.createElement("div");
      container.appendChild(this.cloneNode(true));
      return container.innerHTML;
    },
    enumerable: false,
    configurable: true
  });
}

// breakpoints defined in assets/css/_variables.scss
const breakpoints = { xs: 0, sm: 544, md: 800, lg: 1088, xxl: 1344 };

submitOnEvents(["blur", "change"]);
googleAnalytics();
setupGlobalNavigation();
collapse();
alertItemLoad();
modal();
supportForm();
fixedsticky();
inputFocus();
googleTranslate();
translateAnalytics();
scrollTo();
tabbedNav();
timetableScroll();
timetableStyle();
timetableStick();
datePicker();
toggleBtn();
search(window.$, breakpoints);
photoGallery();
stickyTooltip();
globalSearch.init();
TimeControls.init();
fullstory();
setupChannels();
eventPageSetup();
previousEventsButton();
pslPageSetup();
accordionInit();
juxtapose();

mobileAppBanner();
