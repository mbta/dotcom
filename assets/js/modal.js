export default function($) {
  $ = $ || window.jQuery;

  function closeModals() {
    $(".modal.in").modal("hide");
  }

  document.addEventListener("DOMContentLoaded", closeModals, {
    passive: true
  });

  // Open <dialog id="x"> from a <button data-dialog-modal="x">
  window.addEventListener("load", () => {
    document.querySelectorAll("[data-dialog-modal]").forEach(el => {
      const modalId = el.dataset.dialogModal;
      if (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
          el.addEventListener("click", () => {
            modal.showModal();
          });
          if (modal.dataset.open != null) {
            modal.showModal();
          }
        }
      }
    });
  });
}
