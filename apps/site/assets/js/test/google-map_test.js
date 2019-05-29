import { assert } from "chai";
import jsdom from "mocha-jsdom";
import * as Icons from "../icons";
import { iconSvg } from "../google-map";

describe("google-map", () => {
  jsdom();

  beforeEach(function() {
    document.body.innerHTML = `
      <div id="icon-feature-bw-commuter_rail"><span><svg></svg></span></div>
      `;
  });

  describe("iconSvg", () => {
    it("returns correct dot icon", () => {
      const actual = iconSvg("000000-dot");
      const expected = `<svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><circle fill="#FFFFFF" cx="4" cy="4" r="3"></circle><path d="M4,6.5 C5.38071187,6.5 6.5,5.38071187 6.5,4 C6.5,2.61928813 5.38071187,1.5 4,1.5 C2.61928813,1.5 1.5,2.61928813 1.5,4 C1.5,5.38071187 2.61928813,6.5 4,6.5 Z M4,8 C1.790861,8 0,6.209139 0,4 C0,1.790861 1.790861,0 4,0 C6.209139,0 8,1.790861 8,4 C8,6.209139 6.209139,8 4,8 Z" fill="#000000" fill-rule="nonzero"></path></svg>`;
      assert.equal(actual, expected);
    });

    it("returns correct dot-mid icon", () => {
      const actual = iconSvg("000000-dot-mid");
      const expected = `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><circle fill="#FFFFFF" cx="8" cy="8" r="7"></circle><path d="M8,13 C10.7614237,13 13,10.7614237 13,8 C13,5.23857625 10.7614237,3 8,3 C5.23857625,3 3,5.23857625 3,8 C3,10.7614237 5.23857625,13 8,13 Z M8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 Z" fill="#000000" fill-rule="nonzero"></path></svg>`;
      assert.equal(actual, expected);
    });

    it("returns correct vehicle icon", () => {
      const actual = iconSvg("commuter_rail-vehicle");
      const expected = Icons.getSvgIcon("bw-commuter_rail");
      assert.equal(actual, expected);
    });

    it("returns undefined for unnexpect input", () => {
      const actual = iconSvg("xxx");
      const expected = undefined;
      assert.equal(actual, expected);
    });
  });
});
