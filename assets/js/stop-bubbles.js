export default function stopBubbles($) {
  $ = $ || window.jQuery;

  function toggleArrow(link) {
    link.find(".fa").toggleClass("fa-angle-down fa-angle-up");
  }

  function toggleShowHide(link) {
    const text = link.find(".expand-show-details").text()
    link.find(".expand-show-details").text(text.includes("Show Details") ? "Hide Details" : "Show Details")
  }

  function toggleBranch(link) {
    const branch = link.data("target-branch");
    $("[data-branch='" + branch + "']").toggleClass("expanded");
    link.parents(".route-branch-stop").toggleClass("expanded");
  }

  function toggleStopList(e) {
    const targetId = $(e.target).attr("id");
    const clickedLink = $("[data-target='#" + targetId + "']");

    toggleArrow(clickedLink);
    toggleBranch(clickedLink);
    toggleShowHide(clickedLink);
  }

  $(document).on(
    "hide.bs.collapse show.bs.collapse",
    ".collapse.stop-list",
    toggleStopList
  );
}
