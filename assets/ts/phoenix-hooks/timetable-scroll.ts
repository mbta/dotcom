import { ViewHook } from "phoenix_live_view";

let animating = false;

const TimetableScroll: Partial<ViewHook> = {
  mounted() {
    if (this.el) {
      const element = this.el;

      // These buttons default to hidden because they rely on
      // Javascript, which means that if Javascript is disabled, it
      // doesn't make sense to show them. If Javascript is enabled,
      // then we remove the `hidden` class so that they can do their
      // thing.
      element.classList.remove("hidden");

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

            timetable.animate(
              { scrollLeft: startingScroll + 100 * scrollDirection },
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
