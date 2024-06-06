import flatpickr from "flatpickr";
import { format } from "date-fns";

export function setupTripPlannerInputs(elem) {
  // Gets all radio inputs in the form.
  // Now, Leave at, and Arrive by.
  const inputs = Array.prototype.slice.call(
    elem.querySelectorAll("input[type='radio']")
  );

  // Handles toggling of radio inputs.
  inputs.forEach(input => {
    input.addEventListener('click', event => {
      event.target.parentElement.classList.add('active');
      event.target.setAttribute('checked', 'checked');

      inputs.forEach(otherInput => {
        if (otherInput !== input) {
          otherInput.parentElement.classList.remove('active');
          otherInput.removeAttribute('checked');
        }
      });
    });
  });

  let formData = elem.querySelector('#form-data').innerHTML;
  formData = JSON.parse(formData);

  const dateInputDisplay = elem.querySelector('#trip-plan-datepicker #date-time-display');
  const dateInputHidden = elem.querySelector('#trip-plan-datepicker #date-time-hidden');
  const maxDate = new Date(formData.maxDate);
  const minDate = new Date(formData.minDate);

  // Set the initial value of the date input display.
  const time = formData.chosenTime || 'now';
  const dateTime = new Date(time == 'now' ? formData.dateTime : formData.chosenDateTime);
  dateInputDisplay.value = i18nDate(dateTime);

  flatpickr(dateInputDisplay, {
    dateFormat: 'l, F j, Y \at h:i K',
    enableTime: true,
    maxDate: maxDate,
    minDate: minDate,
    minuteIncrement: 1,
    onChange(selectedDates, _dateStr, _instance) {
      if (selectedDates.length > 0) {
        dateInputHidden.value = format(selectedDates[0], "yyyy-MM-dd'T'HH:mm");
        dateInputDisplay.value = i18nDate(selectedDates[0]);
      }
    },
  });

  // The first input 'Now' is the default input.
  // Clicking on it will hide the time inputs.
  inputs.slice(0, 1).forEach(input => {
    input.addEventListener('click', _ => {
      elem.querySelector('#trip-plan-datepicker').style['display'] = 'none';
    });
  });

  // If the second or third input is chosen, we want to show the time inputs.
  inputs.slice(1).forEach(input => {
    input.addEventListener('click', _ => {
      elem.querySelector('#trip-plan-datepicker').style['display'] = 'block';
    });
  });

  const initialTimeSelection = elem.querySelector(`input[value="${time}"]`);
  initialTimeSelection.click();
};

function i18nDate(date) {
  const formatter = new Intl.DateTimeFormat(navigator.language, { dateStyle: 'full', timeStyle: 'short' });

  return formatter.format(date);
}