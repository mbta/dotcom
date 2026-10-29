import { isEscape, handleNativeEscapeKeyPress } from "../keyboard-events";

test("checks if key pressed is ESC", () => {
  expect(isEscape(27)).toEqual(true);
});

test("tests handleNativeEscapeKeyPress", () => {
  const spy = jest.fn();

  let e = new KeyboardEvent("Escape", { key: "Escape" });
  handleNativeEscapeKeyPress(e, spy);
  expect(spy).toHaveBeenCalledTimes(1);

  e = new KeyboardEvent("Enter", { key: "Enter" });
  spy.mockRestore();
  handleNativeEscapeKeyPress(e, spy);
  expect(spy).toHaveBeenCalledTimes(0);
});
