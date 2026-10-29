// eslint-disable-next-line import/prefer-default-export
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
