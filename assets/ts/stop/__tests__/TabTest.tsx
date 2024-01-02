import React from "react";
import { mount } from "enzyme";
import Tab from "../components/Tab";

const infoId = ".info";

describe("Tab", () => {
  test("it handles Enter on time filters", () => {
    const spy = jest.fn();
    const tab = {
      tab: {
        badge: undefined,
        class: "",
        href: "/stops/place-sstat",
        id: "info",
        name: "Station Info",
        selected: "info"
      },
      selected: true,
      dispatch: spy
    };
    const wrapper = mount(<Tab {...tab} />);
    wrapper.find(infoId).simulate("click");
    expect(spy).toHaveBeenCalledWith({
      type: "SWITCH_TAB",
      payload: { tab: "info" }
    });
  });

  test("it handles Clicks on time filters", () => {
    const spy = jest.fn();
    const tab = {
      tab: {
        badge: undefined,
        class: "",
        href: "/stops/place-sstat",
        id: "info",
        name: "Station Info",
        selected: "info"
      },
      selected: true,
      dispatch: spy
    };
    const wrapper = mount(<Tab {...tab} />);
    wrapper.find(infoId).simulate("keypress", { key: "Enter" });
    expect(spy).toHaveBeenCalledWith({
      type: "SWITCH_TAB",
      payload: { tab: "info" }
    });
  });
});
