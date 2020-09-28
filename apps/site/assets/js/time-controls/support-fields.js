export function getFields() {
  return {
    controls: "support-datepicker",
    year: "support_date_time_year",
    month: "support_date_time_month",
    day: "support_date_time_day",
    hour: "support_date_time_hour",
    minute: "support_date_time_minute",
    amPm: "support_date_time_am_pm",
    dateEl: {
      container: "support-date",
      input: "support-date-input",
      select: "support-date-select",
      label: "support-date-label"
    },
    timeEl: {
      container: "support-time",
      select: "support-time-select",
      label: "support-time-label"
    }
  };
}
