import { ViewHook } from "phoenix_live_view";

const TimetableScrollBar: Partial<ViewHook> = {
  mounted() {
    if (this.el) {
      const timetable = this.el;

      const earlierButton =
        (timetable.dataset.earlierButtonId &&
          document.getElementById(timetable.dataset.earlierButtonId)) ||
        undefined;
      const laterButton =
        (timetable.dataset.laterButtonId &&
          document.getElementById(timetable.dataset.laterButtonId)) ||
        undefined;

      if (earlierButton && laterButton) {
        const scrollButtonStateCallback = () => {
          setScrollButtonState({ timetable, earlierButton, laterButton });
        };

        timetable.addEventListener("scroll", _ => {
          scrollButtonStateCallback();
        });

        window.addEventListener("resize", _ => {
          scrollButtonStateCallback();
        });

        scrollButtonStateCallback();
      }
    }
  }
};

const setScrollButtonState = ({
  earlierButton,
  laterButton,
  timetable
}: {
  earlierButton: HTMLElement;
  laterButton: HTMLElement;
  timetable: HTMLElement;
}) => {
  const maxScrollLeft = timetable.scrollWidth - timetable.clientWidth;

  // The -1 is due to the fact that some browsers record the
  // `scrollLeft` position as being 0.5px to the left of where it
  // theoretically could be, which means that if the maximum
  // scrollable width is, say 518px, the value of `scrollLeft` when
  // it's scrolled all the way to the right will be, say, 517.5px. If
  // we do straight comparison with no offset, then it'll never count
  // as being scrolled all the way to the right, and we'll never
  // disable the `Later` button.
  const scrolledToLatest = timetable.scrollLeft >= maxScrollLeft - 1;
  const scrolledToEarliest = timetable.scrollLeft === 0;

  if (scrolledToEarliest && scrolledToLatest) {
    earlierButton.classList.add("hidden");
    laterButton.classList.add("hidden");
  } else {
    earlierButton.classList.remove("hidden");
    laterButton.classList.remove("hidden");

    if (scrolledToEarliest) {
      earlierButton.setAttribute("disabled", "");
    } else {
      earlierButton.removeAttribute("disabled");
    }

    if (scrolledToLatest) {
      laterButton.setAttribute("disabled", "");
    } else {
      laterButton.removeAttribute("disabled");
    }
  }
};

export default TimetableScrollBar;
