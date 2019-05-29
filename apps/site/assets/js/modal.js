export default function($) {
  $ = $ || window.jQuery;

  function closeModals() {
    $(".modal.in").modal("hide");
  }

  document.addEventListener("turbolinks:before-cache", closeModals, {
    passive: true
  });
}
