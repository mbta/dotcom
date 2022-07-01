const updateTabs = (tabType, navTabs, contentTabs) => e => {
  e.preventDefault();

  navTabs.forEach(tab => {
    const clickedTab = tab.dataset.tabType === tabType;
    tab.classList.toggle("active", clickedTab);
    tab.setAttribute("aria-selected", clickedTab);
  });

  contentTabs.forEach(tab => {
    const clickedTabContentType = tab.dataset.tabContentType === tabType;
    tab.classList.toggle("active", clickedTabContentType);
  });
};

const tabbedNavSetup = () => {
  const navTabs = document.querySelectorAll(".m-tabbed-nav__item");
  const contentTabs = document.querySelectorAll(".m-tabbed-nav__content-item");

  navTabs.forEach(item => {
    const { tabType } = item.dataset;
    const callback = updateTabs(tabType, navTabs, contentTabs);

    item.addEventListener("click", callback);
    item.addEventListener("keyup", e => {
      if (e.key === "Enter") {
        callback(e);
      }
    });
  });
};

export default function init() {
  document.addEventListener("turbolinks:load", () => {
    tabbedNavSetup();
  });
}
