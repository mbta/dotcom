import debounce from "../ts/helpers/debounce.ts";
import isMSBrowser from "../ts/helpers/ms-browser.ts";

export default () => {
  document.addEventListener("turbolinks:load", adjustTimetableStyle, {
    passive: true
  });
  window.addEventListener("resize", resizeRows);
};

const adjustTimetableStyle = () => {
  // return if there is no timetable available
  const timetableEl = document.getElementById("timetable");
  if (!timetableEl) {
    return;
  }

  // remove border around container because timetable "hat" is visible
  timetableEl.style.borderTop = 0;

  // make headers absolutely position so they stick when table is scrolled
  [...document.querySelectorAll("th[data-absolute]")].forEach(headerEl => {
    headerEl.style.position = "absolute";
  });

  resizeRows();

  // register an on-scroll event to enable / disable buttons
  timetableEl.addEventListener("scroll", toggleScrollButtons);

  if (!isMSBrowser()) {
    // register an on-scroll event to handle toggling extra scrolling headers
    document.addEventListener("scroll", toggleStickyTableHeaders);
  }
};

const resizeRow = rowEl => {
  const height = rowEl.querySelector(".js-tt-stop-name").offsetHeight;
  [...rowEl.querySelectorAll(".js-tt-cell")].forEach(
    cell => (cell.style.height = `${height}px`)
  );
};

const resizeRows = () => {
  // adjust heights of rows where text may be
  // overflowing absolutely positioned container
  [...document.querySelectorAll(".js-tt-row")].forEach(resizeRow);
};

const toggleScrollButtons = debounce(({ target }) => {
  // if using sticky table headers, then the target element is the document
  const scrollArea = target.scrollWidth ? target : target.scrollingElement;
  const maxScrollLeft = scrollArea.scrollWidth - scrollArea.clientWidth;
  const scrollLeft = scrollArea.scrollLeft;
  const leftBtnEl = document.querySelector("button[data-scroll='earlier']");
  const rightBtnEl = document.querySelector("button[data-scroll='later']");

  if (leftBtnEl) {
    scrollLeft === 0
      ? leftBtnEl.setAttribute("disabled", "")
      : leftBtnEl.removeAttribute("disabled");
  }
  if (rightBtnEl) {
    Math.abs(maxScrollLeft - scrollLeft) <= 1 // this can be off by a pixel sometimes
      ? rightBtnEl.setAttribute("disabled", "")
      : rightBtnEl.removeAttribute("disabled");
  }
}, 250);

/**
 * Make top headings (train numbers) visible in the timetable.
 * This is done by adding a CSS class under certain conditions.
 * Scrolls, zooms, and resizes can all cause relative sizes to change
 * and elements to shift, so activate/deactivate this feature accordingly.
 */
const TRIGGER_CLASSNAME = "m-timetable--withstickyheader";
const wrapperEl = document.querySelector(".m-timetable");
const timetableEl = document.getElementById("timetable");
const topHeaderEl = document.querySelector(".m-timetable__header");

const toggleStickyTableHeaders = debounce(event => {
  if (!wrapperEl || !timetableEl) return; // do nothing if there's no table

  const headerHeight = topHeaderEl.clientHeight;
  const {
    top: wrapperTop,
    bottom: wrapperBottom,
    height: wrapperHeight
  } = wrapperEl.getBoundingClientRect();

  // wrapperHeight is 100% the viewport height. if the timetable height
  // is smaller than this, then sticky headers are not needed
  const isSticky = wrapperEl.classList.contains(TRIGGER_CLASSNAME);
  if (timetableEl.getBoundingClientRect().height <= wrapperHeight) {
    if (isSticky) deactivate();
    return;
  }

  const topLeavingView = wrapperTop <= 0;
  const bottomLeavingView = wrapperBottom <= headerHeight;
  if (!isSticky && topLeavingView) {
    activate();
  } else if (isSticky && (!topLeavingView || bottomLeavingView)) {
    deactivate();
  }

  function activate() {
    wrapperEl.classList.add(TRIGGER_CLASSNAME);

    // register an on-scroll event to enable / disable buttons
    // in this case the timetableEl no longer can scroll, so
    // listen on the document
    document.addEventListener("scroll", toggleScrollButtons);
    document.dispatchEvent(new Event("scroll"));
  }

  function deactivate() {
    wrapperEl.classList.remove(TRIGGER_CLASSNAME);
    wrapperEl.scrollTop = 0; // scroll the inner timetable back to the top
    resizeRows();
    document.removeEventListener("scroll", toggleScrollButtons);
    timetableEl.dispatchEvent(new Event("scroll"));
  }
}, 250);
