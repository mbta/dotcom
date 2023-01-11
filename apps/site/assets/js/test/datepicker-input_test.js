import { assert } from "chai";
import jsdom from "mocha-jsdom";
import testConfig from "./../../ts/jest.config";
import DatePickerInput from "../datepicker-input";
const { testURL } = testConfig;

const year = "support_date_time_year",
  month = "support_date_time_month",
  day = "support_date_time_day",
  dateEl = {
    select: "support-date-select",
    label: "support-date-label",
    input: "support-date-input",
    container: "support-date"
  };

// very simplified HTML output
// from DateTimeSelector.custom_date_time_select
const initial_markup = `<div class="datepicker-calendar>
  <span class="glyphicon/>
  <div id=${dateEl.container}>
    <label aria-label="Tuesday, January 19, 2021, click or press the enter or space key to edit the date" for=${dateEl.input} id=${dateEl.label}></label>
    <input data-max-date="01/19/2021" data-min-date="01/19/2020" id=${dateEl.input} type="text">
    <div id=${dateEl.select}>
      <label class="sr-only" for=${month}>Month</label>
      <select class="c-select" id=${month}>
        <option value="1" selected="">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
      </select>
      <label class="sr-only" for=${day}>Day</label>
      <select class="c-select" id=${day}>
        <option value="1">01</option>
        <option value="2">02</option>
        <option value="3">03</option>
      </select>
      <label class="sr-only" for=${year}>Year</label>
      <select class="c-select" id=${year}>
        <option value="2020">2020</option>
        <option value="2021" selected="">2021</option>
      </select>
    </div>
  </div>
</div>`;

describe("datepicker-input", () => {
  jsdom({ url: testURL });

  before(() => {
    const $ = jsdom.rerequire("jquery");
    // eslint-disable-next-line no-multi-assign
    global.$ = global.jQuery = $;
    // eslint-disable-next-line no-multi-assign
    window.$ = window.jQuery = $;

    // JSDOM doesn't support window.matchMedia, so mock it here
    window.matchMedia = query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // Deprecated
      removeListener: () => {}, // Deprecated
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {}
    });

    // The datepicker input depends on the accessible-date-picker plugin, so we have to load it here
    jsdom.rerequire("../../vendor/accessible-date-picker");
  });

  beforeEach(() => {
    $("body").append("<div id=test />");
    $("#test").html(initial_markup);
  });

  afterEach(() => {
    $("#test").remove();
  });

  it("displays date picker", () => {
    // eslint-disable-next-line no-unused-vars
    const input = new DatePickerInput({
      selectors: { dateEl, month, day, year }
    });

    assert.notEqual($("#test").html(), initial_markup);

    const datepicker_calendar = document.getElementById(
      "datepicker-calendar-support-date-input"
    );
    assert.isNotNull(datepicker_calendar);
  });

  it("removes classes", () => {
    $("#test")
      .find(".datepicker-calendar")
      .find(".glyphicon")
      .removeClass("glyphicon");
    assert.isFalse($("#test").hasClass("glyphicon"));
  });

  it("does not initially focus on the date picker input", () => {
    const focused_el = document.activeElement;
    assert.isFalse(focused_el.nodeName === "INPUT");
  });
});
