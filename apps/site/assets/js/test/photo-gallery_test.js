import { assert } from "chai";
import jsdom from "mocha-jsdom";
import { handlePageLoad, default as photoGallery } from "../photo-gallery";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("photo-gallery", () => {
  var $;
  jsdom({ url: testURL });

  beforeEach(() => {
    $ = jsdom.rerequire("jquery");

    $("body")
      .append(`<div class="photo-gallery clearfix" data-component="photo-gallery">
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="E74C3C.png"><img alt="Red" class="img-thumbnail" src="E74C3C.png"></a>
          <figcaption class="photo-name">Red</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="5499C7.png"><img alt="Blue" class="img-thumbnail" src="5499C7.png"></a>
          <figcaption class="photo-name">Blue</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="7E5109.png"><img alt="Brown" class="img-thumbnail" src="7E5109.png"></a>
          <figcaption class="photo-name">Brown</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="212F3C.png"><img alt="Gray" class="img-thumbnail" src="212F3C.png"></a>
          <figcaption class="photo-name">Gray</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="F1C40F.png"><img alt="Yellow" class="img-thumbnail" src="F1C40F.png"></a>
          <figcaption class="photo-name">Yellow</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="1D8348.png"><img alt="Green" class="img-thumbnail" src="1D8348.png"></a>
          <figcaption class="photo-name">Green</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="A569BD.png"><img alt="Purple" class="img-thumbnail" src="A569BD.png"></a>
          <figcaption class="photo-name">Purple</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="922B21.png"><img alt="Maroon" class="img-thumbnail" src="922B21.png"></a>
          <figcaption class="photo-name">Maroon</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="E59866.png"><img alt="Yucky" class="img-thumbnail" src="E59866.png"></a>
          <figcaption class="photo-name">Yucky</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="A9CCE3.png"><img alt="Light Blue" class="img-thumbnail" src="A9CCE3.png"></a>
          <figcaption class="photo-name">Light Blue</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="fff.png"><img alt="White" class="img-thumbnail" src="fff.png"></a>
          <figcaption class="photo-name">White</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="E74C3C_0.png"><img alt="page 2 red" class="img-thumbnail" src="E74C3C_0.png"></a>
          <figcaption class="photo-name">page 2 red</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="5499C7_0.png"><img alt="page 2 blue" class="img-thumbnail" src="5499C7_0.png"></a>
          <figcaption class="photo-name">page 2 blue</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="7E5109_0.png"><img alt="page 2 brown" class="img-thumbnail" src="7E5109_0.png"></a>
          <figcaption class="photo-name">page 2 brown</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="212F3C_0.png"><img alt="page 2 dark" class="img-thumbnail" src="212F3C_0.png"></a>
          <figcaption class="photo-name">page 2 dark</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="F1C40F_0.png"><img alt="page 2 yellow" class="img-thumbnail" src="F1C40F_0.png"></a>
          <figcaption class="photo-name">page 2 yellow</figcaption>
        </figure>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 photo-item">
        <figure>
          <a href="1D8348_0.png"><img alt="page 2 green" class="img-thumbnail" src="1D8348_0.png"></a>
          <figcaption class="photo-name">page 2 green</figcaption>
        </figure>
      </div>
    </div>`);
    photoGallery($);
    handlePageLoad($);
  });

  afterEach(() => {
    $(".photo-gallery").remove();
  });

  it("converts a list of image to a gallery component", () => {
    const galleryId = $('[data-component="photo-gallery"]').attr(
      "data-gallery-id"
    );
    assert.isNotNull(galleryId);
  });

  it("shows the first image by default", () => {
    const galleryId = $('[data-component="photo-gallery"]').attr(
      "data-gallery-id"
    );
    const actual = $("#" + galleryId + "primary").attr("alt");
    const expected = "Red";
    assert.equal(expected, actual);
  });

  it("shows the second image as the main image when the second image is clicked", () => {
    $('[data-offset="1"]').click();
    const galleryId = $('[data-component="photo-gallery"]').attr(
      "data-gallery-id"
    );
    const actual = $("#" + galleryId + "primary").attr("alt");
    const expected = "Blue";
    assert.equal(expected, actual);
  });

  it("shows the next image when the next navigation item is clicked", () => {
    $('[data-increment="1"]').click();
    const galleryId = $('[data-component="photo-gallery"]').attr(
      "data-gallery-id"
    );
    const actual = $("#" + galleryId + "primary").attr("alt");
    const expected = "Blue";
    assert.equal(expected, actual);
  });
});
