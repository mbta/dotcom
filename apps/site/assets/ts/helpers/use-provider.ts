import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A hook which wraps an async data provider, allowing it to be used as
 * part of a functional component.
 *
 * The provider is initially called at component mount, and the data can
 * be manually refreshed using the second element of the value returned
 * by the hook.
 *
 * Internally, the state diagram looks something like this:
 * <Component Mount> → Loading → ↱           Loaded ↴
 *                               ↑          <Calls update>
 *                               ⬑ LoadingWithStale ↵
 */

export type InitialLoading = { loading: true };
export type Loaded<T> = { loading: false; data: T };
export type LoadingWithStale<T> = { loading: true; data: T };
export type UseProviderState<T> =
  | InitialLoading
  | Loaded<T>
  | LoadingWithStale<T>;
export type UseProviderStateWithoutInitialLoading<T> = Exclude<
  UseProviderState<T>,
  InitialLoading
>;
export const useProvider = <Fn extends (...args: any) => PromiseLike<any>>(
  provider: Fn,
  deps: Parameters<Fn>
) => {
  const [state, setState] = useState<UseProviderState<Awaited<ReturnType<Fn>>>>(
    { loading: true }
  );

  const updateData = useCallback(async () => {
    const setStateIfSame = (fn: (currentState: typeof state) => typeof state) =>
      setState(currentState => {
        if (newestUpdateData.current !== updateData) {
          return currentState;
        }

        return fn(currentState);
      });

    setStateIfSame(state => ({ ...state, loading: true }));
    const data = await provider(...deps);
    setStateIfSame(() => ({ loading: false, data }));

    return data;
  }, deps);
  const newestUpdateData = useRef(updateData);
  newestUpdateData.current = updateData;

  useEffect(() => {
    updateData();
  }, [updateData]);

  return [state, updateData] as const;
};

export const isInitialLoading = <T>(
  state: UseProviderState<T>
): state is InitialLoading => state.loading && !("data" in state);
