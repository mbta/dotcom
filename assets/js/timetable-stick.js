/**
 * When scrolling down the timetable,
 * ensure the train numbers are always visible on screen
 */

const trainLabelRow = document.querySelector(".js-timetable-train-labels");
const trainLabels = trainLabelRow ? Array.from(trainLabelRow.children) : [];
const tableEl = document.getElementById("timetable");
const tableBodyEl = document.querySelector(".m-timetable tbody");
const stickyHeaderEl = document.createElement("div");
stickyHeaderEl.setAttribute(
  "style",
  "border: 1px solid #b0b5c0; overflow: hidden; position: fixed; top: 0;"
);
stickyHeaderEl.setAttribute("aria-hidden", "true");
let removedLabels = null;
let isStuck = false;

const sideScrollStickyHeader = () => {
  window.requestAnimationFrame(() => {
    stickyHeaderEl.scrollLeft = tableEl.scrollLeft;
  });
};

const showStickyLabels = () => {
  sideScrollStickyHeader();

  if (removedLabels) {
    document.body.appendChild(removedLabels);
  } else {
    const {
      right: tableRight,
      width: tableWidth
    } = tableEl.getBoundingClientRect();

    stickyHeaderEl.style.right = `${tableRight - tableWidth}px`;
    stickyHeaderEl.style.width = `${tableWidth}px`;
    trainLabels.forEach(labelEl => {
      const { fontSize, width } = window.getComputedStyle(labelEl);
      const stickyLabelEl = labelEl.cloneNode(true);
      stickyLabelEl.className = "m-timetable__header-cell";
      stickyLabelEl.style.fontSize = fontSize;
      stickyLabelEl.style.minWidth = width;
      stickyLabelEl.style.maxWidth = width;
      stickyHeaderEl.appendChild(stickyLabelEl);
    });

    document.body.appendChild(stickyHeaderEl);
  }

  /**
   *  listen to the table scroll event to handle sticky header positioning
   */
  tableEl.addEventListener("scroll", sideScrollStickyHeader);
  isStuck = true;
};

const hideStickyLabels = () => {
  if (removedLabels) {
    stickyHeaderEl.parentNode.removeChild(stickyHeaderEl);
  } else {
    removedLabels = stickyHeaderEl.parentNode.removeChild(stickyHeaderEl);
  }

  tableEl.removeEventListener("scroll", sideScrollStickyHeader);
  isStuck = false;
};

const resizeStickyHeader = () => {
  const {
    right: tableRight,
    width: tableWidth
  } = tableEl.getBoundingClientRect();
  stickyHeaderEl.style.right = `${tableRight - tableWidth}px`;
  stickyHeaderEl.style.width = `${tableWidth}px`;
  const stickyLabels = stickyHeaderEl.childNodes;
  if (stickyLabels.length > 0) {
    trainLabels.forEach((trainLabel, index) => {
      const { fontSize, width } = window.getComputedStyle(trainLabel);
      stickyLabels[index].style.fontSize = fontSize;
      stickyLabels[index].style.minWidth = width;
      stickyLabels[index].style.maxWidth = width;
    });
  }
};

const setUp = () => {
  if (trainLabelRow && tableEl) {
    /**
     *  listen to the scroll event to check whether we need to pin the train
     *  labels to the top of the screen
     */
    document.addEventListener("scroll", () => {
      window.requestAnimationFrame(() => {
        const {
          top: tableTop,
          bottom: tableBottom
        } = tableBodyEl.getBoundingClientRect();

        if (!isStuck && tableTop < 0 && tableBottom > 20) {
          showStickyLabels();
        } else if (isStuck && (tableTop >= 0 || tableBottom < 20)) {
          hideStickyLabels();
        }
      });
    });

    /**
     * listen to the resize event in case we need to resize the sticky header
     */
    window.addEventListener("resize", () => {
      window.requestAnimationFrame(() => {
        if (
          stickyHeaderEl.getBoundingClientRect().right !==
          tableBodyEl.getBoundingClientRect().right
        ) {
          resizeStickyHeader();
        }
      });
    });
  }
};

export default () => {
  window.addEventListener("load", setUp, {
    passive: true
  });
};
