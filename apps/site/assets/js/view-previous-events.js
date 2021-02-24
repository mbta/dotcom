const setupViewPreviousEventsButton = function() {
  const viewPreviousEventsButton = document.querySelector(
    ".m-previous-events-button"
  );
  const hiddenEventList = [...document.querySelectorAll(".m-hidden-event")];

  viewPreviousEventsButton.addEventListener("click", () => {
    hiddenEventList.forEach(hiddenEvent =>
      hiddenEvent.classList.remove("m-hidden-event")
    );
    viewPreviousEventsButton.classList.add("m-hidden-button");
  });
};

export default function() {
  document.addEventListener(
    "turbolinks:load",
    () => {
      setupViewPreviousEventsButton();
    },
    { passive: true }
  );
}
