import debounce from "../debounce";

describe("debounce", () => {
  jest.useFakeTimers();

  it("waits to fire an event until after a burst of events", () => {
    const callback = jest.fn();

    const input = document.createElement("input");
    input.addEventListener(
      "keydown",
      debounce((ev: KeyboardEvent) => callback(ev.key), 10),
      { passive: true }
    );
    const dispatchEvent = (num: number): void => {
      const ev: KeyboardEvent = new KeyboardEvent("keydown", {
        key: num.toString()
      });
      input.dispatchEvent(ev);
    };

    [0, 1, 2, 3, 4].forEach(dispatchEvent);

    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("4");

    [5, 6, 7, 8, 9].forEach(dispatchEvent);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(2, "9");
  });
});
