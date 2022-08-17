import currentLineSuspensions from "./../use-line-suspensions";

// TODO: Add tests
test("currentLineSuspensions", () => {
  expect(() => {
    currentLineSuspensions("something");
  }).not.toThrowError();
});
