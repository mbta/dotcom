import { assert } from "chai";
import { File } from "file-api";
import { cloneDeep } from "lodash";
import jsdom from "mocha-jsdom";
import sinon from "sinon";
import testConfig from "../../ts/jest.config";
import {
  clearFallbacks,
  handleModeChangeSelection,
  handleSubjectChange,
  handleSubmitClick,
  handleUploadedPhoto,
  rescale,
  setupSubject,
  setupTextArea
} from "../support-form";

const { testURL } = testConfig;

describe("support form", () => {
  let $;
  jsdom({ url: testURL });

  beforeEach(() => {
    $ = jsdom.rerequire("jquery");
    $("body").append('<div id="test"></div>');
  });

  afterEach(() => {
    $("#test").remove();
  });

  describe("clearFallbacks", () => {
    beforeEach(() => {
      $("#test").html(`
        <a id="upload-photo-link" tabindex="-1">Upload Photo</a>
        <input type="file" id="photo" name="photo" />
        <div class="support-form-expanded"></div>
      `);
      clearFallbacks($);
    });

    it("resets tabindex attributes in the photo section to their defaults", () => {
      assert.equal($("#upload-photo-link").prop("tabindex"), -1);
    });

    it("forwards a click on the link to the input", done => {
      $("#photo").click(() => done());
      $("#upload-photo-link").click();
    });
  });

  describe("rescale", () => {
    it("returns the same dimensions if they are in the limit", () => {
      let dim = { width: 900, height: 900 };
      dim = rescale(dim);
      assert.equal(dim.width, 900);
      assert.equal(dim.height, 900);
    });

    it("returns a properly scaled dimension if the width is longer", () => {
      let dim = { width: 2000, height: 1000 };
      dim = rescale(dim);
      assert.equal(dim.width, 1000);
      assert.equal(dim.height, 500);
    });

    it("returns a properly scaled dimension if the height is longer", () => {
      let dim = { width: 1000, height: 2000 };
      dim = rescale(dim);
      assert.equal(dim.width, 500);
      assert.equal(dim.height, 1000);
    });
  });

  describe("handleUploadedPhoto", () => {
    let toUpload = [];

    beforeEach(() => {
      toUpload = [];

      // convert to Blob because JSDOM?
      const file = new File({
        name: "test-file",
        buffer: Buffer.from("this is a 24 byte string"),
        type: "image/png"
      });
      const blob = new window.Blob([file], { type: "image/png" });
      blob.name = "test-file";

      $("#test").html(`
     <div class="photo-preview-container hidden-xs-up" tabindex="-1">
       <strong></strong>
     </div>
     <input type="file" id="photo" name="photo" />
     <a class="upload-photo-link"></a>
     `);
      handleUploadedPhoto($, blob, $(".photo-preview-container"), toUpload);
    });

    it("displays a preview of uploaded files", () => {
      const $preview = $(".photo-preview");
      assert.equal($preview.length, 1);
      assert.include($preview.html(), "test-file");
    });

    it("does not hide the upload link", () => {
      assert.isFalse($(".upload-photo-link").hasClass("hidden-xs-up"));
    });

    it("adds a clear button which clears the photo", () => {
      $(".clear-photo").click();
      assert.equal($("#photo").val(), "");
      assert.equal($(".photo-preview").length, 0);
    });

    it("handles multiple uploaded photos", () => {
      const file = new File({
        name: "test-file-2",
        buffer: Buffer.from("this is now a 28 byte string"),
        type: "image/png"
      });
      // convert to Blob because JSDOM?
      const blob = new window.Blob([file], { type: "image/png" });
      blob.name = "test-file-2";

      handleUploadedPhoto($, blob, $(".photo-preview-container"), toUpload);

      const $preview = $(".photo-preview");
      assert.equal($preview.length, 2);
      assert.include($preview.first().html(), "test-file");
      assert.include($preview.last().html(), "test-file-2");
    });

    it("stores all the photos to be uploaded in the toUpload array", () => {
      const file = new File({
        name: "test-file-2",
        buffer: Buffer.from("this is now a 28 byte string"),
        type: "image/png"
      });
      // convert to Blob because JSDOM?
      const blob = new window.Blob([file], { type: "image/png" });
      blob.name = "test-file-2";

      handleUploadedPhoto($, blob, $(".photo-preview-container"), toUpload);

      const fileNames = toUpload.map(f => f.name);
      assert.deepEqual(fileNames, ["test-file", "test-file-2"]);
    });

    it("clears the photo that was clicked; the previews are not hidden if there are any photos left", () => {
      const file = new File({
        name: "test-file-2",
        buffer: Buffer.from("this is now a 28 byte string"),
        type: "image/png"
      });
      // convert to Blob because JSDOM?
      const blob = new window.Blob([file], {
        name: "test-file-2",
        type: "image/png"
      });
      blob.name = "test-file-2";

      handleUploadedPhoto($, blob, $(".photo-preview-container"), toUpload);

      const $preview = $(".photo-preview");
      const $first_photo = $preview.first();
      const $second_photo = $preview.last();
      $first_photo.find(".clear-photo").trigger("click");

      assert.isFalse($(".photo-preview-container").hasClass("hidden-xs-up"));
      assert.equal($(".photo-preview").length, 1);
      assert.include($second_photo.html(), "test-file-2");
    });

    it("removes the photo that was clicked from the toUpload array", () => {
      const file = new File({
        name: "test-file-2",
        buffer: Buffer.from("this is now a 28 byte string"),
        type: "image/png"
      });
      // convert to Blob because JSDOM?
      const blob = new window.Blob([file], {
        name: "test-file-2",
        type: "image/png"
      });

      handleUploadedPhoto($, blob, $(".photo-preview-container"), toUpload);

      const $preview = $(".photo-preview");
      const $first_photo = $preview.first();
      $first_photo.find(".clear-photo").trigger("click");

      const fileNames = toUpload.map(f => f.name);
      assert.notInclude(fileNames, "test-file");
    });
  });

  describe("setupTextArea", () => {
    beforeEach(() => {
      $("#test").html(`
        <div class="form-group">
          <textarea id="comments"></textarea>
          <small class="form-text"></small>
        </div>
        <button class="edit-comments"></button>
      `);
      setupTextArea();
    });

    it("tracks the number of characters entered", () => {
      const $textarea = $("#comments");
      $textarea.val("12345");
      const event = document.createEvent("HTMLEvents");
      event.initEvent("keyup", true, true);
      $textarea[0].dispatchEvent(event);
      assert.equal($(".form-text").text(), "5/3000 characters");
    });
  });

  describe("handleSubmitClick", () => {
    let spy;
    const toUpload = [];

    beforeEach(() => {
      spy = sinon.spy($, "ajax");
      $("#test").html(`
        <div class="form-container">
          <div class="support-confirmation support-confirmation--success hidden-xs-up"></div>
          <form id="support" action="/customer-support">
            <div class="support-support_subject-error-container hidden-xs-up"></div>
            <select id="support_subject" name="support[subject]" required="required"> 
            <option value="">Please choose a subject</option>
            <optgroup label="Question">
              <option data-category="Inquiry" aria-label="Random option" value="Random option" selected="selected">Random option</option>
            </optgroup>
            </select>
            <div class="support-comments-error-container hidden-xs-up" tabindex="-1"><div class="support-comments-error"></div></div>
            <textarea name="support[comments]" id="comments"></textarea>
            <div class="support-vehicle-error-container hidden-xs-up" tabindex="-1"><div class="support-vehicle-error"></div></div>
            <input id="vehicle" name="support[vehicle]" placeholder="00001" type="text" />
            <input name="support[photo]" id="photo" type="file" />
            <div class="support-first_name-error-container hidden-xs-up" tabindex="-1"><div class="support-first_name-error"></div></div>
            <input name="support[first_name]" id="first_name" />
            <div class="support-last_name-error-container hidden-xs-up" tabindex="-1"><div class="support-last_name-error"></div></div>
            <input name="support[last_name]" id="last_name" />
            <input name="support[no_request_response]" id="no_request_response" type="checkbox" />
            <input name="support[phone]" id="phone" />
            <input name="support[email]" id="email" />
            <div class="support-email-error-container hidden-xs-up" tabindex="-1"><div class="support-email-error"></div></div>
            <input id="privacy" type="checkbox" />
            <div class="support-privacy-error-container hidden-xs-up" tabindex="-1"><div class="support-privacy-error"></div></div>
            <div class="support-form-expanded" style="display: none"></div>
            <div class="error-container support-g-recaptcha-response-error-container" tabindex="-1"><div class="support-g-recaptcha-response-error"></div></div>
            <textarea id="g-recaptcha-response" name="g-recaptcha-response"></textarea>
            <button id="support-submit"></button>
            <span class="waiting" hidden>waiting...</span>
            <div class="error-container form-control-feedback hidden" id="support-form-errors">
              Please fill out missing fields:
              <ul id="support-form-error-list"></ul>
            </div>
          </form>
        </div>
      `);
      handleSubmitClick($, toUpload);
    });

    afterEach(() => {
      $.ajax.restore();
    });

    it("expands the form if it is hidden", () => {
      $("#support-submit").click();
      assert.isFalse($(".support-form-expanded").hasClass("hidden-xs-up"));
      assert.isTrue(
        $(".support-confirmation--success").hasClass("hidden-xs-up")
      );
    });

    it("requires text in the main textarea", () => {
      $("#support-submit").click();
      assert.isFalse(
        $(".support-comments-error-container").hasClass("hidden-xs-up")
      );
    });

    it("requires vehicle number to have only numeric characters, if filled", () => {
      $("#vehicle").val("Not a number");
      $("#support-submit").click();
      assert.isFalse(
        $(".support-vehicle-error-container").hasClass("hidden-xs-up"),
        "not false"
      );
      $("#vehicle").val("1234");
      $("#support-submit").click();
      assert.isTrue(
        $(".support-vehicle-error-container").hasClass("hidden-xs-up"),
        "not true"
      );
    });

    it("errors when vehicle number longer than 8 digits", () => {
      $("#vehicle").val("Not a number");
      $("#support-submit").click();
      assert.isFalse(
        $(".support-vehicle-error-container").hasClass("hidden-xs-up"),
        "not false"
      );
      $("#vehicle").val("1".repeat(9));
      $("#support-submit").click();
      assert.isFalse(
        $(".support-vehicle-error-container").hasClass("hidden-xs-up"),
        "not false"
      );
    });

    it("requires a subject to be selected", () => {
      // set the selected value to an invalid one
      $("#support_subject").html(
        '<option value="">Please choose a subject</option>'
      );

      $("#support-submit").click();
      assert.isFalse(
        $(".support-support_subject-error-container").hasClass("hidden-xs-up")
      );
    });

    it("requires the privacy box to be checked if the customer wants a response", () => {
      $("#support-submit").click();
      assert.isFalse(
        $(".support-privacy-error-container").hasClass("hidden-xs-up")
      );
    });

    it("does not require the privacy box to be checked if the customer does not want a response", () => {
      $("#no_request_response").click();
      $("#support-submit").click();
      assert.isTrue(
        $(".support-privacy-error-container").hasClass("hidden-xs-up")
      );
    });

    it("requires a name if the customer wants a response", () => {
      $("#support-submit").click();
      assert.isFalse(
        $(".support-first_name-error-container").hasClass("hidden-xs-up")
      );
      $("#support-submit").click();
      assert.isFalse(
        $(".support-last_name-error-container").hasClass("hidden-xs-up")
      );
    });

    it("requires an email when the customer wants a response", () => {
      $("#support-submit").click();
      assert.isFalse(
        $(".support-email-error-container").hasClass("hidden-xs-up")
      );
    });

    it("does not require a phone number or an email when the customer does not want a response", () => {
      $("#no_request_response").click();
      $("#support-submit").click();
      assert.isTrue(
        $(".support-email-error-container").hasClass("hidden-xs-up")
      );
    });

    it("requires a valid email", () => {
      $("#email").val("not an email");
      $("#support-submit").click();
      assert.isFalse(
        $(".support-email-error-container").hasClass("hidden-xs-up")
      );
      $("#email").val("test@email.com");
      $("#support-submit").click();
      assert.isTrue(
        $(".support-email-error-container").hasClass("hidden-xs-up")
      );
    });

    it("focuses to the highest error message on the page", () => {
      $("#support-submit").click();
      $("#support-submit").click();
      assert.equal(
        document.activeElement,
        $(".support-comments-error-container")[0]
      );
      $("#comments").val("A comment");
      $("#support-submit").click();
      assert.equal(
        document.activeElement,
        $(".support-first_name-error-container")[0]
      );
      $("#first_name").val("tom");
      $("#support-submit").click();
      assert.equal(
        document.activeElement,
        $(".support-last_name-error-container")[0]
      );
      $("#last_name").val("brady");
      $("#support-submit").click();
      assert.equal(
        document.activeElement,
        $(".support-email-error-container")[0]
      );
      $("#email").val("test@email.com");
      $("#support-submit").click();
      assert.equal(
        document.activeElement,
        $(".support-privacy-error-container")[0]
      );
    });

    it("disables the submit button and shows the spinner on submit", () => {
      let isWaiting = false;

      $("#support-submit").on("waiting:start", () => {
        assert.isTrue($("#support-submit").prop("disabled"));
        assert.isFalse($(".waiting")[0].hasAttribute("hidden"));
        isWaiting = true;
      });

      $("#email").val("test@email.com");
      $("#first_name").val("tom");
      $("#last_name").val("brady");
      $("#comments").val("A comment");
      $("#privacy").prop("checked", "checked");
      $("#g-recaptcha-response").val("response");
      $("#support-submit").click();

      assert.isTrue(isWaiting);
    });

    it("hides the form and shows a message on success", () => {
      $("#request_response").click();
      $("#email").val("test@email.com");
      $("#first_name").val("tom");
      $("#last_name").val("brady");
      $("#comments").val("A comment");
      $("#privacy").prop("checked", "checked");
      $("#g-recaptcha-response").val("response");
      $("#support-submit").click();
      assert.equal(spy.callCount, 1);
      const ajaxArgs = spy.firstCall.args[0];
      assert.propertyVal(ajaxArgs, "method", "POST");
      assert.propertyVal(ajaxArgs, "url", "/customer-support");
      ajaxArgs.success();

      assert.isFalse(
        $(".support-confirmation--success").hasClass("hidden-xs-up")
      );
      assert.equal($("#support").length, 0);
    });

    it("shows a message on error", () => {
      $("#support-submit").on("waiting:end", () => {
        assert.isFalse($("#support-submit").prop("disabled"));
        assert.isTrue($(".waiting")[0].hasAttribute("hidden"));
      });

      $("#email").val("test@email.com");
      $("#first_name").val("tom");
      $("#last_name").val("brady");
      $("#comments").val("A comment");
      $("#privacy").prop("checked", "checked");
      $("#g-recaptcha-response").val("response");
      $("#support-submit").click();
      spy.firstCall.args[0].error();
      assert.isFalse(
        $(".support-confirmation--error").hasClass("hidden-xs-up")
      );
    });

    it("shows comment validation when other fields provided", () => {
      $("#email").val("test@email.com");
      $("#first_name").val("tom");
      $("#last_name").val("brady");
      $("#privacy").prop("checked", "checked");
      $("#support-submit").click();
      assert.isFalse(
        $(".support-comments-error-container").hasClass("hidden-xs-up")
      );
    });

    it("sends multiple files down to the server", () => {
      $("#no_request_response").click();
      const file_1 = new File({
        name: "test-file",
        buffer: Buffer.from("this is a 24 byte string"),
        type: "image/png"
      });
      const file_2 = new File({
        name: "test-file-2",
        buffer: Buffer.from("this is now a 28 byte string"),
        type: "image/png"
      });

      // convert to Blobs because JSDOM?
      toUpload.push(new window.Blob([file_1], { type: "image/png" }));
      toUpload.push(new window.Blob([file_2], { type: "image/png" }));

      $("#comments").val("A comment");
      $("#privacy").prop("checked", "checked");
      $("#g-recaptcha-response").val("response");
      $("#support-submit").click();

      const photos = spy.firstCall.args[0].data.getAll("support[photos][]");
      // getAll returns [ "[object Object]", "[object Object]" ]
      // not sure how to recover actual values
      assert.equal(photos.length, toUpload.length);
    });

    it("passes comment thru profanity filter", () => {
      // eslint-disable-next-line global-require
      const Filter = require("bad-words");
      const f = new Filter();
      f.addWords("redsox");
      const fakeCleanFn = f.clean.bind(cloneDeep(f)); // need to copy it so it's not stubbed by sinon
      const profanityStub = sinon
        .stub(Filter.prototype, "clean")
        .callsFake(fakeCleanFn);

      $("#comments").val("the redsox win");
      $("#no_request_response").attr("checked", true);
      $("#g-recaptcha-response").val("response");
      $("#support-submit").click();
      const censoredComments = spy.firstCall.args[0].data.getAll(
        "support[comments]"
      )[0];

      assert.equal(profanityStub.callCount, 1);
      assert.equal(censoredComments, "the ****** win");

      profanityStub.restore();
    });
  });

  describe("handleModeChangeSelection", () => {
    beforeEach(() => {
      const opts = { opt1_options: [1, 2, 3], opt2_options: [4, 5] };

      $("#test").html(`
      <script id="js-routes-by-mode" type="text/plain">
        ${JSON.stringify(opts)}
      </script>
       <select class="c-select c-mode-selector" id="support_mode">
         <option value=" ">Select</option>
         <option value="opt1">opt1</option>
         <option value="opt2">opt2</option>
       </select>
       <div id="route-and-vehicle">
        <select class="c-select c-route-selector" id="support_route"></select>
       </div>
     `);
      handleModeChangeSelection($);
    });

    afterEach(() => {
      $("#test").remove();
    });

    it("detects a new selection and updates the options with dynamic values", () => {
      // initEvent is deprecated and no longer recommended but the newer way of triggering events nor jQuery's .change() were triggering a change in the selection

      const sortBySelect = document.querySelector("select.c-mode-selector");
      sortBySelect.value = "opt2";
      const event = document.createEvent("HTMLEvents");
      event.initEvent("change", false, false);
      sortBySelect.dispatchEvent(event);

      assert.equal(
        $("#support_route").html(),
        `<option value=" ">Select</option><option value="4">4</option><option value="5">5</option>`
      );
    });

    it("detects a new but invalid selection so it hides the container", () => {
      // initEvent is deprecated and no longer recommended but the newer way of triggering events nor jQuery's .change() were triggering a change in the selection

      const sortBySelect = document.querySelector("select.c-mode-selector");
      sortBySelect.value = " ";
      const event = document.createEvent("HTMLEvents");
      event.initEvent("change", false, false);
      sortBySelect.dispatchEvent(event);

      // $("#...").is(":visible") doesn't detect visibility so we need to use the 'display' CSS property instead:
      assert.equal($("#route-and-vehicle").css("display"), "none");
    });
  });

  describe("handleSubjectChange function: show or hide the 'CharlieCard or Ticket number' field depending on the subject", () => {
    beforeEach(() => {
      $("#test").html(`
       <select class="c-select c-mode-selector" id="support_subject">
         <option value>Please choose a subject</option>
         <option value="Bus Stop">Bus Stop</option>
         <option value="CharlieCards & Tickets">CharlieCards & Tickets</option>
       </select>
       <div id="charlie-card-or-ticket-number" class="form-group">
        <label class="form-control-label" for="support_ticket_number">CharlieCard or Ticket number (optional)</label>
        <input class="support-form-input support-form-input--small form-control" id="support_ticket_number" name="support[ticket_number]" type="text">
       </div>
     `);
      handleSubjectChange($);
    });

    afterEach(() => {
      $("#test").remove();
    });

    it("shows the 'CharlieCard or Ticket number' field when selecting 'CharlieCards & Tickets' in the subject", () => {
      // initEvent is deprecated and no longer recommended but the newer way of triggering events nor jQuery's .change() were triggering a change in the selection

      const sortBySelect = document.querySelector("select.c-mode-selector");
      sortBySelect.value = "CharlieCards & Tickets";
      const event = document.createEvent("HTMLEvents");
      event.initEvent("change", false, false);
      sortBySelect.dispatchEvent(event);

      assert.notEqual(
        $("#charlie-card-or-ticket-number").css("display"),
        "none"
      );
    });

    it("does not show the 'CharlieCard or Ticket number' field since subject selected is not 'CharlieCards & Tickets'", () => {
      // initEvent is deprecated and no longer recommended but the newer way of triggering events nor jQuery's .change() were triggering a change in the selection

      const sortBySelect = document.querySelector("select.c-mode-selector");
      sortBySelect.value = "Bus Stop";
      const event = document.createEvent("HTMLEvents");
      event.initEvent("change", false, false);
      sortBySelect.dispatchEvent(event);

      assert.equal($("#charlie-card-or-ticket-number").css("display"), "none");
    });
  });
});
