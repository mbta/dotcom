import { expect, assert } from "chai";
import * as Cookies from "../cookies";

describe("Cookies", () => {
  describe("getCookieFromString", () => {
    it("gets correct result for no cookies", () => {
      const cookies = "";
      const result = Cookies.getCookieFromString(cookies, "cookie");
      assert.equal(result, null);
    });

    it("gets correct result for single cookie", () => {
      const cookies = "cookie1=value1";
      const result = Cookies.getCookieFromString(cookies, "cookie1");

      assert.equal(result, "value1");
    });

    it("returns null if cookie does not exist", () => {
      const cookies = "cookie1=value1";
      const result = Cookies.getCookieFromString(cookies, "no_cookie");

      assert.equal(result, null);
    });

    it("can get a cookie from a list of multiple cookies", () => {
      const cookies = "cookie1=value1; cookie2=value2; cookie3=value3";
      const result = Cookies.getCookieFromString(cookies, "cookie2");

      assert.equal(result, "value2");
    });

    it("ignores whitespace in cookie string", () => {
      const cookies = " cookie1=value1 ; cookie2=value2; cookie3=value3 ";
      const result1 = Cookies.getCookieFromString(cookies, "cookie1");
      const result2 = Cookies.getCookieFromString(cookies, "cookie2");
      const result3 = Cookies.getCookieFromString(cookies, "cookie3");

      assert.equal(result1, "value1");
      assert.equal(result2, "value2");
      assert.equal(result3, "value3");
    });
  });
});
