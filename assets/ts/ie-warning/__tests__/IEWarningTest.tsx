import React from "react";
import { mount } from "enzyme";
import * as cookiesModule from "../../../js/cookies";
import * as IEWarningModule from "../IEWarning";
import * as IEWarningBannerModule from "../components/IEWarningBanner";

const body = '<div id="ie-warning"></div>';

it("it renders a warning", () => {
  document.body.innerHTML = body;

  const browserIsIEFn = jest
    .spyOn(IEWarningModule, "browserIsIE")
    .mockImplementation(() => true);

  IEWarningModule.default();

  expect(document.body.innerHTML).toEqual(expect.stringContaining("<aside"));

  browserIsIEFn.mockRestore();
});

it("it renders nothing", () => {
  document.body.innerHTML = body;

  const browserIsIEFn = jest
    .spyOn(IEWarningModule, "browserIsIE")
    .mockImplementation(() => true);

  const getCookieFn = jest
    .spyOn(cookiesModule, "getCookie")
    .mockImplementation(() => "false");

  IEWarningModule.default();

  expect(document.body.innerHTML).toEqual(body);

  browserIsIEFn.mockRestore();
  getCookieFn.mockRestore();
});

it("it shows expanded content", () => {
  const wrapper = mount(<IEWarningBannerModule.default />);

  // now click on the caret:
  const caret = wrapper.find("#header-ie-warning");

  caret.simulate("click");

  expect(wrapper.find("#panel-ie-warning").exists()).toBeTruthy();

  wrapper.unmount();
});

it("makes the banner go away", () => {
  const wrapper = mount(<IEWarningBannerModule.default />);
  const spy = jest.spyOn(IEWarningBannerModule, "setCookie");

  // click to expand content:
  const caret = wrapper.find("#header-ie-warning");

  caret.simulate("click");

  const mockToggle = jest.fn();
  const mockAdd = jest.fn();
  jest.spyOn(document, "querySelector").mockImplementation(
    (selectors: string): HTMLElement => {
      const aside = {
        tagName: "ASIDE",
        className: "c-aside-content",
        classList: ({
          toggle: mockToggle,
          add: mockAdd
        } as unknown) as DOMTokenList,
        innerHTML: wrapper.find(".c-ie-warning-content").html()
      };
      return (aside as unknown) as HTMLElement;
    }
  );

  wrapper.find("button").simulate("click");

  expect(spy).toHaveBeenCalledWith("show_ie_warning", "false", 20 * 365);
  expect(mockToggle).toHaveBeenCalledTimes(1);
  expect(mockAdd).toHaveBeenCalledTimes(1);

  wrapper.unmount();
  spy.mockRestore();
  mockToggle.mockRestore();
  mockAdd.mockRestore();
});

it("it renders nothing based on cookie", () => {
  document.body.innerHTML = body;
  document.cookie = "show_ie_warning=false";

  IEWarningModule.default();

  expect(document.body.innerHTML).toEqual(body);
});

it("it detects that browser is IE", () => {
  Object.defineProperty(window.navigator, "userAgent", { value: "MSIE 11" });
  const actual: boolean = IEWarningModule.browserIsIE();
  expect(actual).toEqual(true);
});

it("it sets cookie", () => {
  IEWarningBannerModule.setCookie("show_ie_warning", "true", 1);

  expect(document.cookie).toEqual(
    expect.stringContaining("show_ie_warning=true")
  );
});
