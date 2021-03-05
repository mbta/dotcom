export function setupViewPreviousEventsButton() {
  const viewPreviousEventsButtons = [
    ...document.querySelectorAll("a.m-previous-events-button")
  ];

  viewPreviousEventsButtons.forEach(button => {
    button.addEventListener("click", () => {
      // show hidden events for this button
      const groupName = button.dataset.group;
      const hiddenEventsForGroup = document.querySelectorAll(
        `.m-event.hidden[data-group="${groupName}"]`
      );
      [...hiddenEventsForGroup].forEach(event => {
        event.classList.remove("hidden");
      });
      button.parentElement.classList.add("hidden");
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
