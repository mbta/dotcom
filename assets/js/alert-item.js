const ITEM_SELECTOR = "js-toggle-alert";

export const onload = () =>
  window.addEventListener("load", addAlertItemEventHandlers, {
    passive: true
  });

export const addAlertItemEventHandlers = () => {
  if (typeof document !== "undefined") {
    [...document.querySelectorAll(`.${ITEM_SELECTOR}`)].forEach(alertItem => {
      alertItem.addEventListener("click", handleAlertItemClick);
      alertItem.addEventListener("keydown", handleAlertItemKeyPress);

      if (
        document.querySelector(".diversions-template") &&
        alertItem.querySelector("img")
      ) {
        alertItem.click();
      }
    });
  }
};

export const removeAlertItemEventHandlers = () => {
  if (typeof document !== "undefined") {
    [...document.querySelectorAll(`.${ITEM_SELECTOR}`)].forEach(alertItem => {
      alertItem.removeEventListener("click", handleAlertItemClick);
      alertItem.removeEventListener("keydown", handleAlertItemKeyPress);
    });
  }
};

const handleAlertItemKeyPress = e =>
  isEnter(e.key || e.keyCode) ? handleAlertItemClick(e) : () => {};

const isEnter = key => key === "Enter" || key === 13;

const handleAlertItemClick = e =>
  e.target.tagName !== "A" &&
  doHandleAlertItemClick(getParentsUntil(e.target, ITEM_SELECTOR));

const doHandleAlertItemClick = el =>
  batchDomMutations(el, el.getAttribute("aria-expanded") === "true");

const batchDomMutations = (el, opened) => {
  toggleOpenClass(el, opened);
  toggleAriaAttribute(el, opened);
};

const toggleOpenClass = (el, opened) =>
  opened === true
    ? el.classList.remove("c-alert-item--open")
    : el.classList.add("c-alert-item--open");

const toggleAriaAttribute = (el, opened) =>
  opened === true
    ? el.setAttribute("aria-expanded", "false")
    : el.setAttribute("aria-expanded", "true");

const getParentsUntil = (el, selector) =>
  el.classList.contains(selector) === true
    ? el
    : getParentsUntil(el.parentNode, selector);
