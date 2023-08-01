import { useReducer, useEffect, Reducer, useLayoutEffect } from "react";
import { joinChannel, leaveChannel } from "../app/channels";
import { usePageVisibility } from "./usePageVisibility";

// extract the state and action types from the given reducer
// is there a way to do this without using "any"?
/* eslint-disable @typescript-eslint/no-explicit-any */
type State<T> = T extends Reducer<infer S, any> ? S : never;
type Action<T> = T extends Reducer<any, infer A> ? A : never;
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * useChannel is intended to be generic enough to work with any Websocket-based
 * channel we might set up. Thus it requires many arguments.

 * @template OnDataEventType - Describes the data recieved through the
 * channel's "data" event.
 * @template OnDataReducerType - A type extending React's Reducer<State, Action>
 * @param {string} channelId - The name of the channel to subscribe to.
 * @param {OnDataReducerType} reducer - A function that will be used to process
 * channel data.
 * @param {State<OnDataReducerType>} initialData - The initial state value for
 * the reducer.
 * @return {State<OnDataReducerType>} - the data output from the channel after
 * going through the reducer.
 */
function useChannel<
  OnDataEventType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OnDataReducerType extends Reducer<any, any>
>(
  channelId: string | null,
  reducer: OnDataReducerType,
  initialData: State<OnDataReducerType>
): State<OnDataReducerType> {
  const [state, dispatch] = useReducer<OnDataReducerType>(reducer, initialData);

  useEffect(() => {
    if (channelId !== null) {
      joinChannel<OnDataEventType[]>(channelId, dispatch);
    }
    return () => {
      if (channelId !== null) {
        leaveChannel(channelId);
      }
    };
  }, [channelId]);

  const isVisible = usePageVisibility();
  useLayoutEffect(() => {
    if (channelId !== null) {
      if (!isVisible) {
        leaveChannel(channelId);
      } else {
        joinChannel<OnDataEventType[]>(channelId, dispatch);
      }
    }
    return () => {
      if (channelId !== null) {
        leaveChannel(channelId);
      }
    };
  }, [isVisible, channelId]);

  useEffect(() => {
    // Set up an event listener to listen to the channel's custom event
    // update state when new data is emitted
    const onChannelData = (
      event: CustomEvent<Action<OnDataReducerType>>
    ): void => dispatch(event.detail);
    if (channelId) {
      document.addEventListener(channelId, onChannelData as EventListener);
    }
    return () => {
      if (channelId) {
        document.removeEventListener(channelId, onChannelData as EventListener);
      }
    };
  }, [channelId, dispatch]);

  return state;
}

export default useChannel;
