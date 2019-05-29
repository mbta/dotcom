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

export default debounce;
