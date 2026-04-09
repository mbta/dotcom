const updateTabs = (tabType, navTabs, contentTabs, updateContent=true) => e => {

  e.preventDefault();
  e.stopPropagation();

  navTabs.forEach(tab => {
    const clickedTab = tab.dataset.tabType === tabType;
    tab.classList.toggle("active", clickedTab);
    tab.setAttribute("aria-selected", clickedTab);
    tab.removeAttribute("aria-current")
    if(clickedTab){
      if(updateContent){tab.setAttribute("aria-current","page");}
      tab.focus();
    }
  });

  if(updateContent){
    contentTabs.forEach(tab => {
      const clickedTabContentType = tab.dataset.tabContentType === tabType;
      tab.classList.toggle("active", clickedTabContentType);
    });
  }
};

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
      const selectedTab = Array.from(navTabs).findIndex(tab=>{tab.getAttribute("aria-selected")=="true"});
      if(e.key === "ArrowLeft" && selectedTab > 0){
        updateTabs(navTabs[selectedTab-1].dataset.tabType, navTabs, contentTabs, false)(e);
      }
      if(e.key === "ArrowRight" && selectedTab < navTabs.length - 1){
        updateTabs(navTabs[selectedTab+1].dataset.tabType, navTabs, contentTabs, false)(e);
      }
      if(e.key === " "){
        updateTabs(navTabs[selectedTab].dataset.tabType, navTabs, contentTabs, true)(e);
      }
    });
  });
};

export default function init() {
  window.addEventListener("load", () => {
    tabbedNavSetup();
  });
}
