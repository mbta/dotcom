// Adding this import at the very top to avoid a `regeneratorRuntime is not defined` error when running this test because of the use of async/await.
// Another option is to install the plugin '@babel/plugin-transform-runtime'
import "regenerator-runtime/runtime";
import { assert } from "chai";
import jsdom from "mocha-jsdom";
import {
  TimeControls,
  getSelectorFields
} from "../time-controls/time-controls";
import testConfig from "../../ts/jest.config";

const { testURL } = testConfig;

describe("getSelectorFields", () => {
  let $;
  jsdom({
    url: testURL
  });
  beforeEach(() => {
    $ = jsdom.rerequire("jquery");
    window.$ = $;
    window.jQuery = $;
  });

  it("gets the correct parameters when giving it a form ID", async () => {
    const formId = "support";
    const formFields = await getSelectorFields("../time-controls", formId);
    assert.deepEqual(formFields, {
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
    });
  });
});
describe("TimeControls.getFriendlyTime", () => {
  it("returns a friendly string given a JavaScript date", () => {
    const date = new Date(2017, 10, 9, 8, 7);

    assert.equal(TimeControls.getFriendlyTime(date), "8:07 AM");
  });

  it("converts times after 13:00 to PM", () => {
    const date = new Date(2017, 10, 9, 18, 19);

    assert.equal(TimeControls.getFriendlyTime(date), "6:19 PM");
  });

  it("interprets 12:00 as 12:00 PM", () => {
    const date = new Date(2017, 10, 9, 12, 7);

    assert.equal(TimeControls.getFriendlyTime(date), "12:07 PM");
  });

  it("interprets 0:00 as 12:00 AM", () => {
    const date = new Date(2017, 10, 9, 0, 7);

    assert.equal(TimeControls.getFriendlyTime(date), "12:07 AM");
  });
});
