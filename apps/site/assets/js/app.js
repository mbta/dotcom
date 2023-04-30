/* eslint-disable */
import "../vendor/fixedsticky";
import "../vendor/accessible-date-picker";
import "bootstrap/dist/js/umd/collapse";
import "bootstrap/dist/js/umd/modal";
import "bootstrap/dist/js/umd/tooltip";
import "bootstrap/dist/js/umd/dropdown";
import objectFitImages from "object-fit-images";
import googleAnalytics from "./google-analytics";
import googleMapsLoaded from "./google-maps-loaded";
import submitOnEvents from "./submit-on-events";
import collapse from "./collapse";
import setupGlobalNavigation from "../ts/app/global-navigation";
import modal from "./modal";
import turbolinksMods from "./turbolinks-mods";
import supportForm from "./support-form";
import fixedsticky from "./fixedsticky";
import geoLocation from "./geolocation";
import addressSearch from "./address-search";
import autocompleteSetup from "./autocomplete-setup";
import googleTranslate from "./google-translate";
import scrollTo from "./scroll-to";
import stickyTooltip from "./sticky-tooltip";
import timetableScroll from "./timetable-scroll";
import timetableStyle from "./timetable-style";
import timetableStick from "./timetable-stick";
import datePicker from "./date-picker";
import toggleBtn from "./toggle-on-click";
import * as TimeControls from "./time-controls/time-controls";
import * as TripPlannerLocationControls from "./trip-planner-location-controls";
import stopBubbles from "./stop-bubbles";
import search from "./search";
import photoGallery from "./photo-gallery";
import { init as embeddedSearchInit } from "./algolia-embedded-search";
import * as homepageSearch from "./algolia-homepage-search";
import * as globalSearch from "./algolia-global-search";
import fullstory from "./fullstory";
import inputFocus from "./input-focus";
import setupChannels from "../ts/app/channels";
import CRTrains from "./cr-timetable-trains";
import { onload as alertItemLoad } from "./alert-item";
import dismissFullscreenError from "../ts/app/dismiss-fullscreen-error";
import tripPlannerWidget from "./trip-planner-widget";
import eventPageSetup from "./event-page-setup";
import previousEventsButton from "./view-previous-events";
import pslPageSetup from "./psl-page-setup.js";
import tabbedNav from "./tabbed-nav.js";
import setupAccordion from "../ts/ui/accordion";
import initializeSentry from "../ts/sentry";
import setupAutocomplete from "../ts/ui/autocomplete/index";

initializeSentry();
setupAutocomplete();

document.body.className = document.body.className.replace("no-js", "js");

// Extra steps for non-modular javascript
Turbolinks.start();
// Won't work as ProvidePlugin due to above
window.Turbolinks = Turbolinks;

// Doesn't work with ProvidePlugin due to window.zepto dep
window.autocomplete = autocomplete;

// Polyfills
window.nextTick = function nextTick(f) {
  window.setTimeout(f, 0);
};

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(f) {
    window.setTimeout(f, 15);
  };

// Source: https://github.com/Alhadis/Snippets/blob/master/js/polyfills/IE8-child-elements.js
if (!("previousElementSibling" in document.documentElement)) {
  Object.defineProperty(Element.prototype, "previousElementSibling", {
    get() {
      let e = this.previousSibling;
      while (e && e.nodeType !== 1) {
        e = e.previousSibling;
      }
      return e;
    }
  });
}

if (!("nextElementSibling" in document.documentElement)) {
  Object.defineProperty(Element.prototype, "nextElementSibling", {
    get() {
      let e = this.nextSibling;
      while (e && e.nodeType !== 1) {
        e = e.nextSibling;
      }
      return e;
    }
  });
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function(callback /* , thisArg */) {
    let T;
    let A;
    let k;
    if (this == null) {
      throw new TypeError("this is null or not defined");
    }
    const O = Object(this);
    const len = O.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError(`${callback} is not a function`);
    }
    if (arguments.length > 1) {
      T = arguments[1];
    }
    A = new Array(len);
    // 7. Let k be 0
    while (k < len) {
      var kValue;
      var mappedValue;
      if (k in O) {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }
    return A;
  };
}

// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
if (!Array.from) {
  Array.from = (function() {
    const toStr = Object.prototype.toString;
    const isCallable = function(fn) {
      return typeof fn === "function" || toStr.call(fn) === "[object Function]";
    };
    const toInteger = function(value) {
      const number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    const maxSafeInteger = Math.pow(2, 53) - 1;
    const toLength = function(value) {
      const len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /* , mapFn, thisArg */) {
      // 1. Let C be the this value.
      const C = this;

      // 2. Let items be ToObject(arrayLike).
      const items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError(
          "Array.from requires an array-like object - not null or undefined"
        );
      }

      // 4. If mapfn is undefined, then let mapping be false.
      const mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      let T;
      if (typeof mapFn !== "undefined") {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            "Array.from: when provided, the second argument must be a function"
          );
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      const len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      const A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      let k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      let kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] =
            typeof T === "undefined"
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  })();
}

// https://tc39.github.io/ecma262/#sec-array.prototype.find
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, "find", {
    value(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      const o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      const len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      const thisArg = arguments[1];

      // 5. Let k be 0.
      let k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        const kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}

// Source: https://github.com/jserz/js_piece/blob/master/DOM/NonDocumentTypeChildNode/nextElementSibling/nextElementSibling.md
(function(arr) {
  arr.forEach(item => {
    if (item.hasOwnProperty("nextElementSibling")) {
      return;
    }
    Object.defineProperty(item, "nextElementSibling", {
      configurable: true,
      enumerable: true,
      get() {
        let el = this;
        while ((el = el.nextSibling)) {
          if (el.nodeType === 1) {
            return el;
          }
        }
        return null;
      },
      set: undefined
    });
  });
})([Element.prototype, CharacterData.prototype]);

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

// Element.closest() support for older browsers
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// breakpoints defined in assets/css/_variables.scss
const breakpoints = { xs: 0, sm: 544, md: 800, lg: 1088, xxl: 1344 };

submitOnEvents(["blur", "change"]);
googleAnalytics();
googleMapsLoaded();
setupGlobalNavigation();
collapse();
alertItemLoad();
modal();
turbolinksMods();
supportForm();
fixedsticky();
objectFitImages(); // Polyfill for IE object-fit support
inputFocus();
geoLocation();
addressSearch();
autocompleteSetup();
googleTranslate();
scrollTo();
tabbedNav();
timetableScroll();
timetableStyle();
timetableStick();
datePicker();
toggleBtn();
stopBubbles();
search(window.$, breakpoints);
photoGallery();
stickyTooltip();
globalSearch.init();
homepageSearch.init();
embeddedSearchInit();
TripPlannerLocationControls.init();
TimeControls.init();
fullstory();
setupChannels();
CRTrains();
dismissFullscreenError();
tripPlannerWidget();
eventPageSetup();
previousEventsButton();
pslPageSetup();
setupAccordion(document.documentElement);
