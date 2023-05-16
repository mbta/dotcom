import React from "react";
import DeparturesAndMap from "../components/DeparturesAndMap";
import { Stop } from "../../__v3api";
import { mount } from "enzyme";
import { RouteWithPolylines } from "../../hooks/useRoute";
import { routeWithPolylines } from "./helpers";

const stop = {} as Stop;
const testRoutesWithPolylines: RouteWithPolylines[] = [];

describe("DeparturesAndMap", () => {
  it("should render", () => {
    const wrapper = mount(
      <DeparturesAndMap
        routes={[]}
        stop={stop}
        schedules={[]}
        routesWithPolylines={testRoutesWithPolylines}
      />
    );
    expect(wrapper.find(".stop-routes-and-map").exists()).toBeTruthy();
  });
});
