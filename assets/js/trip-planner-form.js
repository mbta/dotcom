/* eslint no-unused-vars: ["error", { "args": "none" }] */

import flatpickr from "flatpickr";
import { addMinutes, format, getMinutes } from "date-fns";

/**
 * Formats a date into a string in the user's locale.
 */
function i18nDate(date, locale = navigator.language) {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    weekday: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });

  return formatter.format(date);
}

/**
 * Set the date and time to the current time.
 */
function setDateTimeNow(flatpickrInstance) {
  flatpickrInstance.setDate(new Date());
}

/**
 * Set the date and time to the nearest 5 minutes.
 */
function setDateTime5Minutes(flatpickrInstance) {
  const now = new Date();
  const minutes = getMinutes(now);
  const roundedMinutes = Math.ceil(minutes / 5) * 5;
  const newDate = addMinutes(now, roundedMinutes - minutes);

  flatpickrInstance.setDate(newDate);
}

/**
 * Updates the title of the accordion based on the mode selections.
 */
function updateAccordionTitle(elem, modeCheckboxes) {
  const checkedModes = Array.prototype.slice
    .call(modeCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.labels[0].textContent);

  const title = elem.querySelector(".c-accordion-ui__title");

  if (checkedModes.length === 0) {
    title.textContent = "Walking Only";
  } else if (checkedModes.length === modeCheckboxes.length) {
    title.textContent = "All Modes";
  } else {
    title.textContent = checkedModes.join(", ");
  }
}

const SERVER_FORMAT = "Y-m-d G:i K";

/**
 * Initializes the trip planner inputs and sets all listeners.
 */
export default function setupTripPlannerForm(elem) {
  // Gets data that is injected into the template.
  // This is how we get the user selections from the query params to set controls.
  let data = elem.querySelector("#data").innerHTML;
  data = JSON.parse(data);

  const maxDate = new Date(data.maxDate);
  const minDate = new Date(data.minDate);

  // Sets the initial value of the date input display.
  // Default to 'now' and uses the server date if 'now.'
  // Otherwise, we use the chosen time.
  const time = data.chosenTime || "now";
  const dateTime = new Date(
    time === "now" ? data.dateTime : data.chosenDateTime
  );

  // Initializes the date picker.
  const flatpickrInstance = flatpickr(
    elem.querySelector("#trip-plan-datepicker .flatpickr"),
    {
      allowInvalidPreload: true, // needed on mobile to prevent the input from becoming blank when selecting a date outside the min/max
      altInput: true, // allow different format to be sent to server
      dateFormat: "Y-m-d G:i K", // this gets sent to the server
      defaultDate: dateTime,
      enableTime: true,
      maxDate,
      minDate,
      formatDate: (date, formatString, locale) => {
        if (formatString === SERVER_FORMAT) {
          // Formats a date into a string in the format util.ex parse/1 expects.
          return format(date, "yyyy-MM-dd HH:mm aa");
        }

        // if not being sent to the server, use localized format
        return i18nDate(date, locale);
      },
      wrap: true // works with adjacent icon
    }
  );

  // When the user selects Leave At or Arrive By, we set the default time to the nearest 5 minutes.
  elem.querySelectorAll("input#depart, input#arrive").forEach(input => {
    input.addEventListener("click", _event => {
      setDateTime5Minutes(flatpickrInstance);
    });
  });

  // When the user selects Now, we set the default time to the current time.
  elem.querySelector("input#now").addEventListener("click", _event => {
    setDateTimeNow(flatpickrInstance);
  });

  // When someone makes mode selections, we update the title of the accordion.
  const modeCheckboxes = elem.querySelectorAll(
    ".c-accordion-ui input[type='checkbox']"
  );

  modeCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("click", _event => {
      updateAccordionTitle(elem, modeCheckboxes);
    });
  });

  // Setup the correct title when the page is loaded.
  updateAccordionTitle(elem, modeCheckboxes);
}
