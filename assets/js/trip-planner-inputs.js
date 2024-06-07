/* eslint no-unused-vars: ["error", { "args": "none" }] */

import flatpickr from "flatpickr";
import { format } from "date-fns";

/**
 * Formats a date into a string in the format util.ex parse/1 expects.
 */
function formatDate(date) {
  return format(date, "yyyy-MM-dd HH:mm aa");
}

/**
 * Formats a date into a string in the user's locale.
 */
function i18nDate(date) {
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "full",
    timeStyle: "short"
  });

  return formatter.format(date);
}

/**
 * Initializes the trip planner inputs and sets all listeners.
 */
export default function setupTripPlannerInputs(elem) {
  // Gets all radio inputs in the form.
  // Now, Leave at, and Arrive by.
  const inputs = Array.prototype.slice.call(
    elem.querySelectorAll("input[type='radio']")
  );

  // Handles toggling of radio inputs.
  inputs.forEach(input => {
    input.addEventListener("click", event => {
      event.target.parentElement.classList.add("active");
      event.target.setAttribute("checked", "checked");

      inputs.forEach(otherInput => {
        if (otherInput !== input) {
          otherInput.parentElement.classList.remove("active");
          otherInput.removeAttribute("checked");
        }
      });
    });
  });

  // Gets data that is injected into the template.
  // This is how we get the user selections from the query params set controls.
  let data = elem.querySelector("#data").innerHTML;
  data = JSON.parse(data);

  // We have two inputs. One is for display and the other is hidden.
  // The display shows a string from i18nDate.
  // The hidden input is what gets sent to the server.
  // It uses a string from formatDate.
  const dateInputDisplay = elem.querySelector(
    "#trip-plan-datepicker #date-time-display"
  );
  const dateInputHidden = elem.querySelector(
    "#trip-plan-datepicker #date-time-hidden"
  );
  const maxDate = new Date(data.maxDate);
  const minDate = new Date(data.minDate);

  // Sets the initial value of the date input display.
  // Default to 'now' and uses the server date if 'now.'
  // Otherwise, we use the chosen time.
  const time = data.chosenTime || "now";
  const dateTime = new Date(
    time === "now" ? data.dateTime : data.chosenDateTime
  );

  dateInputHidden.value = formatDate(dateTime);
  dateInputDisplay.value = i18nDate(dateTime);

  // Initializes the date picker.
  // Unfortunately, we can't use a function to format the date.
  // So, it won't be in the user's locale.
  flatpickr(dateInputDisplay, {
    dateFormat: "l, F j, Y at h:i K",
    enableTime: true,
    maxDate,
    minDate,
    onChange(selectedDates, _dateStr, _instance) {
      if (selectedDates.length > 0) {
        dateInputHidden.value = formatDate(selectedDates[0]);
        dateInputDisplay.value = i18nDate(selectedDates[0]);
      }
    }
  });

  // The first input 'Now' is the default input.
  // Clicking on it will hide the time inputs.
  inputs.slice(0, 1).forEach(input => {
    input.addEventListener("click", _event => {
      dateInputHidden.value = formatDate(minDate);
      dateInputDisplay.value = i18nDate(minDate);

      elem
        .querySelector("#trip-plan-datepicker")
        .style.setProperty("display", "none");
    });
  });

  // If the second or third input is chosen, we want to show the time inputs.
  inputs.slice(1).forEach(input => {
    input.addEventListener("click", _event => {
      elem
        .querySelector("#trip-plan-datepicker")
        .style.setProperty("display", "block");
    });
  });

  // Get the time selector that corresponds with the set time and click it.
  // This covers the case where the user has selected a time and the page is reloaded.
  elem.querySelector(`input[value="${time}"]`).click();
}
