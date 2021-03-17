export function setupEventsListing() {
  const eventsListing = document.querySelector(".m-events-hub--list-view");
  const control = eventsListing.querySelector(
    ".m-event-list__nav--mobile-controls"
  );
  let prevScroll = window.scrollY || document.documentElement.scrollTop;
  let prevDirection = 0;
  let direction = 0; // 0 - initial, 1 - up, 2 - down

  // add event listeners on scroll (and wheel on mobile)
  ["scroll", "wheel"].forEach(ev => {
    document.addEventListener(
      ev,
      () => {
        window.requestAnimationFrame(() => {
          // 1. toggle a shadow on the month header depending on if it's sticky
          eventsListing
            .querySelectorAll(".m-event-list__month-header")
            .forEach(el => {
              const stickyStyleTop = parseInt(
                window.getComputedStyle(el).top.replace("px", ""),
                10
              ); // px defined in CSS
              const isStuck = el.getBoundingClientRect().top === stickyStyleTop;
              el.toggleAttribute("stuck", isStuck);
            });

          // 2. show or hide the month/year dropdowns on mobile depending on
          // whether the user scrolls up or down
          const curScroll =
            window.scrollY || document.documentElement.scrollTop;
          direction =
            // eslint-disable-next-line no-nested-ternary
            curScroll > prevScroll ? 2 : curScroll < prevScroll ? 1 : 0;

          const controlHeight = control.getBoundingClientRect().height;
          if (direction !== prevDirection) {
            // toggle the controls
            if (direction === 2 && curScroll > controlHeight) {
              // hide the controls
              eventsListing.classList.add("js-nav-down");
              eventsListing.classList.remove("js-nav-up");
            } else if (direction === 1) {
              // show the controls
              eventsListing.classList.add("js-nav-up");
              eventsListing.classList.remove("js-nav-down");
            }
            prevDirection = direction;
          }

          prevScroll = curScroll;
        });
      },
      { capture: false, passive: true }
    );
  });

  // scroll to active heading if available
  const activeMonthElement = eventsListing.querySelector(
    ".m-event-list__month--active"
  );
  if (activeMonthElement) activeMonthElement.scrollIntoView();

  // add event listener to navigate to page on dropdown select
  const dateSelects = eventsHubPage.querySelectorAll(".m-event-list__select");
  dateSelects.forEach(select => {
    select.addEventListener("change", ({ target }) => {
      window.location.assign(target.value);
    });
  });
}

export default function() {
  document.addEventListener(
    "turbolinks:load",
    () => {
      if (document.querySelector(".m-events-hub--list-view")) setupEventsListing();
    },
    { passive: true }
  );
}
