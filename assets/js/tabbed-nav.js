const updateTabs = (
  tabType,
  navTabs,
  contentTabs) => e => {
  e.preventDefault();
  e.stopPropagation();

  navTabs.forEach(tab => {
    const clickedTab = tab.dataset.tabType === tabType;
    tab.classList.toggle("active", clickedTab);
    tab.setAttribute("aria-selected", clickedTab);
    tab.removeAttribute("aria-current");
    tab.setAttribute("tabindex", "-1");

    if (clickedTab) {
      tab.setAttribute("aria-current", "page");
      tab.setAttribute("tabindex", "0");
      tab.focus();
    }
  });

  contentTabs.forEach(tab => {
    const clickedTabContentType = tab.dataset.tabContentType === tabType;
    tab.classList.toggle("active", clickedTabContentType);
  });
  
};

const focusOtherTab = (navTabs, increment) => {
  const selectedTab = Array.from(navTabs).findIndex(
    tab => tab === document.activeElement
  );
  let newIndex = selectedTab + increment;
  if (newIndex < 0) {
    newIndex = navTabs.length - 1;
  }
  if (newIndex > navTabs.length - 1) {
    newIndex = 0;
  }
  navTabs[newIndex].setAttribute("tabindex", "0");
  navTabs[newIndex].focus();
  navTabs[selectedTab].setAttribute("tabindex", "-1");
};

const tabbedNavSetup = () => {
  const navTabs = document.querySelectorAll(".m-tabbed-nav__item");
  const contentTabs = document.querySelectorAll(".m-tabbed-nav__content-item");

  navTabs.forEach(item => {
    const { tabType } = item.dataset;
    const callback = updateTabs(tabType, navTabs, contentTabs);

    item.addEventListener("click", callback);
    item.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        callback(e);
      }
      
      if (e.key === "ArrowLeft") {
        focusOtherTab(navTabs, -1);
      }
      if (e.key === "ArrowRight") {
        focusOtherTab(navTabs, 1);
      }
    });
  });
};

export default function init() {
  window.addEventListener("load", () => {
    tabbedNavSetup();
  });
}
