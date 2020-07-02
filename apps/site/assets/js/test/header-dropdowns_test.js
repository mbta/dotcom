import { expect } from "chai";
import jsdom from "mocha-jsdom";
import { initCarets } from "../header-dropdowns";
import sinon from "sinon";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("headerDropdowns", function() {
  jsdom({ url: testURL });

  beforeEach(function() {
    document.body.innerHTML = `
      <div class="js-header-link">
        <div class="js-header-link__content">
          <div class="js-header-link__carets"></div>
        </div>
      </div>
    `;
  });

  it("adds toggle attributes and classes to header links", function() {
    const el = document.getElementsByClassName("js-header-link").item(0);
    initCarets();
    expect(el.getAttribute("data-toggle")).to.equal("collapse");
    expect(el.getAttribute("aria-expanded")).to.equal("false");
    expect(el.classList.contains("navbar-toggle")).to.be.true;
    expect(el.classList.contains("toggle-up-down")).to.be.true;
  });

  it("adds up/down carets if they don't already exist", function() {
    initCarets();
    const el = document
      .getElementsByClassName("js-header-link__content")
      .item(0);
    const caretContainer = el.children.item(0);
    expect(caretContainer).to.be.an.instanceOf(window.HTMLDivElement);
    expect(caretContainer.children).to.have.lengthOf(2);
    expect(caretContainer.children.item(0).classList.contains("fa-angle-up")).to
      .be.true;
    expect(caretContainer.children.item(1).classList.contains("fa-angle-down"))
      .to.be.true;
  });

  it("does not add more carets if they already exist", function() {
    const container = document
      .getElementsByClassName("js-header-link__carets")
      .item(0);
    const up = document.createElement("i");
    up.classList.add("up");
    up.classList.add("fa-angle-up");
    container.appendChild(up);

    const down = document.createElement("i");
    down.classList.add("down");
    down.classList.add("fa-angle-down");
    container.appendChild(down);

    initCarets();

    expect(container.getElementsByClassName("up")).to.have.lengthOf(1);
    expect(container.getElementsByClassName("down")).to.have.lengthOf(1);
  });
});
