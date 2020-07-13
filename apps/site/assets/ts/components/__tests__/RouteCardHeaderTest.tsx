import React from "react";
import { shallow } from "enzyme";
import RouteCardHeader from "../RouteCardHeader";
import { EnhancedRoute } from "../../__v3api";

describe("RouteCardHeader component", () => {
  it("renders", () => {
    const wrapper = shallow(
      <RouteCardHeader
        route={
          {
            id: "1",
            name: "",
            type: 3
          } as EnhancedRoute
        }
      />
    );
    expect(wrapper.debug()).toBeTruthy();
    expect(wrapper.debug()).toMatchSnapshot();
  });

  describe("with hasAlert", () => {
    it("shows alert icon when true", () => {
      const wrapper = shallow(
        <RouteCardHeader
          route={
            {
              id: "1",
              name: "",
              type: 3
            } as EnhancedRoute
          }
          hasAlert={true}
        />
      );
      expect(wrapper.find(".c-svg__icon-alerts-triangle").length).toBe(1);
    });

    it("does not show alert icon when false", () => {
      const wrapper = shallow(
        <RouteCardHeader
          route={
            {
              id: "1",
              name: "",
              type: 3
            } as EnhancedRoute
          }
          hasAlert={false}
        />
      );
      expect(wrapper.find(".c-svg__icon-alerts-triangle").length).toBe(0);
    });
  });
});
