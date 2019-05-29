import DatePickerInput from "./datepicker-input";
import * as QueryHelpers from "../ts/helpers/query";

export class TripPlannerTimeControls {
  constructor() {
    const { dateEl, month, day, year } = TripPlannerTimeControls.SELECTORS;
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
    document
      .getElementById(TripPlannerTimeControls.SELECTORS.title)
      .setAttribute("data-prefix", "");
  }

  controlSetup() {
    document
      .getElementById(TripPlannerTimeControls.SELECTORS.depart)
      .addEventListener("click", () => {
        this.updateControlTitle("Depart at");
      });
    document
      .getElementById(TripPlannerTimeControls.SELECTORS.arrive)
      .addEventListener("click", () => {
        this.updateControlTitle("Arrive by");
      });
  }

  timeInput() {
    document
      .getElementById(TripPlannerTimeControls.SELECTORS.hour)
      .addEventListener("change", this.updateTime.bind(this));
    document
      .getElementById(TripPlannerTimeControls.SELECTORS.minute)
      .addEventListener("change", this.updateTime.bind(this));
    document
      .getElementById(TripPlannerTimeControls.SELECTORS.amPm)
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
    return (
      document
        .getElementById(TripPlannerTimeControls.SELECTORS.title)
        .getAttribute("data-prefix") || this.formatQueryPlanType()
    );
  }

  updateTime() {
    const time = new Date();
    const hour12 =
      parseInt(
        document.getElementById(TripPlannerTimeControls.SELECTORS.hour).value,
        10
      ) % 12;
    const amPm = document.getElementById(TripPlannerTimeControls.SELECTORS.amPm)
      .value;
    const hour = amPm === "PM" ? hour12 + 12 : hour12;
    const timeLabel = document.getElementById(
      TripPlannerTimeControls.SELECTORS.timeEl.label
    );
    const ariaMessage = timeLabel.getAttribute("aria-label").split(", ")[1];
    time.setHours(hour);
    time.setMinutes(
      document.getElementById(TripPlannerTimeControls.SELECTORS.minute).value
    );
    const friendlyTime = TripPlannerTimeControls.getFriendlyTime(time);

    timeLabel.setAttribute("data-time", friendlyTime);
    timeLabel.setAttribute("aria-label", `${friendlyTime}, ${ariaMessage}`);
    this.updateControlTitle(this.getPlanType());
  }

  updateControlTitle(text) {
    const time = document
      .getElementById(TripPlannerTimeControls.SELECTORS.timeEl.label)
      .getAttribute("data-time");
    const date = document
      .getElementById(TripPlannerTimeControls.SELECTORS.dateEl.label)
      .getAttribute("data-date");
    const title = `${text} ${time}, ${date}`;

    const controlTitle = document.getElementById(
      TripPlannerTimeControls.SELECTORS.title
    );
    controlTitle.innerHTML = title;
    controlTitle.setAttribute("data-prefix", text);
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

TripPlannerTimeControls.SELECTORS = {
  depart: "depart",
  leaveNow: "leave-now",
  arrive: "arrive",
  controls: "trip-plan-datepicker",
  year: "plan_date_time_year",
  month: "plan_date_time_month",
  day: "plan_date_time_day",
  hour: "plan_date_time_hour",
  minute: "plan_date_time_minute",
  amPm: "plan_date_time_am_pm",
  dateEl: {
    container: "plan-date",
    input: "plan-date-input",
    select: "plan-date-select",
    label: "plan-date-label"
  },
  timeEl: {
    container: "plan-time",
    select: "plan-time-select",
    label: "plan-time-label"
  },
  title: "trip-plan-departure-title"
};

export function init() {
  const $ = window.jQuery;
  $(document).on("turbolinks:load", () => {
    const tripPlanner = new TripPlannerTimeControls();
  });
}
