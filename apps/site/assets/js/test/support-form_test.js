import { assert } from "chai";
import jsdom from "mocha-jsdom";
import { File } from "file-api";
import "custom-event-autopolyfill";
import sinon from "sinon";
import {
  clearFallbacks,
  handleUploadedPhoto,
  setupTextArea,
  handleSubmitClick,
  rescale
} from "../support-form";
import testConfig from "./../../ts/jest.config";

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

  describe("rescale", function() {
    it("returns the same dimensions if they are in the limit", function() {
      let dim = { width: 900, height: 900 };
      dim = rescale(dim);
      assert.equal(dim.width, 900);
      assert.equal(dim.height, 900);
    });

    it("returns a properly scaled dimension if the width is longer", function() {
      let dim = { width: 2000, height: 1000 };
      dim = rescale(dim);
      assert.equal(dim.width, 1000);
      assert.equal(dim.height, 500);
    });

    it("returns a properly scaled dimension if the height is longer", function() {
      let dim = { width: 1000, height: 2000 };
      dim = rescale(dim);
      assert.equal(dim.width, 500);
      assert.equal(dim.height, 1000);
    });
  });

  describe("handleUploadedPhoto", () => {
    var toUpload = [];

    beforeEach(() => {
      toUpload = [];

      // convert to Blob because JSDOM?
      const file = new File({
        name: "test-file",
        buffer: new Buffer("this is a 24 byte string"),
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
        buffer: new Buffer("this is now a 28 byte string"),
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
        buffer: new Buffer("this is now a 28 byte string"),
        type: "image/png"
      });
      // convert to Blob because JSDOM?
      const blob = new window.Blob([file], { type: "image/png" });
      blob.name = "test-file-2";

      handleUploadedPhoto($, blob, $(".photo-preview-container"), toUpload);

      let fileNames = toUpload.map(file => {
        return file.name;
      });
      assert.deepEqual(fileNames, ["test-file", "test-file-2"]);
    });

    it("clears the photo that was clicked; the previews are not hidden if there are any photos left", () => {
      const file = new File({
        name: "test-file-2",
        buffer: new Buffer("this is now a 28 byte string"),
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
        buffer: new Buffer("this is now a 28 byte string"),
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
      const $second_photo = $preview.last();
      $first_photo.find(".clear-photo").trigger("click");

      let fileNames = toUpload.map(file => {
        return file.name;
      });
      assert.notInclude(fileNames, "test-file");
    });
  });

  describe("setupTextArea", () => {
    function enterComment(comment) {
      const $textarea = $("#comments");
      $textarea.val(comment);
      $textarea.blur();
    }

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
    var spy;
    const toUpload = [];

    beforeEach(() => {
      spy = sinon.spy($, "ajax");
      $("#test").html(`
        <div class="form-container">
          <div class="support-confirmation support-confirmation--success hidden-xs-up"></div>
          <form id="support-form" action="/customer-support">
            <div class="support-service-error-container hidden-xs-up" tabindex="-1"><div class="support-service-error"></div></div>
            <input name="support[service]" value="Complaint">Complaint</input>
            <input name="support[service]" value="Suggestion">Comment</input>
            <input name="support[service]" value="Inquiry">Question</input>
            <input name="support[service]" value="Inquiry">Request</input>
            <div class="support-comments-error-container hidden-xs-up" tabindex="-1"><div class="support-comments-error"></div></div>
            <textarea name="support[comments]" id="comments"></textarea>
            <input name="support[photo]" id="photo" type="file" />
            <input name="support[no_request_response]" id="no_request_response" type="checkbox" />
            <input name="support[name]" id="name" />
            <input name="support[phone]" id="phone" />
            <input name="support[email]" id="email" />
            <div class="support-name-error-container hidden-xs-up" tabindex="-1"><div class="support-name-error"></div></div>
            <div class="support-email-error-container hidden-xs-up" tabindex="-1"><div class="support-email-error"></div></div>
            <input id="privacy" type="checkbox" />
            <div class="support-privacy-error-container hidden-xs-up" tabindex="-1"><div class="support-privacy-error"></div></div>
            <div class="support-form-expanded" style="display: none"></div>
            <div class="error-container support-g-recaptcha-response-error-container" tabindex="-1"><div class="support-g-recaptcha-response-error"></div></div>
            <textarea id="g-recaptcha-response" name="g-recaptcha-response"></textarea>
            <button id="support-submit"></button>
            <span class="waiting" hidden>waiting...</span>
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

    it("requires a service to be selected", () => {
      $("#support-submit").click();
      assert.isFalse($(".support-form-expanded").hasClass("hidden-xs-up"));
      assert.isTrue(
        $(".support-confirmation--success").hasClass("hidden-xs-up")
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
        $(".support-name-error-container").hasClass("hidden-xs-up")
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
      assert.equal(
        document.activeElement,
        $(".support-service-error-container")[0]
      );
      $('[name="support[service]"][value="Complaint"]').attr("checked", true);
      $("#support-submit").click();
      assert.equal(
        document.activeElement,
        $(".support-comments-error-container")[0]
      );
      $("#comments").val("A comment");
      $("#support-submit").click();
      assert.equal(
        document.activeElement,
        $(".support-name-error-container")[0]
      );
      $("#name").val("tom brady");
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
      var isWaiting = false;

      $("#support-submit").on("waiting:start", () => {
        assert.isTrue($("#support-submit").prop("disabled"));
        assert.isFalse($(".waiting")[0].hasAttribute("hidden"));
        isWaiting = true;
      });

      $('[name="support[service]"][value="Complaint"]').attr("checked", true);
      $("#email").val("test@email.com");
      $("#name").val("tom brady");
      $("#comments").val("A comment");
      $("#privacy").prop("checked", "checked");
      $("#g-recaptcha-response").val("response");
      $("#support-submit").click();

      assert.isTrue(isWaiting);
    });

    it("hides the form and shows a message on success", () => {
      $("#request_response").click();
      $("#email").val("test@email.com");
      $("#name").val("tom brady");
      $("#comments").val("A comment");
      $('[name="support[service]"][value="Complaint"]').attr("checked", true);
      $("#privacy").prop("checked", "checked");
      $("#g-recaptcha-response").val("response");
      $("#support-submit").click();
      assert.equal(spy.callCount, 1);
      const ajaxArgs = spy.firstCall.args[0];
      assert.propertyVal(ajaxArgs, "method", "POST");
      assert.propertyVal(ajaxArgs, "url", "/customer-support");
      ajaxArgs.success();
      assert.equal($("#support-form").length, 0);
      assert.isFalse(
        $(".support-confirmation--success").hasClass("hidden-xs-up")
      );
    });

    it("shows a message on error", () => {
      $("#support-submit").on("waiting:end", () => {
        assert.isFalse($("#support-submit").prop("disabled"));
        assert.isTrue($(".waiting")[0].hasAttribute("hidden"));
      });

      $("#email").val("test@email.com");
      $("#name").val("tom brady");
      $('[name="support[service]"][value="Complaint"]').attr("checked", true);
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
      $("#name").val("tom brady");
      $("#privacy").prop("checked", "checked");
      $("#support-submit").click();
      assert.isFalse(
        $(".support-comments-error-container").hasClass("hidden-xs-up")
      );
    });

    it("sends multiple files down to the server", () => {
      $("#no_request_response").click();
      let file_1 = new File({
        name: "test-file",
        buffer: new Buffer("this is a 24 byte string"),
        type: "image/png"
      });
      let file_2 = new File({
        name: "test-file-2",
        buffer: new Buffer("this is now a 28 byte string"),
        type: "image/png"
      });

      // convert to Blobs because JSDOM?
      toUpload.push(new window.Blob([file_1], { type: "image/png" }));
      toUpload.push(new window.Blob([file_2], { type: "image/png" }));

      $('[name="support[service]"][value="Complaint"]').attr("checked", true);
      $("#comments").val("A comment");
      $("#privacy").prop("checked", "checked");
      $("#g-recaptcha-response").val("response");
      $("#support-submit").click();

      const photos = spy.firstCall.args[0].data.getAll("support[photos][]");
      // getAll returns [ "[object Object]", "[object Object]" ]
      // not sure how to recover actual values
      assert.equal(photos.length, toUpload.length);
    });
  });
});
