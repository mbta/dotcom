export default function($) {
  $ = $ || window.jQuery;

  $(document).on("load", function() {
    $("[toggle-element-collapse]").addClass("collapse");
  });
  $(document).on("click", "[data-toggle-collapse]", function() {
    const route_id = $(this).attr("data-toggle-collapse");
    const toggle_elements = "[data-toggle-route=" + route_id + "]";
    $(toggle_elements).toggle();
  });

  $(document).on("click", "[data-toggle-hide]", function() {
    $("[data-toggle-hide]").hide();
  });
}
