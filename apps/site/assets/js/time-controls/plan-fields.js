export function getFields() {
  return {
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
}
