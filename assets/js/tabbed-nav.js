const updateTabs = (
  tabType,
  navTabs,
  contentTabs,
  updateContent = true
) => e => {
  e.preventDefault();
  e.stopPropagation();

  navTabs.forEach(tab => {
    const clickedTab = tab.dataset.tabType === tabType;
    tab.classList.toggle("active", clickedTab);
    tab.setAttribute("aria-selected", clickedTab);
    tab.removeAttribute("aria-current");
    if (clickedTab) {
      if (updateContent) {
        tab.setAttribute("aria-current", "page");
      }
      tab.focus();
    }
  });

  if (updateContent) {
    contentTabs.forEach(tab => {
      const clickedTabContentType = tab.dataset.tabContentType === tabType;
      tab.classList.toggle("active", clickedTabContentType);
    });
  }
};

function focusNextElement(contentElementId) {
  // Select all visible, non-disabled focusable elements
  const focusables = Array.from(document.getElementById(contentElementId).querySelectorAll(
    'button, input, select, textarea, [tabindex]:not([tabindex="-1"]), a'
  )).filter(el => !el.disabled && el.offsetWidth > 0);

  const nextElement = focusables[0]; // Wrap to start if at end
  if (nextElement) nextElement.focus();
}

function focusPreviousElement() {
  // Select all visible, non-disabled focusable elements
  const focusables = Array.from(document.querySelectorAll(
    'button, input, select, textarea, [tabindex]:not([tabindex="-1"]), a'
  )).filter(el => !el.disabled && el.offsetWidth > 0);

  const currentIndex = focusables.indexOf(document.activeElement);
  let nextIndex = currentIndex ? (currentIndex - 1) : focusables.length-1;
  while(focusables[nextIndex].classList.contains("m-tabbed-nav__item")){
    nextIndex = nextIndex ? (nextIndex - 1) : focusables.length-1;
  } 
  const nextElement = focusables[nextIndex]; // Wrap to start if at end
  if (nextElement) nextElement.focus();
}

const tabbedNavSetup = () => {
  const navTabs = document.querySelectorAll(".m-tabbed-nav__item");
  const contentTabs = document.querySelectorAll(".m-tabbed-nav__content-item");

  navTabs.forEach(item => {
    const { tabType } = item.dataset;
    const callback = updateTabs(tabType, navTabs, contentTabs);

    item.addEventListener("click", callback);
    item.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        callback(e);
      }
      const selectedTab = Array.from(navTabs).findIndex(
        tab => tab === document.activeElement
      );
      if (e.key === "ArrowLeft" && selectedTab > 0) {
        updateTabs(
          navTabs[selectedTab - 1].dataset.tabType,
          navTabs,
          contentTabs,
          false
        )(e);
      }
      if (e.key === "ArrowRight" && selectedTab < navTabs.length - 1) {
        updateTabs(
          navTabs[selectedTab + 1].dataset.tabType,
          navTabs,
          contentTabs,
          false
        )(e);
      }
      if (e.key === " ") {
        updateTabs(
          navTabs[selectedTab].dataset.tabType,
          navTabs,
          contentTabs,
          true
        )(e);
      }
      if (e.key === "Tab"){
        if(e.shiftKey){
          focusPreviousElement();
        }else{
          focusNextElement(navTabs[selectedTab].getAttribute("aria-controls"));
        }
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });
};

export default function init() {
  window.addEventListener("load", () => {
    tabbedNavSetup();
  });
}
