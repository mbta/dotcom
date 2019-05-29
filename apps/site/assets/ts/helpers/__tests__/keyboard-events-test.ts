import { isEnter, handleNativeEnterKeyPress } from "../keyboard-events";

test("isEnter works for words and numbers", () => {
  expect(isEnter("Enter")).toEqual(true);
  expect(isEnter(13)).toEqual(true);
  expect(isEnter("Space")).toEqual(false);
  expect(isEnter(22)).toEqual(false);
});

test("handleNativeEnterKeyPress calls a callback on the Enter key event", () => {
  let called = false;

  const keyboardSpaceEvent = new KeyboardEvent("keydown", { key: "Space" });
  handleNativeEnterKeyPress(keyboardSpaceEvent, () => {
    called = true;
  });
  expect(called).toEqual(false);

  const keyboardEnterEvent = new KeyboardEvent("keydown", { key: "Enter" });
  handleNativeEnterKeyPress(keyboardEnterEvent, () => {
    called = true;
  });
  expect(called).toEqual(true);
});
