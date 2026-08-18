import { ViewHook } from "phoenix_live_view";

let animating = false;

const min = (a: number, b: number): number => {
  if (a < b) {
    return a;
  }

  return b;
};

const TimetableScroll: Partial<ViewHook> = {
  mounted() {
    if (this.el) {
      const element = this.el;

      element.addEventListener("click", _event => {
        const scrollDirection =
          (element.dataset.scrollDirection &&
            parseInt(element.dataset.scrollDirection, 10)) ||
          0;

        if (animating) {
          return;
        }

        const timetableId = element.dataset?.timetableId;
        if (timetableId) {
          // jQuery is necessary here to animate the scrolling. The UX
          // is quite bad if we don't animate the scrolling, because
          // simply snapping to the new scroll position makes it hard
          // to tell that anything even happened. Unfortunately,
          // `scrollLeft` isn't a CSS property, so plain old
          // `element.animate` without jQuery doesn't work.
          const timetable = window.jQuery(`#${timetableId}`);

          if (timetable) {
            const startingScroll = timetable.scrollLeft();

            const maxScrollLeft =
              timetable[0].scrollWidth - timetable[0].clientWidth - 1;
            const scrollDestination = startingScroll + 100 * scrollDirection;

            timetable.animate(
              { scrollLeft: min(scrollDestination, maxScrollLeft) },
              {
                duration: 200,
                step: () => {
                  animating = true;
                },
                done: () => {
                  animating = false;
                }
              }
            );
          }
        }
      });
    }
  }
};

export default TimetableScroll;
