import camelcaseKeys from "camelcase-keys"
import { formatISO } from "date-fns"
import flatpickr from "flatpickr"

import { Mandarin } from "../../node_modules/flatpickr/dist/l10n/zh.js"
import { Portuguese } from "../../node_modules/flatpickr/dist/l10n/pt.js"
import { Spanish } from "../../node_modules/flatpickr/dist/l10n/es.js"

const SERVER_DATE_FORMAT = "Z"
console.log("datepicker.js");
const CONFIG = {
  allowInvalidPreload: true, // needed on mobile to prevent the input from becoming blank when selecting a date outside the min/max
  altInput: true, // allow different format to be sent to server
  dateFormat: SERVER_DATE_FORMAT, // this gets sent to the server
  disableMobile: true, // native date pickers are not working well with LiveView
  enableTime: false,
  formatDate: (date, formatString, _) => {
    if (formatString === "SERVER_DATE_FORMAT") {
      // Formats a date into a string in the format util.ex parse/1 expects.
      return formatISO(date);
    }

    const locale = document.querySelector(["[data-locale]"]).getAttribute("data-locale");

    if (Object.keys(LOCALES).includes(locale)) {
      return i18nDate(date, locale);
    } else {
      return i18nDate(date, "en");
    }
  },
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

    this.handleEvent("set-datetime", ({datetime}) => {
      this.pickr.setDate(datetime);
    });
  },
  destroyed() {
    this.pickr.destroy();
  }
}
