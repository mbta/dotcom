let scrollCallback = false;

export default () => {
  document.addEventListener("turbolinks:load", adjustTimetableStyle, {
    passive: true
  });
  window.addEventListener("resize", resizeRows);
};

const adjustTimetableStyle = () => {
  // return if there is no timetable available
  const timetableContainerEl = document.getElementById("timetable");
  if (!timetableContainerEl) {
    return;
  }

  // remove border around container because timetable "hat" is visible
  timetableContainerEl.style.borderTop = 0;

  // make headers absolutely position so they stick when table is scrolled
  [...document.querySelectorAll("th[data-absolute]")].forEach(headerEl => {
    headerEl.style.position = "absolute";
  });

  resizeRows();

  // register an on-scroll event to enable / disable buttons
  timetableContainerEl.addEventListener("scroll", toggleScrollButtons);
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

const toggleScrollButtons = event => {
  if (scrollCallback !== false) {
    clearTimeout(scrollCallback);
  }
  scrollCallback = setTimeout(() => {
    const maxScrollLeft = event.target.scrollWidth - event.target.clientWidth;
    const scrollLeft = event.target.scrollLeft;
    const leftBtnEl = document.querySelector("button[data-scroll='earlier']");
    const rightBtnEl = document.querySelector("button[data-scroll='later']");

    if (leftBtnEl) {
      scrollLeft === 0
        ? leftBtnEl.setAttribute("disabled", "")
        : leftBtnEl.removeAttribute("disabled");
    }
    if (rightBtnEl) {
      scrollLeft === maxScrollLeft
        ? rightBtnEl.setAttribute("disabled", "")
        : rightBtnEl.removeAttribute("disabled");
    }
  }, 250);
};
