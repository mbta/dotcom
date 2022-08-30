/* eslint-disable import/prefer-default-export */

import { useCallback, useEffect, useRef } from "react";

/**
 * This is similar to `useInterval`, with the main difference being that
 * the Promise returned by `fn` is `await`ed before another timeout is
 * queued. For example, with a slow network request, this will wait until
 * the network request finishes to re-queue the follow up, as opposed to
 * starting the delay timer immediately after the network request is sent.
 *
 * Note that the cancel function returned by this hook does not cancel the
 * currently-running promise, it just prevents it from being queued up
 * again.
 */

export const useAwaitInterval = <Fn extends () => PromiseLike<unknown>>(
  fn: Fn,
  delay: number
): (() => () => void) => {
  type LatestTimeout = ReturnType<typeof setTimeout> | "cancelled" | undefined;
  const latestTimeout = useRef<LatestTimeout>(undefined);

  const enqueue = useCallback(
    (fn_: () => unknown): void => {
      if (latestTimeout.current !== "cancelled") {
        latestTimeout.current = setTimeout(fn_, delay);
      }
    },
    [delay]
  );

  const cancel = (): void => {
    if (latestTimeout.current && latestTimeout.current !== "cancelled") {
      clearTimeout(latestTimeout.current);
      latestTimeout.current = "cancelled";
    }
  };

  const go = useCallback(async () => {
    await fn();

    enqueue(go);
  }, [fn, enqueue]);

  useEffect(() => {
    go();

    return cancel;
  }, [go]);

  return useCallback(() => {
    cancel();

    return () => {
      latestTimeout.current = undefined;

      go();
    };
  }, [go]);
};
