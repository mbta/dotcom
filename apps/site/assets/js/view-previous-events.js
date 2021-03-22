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
    // If the user navigates by keyboard, simulate click on enter-key press
    button.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        button.click();
      }
    });
  });
}

export default function() {
  document.addEventListener(
    "turbolinks:load",
    () => {
      setupViewPreviousEventsButton();
    },
    { passive: true }
  );
}
