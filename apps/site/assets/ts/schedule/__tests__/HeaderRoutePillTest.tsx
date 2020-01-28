import React from "react";
import renderer, { act } from "react-test-renderer";
import HeaderRoutePill from "../components/schedule-finder/HeaderRoutePill";

describe("HeaderRoutePill", () => {
  it("renders for bus", () => {
    let tree;
    act(() => {
      tree = renderer.create(<HeaderRoutePill id="123" name="123" type={3} />);
    });
    expect(tree).toMatchSnapshot();
  });

  it("renders SL routes appropriately", () => {
    let tree;
    act(() => {
      tree = renderer.create(<HeaderRoutePill id="741" name="SL1" type={3} />);
    });
    expect(tree).toMatchSnapshot();
  });

  it("renders SL Waterfront appropriately", () => {
    let tree;
    act(() => {
      tree = renderer.create(
        <HeaderRoutePill
          id="746"
          name="Silver Line Way - South Station"
          type={3}
        />
      );
    });
    expect(tree).toMatchSnapshot();
  });

  it("returns null for non-bus service", () => {
    const tree = HeaderRoutePill({ id: "Red", type: 1, name: "RL" });
    expect(tree).toBeNull();
  });
});
