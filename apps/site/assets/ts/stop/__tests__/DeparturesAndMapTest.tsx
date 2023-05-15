import React from "react";
import DeparturesAndMap from "../components/DeparturesAndMap";
import { Stop } from "../../__v3api";
import { mount } from "enzyme";

const stop = {} as Stop;

describe("DeparturesAndMap", () => {
  it("opens on click", () => {
    const wrapper = mount(
      <DeparturesAndMap routes={[]} stop={stop} schedules={[]} lines={[]} />
    );
    wrapper.find(".overlay-open").simulate("click");
    expect(wrapper.find(".m-stop-route-and-map").exists()).toBeTruthy();
  });
});
