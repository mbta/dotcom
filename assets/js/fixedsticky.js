// Sets up event listeners that activate the fixedSticky plugin at ../vendor/fixedsticky.js

export default function($) {
  $ = $ || window.jQuery;

  function fixedsticky() {
    $(".fixedsticky").fixedsticky("destroy");
    $(".fixedsticky").fixedsticky();
  }
  window.addEventListener(
    "load",
    () => window.nextTick(fixedsticky),
    { passive: true }
  );
  document.addEventListener(
    "shown.bs.collapse",
    () => window.nextTick(fixedsticky),
    { passive: true }
  );
}
