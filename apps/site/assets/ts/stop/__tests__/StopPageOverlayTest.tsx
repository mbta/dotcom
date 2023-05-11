import React from "react";
import StopPageOverlay from "../components/StopPageOverlay";
import { Stop } from "../../__v3api";
import { mount } from "enzyme";

const stop = {} as Stop;

describe("StopPageOverlay", () => {
  it("opens on click", () => {
    const wrapper = mount(
      <StopPageOverlay routes={[]} stop={stop} schedules={[]} />
    );
    wrapper.find(".overlay-open").simulate("click");
    expect(wrapper.find(".m-stop-route-and-map").exists()).toBeTruthy();
  });
});
