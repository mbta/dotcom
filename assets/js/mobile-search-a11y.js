export default () => {
  const doResize = ()=>{
    const mobileSearch = document.getElementsByClassName("m-menu__search")[0];
    const desktopSearch = document.getElementsByClassName("search-wrapper")[0];

    mobileSearch.ariaHidden = (window.innerWidth > 543);
    desktopSearch.ariaHidden = (window.innerWidth < 544);
  }
  window.addEventListener("resize", ()=>doResize());
  window.addEventListener("load", ()=>doResize());
  
}