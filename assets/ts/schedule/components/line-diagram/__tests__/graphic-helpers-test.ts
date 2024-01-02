import { coordReducer, CoordAction } from "../graphics/graphic-helpers";

const action = { stop: "xyz", coords: [123, 45] } as CoordAction;
it("coordReducer updates value", () => {
  expect(coordReducer({ xyz: [1, 2], abc: [10, 20] }, action)).toEqual({
    xyz: [123, 45],
    abc: [10, 20]
  });
});
