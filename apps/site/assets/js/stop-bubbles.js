export default function stopBubbles($) {
  $ = $ || window.jQuery;

  function toggleStopList(e) {
    const targetId = $(e.target).attr("id");
    const clickedLink = $("[data-target='#" + targetId + "']");

    toggleArrow(clickedLink);
    toggleBranch(clickedLink);
  }

  function toggleArrow(link) {
    link.find(".fa").toggleClass("fa-angle-down fa-angle-up");
  }

  function toggleBranch(link) {
    const branch = link.data("target-branch");
    $("[data-branch='" + branch + "']").toggleClass("expanded");
    link.parents(".route-branch-stop").toggleClass("expanded");
  }

  $(document).on(
    "hide.bs.collapse show.bs.collapse",
    ".collapse.stop-list",
    toggleStopList
  );
}
