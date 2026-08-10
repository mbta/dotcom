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
  wrap: true // works with adjacent icon
}



/**
 * This is a LiveView hook that initializes a flatpickr date picker.
 */


export default {
  mounted() {
    const el = this.el;

    var customConfig = this.el.dataset.config ? JSON.parse(this.el.dataset.config) : {};
    customConfig = camelcaseKeys(customConfig, {deep: true});

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
