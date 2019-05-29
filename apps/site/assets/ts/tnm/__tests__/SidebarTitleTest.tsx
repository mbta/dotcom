import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import SidebarTitle from "../components/SidebarTitle";
import { createReactRoot } from "../../app/helpers/testUtils";

it("it renders", () => {
  createReactRoot();

  const tree = renderer
    .create(<SidebarTitle dispatch={() => {}} viewType="Routes" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it changes the view when change view is clicked", () => {
  const mockDispatch = jest.fn();

  const wrapper = shallow(
    <SidebarTitle viewType="Routes" dispatch={mockDispatch} />
  );

  wrapper.find(".m-tnm-sidebar__view-change").simulate("click");
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "CLICK_VIEW_CHANGE",
    payload: { stopId: null }
  });
});

it("it changes the view when change view is selected via ENTER", () => {
  const mockDispatch = jest.fn();

  const wrapper = shallow(
    <SidebarTitle viewType="Routes" dispatch={mockDispatch} />
  );

  wrapper
    .find(".m-tnm-sidebar__view-change")
    .simulate("keyPress", { key: "Enter" });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "CLICK_VIEW_CHANGE",
    payload: { stopId: null }
  });
});
