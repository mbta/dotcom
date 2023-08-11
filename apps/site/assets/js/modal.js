export default function($) {
  $ = $ || window.jQuery;

  function closeModals() {
    $(".modal.in").modal("hide");
  }

  document.addEventListener("DOMContentLoaded", closeModals, {
    passive: true
  });
}
