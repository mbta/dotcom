import React from "react";
import { shallow } from "enzyme";
import RouteCardHeader from "../RouteCardHeader";
import { Alert, EnhancedRoute } from "../../__v3api";

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
        alerts={[]}
      />
    );
    expect(wrapper.debug()).toBeTruthy();
    expect(wrapper.debug()).toMatchSnapshot();
  });

  describe("with alerts", () => {
    it("shows alert icon when alerts present", () => {
      const wrapper = shallow(
        <RouteCardHeader
          route={
            {
              id: "1",
              name: "",
              type: 3
            } as EnhancedRoute
          }
          alerts={[{} as Alert]}
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
          alerts={[]}
        />
      );
      expect(wrapper.find(".c-svg__icon-alerts-triangle").length).toBe(0);
    });
  });
});
