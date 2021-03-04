const setupViewPreviousEventsButton = function() {
  const viewPreviousEventsButtons = [
    ...document.querySelectorAll("a.m-previous-events-button")
  ];

  viewPreviousEventsButtons.forEach(button => {
    button.addEventListener("click", () => {
      // show hidden events for this button
      const groupName = button.dataset.group;
      const hiddenEventsForGroup = document.querySelectorAll(
        `.m-hidden-event[data-group="${groupName}"]`
      );
      [...hiddenEventsForGroup].forEach(event => {
        event.classList.remove("m-hidden-event");
      });
      button.classList.add("m-hidden-button");
    });
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
