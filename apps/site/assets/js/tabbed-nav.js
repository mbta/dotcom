export default function init() {
  const navTabs = document.querySelectorAll(".m-tabbed-nav__item");
  const contentTabs = document.querySelectorAll(".m-tabbed-nav__content-item");

  navTabs.forEach(item => {
    const { tabType } = item.dataset;

    item.addEventListener("click", e => {
      e.preventDefault();

      navTabs.forEach(tab => tab.classList.remove("active"));
      contentTabs.forEach(tab => tab.classList.remove("active"));
      const contentTab = document.querySelector(
        `.m-tabbed-nav__content-item.${tabType}`
      );
      item.classList.add("active");
      contentTab.classList.add("active");
    });
  });
}
