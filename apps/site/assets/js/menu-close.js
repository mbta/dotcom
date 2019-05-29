export default function($) {
  $ = $ || window.jQuery;

  function checkMenuCollapse(canBeSimulated) {
    return ev => {
      if (!canBeSimulated && ev.isSimulated) {
        // ignore fake click events
        return;
      }
      const element = ev.target;
      // if the focus moves outside the menu and there's still an open menu,
      // click it (which closes it).
      if (element && $(element).parents("#desktop-menu").length) {
        return;
      }

      $("#desktop-menu [aria-expanded=true]").click();
    };
  }

  $(document).on("focusin", "body", checkMenuCollapse(true));
  $(document).on("click", "body", checkMenuCollapse());
}
