import { assert } from "chai";
import jsdom from "mocha-jsdom";
import datePicker from "../date-picker";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("date-picker", () => {
  let $;

  jsdom({ url: testURL });

  beforeEach(() => {
    $ = jsdom.rerequire("jquery");
    $("body").html(
      '<div class="date-picker-toggle" id="date-filter"></div><div class="date-picker-container">Date Picker</div><div class="calendar-cover" id="date-picker-calendar"></div>'
    );
    datePicker($);
  });

  it("hides date picker by default", () => {
    assert.isTrue($(".date-picker-container")[0].hasAttribute("hidden"));
    assert.isTrue($(".calendar-cover")[0].hasAttribute("hidden"));
  });

  it("displays date picker with clicked", () => {
    $(".date-picker-toggle").click();
    assert.isFalse($(".date-picker-container")[0].hasAttribute("hidden"));
    assert.isFalse($(".calendar-cover")[0].hasAttribute("hidden"));
  });
});
