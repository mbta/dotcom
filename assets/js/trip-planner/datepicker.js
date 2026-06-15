import camelcaseKeys from "camelcase-keys"
import { formatISO } from "date-fns"
import flatpickr from "flatpickr"

import { Mandarin } from "../../node_modules/flatpickr/dist/l10n/zh.js"
import { Portuguese } from "../../node_modules/flatpickr/dist/l10n/pt.js"
import { Spanish } from "../../node_modules/flatpickr/dist/l10n/es.js"

const SERVER_DATE_FORMAT = "Z"
const CONFIG = {
  allowInvalidPreload: true, // needed on mobile to prevent the input from becoming blank when selecting a date outside the min/max
  altInput: true, // allow different format to be sent to server
  altFormat: "D, F d",
  dateFormat: SERVER_DATE_FORMAT, // this gets sent to the server
  disableMobile: true, // native date pickers are not working well with LiveView
  /*formatDate: (date, formatString, _) => {
    if (formatString === "SERVER_DATE_FORMAT") {
      // Formats a date into a string in the format util.ex parse/1 expects.
      return formatISO(dateString);
    }

    const locale = document.querySelector(["[data-locale]"]).getAttribute("data-locale");

    if (Object.keys(LOCALES).includes(locale)) {
      return i18nDate(date, locale);
    } else {
      return i18nDate(date, "en");
    }
  },*/
  wrap: true // works with adjacent icon
}

const LOCALES = {
  es: Spanish,
  pt: Portuguese,
  zh: Mandarin
}

/**
 * Formats a date into a string in the user's locale.
 */
const i18nDate = (date, locale = "en") => {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    weekday: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });

  return formatter.format(date);
}

const time_string = () => {
  return timepicker_hour.value + ":" + timepicker_minute.value + timepicker_ampm.value
}

/**
 * This is a LiveView hook that initializes a flatpickr date picker.
 */
export default {
  mounted() {
    const el = this.el;

    var customConfig = this.el.dataset.config ? JSON.parse(this.el.dataset.config) : {};
    customConfig = camelcaseKeys(customConfig, {deep: true});

    if (Object.keys(LOCALES).includes(this.el.dataset.locale)) {
      customConfig.locale = LOCALES[this.el.dataset.locale]
    }

    this.pickr = flatpickr(el, Object.assign(CONFIG, customConfig));

    // Set the step attribute to "any" on the mobile input.
    // This is necessary for iOS Safari to allow for decimal values.
    if (this.pickr.mobileInput) {
      this.pickr.mobileInput.setAttribute("step", "any")
    }

    this.handleEvent("set-datetime", ({datetime}=event) => {
      const d = new Date(datetime);
      if(datetime.match(/[0-9\-]+T[0-9:\.\-]+/)){
        console.log({datetime});
        this.pickr.setDate(datetime);
        let hour_val = d.getHours();
        console.log({d});
        if(hour_val>12){hour_val-=12;}
        if(hour_val==0){hour_val=12;}
        console.log(hour_val);
        timepicker_hour.value = hour_val;
        timepicker_minute.value = d.getMinutes();
        timepicker_ampm.value = d.getHours()<12?"AM":"PM";

      }else{
        console.log(datetime);
      }
    });
  },
  destroyed() {
    this.pickr.destroy();
  }
}
