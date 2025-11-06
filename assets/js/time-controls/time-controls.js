import DatePickerInput from "../datepicker-input";
import * as QueryHelpers from "../../ts/helpers/query";

/**
How to use this TimeControls module on the frontend to create date and time selectors:
(needs to go together with `DateTimeSelector.custom_date_time_select` in the backend)

- In your .eex template file, pass a (perhaps nested) map containing the specific fields of the date and time selector in a <script> tag with the following parameters.
<script id="form-data" type="text/plain">
  <%= raw(Poison.encode!(<map with the fields>)) %>
</script>
These field names are created by the Elixir module DateTimeSelector in your form.

- Then, use DateTimeSelector.custom_date_time_select passing the form, i.e.:
<%= DateTimeSelector.custom_date_time_select(form) %>
*/

export class TimeControls {
  constructor() {
    const { dateEl, month, day, year } = TimeControls.SELECTORS;
    if (document.getElementById(dateEl.input)) {
      this.resetPlanType();
      this.DatePicker = new DatePickerInput({
        selectors: { dateEl, month, day, year },
        onUpdateCallback: this.updateControlTitleCallback.bind(this)
      });
      this.timeInput();
      this.controlSetup();
    }
  }

  resetPlanType() {
    const title = document.getElementById(TimeControls.SELECTORS.title);
    if (title) {
      title.setAttribute("data-prefix", "");
    }
  }

  controlSetup() {
    const depart = document.getElementById(TimeControls.SELECTORS.depart);
    if (depart) {
      depart.addEventListener("click", () => {
        this.updateControlTitle("Depart at");
      });
    }

    const arrive = document.getElementById(TimeControls.SELECTORS.arrive);
    if (arrive) {
      arrive.addEventListener("click", () => {
        this.updateControlTitle("Arrive by");
      });
    }
  }

  timeInput() {
    document
      .getElementById(TimeControls.SELECTORS.hour)
      .addEventListener("change", this.updateTime.bind(this));
    document
      .getElementById(TimeControls.SELECTORS.minute)
      .addEventListener("change", this.updateTime.bind(this));
    document
      .getElementById(TimeControls.SELECTORS.amPm)
      .addEventListener("change", this.updateTime.bind(this));
  }

  // eslint-disable-next-line class-methods-use-this
  getStateFromQuery() {
    return QueryHelpers.parseQuery(
      window.location.search,
      window.decodeURIComponent
    );
  }

  formatQueryPlanType() {
    const planTime = this.getStateFromQuery()["plan[time]"];
    if (planTime === "arrive") {
      return "Arrive by";
    }
    return "Depart at";
  }

  getPlanType() {
    const title = document.getElementById(TimeControls.SELECTORS.title);
    if (title) {
      return title.getAttribute("data-prefix") || this.formatQueryPlanType();
    }
    return "";
  }

  updateTime() {
    const time = new Date();
    const hour12 =
      parseInt(document.getElementById(TimeControls.SELECTORS.hour).value, 10) %
      12;
    const amPm = document.getElementById(TimeControls.SELECTORS.amPm).value;
    const hour = amPm === "PM" ? hour12 + 12 : hour12;
    const timeLabel = document.getElementById(
      TimeControls.SELECTORS.timeEl.label
    );
    const ariaMessage = timeLabel.getAttribute("aria-label").split(", ")[1];
    time.setHours(hour);
    time.setMinutes(
      document.getElementById(TimeControls.SELECTORS.minute).value
    );
    const friendlyTime = TimeControls.getFriendlyTime(time);

    timeLabel.setAttribute("data-time", friendlyTime);
    timeLabel.setAttribute("aria-label", `${friendlyTime}, ${ariaMessage}`);
    this.updateControlTitle(this.getPlanType());
  }

  updateControlTitle(text) {
    const controlTitle = document.getElementById(TimeControls.SELECTORS.title);
    if (controlTitle) {
      const time = document
        .getElementById(TimeControls.SELECTORS.timeEl.label)
        .getAttribute("data-time");
      const date = document
        .getElementById(TimeControls.SELECTORS.dateEl.label)
        .getAttribute("data-date");
      const title = `${text} ${time}, ${date}`;
      controlTitle.innerHTML = title;
      controlTitle.setAttribute("data-prefix", text);
    }
  }

  updateControlTitleCallback() {
    this.updateControlTitle(this.getPlanType());
  }

  static getFriendlyTime(datetime) {
    let amPm = "AM";
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();

    if (hour > 11) {
      amPm = "PM";
    }
    if (hour > 12) {
      hour -= 12;
    }
    if (hour === 0) {
      hour = 12;
    }

    if (minute < 10) {
      minute = `0${minute}`;
    }

    return `${hour}:${minute} ${amPm}`;
  }
}

export function init() {
  window.addEventListener("load", () => {
    const formDataEl = document.getElementById("form-data");

    if (!formDataEl) return;

    TimeControls.SELECTORS = JSON.parse(formDataEl.innerHTML);
    const timeControl = new TimeControls();
  });
}
