// Debounce is meant to be used with event listeners. Use it to delay a call
// until after a burst of events, such as keyboard input.
//
//   usage:
//
//     const callback = (ev: Event) => {}
//     document.addEventListener("keyup", debounce(callback, 250))
//

const debounce = (callback: Function, delay: number): EventListener => {
  let timer: number | undefined;

  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => callback(...args), delay);
  };
};

export const debouncePromise = (
  callback: Function,
  delay: number
): Function => {
  let timerId: number | undefined;

  return function debounced(...args: unknown[]) {
    if (timerId) {
      window.clearTimeout(timerId);
    }

    return new Promise(resolve => {
      timerId = window.setTimeout(() => resolve(callback(...args)), delay);
    });
  };
};

export default debounce;
