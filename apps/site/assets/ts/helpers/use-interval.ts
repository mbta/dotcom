import { useEffect, useRef } from "react";

const useInterval = (callback: Function, delay: number): void => {
  const savedCallback = useRef(callback);

  useEffect(
    () => {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    },
    [delay]
  );
};

export default useInterval;
