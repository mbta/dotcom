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
