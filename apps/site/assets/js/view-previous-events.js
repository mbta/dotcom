const setupViewPreviousEventsButton = function() {
  const viewPreviousEventsButtons = [
    ...document.querySelectorAll("a.m-previous-events-button")
  ];

  viewPreviousEventsButtons.forEach(button => {
    button.addEventListener("click", () => {
      // show hidden events for this button
      // because of how the list is laid out, we can just iterate through next <li> siblings until we find one without .m-hidden-event
      let li = button.parentElement;
      do {
        li.classList.remove("m-hidden-event");
        li = li.nextElementSibling;
      } while (li && li.classList.contains("m-hidden-event") === true);

      button.parentElement.classList.add("m-hidden-button");
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
