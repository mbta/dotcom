import { assert } from "chai";
import jsdom from "mocha-jsdom";
import { default as submitOnEvents, mergeAction } from "../submit-on-events";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("submit-on-event", () => {
  var $;
  jsdom({ url: testURL });

  before(() => {
    $ = jsdom.rerequire("jquery");
    submitOnEvents(["change"], $);
  });

  beforeEach(() => {
    $("body").append("<div id=test></div>");
    $("#test").html(
      '<form data-submit-on-change><input type=text><label><i class="loading-indicator hidden-xs-up"></i></label><select><option value=1>1</select><button type=submit>Submit</button></form>'
    );
  });

  afterEach(() => {
    $("#test").remove();
  });

  it("hides submit button", () => {
    assert.equal($("#test button").css("display"), "none");
  });

  it("submits the form if the input changes", done => {
    window.location = {
      assign: () => done()
    };
    $("#test input").change();
  });

  it("submits the form if the select is changed", done => {
    window.location = {
      assign: () => done()
    };
    $("#test select").change();
  });

  it("displays a loading indicator", () => {
    window.location = {
      assign: () => true
    };
    assert($(".loading-indicator").hasClass("hidden-xs-up"));
    $("#test select").change();
    assert.isNotTrue($(".loading-indicator").hasClass("hidden-xs-up"));
  });
});

describe("submit-on-event mergeAction", () => {
  it("joins a full URL with params", () => {
    assert.equal(mergeAction("/url", "params"), "/url?params");
  });

  it("joins a URL with a hash", () => {
    assert.equal(mergeAction("/url#hash", "params"), "/url?params#hash");
  });

  it("joins undefined", () => {
    assert.equal(
      mergeAction(undefined, "params", "pathname"),
      "pathname?params"
    );
  });

  it("joins an empty URL", () => {
    assert.equal(mergeAction("", "params", "pathname"), "pathname?params");
  });

  it("joins an empty hash", () => {
    assert.equal(
      mergeAction("#hash", "params", "pathname"),
      "pathname?params#hash"
    );
  });
});
