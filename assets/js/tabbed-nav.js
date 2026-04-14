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

function focusNextElement() {
  // Select all visible, non-disabled focusable elements
  const focusables = Array.from(document.querySelectorAll(
    'button, input, select, textarea, [tabindex]:not([tabindex="-1"]), a'
  )).filter(el => !el.disabled && el.offsetWidth > 0);

  const currentIndex = focusables.indexOf(document.activeElement);
  let nextIndex = (currentIndex + 1) % focusables.length;
  while(focusables[nextIndex].classList.contains("m-tabbed-nav__item")){
    nextIndex = (nextIndex + 1) % focusables.length
  } 
  const nextElement = focusables[nextIndex]; // Wrap to start if at end
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
          focusNextElement();
        }
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });
};

// The following code is for handling keyboard navigation and aria attributes for tabs that are links to other pages

const handleTabsKeys = event => {
  const { key, currentTarget } = event;
  const { parentNode } = currentTarget;
  const selectedTabIndex = Array.from(parentNode.children).findIndex(
    tab => tab === document.activeElement
  );
  let newIndex = selectedTabIndex;

  if (
    key === "ArrowRight" &&
    selectedTabIndex < parentNode.children.length - 1
  ) {
    newIndex += 1;
    event.preventDefault();
    event.stopPropagation();
  }
  if (key === "ArrowLeft" && selectedTabIndex > 0) {
    newIndex -= 1;
    event.preventDefault();
    event.stopPropagation();
  }
  if (key === " ") {
    currentTarget.click();
    event.preventDefault();
    event.stopPropagation();
  }

  currentTarget.setAttribute("aria-selected", false);
  parentNode.children[newIndex].focus();
  parentNode.children[newIndex].setAttribute("aria-selected", true);
};

const genericTabsSetup = () => {
  Array.from(document.querySelectorAll(".tabnav")).forEach(elem => {
    elem.addEventListener("keydown", handleTabsKeys);
  });
};

export default function init() {
  window.addEventListener("load", () => {
    tabbedNavSetup();
    genericTabsSetup();
  });
}
